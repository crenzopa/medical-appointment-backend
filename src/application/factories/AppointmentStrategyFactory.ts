import { CountryISO } from "../../domain/enums/CountryISO";
import { AppointmentStrategy } from "../strategies/AppointmentStrategy";
import { PEAppointmentStrategy } from "../strategies/PEAppointmentStrategy";
import { CLAppointmentStrategy } from "../strategies/CLAppointmentStrategy";

export class AppointmentStrategyFactory {
  static getStrategy(country: CountryISO): AppointmentStrategy {
    switch (country) {
      case CountryISO.PE:
        return new PEAppointmentStrategy();

      case CountryISO.CL:
        return new CLAppointmentStrategy();

      default:
        throw new Error("Unsupported country");
    }
  }
}