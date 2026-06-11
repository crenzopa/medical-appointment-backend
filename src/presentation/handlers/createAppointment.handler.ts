import { lambdaInterceptor } from "../../shared/utils/lambdaInterceptor";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SNSClient } from "@aws-sdk/client-sns";
import { DynamoAppointmentRepository } from "../../infrastructure/dynamodb/DynamoAppointmentRepository";
import { CreateAppointmentUseCase } from "../../application/use-cases/CreateAppointmentUseCase";

export const handler = lambdaInterceptor(async (event: any) => {
  const sns = new SNSClient({});
  const dynamo = new DynamoDBClient({});

  const repo = new DynamoAppointmentRepository(dynamo);

  const useCase = new CreateAppointmentUseCase(
    repo,
    sns,
    process.env.SNS_TOPIC_ARN as string
  );

  const body = JSON.parse(event.body);

  const result = await useCase.execute(body);

  return result;
});