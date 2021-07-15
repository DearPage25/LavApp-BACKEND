/**
 * OJO IMPORTANTE @current_date y @date_deliver 
 * deberan ser seteados desde frontend de la
 * siguiente manera: 
 * 
 * 1.Date.parse("2019-01-01"), 
 * 2.Date.parse("2019-01-01T00:00:00.000Z"),
 * 3.Date.parse("2019-01-01T00:00:00.000+00:00")
 * 
 * para asi guardar correctamente la fecha y la hora
 * legible par la Base de Datos.
 */
import Bill from '../models/bill-model';
import Department from '../models/departament-models';
import BillDetail from '../models/bill-detail-model';
import ServicesType from '../models/services-type-model';
import User from '../models/user-model'
import sequelize from '../database/database'
import Person from '../models/person-model'
import Clothe from '../models/clothe-type-model'
///FALTA MOSTRAR ALGUNOS DATOS, POR LO VISTO ES BUENO
///CREAR UN VIEW EN LA BASE DE DATOS Y CREAR UN MODELON EN BASE A ESTO
export async function getBillByCustomer(req, res) {
  let { id_billByCustomer } = req.params; 
  try {
    let bills = await Bill.findAll({
      where: {
        CUSTOMER: id_billByCustomer,
       },
      include: [
        {
          model: User,
          as: 'cliente',
          attributes: ['EMAIL','USERNAME',],
          include: {
            model: Person,
            attributes: ['FIRST_NAME', 'LAST_NAME', 'TEL_NUMBER', 'ADDRESS']
          }
        },
        {
          model: User,
          as: 'trabajador',
          attributes: ['EMAIL','USERNAME','ROLE'],
          include: {
            model: Person,
            attributes: ['FIRST_NAME', 'LAST_NAME', 'TEL_NUMBER', 'ADDRESS']
          },
          include: {
            model: Department,
            attributes: ['DEPARTMENT_NAME']
          }
        },
        {
          model: BillDetail,
          include: [
            {
              model: ServicesType,
              attributes: ['TYPE', 'PRICE', 'DISCOUNT'],
              include: {
                model: Clothe,
                attributes: ['CLOTHE_TYPE']
              },
            },{
              model: Department
            }
          ]
        },
        
      ]
          // { all: true, nested: true }
        // include: [{model: BillDetail, include: ServiceType}]
    })

    if (!bills) {
      return res.status(400).json({
        ok: false,
        message: "upps! Something goes wrong",
      })
    }
    res.status(200).json({
      ok: true,
      data: bills
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something goes wrong",

    });

  }
}


export async function createBill(req, res) {
  let {
    customer,
    date_deliver,
    sub_total,
    discount,
    itbis,
    billDetail,
  } = req.body;
  let { user } = req
  date_deliver = Date.parse(date_deliver);
  const transaction = await sequelize.transaction();
  if(!Array.isArray(billDetail) || billDetail.length <= 0){
    return res.status(400).json({
      ok: false,
      message: "UUpppss! Something went wrong"
    })
  }

  try {
    let newBill = await Bill.create({
      CUSTOMER: customer,
      DATE_DELIVER: date_deliver,
      SUB_TOTAL: sub_total,
      DISCOUNT: discount,
      ITBIS: itbis,
      employee: user.ID_USER
    }, { transaction });

    // await newBill.save();
    let Details = [];

    for (let i = 0; i < billDetail.length; i++) {
      console.log(newBill.dataValues.ID_BILL);
      try {

        let newBillDetail = await BillDetail.create({
          ID_BILL: newBill.dataValues.ID_BILL,
          ID_SERVICE_TYPE: billDetail[i].id_service_type,
          SERVICE_TYPE_PRICE: billDetail[i].service_type_price,
          ID_CLOTHE_TYPE: billDetail[i].id_clothe_type,
          CURRENT_DEPT: billDetail[i].current_dept,
          LAST_UPDATE: billDetail[i].last_update,
          PROCESSING_TIME: billDetail[i].processing_time,
        },{transaction});

        Details.push(newBillDetail.dataValues);
        console.log(Details);
      } catch (error) {
        
        await transaction.rollback();
        console.log(error);
        return res.status(400).json({
          ok: false,
          message: "UUpppss! Something went wrong in detail"
        })

      }
    };
      
    // }
    // billDetail.forEach(async (element) => {
    //   try {

    //     let newBillDetail = await BillDetail.create({
    //       ID_BILL: newBill.dataValues.ID_BILL,
    //       ID_SERVICE_TYPE: element.id_service_type,
    //       SERVICE_TYPE_PRICE: element.service_type_price,
    //       ID_CLOTHE_TYPE: element.id_clothe_type,
    //       CURRENT_DEPT: element.current_dept,
    //       LAST_UPDATE: element.last_update,
    //       PROCESSING_TIME: element.processing_time,
    //     });

    //     Details.push(newBillDetail.dataValues);
    //     return Details;
    //   } catch (error) {
        
    //     await transaction.rollback();

    //     return res.status(400).json({
    //       ok: false,
    //       message: "UUpppss! Something went wrong in detail"
    //     })

    //   }
      
    // });
    await transaction.commit();
    
      
    if (!newBill) {
      return res.status(400).json({
        ok: false,
        message: "UUpppss! Something went wrong in bill"
      });
    }
    return res.status(200).json({
      ok: true,
      data: {
        billHead: newBill,
        billBody: Details,
      }
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something went wrong"
    })
  }




}

