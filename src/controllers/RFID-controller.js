import Rfid from '../models/RFID-model';

export async function createRFID(req, res) {
    let { date, id_current_detp, is_active, id_bill_detail, time } = req.body;
    
    try {
        let newRFID = await Rfid.create({
            DATE: date,
            ID_CURRENT_DETP: id_current_detp,
            IS_ACTIVE: is_active,
            ID_BILL_DETAIL: id_bill_detail,
            TIME: time
        });

        await newRFID.save();

        if (!newRFID) {
            return res.status(200).json({
                ok: true,
                data: newRFID,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Oh Oooooohh!!! Something goes wrong",
        });
        console.log("Error: ", error);
    }
}
export async function getAllRFID(req, res) {
    try {
        const rfid = await Rfid.findAll();
        if (!rfid) {
            return res.status(400).json({
                ok: false,
                message: "Uuppssss!! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: rfid,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh! Ohhh!! Something goes wrong!",
        });
    }
}
export async function getOneRFID(req, res) {
    let { id_rfid } = req.params;
    try {
        let rfid = await Rfid.findOne({
            where: {
                ID_RFID: id_rfid,
            },
        });

        if (!rfid) {
            return res.status(400).json({
                ok: false,
                message: "Ups! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: rfid,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh OOOhhh!! Something goes wrong!",
        });
    }
}
export async function updatedRFID(req, res) {
    let { id_rfid } = req.params;
    try {
        let rfid = await Rfid.update({
            DATE: date,
            ID_CURRENT_DETP: id_current_detp,
            IS_ACTIVE: is_active,
            ID_BILL_DETAIL: id_bill_detail,
            TIME: time
        }, {
            returning: true,
            where: {
                ID_RFID: id_rfid
            }
        });
        if (!rfid) {
            return res.status(400).json({
                ok: false,
                message: "Ups! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: rfid,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh OOOhhh!! Something goes wrong!",
        });
    }
}

export async function deletedRfid(req, res) {

    let { id_rfid } = req.params;
    try {
        let rfid = await Rfid.update({
          active: false
        }, {
            returning: true,
            where: {
                ID_RFID: id_rfid
            }
        });
        if (!rfid) {
            return res.status(400).json({
                ok: false,
                message: "Ups! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: rfid,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh OOOhhh!! Something goes wrong!",
        });
    }
}
