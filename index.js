const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
let login = process.env.SMTP_LOGIN||"...";
let password = process.env.SMTP_PASSWORD||"...";
// let port = process.env.PORT||3010;
let port = 3010;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    // service: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
        // type:"OAuth2",
        user: "taniasilchenko212@gmail.com", // generated ethereal user
        // accessToken:"ya29.a0AfH6SMDkjVwZEdSRd4Sh3WRPf3Q4N_umr99Un8FSRmzD9gSlhXsViga52spt2NTOpryy43TY_FU3sMB41fhtnwbDR3vvxvR2Ba3wxaGSM1dNvDY-ps3sJHPte2rabGypCfhb6JQ2C_ag-HqSXDqbby5ifsKVRCEBuik",
        // expires:1592570987208+60000,
        // refreshToken:"1//04p0AZ8i3e1kmCgYIARAAGAQSNwF-L9IrkY0BuCZzW1OQcneQ667kwAESpJFx9qaDujJ8UFn21vsCa11QuOdb7FTOux-6SdXUxMU",
        // clientId:"510027605535-t2irpct15gan47pcb5hkpq5uce0gtbkh.apps.googleusercontent.com",
        // clientSecret:"03iEMzRwIFnTflpu07DshyAR",
        // accessUrl:"https://oauth2.googleapis.com/token"
        pass: "2123238t", // generated ethereal password
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

app.get('/', (req, res) => res.send('Hi people!'));

// let port = "http://localhost:3010/";
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
