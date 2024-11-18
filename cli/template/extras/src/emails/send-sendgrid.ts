import { render } from "@react-email/components";
import sendgrid from "@sendgrid/mail";
import React from "react";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

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
      to: "user@gmail.com",
      subject: "hello world",
      html: emailHtml,
    };

    sendgrid.send(options);

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
