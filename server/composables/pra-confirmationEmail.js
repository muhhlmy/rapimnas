const fs = require("fs");
const path = require("path");
const { transporter } = require("../config/nodemailer");

async function sendEmailConfirmationPra(name, email, institution, code_number) {
    try {
        const templatePath = path.join(
            __dirname,
            "..",
            "templates",
            "pra-confirmation.html"
        );
        let htmlContent = fs.readFileSync(templatePath, "utf8");
        htmlContent = htmlContent.replace("[Nama Pendaftar]", name);
        htmlContent = htmlContent.replace("[Kode Pendaftaran]", code_number);
        htmlContent = htmlContent.replace("[Nama Organisasi]", institution);

        var mailOptions = {
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
            to: email,
            subject: `Konfirmasi Pendaftaran RAPIMNAS 2025`,
            html: htmlContent,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error, "<<<<ini error nodemailer");
                throw { name: "EmailNotSent" };
            } else {
                console.log("Email sent: " + info.response);
                throw { name: "EmailSent" };
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendEmailConfirmationPra };
