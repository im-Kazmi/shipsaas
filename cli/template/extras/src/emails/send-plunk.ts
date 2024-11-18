import Plunk from "@plunk/node";
import { render } from "@react-email/components";

const plunk = new Plunk(process.env.PLUNK_API_KEY!);

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
    // Send the email
    plunk.emails.send({
      to: to,
      subject: subject,
      body: emailHtml,
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
