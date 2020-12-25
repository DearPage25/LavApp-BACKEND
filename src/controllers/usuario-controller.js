import User from '../models/user-model';

export async function createUser (req, res) {
    const{id_user,email, username, password, is_employee, verified, is_admin, id_person, id_department } = req.body;
    try {
        let newUser =  await  User.create({
            // id_user,
            email, 
            username, 
            password, 
            is_employee, 
            verified, 
            is_admin, 
            // id_person, 
            // id_department
            
        });//TODO
        if(newUser){
            return res.status(200).json({
                ok: true,
                data: newUser
            });
        };
    } catch (error) {
        res.status(500).json({
            ok: false, 
            message: "Oh Oooohhh!!! Something goes wrong"
        });
        console.log('Error: ', error);
    }
}

export async function getAllUser( req, res ) {
    const users = await User.findAll();

    try {
        if (!users) {
            return res.status(400).json({
                ok: false,
                message: "Oh! Ohhh!! Something goes wrong!"
            })
        }
        res.status(200).json({
            ok: true,
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Uuppssss!! Something goes wrong!"
        });
    }
}
