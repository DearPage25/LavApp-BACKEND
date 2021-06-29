import Clothe from '../models/clothe-type-model';

export async function createClothe(req, res) {
    let { clothe_type,  } = req.body;
    try {
        let newClothe = await Clothe.create({
            CLOTHE_TYPE: clothe_type,
        });
        await newClothe.save();
        if (!newClothe) {
            return res.status(400).json({
                ok: false,
                message: "Uupppss! Somenthing goes wrong!"
            });
        }
        return res.status(200).json({
            ok: true,
            data: newClothe
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh Ooooh! Somenthing goes wrong!"
        });

    }

}

export async function getAllClothe(req, res) {

    try {
        let allClothe = await Clothe.findAll();
        if (!allClothe) {
            return res.status(400).json({
                ok: false,
                message: "Uuppssss!! Something goes wrong!",
            });
        }
        return res.status(200).json({
            ok: true,
            data: allClothe
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh! Ohhh!! Something goes wrong!",
        });
    }


}

export async function getOneClothe(req, res) {
    const { id_clothe_type } = req.params;
    try {
        let oneClothe = await Clothe.findOne({
            where: {
                ID_CLOTHE_TYPE: id_clothe_type
            }
        });

        if (!oneClothe) {
            return res.status(400).json({
                ok: false,
                message: "Uuppssss!! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: oneClothe,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh! Ohhh!! Something goes wrong!",
        });
    }
}

export async function updateClothe(req, res) {
    let { id_clothe_type } = req.params;
    let { clothe_type } = req.body;


    try {

        const updatedClothe = await Clothe.update(
            {
                CLOTHE_TYPE: clothe_type,
            },
            {
                returning: true,
                where: {
                    ID_CLOTHE_TYPE: id_clothe_type,
                },
            }
        );
        if (!updatedClothe) {
            return res.status(400).json({
                ok: false,
                message: "Uuppssss!! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: updatedClothe,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh oh!! Clothe not updated",
        });
    }
}

export async function deleteClothe(req, res) {
    let { id_clothe_type } = req.params;
    
    try {
        const deletedClothe = await Clothe.update({
            active: false
        },{
            returning: true,
            where: {
                ID_CLOTHE_TYPE: id_clothe_type,
            },
        }
        );
        if (!deletedClothe) {
            return res.status(400).json({
                ok: false,
                message: "Uuppssss!! Something goes wrong!",
            });
        }
        res.status(200).json({
            ok: true,
            data: deletedClothe,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh oh!! Clothe not updated",
        });
    }
}