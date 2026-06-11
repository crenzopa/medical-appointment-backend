import { Appointment } from "../../domain/entities/Appointment";

export interface AppointmentStrategy {
  process(appointment: Appointment): Promise<void>;
}