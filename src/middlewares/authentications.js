//TODO: FALTA CREAR Y COLOCAR LA AUTORIZACION DEL ADMIN A LAS RUTAS.


import jwt from 'jsonwebtoken';


//Verificar el token

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        
        if ( err ) {
            return res.status(401).json({
                ok: false,
                err:{
                    token: "Token no válido"
                }
            });
        } 

        req.user = decoded.user;
        
        next();
    });
}


module.exports = {
    verificaToken
}