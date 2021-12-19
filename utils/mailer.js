const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporterDetails = smtpTransport({
    host: "falahmilad79@gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "falahmilad79@gmail.com",
        pass: "m12345",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

exports.sendEmail = (email, fullname, subject, message) => {
    const transporter = nodeMailer.createTransport(transporterDetails);
    transporter.sendMail({
        from: "falahmilad79@gmail.com",
        to: email,
        subject: subject,
        html: `<h1> سلام ${fullname}</h1>
            <p>${message}</p>`,
    });
};
