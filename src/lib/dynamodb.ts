import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export function getDynamoClient() {
  const client = new DynamoDBClient({ region: "eu-west-1" });
  return DynamoDBDocumentClient.from(client);
}
