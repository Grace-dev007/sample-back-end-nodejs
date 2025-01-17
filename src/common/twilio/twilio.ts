import Twilio from 'twilio';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });


const sendSms = async (Otpnumber: any) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = Twilio(accountSid, authToken);
  const serviceSid: any = process.env.TWILIO_SERVICE_ID;

  try {
    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: Otpnumber, channel: 'sms' });

    return verification;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const verifySms = async (number: any, code: any) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = Twilio(accountSid, authToken);
  const serviceSid: any = process.env.TWILIO_SERVICE_ID;
  try {
    const verification_check=  client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: number, code })
        return verification_check;
      
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { sendSms, verifySms };
