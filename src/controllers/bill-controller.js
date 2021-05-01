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



export async function createBill(req, res) {
  let { customer, current_date,
    date_deliver, sub_total, discount, itbis, employee,
  } = req.body;


  current_date = Date.parse(current_date);
  date_deliver = Date.parse(date_deliver);

  try {
    let newBill = await Bill.create({
      CUSTOMER: customer,
      CURRENT_DATE: current_date,
      DATE_DELIVER: date_deliver,
      SUB_TOTAL: sub_total,
      DISCOUNT: discount,
      ITBIS: itbis,
      employee
    });
    await newBill.save();
    if (!newBill) {
      return res.status(400).json({
        ok: false,
        message: "UUpppss! Something goes wrong"
      })
    }
    return res.status(200).json({
      ok: true,
      data: newBill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something goes wrong"
    })
  }




}

export async function getAllBill(req, res) {
  try {
    let bills = await Bill.findAll();
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
      }
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
  let { customer, current_date,
    date_deliver, sub_total, discount, itbis
  } = req.body;


  current_date = Date.parse(current_date);
  date_deliver = Date.parse(date_deliver);

  try {
    let updatedBill = await Bill.update({

      CUSTOMER: customer,
      CURRENT_DATE: current_date,
      DATE_DELIVER: date_deliver,
      SUB_TOTAL: sub_total,
      DISCOUNT: discount,
      ITBIS: itbis,
      employee
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
    })
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
