import BillDetail from '../models/bill-detail-model';



export async function getBillMain(req, res) {
    let { id_bybill } = req.params;
    try {
        let bills = await BillDetail.findAll({
            where: {
                ID_BILL: id_bybill
            }
        });
        if (!bills) {
            return res.status(400).json({
                ok: false,
                message: "Uuppssss!! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: bills,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh! Ohhh!! Something goes wrong!",
        });
    }
}
export async function createBillDetail(req, res) {
    let { id_bill,
        id_service_type,
        service_type_price,
        id_clothe_type,
        current_dept,
        last_update,
        processing_time
    } = req.body;

    last_update = new Date(last_update);
    processing_time = new Date(processing_time);
    try {
        let newBillD = await BillDetail.create({
            ID_BILL: id_bill,
            ID_SERVICE_TYPE: id_service_type,
            SERVICE_TYPE_PRICE: service_type_price,
            ID_CLOTHE_TYPE: id_clothe_type,
            CURRENT_DEPT: current_dept,
            LAST_UPDATE: last_update,
            PROCESSING_TIME: processing_time
        });
        await newBillD.save();
        if (!newBillD) {
            return res.status(400).json({
                ok: false,
                message: "UUpppss! Something goes wrong"
            })
        }
        return res.status(200).json({
            ok: true,
            data: newBillD,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh Oooooooohhhh!!! Something goes wrong"
        })
    }

}
export async function getAllBillDetail(req, res) {

    try {
        const billD = await BillDetail.findAll();
        if (!billD) {
            return res.status(400).json({
                ok: false,
                message: "Uuppssss!! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: billD,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh! Ohhh!! Something goes wrong!",
        });
    }
}
export async function getOneBillDetail(req, res) {
    let { id_billdetail } = req.params;
    try {
        let BillD = await BillDetail.findOne({
            where: {
                ID_BILL_DETAIL: id_billdetail,
            },
        });

        if (!BillD) {
            return res.status(400).json({
                ok: false,
                message: "Ups! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: BillD,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Uuppssss!! Something goes wrong!",
        });
    }
}
export async function updateBillDetail(req, res) {
    let { id_billdetail } = req.params;
    let { id_bill,
        id_service_type,
        service_type_price,
        id_clothe_type,
        current_dept,
        last_update,
        processing_time
    } = req.body;

    last_update = new Date(last_update);
    processing_time = new Date(processing_time);
    try {
        let BillD = await BillDetail.update({
            ID_BILL: id_bill,
            ID_SERVICE_TYPE: id_service_type,
            SERVICE_TYPE_PRICE: service_type_price,
            ID_CLOTHE_TYPE: id_clothe_type,
            CURRENT_DEPT: current_dept,
            LAST_UPDATE: last_update,
            PROCESSING_TIME: processing_time
        }, {
            returning: true,
            where: {
                ID_BILL_DETAIL: id_billdetail

            }
        });
        if (!BillD) {
            return res.status(400).json({
                ok: false,
                message: "Ups! Something goes wrong",
            });
        }

        res.status(200).json({
            ok: true,
            data: BillD,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh Oooh!! User not updated",
        });
    }
}

export async function deleteBillDetail(req, res) {
    let { id_billdetail } = req.params;
    await BillDetail.update({

    }, {
        returning: true,
        where: {
            ID_BILL_DETAIL: id_billdetail

        }

    })

}