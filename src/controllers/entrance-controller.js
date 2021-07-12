// import Service from '../models/services-model';
import Sequelize from 'sequelize';
import Config from '../models/configurations-models';
import RFID from '../models/RFID-model'
import billDetail from '../models/bill-detail-model';
import servicesType from '../models/services-type-model';
import Services from '../models/services-model'
const { Op } = require("sequelize");

export async function createEntrance(req, res) {
    
        // === verify if this is the right department === DONE
        // === update the current department in the RFID TABLE and BILL_DETAIL TABLE === Done
        // === inform about todo and next deparment === 
        // === if no find in sequence fall to proccess that couldbe like lost === 
    let { rfid, department } = req.body;
    try {

        let configSeq = await Config.findOne();

        rfid = await RFID.findOne({
            include: [billDetail],
            where: {
                ID_RFID: rfid
            }
        });
        configSeq = configSeq.dataValues.sequence;
        const lastSeq = [configSeq[configSeq.length - 2], configSeq[configSeq.length - 1]];
        const currentDep = rfid.dataValues.BILL_DETAIL.CURRENT_DEPT;
        const index_position = configSeq.indexOf(currentDep);
        let nextDep;

        if (index_position < 0) {
            nextDep = lastSeq;
        } else {
            let proccess = await servicesType.findAll({
                attributes: ['ID_SERVICE'],
                include: [{
                    model: Services,
                    attributes: ['DEP_PROCESS'],
                }],
                where: {
                    ID_SERVICE_TYPE: {
                    [Op.or]: rfid.dataValues.BILL_DETAIL.ID_SERVICES_TYPE
                    }
                },
                group: ['"SERVICE_TYPE"."ID_SERVICE"','"SERVICE"."ID_SERVICE"']
            });
            // console.log(process);
            // console.log(index_position);
            let processDep = [];
            
            for (let index = 0; index < proccess.length; index++) {
                const element = proccess[index];
                processDep.push(element.dataValues.ID_SERVICE);
            }
        
            proccess = await Services.findAll({
                attributes: ['DEP_PROCESS'],
                where: {
                    ID_SERVICE: {
                    [Op.or]: processDep
                    }
                }
            });
        
            processDep = [];
            
            for (let index = 0; index < proccess.length; index++) {
                const element = proccess[index];
                processDep.push(element.dataValues.DEP_PROCESS);
            }
        
            // console.log(configSeq);
            // console.log(processDep);
            // console.log(lastSeq);
            // console.log(index_position);
            
            while(true){
                nextDep = configSeq[index_position + 1];
                // console.log(nextDep);
                if (processDep.includes(nextDep) || lastSeq.includes(nextDep)) {
                    break;
                }
            }       
        }

        // console.log(nextDep);

        if (nextDep != department) {
            return res.status(200).json({
                ok: false,
                hint: "this item is not destinated to this department.",
                next: nextDep,
                data: rfid
            });
        }

      
            let BillD = await billDetail.update({
                CURRENT_DEPT: nextDep
            }, {
                returning: true,
                where: {
                    ID_BILL_DETAIL: rfid.dataValues.BILL_DETAIL.ID_BILL_DETAIL
    
                }
            });
            if (!BillD) {
                return res.status(400).json({
                    ok: false,
                    message: "Ups! Something goes wrong",
                });
            }
        
            rfid.dataValues.BILL_DETAIL.CURRENT_DEPT = nextDep;

        return res.status(200).json({
            ok: true,
            data: rfid
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh Ooohh! Something goes wrong!"
        })
    }
}

export async function getInfo(req, res) {
    let { rfid } = req.body;

    try {
        // let newServices = await Service.create({
        //     ID_SERVICE: id_service,
        //     SERVICE: service,
        // });

        // if (!newServices) {
        //     return res.status(400).json({
        //         ok: false,
        //         message: "Uupps! Service don't create"
        //     });
        // }
        return res.status(200).json({
            ok: true,
            data: rfid
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh Ooohh! Something goes wrong!"
        })
    }
}

// export async function getAllServices(req, res) {

//     let findAllServices = await Service.findAll();

//     if (!findAllServices) {
//         return res.status(400).json({
//             ok: false,
//             message: "Uupps! Service don't found"
//         });
//     }
//     return res.status(200).json({
//         ok: true,
//         data: findAllServices
//     });

// }

// export async function getOneService(req, res) {
//     let { id_service } = req.params;
//     try {
//         let oneService = await Service.findOne({
//             where: {
//                 ID_SERVICE: id_service
//             }
//         });
//         if (!oneService) {
//             return res.status(400).json({
//                 ok: false,
//                 message: "Uupps! Service not found"
//             });
//         }
//         return res.status(200).json({
//             ok: true,
//             data: oneService
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             message: "Oh Ooohh! Something goes wrong!"
//         })
//     }


// }

// export async function updateService(req, res) {
//     const { id_service } = req.params;
//     let { id_s, service} = req.body;

//     let checkId = await Service.findOne({
//         where: {
//             ID_SERVICE: id_s
//         }
//     });

//     if (checkId) {
//         return res.status(500).json({
//             ok: false,
//             message: 'Wow! Somethig goes wrong!'
//         })
//     }

//     try {
//         let serviceUpdated = await Service.update(
//             {
//                 ID_SERVICE: id_s,
//                 SERVICE: service, 
//             },
//             {
//                 returning: true,
//                 where: {
//                     ID_SERVICE: id_service,
//                 },
//             }
//         );

//         if (!serviceUpdated) {
//             return res.status(400).json({
//                 ok: false,
//                 message: "Uups! Something goes wrong!"
//             });
//         }
//         res.status(200).json({
//             ok: true,
//             data: serviceUpdated
//         });

//     } catch (error) {
//         return res.status(500).json({
//             ok: false,
//             message: 'Oh ooohhh! Somethig goes wrong!'
//         })
//         console.log(error);
//     }
// }

// export async function deleteService(req, res) {
//     const { id_service } = req.params
//     try {
//         let destroyServie = await Service.update({
//             active: false,
//         },{
//             returning: true,
//             where: {
//                 ID_SERVICE: id_service,
//             },
//         });

//         if (!destroyServie) {
//             return res.status(400).json({
//                 ok: false,
//                 message: "Uups! Something goes wrong!"
//             });
//         }
//         res.status(200).json({
//             ok: true,
//             data: destroyServie
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             message: 'Oh ooohhh! Somethig went wrong!'
//         })
//     }


// }