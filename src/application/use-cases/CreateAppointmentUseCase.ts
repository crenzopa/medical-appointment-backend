import { v4 as uuid } from "uuid";
import { Appointment } from "../../domain/entities/Appointment";
import { AppointmentStatus } from "../../domain/enums/AppointmentStatus";
import { CreateAppointmentDTO } from "../dto/CreateAppointmentDTO";
import { AppointmentRepository } from "../../domain/repositories/AppointmentRepository";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

export class CreateAppointmentUseCase {
  constructor(
    private repository: AppointmentRepository,
    private snsClient: SNSClient,
    private topicArn: string
  ) {}

  async execute(data: CreateAppointmentDTO) {
    const now = new Date().toISOString();

    const appointment = new Appointment(
      uuid(),
      data.insuredId,
      data.scheduleId,
      data.countryISO,
      AppointmentStatus.PENDING,
      now,
      now
    );

    await this.repository.save(appointment);

    await this.snsClient.send(
      new PublishCommand({
        TopicArn: this.topicArn,
        Message: JSON.stringify(appointment),
        MessageAttributes: {
          countryISO: {
            DataType: "String",
            StringValue: data.countryISO
          }
        }
      })
    );

    return {
      message: "Appointment in process",
      appointmentId: appointment.appointmentId
    };
  }
}