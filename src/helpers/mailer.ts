import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "24eee03512f324",
        pass: "19216c3b3f1986",
      },
    });

    const mailoptions = {
      from: "anjanprasad@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset your password",
      html: `<p> click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      <br/>
      or copy paste the below link 
      <br/>
     ${process.env.DOMAIN}/verifyemail?token=${hashedToken}

      </p>`,
    };

    const mailresponse = await transport.sendMail(mailoptions);
    return mailresponse;
  } catch (error: any) {
    console.log(error.message);
  }
};
