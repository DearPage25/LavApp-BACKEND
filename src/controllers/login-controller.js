import User from '../models/user-model';
import bcrypt from 'bcrypt';
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';

export async function Login(req, res) {
    let { email, password } = req.body;
    try {
        const loginUser = await User.findOne({
            where: {
                [Op.or]: [{ EMAIL: email }, { USERNAME: email }],
            }
        });
        if (!loginUser) {
            res.status(400).json({
                ok: false,
                message: "Ups! Email or Password wrong!",
            });
        }

        if (!bcrypt.compareSync(password, loginUser.PASSWORD)) {
            res.status(400).json({
                ok: false,
                message: "Ups! Email or Password wrong!",
            });
        }
        let token = jwt.sign({
            user: loginUser
        }, process.env.SEED, { expiresIn: process.env.TOKEN_EXP })
        res.json({
            ok: true,
            user: loginUser,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Oh Oooh! Something went wrong!",
        });
    }



}