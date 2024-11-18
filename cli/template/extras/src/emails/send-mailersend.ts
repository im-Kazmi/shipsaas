import { render } from "@react-email/components";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

interface SendMailParams {
  toEmail: string;
  toName: string;
  subject: string;
  emailHtml: string;
}

export const sendMail = async ({
  toEmail,
  toName,
  emailHtml,
  subject,
}: SendMailParams): Promise<void> => {
  try {
    // Define sender and recipient details
    const sentFrom = new Sender("you@yourdomain.com", "Your Name");
    const recipients = [new Recipient(toEmail, toName)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(emailHtml);

    // Send the email
    await mailerSend.email.send(emailParams);
    console.log(`Email sent to ${toEmail}`);
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
  toEmail: "someone@example.com",
  toName: "someone",
  emailHtml,
});

*/
