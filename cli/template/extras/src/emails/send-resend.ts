import { render } from "@react-email/components";
import { ReactElement } from "react";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

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
    await resend.emails.send({
      from: "you@example.com",
      to: to,
      subject: subject,
      html: emailHtml,
    });
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
