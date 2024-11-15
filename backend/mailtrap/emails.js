import { mailtrapClient, sender } from "../mailtrap/mailTrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "verificationCode",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", res);
  } catch (error) {
    console.log(`Error sendig verification`, error);
    throw new Error(`Error seding verification email ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "4474adf9-7913-4c8c-a190-9ce07cb23856",
      template_variables: {
        name: name,
        company_info_name: "V A U L T I F Y",
      },
    });

    console.log("Welcome Email sent successfully", res);
  } catch (error) {
    console.error("Error sending welcome Email", error);
    throw new Error(`Error sending welcome email ${error}`);
  }
};
