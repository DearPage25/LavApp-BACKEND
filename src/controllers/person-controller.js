
import Person from "../models/person-model";
import sequelize from '../database/database';
import User from '../models/user-model';
import bcrypt from "bcrypt";


export async function getOnePersonByTel(req, res) {
  const{tel_number} = req.params;
  
  try {
    const onePerson = await Person.findOne({
      where: {
        TEL_NUMBER: tel_number,
      },
      include: {
        model: User,
        atributes: []
      }
    });

    if (!onePerson) {
      return res.status(400).json({
        ok: false,
        message: "Ups! Something goes wrong!",
      });
    }
    res.status(200).json({
      ok: true,
      data: onePerson,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Uuppssss!! Something goes wrong!",
    });
  }


}

export async function getOnePerson(req, res) {
  const { id_person } = req.params;
  try {
    const onePerson = await Person.findOne({
      where: {
        ID_PERSON: id_person,
      },
      include: {
        model: User,
        atributes: []
      }
    });

    if (!onePerson) {
      return res.status(400).json({
        ok: false,
        message: "Ups! Something goes wrong!",
      });
    }
    res.status(200).json({
      ok: true,
      data: onePerson,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Uuppssss!! Something goes wrong!",
    });
  }
}

export async function getAllPerson(req, res) {

  try {
    const persons = await Person.findAll({
      include: User
    });
    if (!persons) {
      return res.status(400).json({
        ok: false,
        message: "Uuppssss!! Something goes wrong!",
      });
    }
    res.status(200).json({
      ok: true,
      data: persons,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Oh! Ohhh!! Something goes wrong!",
    });
  }
}

export async function createPerson(req, res) {
  const {
    first_name,
    last_name,
    birth_date,
    tel_number,
    address,
    USER,
  } = req.body;
  const transaction = await sequelize.transaction();
  try {
    let newPerson = await Person.create({
      FIRST_NAME: first_name,
      LAST_NAME: last_name,
      BIRTH_DATE: birth_date,
      TEL_NUMBER: tel_number,
      ADDRESS: address,
    }, { transaction });


    let newUser = await User.create({
      EMAIL: USER.email,
      USERNAME: USER.username,
      PASSWORD: bcrypt.hashSync(USER.password, 10),
      IS_EMPLOYEE: USER.is_employee,
      VERIFIED: USER.verified,
      ID_PERSON: newPerson.dataValues.ID_PERSON,
      ID_DEPARTMENT: USER.id_department,
      ROLE: USER.role,
    }, { transaction })

    await transaction.commit();

    if (!newPerson || !newUser) {
      return res.status(400).json({
        ok: false,
        message: "Uuppssss!! Something goes wrong!",
      });
    }
    res.status(200).json({
      ok: true,
      data: {

        dataPerson: newPerson,
        dataUser: newUser,
      }
    });

  } catch (error) {
    console.log("Error: ", error);
    await transaction.rollback();
    return res.status(500).json({
      ok: false,
      message: "Oh Oooooohh!!! Something goes wrong",
    });
  }
}


export async function updatePerson(req, res) {
  const { id_person } = req.params;

  let { 
    first_name, 
    last_name, 
    tel_number, 
    address,
    id_user,
    password, 
  } = req.body;
  
  if (password) {
    password = bcrypt.hashSync(password, 10);
  }
  try {

    const updatedPerson = await Person.update(
      {
        FIRST_NAME: first_name,
        LAST_NAME: last_name,
        TEL_NUMBER: tel_number,
        ADDRESS: address,
      },
      {
        returning: true,
        where: {
          ID_PERSON: id_person,
        },
      }
    );

    const updateUser = await User.update(
      {
        PASSWORD: password 
      },{
        returning: true,
        where:{
          ID_USER: id_user
        }
      }
    )

    if (!updatedPerson || !updateUser) {
      return res.status(400).json({
        ok: false,
        message: "Ups! Something went wrong!"
      });
    };


    res.status(200).json({
      ok: true,
      message: "Person Updated",
      data: updatedPerson[1][0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Oh oh!! Person or User not updated",
    });
  }
}
