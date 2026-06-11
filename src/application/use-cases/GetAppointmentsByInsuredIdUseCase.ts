import { AppointmentRepository } from "../../domain/repositories/AppointmentRepository";

export class GetAppointmentsByInsuredIdUseCase {
  constructor(private repository: AppointmentRepository) {}

  async execute(insuredId: string) {
    const appointments = await this.repository.findByInsuredId(insuredId);

    return {
      insuredId,
      total: appointments.length,
      appointments
    };
  }
}