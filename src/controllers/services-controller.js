import Service from '../models/services-model';



export async function createServices(req, res) {
    let { id_service, service, description } = req.body;

    try {
        let newServices = await Service.create({
            ID_SERVICE: id_service,
            SERVICE: service,
            DESCRIPTION: description
        });

        if (!newServices) {
            return res.status(400).json({
                ok: false,
                message: "Uupps! Service don't create"
            });
        }
        return res.status(200).json({
            ok: true,
            data: newServices
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh Ooohh! Something goes wrong!"
        })
    }
}

export async function getAllServices(req, res) {

    let findAllServices = await Service.findAll();

    if (!findAllServices) {
        return res.status(400).json({
            ok: false,
            message: "Uupps! Service don't found"
        });
    }
    return res.status(200).json({
        ok: true,
        data: findAllServices
    });

}

export async function getOneService(req, res) {
    let { id_service } = req.params;
    try {
        let oneService = await Service.findOne({
            where: {
                ID_SERVICE: id_service
            }
        });
        if (!oneService) {
            return res.status(400).json({
                ok: false,
                message: "Uupps! Service not found"
            });
        }
        return res.status(200).json({
            ok: true,
            data: oneService
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Oh Ooohh! Something goes wrong!"
        })
    }


}

export async function updateService(req, res) {
    const { id_service } = req.params;
    let { id_s, service, description } = req.body;

    let checkId = await Service.findOne({
        where: {
            ID_SERVICE: id_s
        }
    });

    if (checkId) {
        return res.status(500).json({
            ok: false,
            message: 'Wow! Somethig goes wrong!'
        })
    }

    try {
        let serviceUpdated = await Service.update(
            {
                ID_SERVICE: id_s,
                SERVICE: service,
                DESCRIPTION: description
            },
            {
                returning: true,
                where: {
                    ID_SERVICE: id_service,
                },
            }
        );

        if (!serviceUpdated) {
            return res.status(400).json({
                ok: false,
                message: "Uups! Something goes wrong!"
            });
        }
        res.status(200).json({
            ok: true,
            data: serviceUpdated
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Oh ooohhh! Somethig goes wrong!'
        })
        console.log(error);
    }
}

export async function deleteService(req, res) {
    const { id_service } = req.params
    try {
        let destroyServie = await Service.update({
            active: false,
        },{
            returning: true,
            where: {
                ID_SERVICE: id_service,
            },
        });

        if (!destroyServie) {
            return res.status(400).json({
                ok: false,
                message: "Uups! Something goes wrong!"
            });
        }
        res.status(200).json({
            ok: true,
            data: destroyServie
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Oh ooohhh! Somethig goes wrong!'
        })
    }


}