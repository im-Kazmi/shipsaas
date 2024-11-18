import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { ReactElement } from "react";

export const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASSWORD,
  },
});

interface SendMailParams {
  to: string;
  subject: string;
  emailHtml: string;
}

export const sendMail = async ({
  to,
  emailHtml,
  subject,
}: SendMailParams): Promise<void> => {
  try {
    const options = {
      from: "you@example.com",
      to: to,
      subject: subject,
      html: emailHtml,
    };
    // Send the email
    await transporter.sendMail(options);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// you can send emails like this in either server or client components

// Email({ url: "blablabla" }) is a react component with takes url as a prop

/*
const emailHtml = await render(Email({ url: "blablabla" }));

sendMail({
  subject: "hey there.",
  to: "someone@example.com",
  emailHtml,
});

*/
