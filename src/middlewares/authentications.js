//TODO: FALTA CREAR Y COLOCAR LA AUTORIZACION DEL ADMIN A LAS RUTAS.


import jwt from 'jsonwebtoken';


//Verificar el token

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    token: "Token no válido"
                }
            });
        }

        req.user = decoded.user;

        next();
    });
}

let verificaRole = (req, res, next) => {
    let{role} = req.body;
    console.log(role);
    
    if (role === 'ADMIN'|| role === 'EMP' || role === 'SUP' || role === 'CLI') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: `The user ${role} don't have a role or the role is not right..`
            }
        })
    }
    
    
    // if (role != 'ADMIN' || role != 'EMP' || role != 'SUP') {
    //     return res.json({
    //         ok: false,
    //         err: {
    //             message: `The user ${role} don't have a role or the role is not right..`
    //         }
    //     })
    // } else {
    //     next();
    // }
}


module.exports = {
    verificaToken,
    verificaRole
}