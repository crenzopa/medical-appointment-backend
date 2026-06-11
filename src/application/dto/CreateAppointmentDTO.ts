import { CountryISO } from "../../domain/enums/CountryISO";

export interface CreateAppointmentDTO {
  insuredId: string;
  scheduleId: number;
  countryISO: CountryISO;
}