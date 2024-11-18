import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getDownloadUrl(objectName: string) {
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Use your S3 bucket name
      Key: objectName,
    }),
    { expiresIn: 3600 },
  );
}

export async function uploadFileToBucket(file: File, filename: string) {
  const Key = filename;
  const Bucket = process.env.AWS_S3_BUCKET_NAME; // Use your S3 bucket name

  let res;

  try {
    const parallelUploads = new Upload({
      client: s3Client,
      params: {
        Bucket,
        Key,
        Body: file.stream(),
        ACL: "public-read", // Be cautious when setting this ACL
        ContentType: file.type,
      },
      queueSize: 4,
      leavePartsOnError: false,
    });

    res = await parallelUploads.done();
  } catch (e) {
    throw e;
  }

  return res;
}

export async function getPresignedPostUrl(
  objectName: string,
  contentType: string,
) {
  return await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_S3_BUCKET_NAME!, // Use your S3 bucket name
    Key: objectName,
    Expires: 600, // 10 minutes
  });
}

export async function getFileUrl({ key }: { key: string }) {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 3600 },
  );
  return url;
}
