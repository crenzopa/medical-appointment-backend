import { AppointmentStrategy } from "./AppointmentStrategy";
import { Appointment } from "../../domain/entities/Appointment";

export class PEAppointmentStrategy implements AppointmentStrategy {
  async process(appointment: Appointment): Promise<void> {
    console.log("Processing PERU appointment logic");

    console.log({
      country: "PE",
      appointmentId: appointment.appointmentId
    });
  }
}