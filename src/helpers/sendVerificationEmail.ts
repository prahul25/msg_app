import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    /*const verificationCodeSent =*/ await resend.emails.send({
      from: "noreply@mysterymessage.site",
      to: email,
      subject: "MSG_APP | Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    // console.log(verificationCodeSent)
    return {
      success: true,
      message: "Successfully verification email sent",
      statusCode: 200,
    };
  } catch (error) {
    console.log("Error while sending verification email", error);
    return {
      success: false,
      message: "Failed to send verification email",
      statusCode: 400,
    };
  }
}
