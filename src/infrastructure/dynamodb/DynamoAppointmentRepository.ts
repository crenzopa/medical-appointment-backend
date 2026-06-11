import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { AppointmentRepository } from "../../domain/repositories/AppointmentRepository";
import { Appointment } from "../../domain/entities/Appointment";


export class DynamoAppointmentRepository implements AppointmentRepository {
  private docClient: DynamoDBDocumentClient;
  private tableName = process.env.DYNAMODB_TABLE!;

  constructor(client: DynamoDBClient) {
    this.docClient = DynamoDBDocumentClient.from(client);
  }

  async save(appointment: Appointment): Promise<void> {
    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: appointment
      })
    );
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
  const result = await this.docClient.send(
    new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: "insuredId = :insuredId",
      ExpressionAttributeValues: {
        ":insuredId": insuredId
      }
    })
  );

  return (result.Items || []) as Appointment[];
}

  async update(appointment: Appointment): Promise<void> {
    await this.save(appointment);
  }
}