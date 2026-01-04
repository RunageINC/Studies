import * as aws from "@pulumi/aws";

// Create an AWS resource (S3 Bucket)
const firstBucket = new aws.s3.Bucket("first-bucket", {
  bucket: "first-bucket",
  tags: {
    IAC: "true",
  },
});

// Novo recurso
const ecr = new aws.ecr.Repository("first-ecr", {
  name: "first-ecr",
  imageTagMutability: "IMMUTABLE",
  tags: {
    IAC: "true",
  },
});

const secondBucket = new aws.s3.BucketV2("second-bucket", {
  bucket: "second-bucket",
  tags: {
    IAC: "true",
  },
});

// Export the name of the bucket
export const firstBucketId = firstBucket.id;
export const firstBucketArn = firstBucket.arn;
export const firstBucketName = firstBucket.bucket;

export const ecrName = ecr.name;
export const ecrRepositoryUrl = ecr.repositoryUrl;

export const secondBucketId = secondBucket.id;
export const secondBucketArn = secondBucket.arn;
export const secondBucketName = secondBucket.bucket;
