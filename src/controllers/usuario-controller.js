import User from "../models/user-model";
import Person from "../models/person-model";

import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const {
    email,
    username,
    password,
    is_employee,
    verified,
    id_person,
    id_department,
    role
  } = req.body;
  try {
    const revisar  = await User.findOne({
      where : {
        ID_PERSON : id_person
      }
    });
    if(revisar){
      return res.status(400).json({
        ok: false,
        message:  "Ya existe un usuario asociado a ese id_person" ,
      });
    }

    let newUser = await User.create({
      // id_user,
      EMAIL: email,
      USERNAME: username,
      PASSWORD: bcrypt.hashSync(password, 10),
      IS_EMPLOYEE: is_employee,
      VERIFIED: verified,
      ID_PERSON: id_person,
      ID_DEPARTMENT: id_department,
      ROLE: role,
    }); 
    if (newUser) {
      return res.status(200).json({
        ok: true,
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Oh Oooohhh!!! Something goes wrong",
    });
    console.log("Error: ", error);
  }
}

export async function getOneUser(req, res) {
  const { id_user } = req.params;
  try {
    const oneUser = await User.findOne({
      where: {
        ID_USER: id_user,
      }
    });
    if(!oneUser){
        res.status(400).json({
            ok: false, 
            message: "Ups! Users not found!"
        })
    }
    res.status(200).json({
        ok: true,
        data: oneUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        message: "Oh Oooh! Something goes wrong!"
    })
  }
}

export async function getAllUser(req, res) {
  const users = await User.findAll({
    include: Person
  });

  try {
    if (!users) {
      return res.status(400).json({
        ok: false,
        message: "Oh! Ohhh!! Something goes wrong!",
      });
    }
    res.status(200).json({
      ok: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Uuppssss!! Something goes wrong!",
    });
  }
}

export async function updateUser(req, res) {
  const { id_user } = req.params;
  const {
    email,
    username,
    password,
    is_employee,
    verified,
    id_department,
    is_active,
    role
  } = req.body;

  try {

    if (password) {
      password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.update(
      {
        EMAIL: email,
        USERNAME: username,
        PASSWORD: password,
        IS_EMPLOYEE: is_employee,
        VERIFIED: verified,
        ID_DEPARTMENT: id_department,
        is_active,
        ROLE: role
      },
      {
        returning: true,
        where: {
          ID_USER: id_user,
        },
      }
    );

    if (!updatedUser) {
      res.status(400).json({
        ok: false,
        message: "Ups! Something goes wrong",
      });
    }

    res.status(200).json({
      ok: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooh!! User not updated",
    });
  }
}
