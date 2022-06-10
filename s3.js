/* eslint-disable require-jsdoc */
require('dotenv').config();
const SThree = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const awsRegion = process.env.AWS_BUCKET_REGION;
const akid = process.env.AWS_ACCESS_KEY;
const sak = process.env.AWS_SECRET_KEY;

const newS3 = new SThree();

newS3.config.update({
  region: awsRegion,
  apiVersion: 'latest',
  credentials: {
    accessKeyId: akid,
    secretAccessKey: sak,
  },
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return newS3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

// downloads a file from s3

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return newS3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;
