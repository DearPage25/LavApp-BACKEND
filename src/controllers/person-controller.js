import Person from '../models/person-model';



export async function getOnePerson(req, res) {
    const { ID_PERSON } = req.params;
    try {
        const onePerson = await Person.findOne({
            where: {
                ID_PERSON
            }
        });
    
        res.status(200).json({
           data: onePerson
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Uuppssss!! Something goes wrong!"
        });
    }
}

export async function getAllPerson(req, res) {
    const persons = await Person.findAll();

    try {
        if (!persons) {
            return res.status(400).json({
                ok: false,
                message: "Oh! Ohhh!! Something goes wrong!"
            })
        }
        res.status(200).json({
            ok: true,
            data: persons,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Uuppssss!! Something goes wrong!"
        });
    }
}

export async function createPerson(req, res) {
    const { FIRST_NAME, LAST_NAME, BIRTH_DATE, TEL_NUMBER, ADDRESS } = req.body;

    try {
        let newPerson = await Person.create({
            FIRST_NAME,
            LAST_NAME,
            BIRTH_DATE,
            TEL_NUMBER,
            ADDRESS
        });


        await newPerson.save();

        if (newPerson) {
            return res.status(200).json({
                ok: true,
                data: newPerson
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Oh Oooooohh!!! Something goes wrong"
        });
        console.log('Error: ', error);
    }


}

export async function updatePerson(req, res){

    const {ID_PERSON} = req.params
    const { FIRST_NAME, LAST_NAME, BIRTH_DATE, TEL_NUMBER, ADDRESS } = req.body;
    try {
        await Person.findOne({
            attributes: ['FIRST_NAME', 'LAST_NAME', 'BIRTH_DATE', 'TEL_NUMBER', 'ADDRESS'],
            where:{
                ID_PERSON
            }
        });
    
        const updatedPerson = await Person.update({
            FIRST_NAME, LAST_NAME, BIRTH_DATE, TEL_NUMBER, ADDRESS
        },{
            returning: true,
            where: {
                ID_PERSON
            }
        });
    
        res.status(200).json({
            ok:true,
            message: 'Person Updated',
            data: updatedPerson
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Oh oh!! Person not updated'
        })
    }

}





