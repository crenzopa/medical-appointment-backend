import { AppointmentStatus } from "../enums/AppointmentStatus";
import { CountryISO } from "../enums/CountryISO";

export class Appointment {
  constructor(
    public readonly appointmentId: string,
    public readonly insuredId: string,
    public readonly scheduleId: number,
    public readonly countryISO: CountryISO,
    public status: AppointmentStatus,
    public readonly createdAt: string,
    public updatedAt: string
  ) {}
}