import { lambdaInterceptor } from "../../shared/utils/lambdaInterceptor";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoAppointmentRepository } from "../../infrastructure/dynamodb/DynamoAppointmentRepository";
import { GetAppointmentsByInsuredIdUseCase } from "../../application/use-cases/GetAppointmentsByInsuredIdUseCase";

const repo = new DynamoAppointmentRepository(new DynamoDBClient({}));

const useCase = new GetAppointmentsByInsuredIdUseCase(repo);

export const handler = lambdaInterceptor(async (event: any) => {
  const insuredId = event.pathParameters?.insuredId;

  if (!insuredId) {
    throw new Error("insuredId is required");
  }

  const result = await useCase.execute(insuredId);

  return {
    message: "Appointments retrieved successfully",
    data: result
  };
});