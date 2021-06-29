import viewClotheServices from '../models/views_model/clothe_services.view';


export async function getClotheServicesView(req, res){
    try {
        let data = await viewClotheServices.findAll();
        if (!data) {
            return res.status(400).json({
                ok: false,
                message: "Uuppssss!! Something goes wrong!",
            });
        }
        return res.status(200).json({
            ok: true,
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh! Ohhh!! Something goes wrong!",
        });
    }
} 