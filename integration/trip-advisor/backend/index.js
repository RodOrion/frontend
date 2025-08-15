/** server **/
const express = require("express")
const app = express()
app.use(express.json())
/** cors : requêtes server **/
const cors = require("cors")
app.use(cors())
/** env **/
require("dotenv").config();
/** mailersend **/
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
// Config mailersend
const mailserSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});
const sentFrom = new Sender(`you@${process.env.MAILERSEND_DOMAIN}`, "Rodolphe");

/** API **/
app.get("/", (req, res) => {
  return res.status(200).json("bienvenue sur mon serveur");
});

app.post("/send_mail", async (req,res) => {
    try {
        console.log(req.body);
        const { firstname, lastname, email, message } = req.body;
        
        // créer les information du receveur
        const recipient = [new Recipient(email, `${firstname} ${lastname}`)];
    
        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipient)
            .setReplyTo(sentFrom)
            .setSubject("ceci est l'objet du mail")
            .setHtml(firstname + "<strong>" + message + "</strong>")
            .setText(firstname + message);
    
        const result = await mailserSend.email.send(emailParams);
    
        console.log("result", result);
    
        return res.status(200).json(result);
        
    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
})

app.listen(process.env.PORT, () => {
  console.log("server started");
});