export async function getAllBill(req, res) {
  try {
    let bills = await Bill.findAll({
      include: [
        {
          model: User,
          as: 'cliente',
          attributes: ['EMAIL','USERNAME',],
          include: {
            model: Person,
            attributes: ['FIRST_NAME', 'LAST_NAME', 'TEL_NUMBER', 'ADDRESS']
          }
        },
        {
          model: User,
          as: 'trabajador',
          attributes: ['EMAIL','USERNAME','ROLE'],
          include: {
            model: Person,
            attributes: ['FIRST_NAME', 'LAST_NAME', 'TEL_NUMBER', 'ADDRESS']
          },
          include: {
            model: Department,
            attributes: ['DEPARTMENT_NAME']
          }
        },
        {
          model: BillDetail,
          include: [
            {
              model: ServicesType,
              attributes: ['TYPE', 'PRICE', 'DISCOUNT'],
              include: {
                model: Clothe,
                attributes: ['CLOTHE_TYPE']
              },
            }
          ]
        },
        
      ]
    });
    if (!bills) {
      return res.status(400).json({
        ok: false,
        message: "upps! Something goes wrong",
      })
    }
    res.status(200).json({
      ok: true,
      data: bills
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something goes wrong",

    });

  }
}

export async function getOneBill(req, res) {
  let { id_bill } = req.params;

  try {

    let oneBill = await Bill.findOne({
      where: {
        ID_BILL: id_bill
      },

      include: [
        {
          model: User,
          as: 'cliente',
          attributes: ['EMAIL','USERNAME',],
          include: {
            model: Person,
            attributes: ['FIRST_NAME', 'LAST_NAME', 'TEL_NUMBER', 'ADDRESS']
          }
        },
        {
          model: User,
          as: 'trabajador',
          attributes: ['EMAIL','USERNAME','ROLE'],
          include: {
            model: Person,
            attributes: ['FIRST_NAME', 'LAST_NAME', 'TEL_NUMBER', 'ADDRESS']
          },
          include: {
            model: Department,
            attributes: ['DEPARTMENT_NAME']
          }
        },
        {
          model: BillDetail,
          include: [
            {
              model: ServicesType,
              attributes: ['TYPE', 'PRICE', 'DISCOUNT'],
              include: {
                model: Clothe,
                attributes: ['CLOTHE_TYPE']
              },
            }
          ]
        },
        
      ],
    });
    if (!oneBill) {
      return res.status(400).json({
        ok: false,
        message: "upps! Something goes wrong",
      })
    }
    res.status(200).json({
      ok: true,
      data: oneBill
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something goes wrong",

    });

  }
}


export async function upDateBill(req, res) {
  let { id_bill } = req.params;
  let { 
    active
  } = req.body;
  
  try {
    let updatedBill = await Bill.update({
      active
    }, {
      returning: true,
      where: {
        ID_BILL: id_bill
      }
    });

    if (!updatedBill) {
      return res.status(400).json({
        ok: false,
        message: "UUpppss! Something goes wrong"
      })
    }
    return res.status(200).json({
      ok: true,
      data: updatedBill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something goes wrong"
    });
  }
}

export async function deleteBill(req, res) {
  let { id_bill } = req.params;
  try {
    let desCampo = await Bill.update({
      active: false,

    }, {
      returning: true,
      where: {
        ID_BILL: id_bill
      }
    });

    if (!desCampo) {
      return res.status(400).json({
        ok: false,
        message: "UUpppss! Something goes wrong"
      })
    }
    return res.status(200).json({
      ok: true,
      data: desCampo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something goes wrong"
    });
  };
};
