import { Table, Bucket } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
  // Create the DynamoDB table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string", // THe id of the user that the note belongs to
      noteId: "string", // the id of the note
    },
    // partitionKey and sortKey are kinds of primary key for DynamoDB
    // 1. partitionKey
    // 2. partitionKey + sortKey (composite)
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });

  // Create an S3 bucket
  const bucket = new Bucket(stack, "Uploads", {
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      },
    ],
  });

  return {
    table,
    bucket,
  };
}
