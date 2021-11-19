import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import { sesConfig } from '../../config';

const ses = new AWS.SES({ region: sesConfig.region });

const sendEmailToUser = async (emailObj) => {
  const transporter = nodemailer.createTransport({
    SES: ses
  });
  return transporter.sendMail({
    from: `Magic Admin <${sesConfig.senderEmail}>`,
    ...emailObj
  });
};

export default sendEmailToUser;
