import * as aws from "@pulumi/aws";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("first-bucket", {
  bucket: "first-bucket",
  tags: {
    IAC: "true",
  },
});

// Export the name of the bucket
export const bucketId = bucket.id;
export const bucketArn = bucket.arn;
export const bucketName = bucket.bucket;

// Novo recurso

const ecr = new aws.ecr.Repository("first-ecr", {
  name: "first-ecr",
  imageTagMutability: "IMMUTABLE",
  tags: {
    IAC: "true",
  },
});

export const ecrName = ecr.name;
export const ecrRepositoryUrl = ecr.repositoryUrl;
