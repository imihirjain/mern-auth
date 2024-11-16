import { mailtrapClient, sender } from "../mailtrap/mailTrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
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

export const sendResetPasswordEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password Reset",
    });
  } catch (error) {
    console.error("Error sending reset password email", error);
    throw new Error(`Error sending reset password email ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset mail sent successfully", res);
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success email ${error}`);
  }
};
