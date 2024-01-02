import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function sendMail({ to, from, subject, text, html }) {
  let info = await transporter.sendMail({
    from: `fileFlow <${from}>`,
    to,
    subject,
    text,
    html,
  });
}

export default sendMail;
