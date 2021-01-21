import Person from "../models/person-model";

export async function getOnePerson(req, res) {
  const { id_person } = req.params;
  try {
    const onePerson = await Person.findOne({
      where: {
        ID_PERSON: id_person,
      },
    });

    if (!onePerson) {
      res.status(400).json({
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
    res.status(500).json({
      ok: false,
      message: "Uuppssss!! Something goes wrong!",
    });
  }
}

export async function getAllPerson(req, res) {
  const persons = await Person.findAll();

  try {
    if (!persons) {
      return res.status(400).json({
        ok: false,
        message: "Oh! Ohhh!! Something goes wrong!",
      });
    }
    res.status(200).json({
      ok: true,
      data: persons,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Uuppssss!! Something goes wrong!",
    });
  }
}

export async function createPerson(req, res) {
  const { first_name, last_name, birth_date, tel_number, address } = req.body;

  try {
    let newPerson = await Person.create({
      FIRST_NAME: first_name,
      LAST_NAME: last_name,
      BIRTH_DATE: birth_date,
      TEL_NUMBER: tel_number,
      ADDRESS: address,
    });

    await newPerson.save();

    if (newPerson) {
      return res.status(200).json({
        ok: true,
        data: newPerson,
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

export async function updatePerson(req, res) {
  const { id_person } = req.params;
  const { first_name, last_name, birth_date, tel_number, address } = req.body;
  try {
    await Person.findOne({
      where: {
        ID_PERSON: id_person,
      },
    });

    const updatedPerson = await Person.update(
      {
        FIRST_NAME: first_name,
        LAST_NAME: last_name,
        BIRTH_DATE: birth_date,
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

    res.status(200).json({
      ok: true,
      message: "Person Updated",
      data: updatedPerson,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh oh!! Person not updated",
    });
  }
}
