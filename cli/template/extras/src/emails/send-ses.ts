import type { SendEmailCommandInput } from "@aws-sdk/client-ses";
import { SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/components";
import React from "react";

const ses = new SES({ region: process.env.AWS_SES_REGION });

interface SendMailParams {
  to: string[];
  subject: string;
  emailHtml: string;
}

export const sendMail = async ({
  to,
  emailHtml,
  subject,
}: SendMailParams): Promise<void> => {
  try {
    const params: SendEmailCommandInput = {
      Source: "you@example.com",
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailHtml,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };

    await ses.sendEmail(params);

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
