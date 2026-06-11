import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const table = process.env.DYNAMODB_TABLE!;

export const handler = async (event: any) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const appointmentId = body.appointmentId;

    await dynamo.send(
      new UpdateCommand({
        TableName: table,
        Key: {
          appointmentId
        },
        UpdateExpression: "SET #s = :status",
        ExpressionAttributeNames: {
          "#s": "status"
        },
        ExpressionAttributeValues: {
          ":status": "COMPLETED"
        }
      })
    );
  }

  return { statusCode: 200 };
};