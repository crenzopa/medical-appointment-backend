import { lambdaInterceptor } from "../../shared/utils/lambdaInterceptor";
import { AppointmentStrategyFactory } from "../../application/factories/AppointmentStrategyFactory";
import { Appointment } from "../../domain/entities/Appointment";

export const handler = lambdaInterceptor(async (event: any, context: any, correlationId: string) => {
  console.log("PE HANDLER START");
  console.log("CorrelationId:", correlationId);

  for (const record of event.Records) {
    const appointment: Appointment = JSON.parse(record.body);

    console.log("Processing appointment:", {
      correlationId,
      appointmentId: appointment.appointmentId,
      countryISO: appointment.countryISO
    });

    const strategy = AppointmentStrategyFactory.getStrategy(
      appointment.countryISO
    );

    await strategy.process(appointment);
  }

  return {
    message: "Appointments processed successfully",
    processed: event.Records.length
  };
});