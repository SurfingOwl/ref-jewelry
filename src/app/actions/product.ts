"use server";

import { PutCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoClient } from "@/lib/dynamodb";
import dayjs from "dayjs";

export async function createProduct({
  user,
  name,
  company,
  type,
  count,
  receptionDate,
  deliveryDate,
}: {
  user: string;
  name: string;
  company: string;
  type: string;
  count: number;
  receptionDate: string;
  deliveryDate: string;
}) {
  const ddb = getDynamoClient();

  try {
    const id = crypto.randomUUID();

    await ddb.send(
      new PutCommand({
        TableName: "Ref-Jewelry",
        Item: {
          user,
          id,
          name,
          company,
          type,
          count,
          receptionDate: dayjs(receptionDate).toISOString(),
          deliveryDate: dayjs(deliveryDate).toISOString(),
        },
      })
    );

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to create product" };
  }
}

export async function deleteProduct(user: string, id: string) {
  const ddb = getDynamoClient();

  try {
    await ddb.send(
      new DeleteCommand({
        TableName: "Ref-Jewelry",
        Key: {
          user,
          id,
        },
      })
    );

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function listProducts(user: string) {
  const ddb = getDynamoClient();
  
  try {
    const { Items } = await ddb.send(
      new QueryCommand({
        TableName: "Ref-Jewelry",
        KeyConditionExpression: "user = :email",
        ExpressionAttributeValues: {
          ":email": user,
        },
      })
    );

    return { success: true, data: Items };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to list products" };
  }
}
