import fs from 'fs';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
import path from 'path';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const readJSONFile = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    return null;
  }
};

export const writeJSONFile = async (filePath: string, data: any[]) => {
  try {
    await fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing file:', error);
    return null;
  }
};

export const localtoUTCTime = (time: any) => {
  const kolkataTime = moment.tz(time, 'HH:mm:ss', 'Asia/Kolkata');
  const utcTime = kolkataTime.utc();
  const utctime = utcTime.format('HH:mm:ss');
  return utctime;
};

export const currentUTCTime = () => {
  return moment().utc().toDate();
};

export const afterUTCTime = (plan: any) => {
  return moment().utc().add(1, plan).toDate();
};

export const UTCtolocalTime = (utctime: any) => {
  const utcTime = moment.utc(utctime, 'HH:mm:ss');
  const time = utcTime.tz('Asia/Kolkata');

  return time.format('HH:mm:ss');
};




























export const getS3Parallel = async (fileKey: string): Promise<string> => {
  try {
    const s3 = new S3Client({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID || '',
        secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
      },
      useAccelerateEndpoint: false,
    });

    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME!,
      Key: fileKey,
    };

    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand(getObjectParams),
      { expiresIn: 432000 }, // 5 days in seconds
    );

    return signedUrl;
  } catch (error) {
    throw new Error('Failed to generate signed URL');
  }
};



