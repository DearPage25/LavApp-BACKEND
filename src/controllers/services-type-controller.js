import ServicesType from '../models/services-type-model';

export async function createServicesType(req, res) {
    let { type, id_service, price, discount } = req.body;
    try {
        let servicesT = await ServicesType.create({
            TYPE: type,
            ID_SERVICE: id_service,
            PRICE: price,
            DISCOUNT: discount
        
        });
        if (servicesT) {
            return res.status(200).json({
                ok: true,
                data: servicesT,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Oh Oooohhh!!! Something goes wrong",
        });
        console.log("Error: ", error);
    }
}
export async function getAllServicesType(req, res) {

    const servicesT = await ServicesType.findAll();

    try {
        if (!servicesT) {
            return res.status(400).json({
                ok: false,
                message: "Oh! Ohhh!! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: servicesT,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Uuppssss!! Something goes wrong!",
        });
    }
}
export async function getOneServicesType(req, res) {
    let { id_servicetype } = req.params;
    try {
        let servicesT = await ServicesType.findOne({
            where: {
                ID_SERVICE_TYPE: id_servicetype,
            }
        });
        if (!servicesT) {
            return res.status(400).json({
                ok: false,
                message: "Ups! ServicesType not found!"
            })
        }
        res.status(200).json({
            ok: true,
            data: servicesT
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh Oooh! Something goes wrong!"
        })
    }
}
export async function updateServicesType(req, res) {
    let { id_servicetype } = req.params;
    let { type, id_service, price, discount } = req.body;
    try {
        let servicesT = await ServicesType.update({
            TYPE: type,
            ID_SERVICE: id_service,
            PRICE: price,
            DISCOUNT: discount
        }, {
            returning: true,
            where: {
                ID_SERVICE_TYPE: id_servicetype
            }
        }); if (!servicesT) {
            return res.status(400).json({
                ok: false,
                message: "Ups! Something goes wrong",
            });
        }

        res.status(200).json({
            ok: true,
            data: servicesT,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh Oooh!! User not updated",
        });
    }
}
