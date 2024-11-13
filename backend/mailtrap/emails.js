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
