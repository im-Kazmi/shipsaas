import { render } from "@react-email/components";
import postmark from "postmark";
import { ReactElement } from "react";

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY!);

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
      From: "you@example.com",
      To: to,
      Subject: subject,
      HtmlBody: emailHtml,
    };

    // Send the email
    await client.sendEmail(options);
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
