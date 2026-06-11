import { AppointmentStrategy } from "./AppointmentStrategy";
import { Appointment } from "../../domain/entities/Appointment";

export class CLAppointmentStrategy implements AppointmentStrategy {
  async process(appointment: Appointment): Promise<void> {
    console.log("Processing CHILE appointment logic");

    console.log({
      country: "CL",
      appointmentId: appointment.appointmentId
    });
  }
}