import Department from "../models/departament-models";

export async function createDepartment(req, res) {
  const { department_name, department_descr } = req.body;

  try {
    let newDepartment = await Department.create({
      DEPARTMENT_NAME: department_name,
      DEPARTMENT_DESCR: department_descr,
    });
    await newDepartment.save();
    if (!newDepartment) {
      return res.status(400).json({
        ok: false,
        message: "UUpppss! Something goes wrong"
      })
    }
    return res.status(200).json({
      ok: true,
      data: newDepartment,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something goes wrong"
    })
  }
}

export async function getAllDepartment(req, res) {

  try {
    let departments = await Department.findAll();
    if (!departments) {
      return res.status(400).json({
        ok: false,
        message: "upps! Something goes wrong",
      })
    }
    res.status(200).json({
      ok: true,
      data: departments
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Oh Oooooooohhhh!!! Something goes wrong",

    });

  }
}

export async function getOneDepartment(req, res) {
  const { id_department } = req.params;

  try {
    let oneDepartment = await Department.findOne({
      where: {
        ID_DEPARTMENT: id_department
      }
    });

    if (!oneDepartment) {
      return res.status(400).json({
        ok: false,
        message: "Uups! Department no found!"
      });
    }

    res.status(200).json({
      ok: true,
      data: oneDepartment
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Ohh Ohhh! something goes wrong"
    });
  }

}


export async function updateOneDepartment(req, res) {
  const { id_department } = req.params
  let { department_name, department_descr } = req.body;
  
  try {
    let departmentUpdated = await Department.update(
      {
        DEPARTMENT_NAME: department_name,
        DEPARTMENT_DESCR: department_descr,
      },
      {
        returning: true,
        where: {
          ID_DEPARTMENT: id_department,
        },
  
      }
    );
  
    if (!departmentUpdated) {
      return res.status(400).json({
        ok: false,
        message: 'Uups! Something goes wrong!'
      });
    }
  
    res.status(200).json({
      ok: true,
      data: departmentUpdated
    });
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message:'Ooh! oohh! Something goes wrong!'
    });    
  }
  
}


export async function DeleteOneDepartment(req, res) {

  let { id_department } = req.params;
  
  try {
    let deleteoneDepartment = await Department.update({
      active: false
    },{
      returning: true,
      where: {
        ID_DEPARTMENT: id_department,
      },

    });

    if (!deleteoneDepartment) {
      return res.status(400).json({
        ok: false,
        message: "Uups! Department no Deleted!"
      });
    }

    res.status(200).json({
      ok: true,
      data: deleteoneDepartment
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Ohh Ohhh! something goes wrong"
    });
  }


}