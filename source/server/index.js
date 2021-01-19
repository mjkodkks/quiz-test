require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const util = require('util')

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// db only
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// for test connection db only
connection.connect((err) => {
  if (err) throw err;
  console.log('DB Connected!');
});

connection.query = util.promisify(connection.query)

app.post('/saveProfile', async (req, res) => {
    // console.log(req.body);
    const { idCard, Name, dateOfBirth } = req.body
    console.log(idCard, Name, dateOfBirth)
    const payload = req.body
    const validate = validateInput(idCard, Name, dateOfBirth)
    if (validate.isPass) {

        const firstName = Name.split(" ")[0].trim()
        const lastName = Name.split(" ")[1].trim()

        const sqlSave = "INSERT INTO profile (firstName, lastname, birthday, age, idcard) VALUES ?";
        const insertValue = [[firstName, lastName, convertDate(dateOfBirth), findAge(dateOfBirth), idCard]]
        try {
            // save to db
            const result = await connection.query(sqlSave, [insertValue])
            console.log('record user success')

            // query from db
            const sqlQuery = `SELECT firstname,lastname,age FROM profile WHERE id = "${result.insertId}"` ;
            const allRow = await connection.query(sqlQuery)
            const row = allRow[0]
            const templateResponse = {
                FirstName: row.firstname,
                LastName: row.lastname,
                Age: row.age
            }
            res.json(templateResponse)

        } catch (err) {
            if (err) throw err;
        }
    } else {
        const errObj = { status: "error", errDetail: validate.messageErr}
        res.json(errObj)
    }
  })

  const validateInput = (idCard, name, dateOfBirth) => {
      const errCollection = []
      const templateErr = {
        isPass : true,
        messageErr : []
    }
        if (idCard.toString().length !== 13) {
            errCollection.push(`idCard must be 13 digits`)
        }
        if (name) {} else { 
            errCollection.push(`name must not be null`)
        } 
        if (findAge(dateOfBirth) < 18) {
            errCollection.push(`age must be 18 or above`)
        }
        if (errCollection.length > 0) {
            templateErr.isPass = false
            templateErr.messageErr = [...errCollection]
        } 
        console.log(templateErr)
        return templateErr
  }

  const findAge = (inputDate) => {
      const now = new Date().getFullYear()
      const birthDate = inputDate.split("/")[2]
      const age = (+now) - (+birthDate)
      return age
  }

  // 10/03/1900 -> 1900-03-10
  const convertDate = (inputDate) => {
      return inputDate.split("/").reverse().join("-")
  }


app.listen(9000, () => {
  console.log('Application is running on port 9000')
})
