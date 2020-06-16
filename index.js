const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
let login = process.env.SMTP_LOGIN||"...";
let password = process.env.SMTP_PASSWORD||"...";

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: login, // generated ethereal user
        pass: password, // generated ethereal password
    },
});

app.post('/sendMessage', async (req, res) => {
    let {message, name, contact} = req.body;
    let info = await transporter.sendMail({
        from: "HR want me", // sender address
        to: "taniasilchenko212@gmail.com", // list of receivers
        subject: "Сообщение с Вашего портфолио", // Subject line
        html: `<div><div><b>Name:</b>${name}</div>
<b>message:</b>${message}
<div><b>contacts:</b>${contact}</div>
        </div>`, // html body
    });
    res.send("ok")
});

app.get('/', (req, res) => res.send('Hi!'));
let port = process.env.PORT||3010;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
