import { lambdaInterceptor } from "../../shared/utils/lambdaInterceptor";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoAppointmentRepository } from "../../infrastructure/dynamodb/DynamoAppointmentRepository";
import { GetAppointmentsByInsuredIdUseCase } from "../../application/use-cases/GetAppointmentsByInsuredIdUseCase";

export const handler = lambdaInterceptor(async (event: any) => {
  const insuredId = event.pathParameters?.insuredId;

  if (!insuredId) {
    throw new Error("insuredId is required");
  }

  const dynamo = new DynamoDBClient({});

  const repo = new DynamoAppointmentRepository(
    dynamo,
    process.env.DYNAMODB_TABLE as string
  );

  const useCase = new GetAppointmentsByInsuredIdUseCase(repo);

  const result = await useCase.execute(insuredId);

  return {
    message: "Appointments retrieved successfully",
    data: result
  };
});