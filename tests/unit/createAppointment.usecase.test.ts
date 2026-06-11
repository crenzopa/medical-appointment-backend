import { CreateAppointmentUseCase } from "../../src/application/use-cases/CreateAppointmentUseCase";
import { appointmentMock } from "../mocks/appointment.mock";

describe("CreateAppointmentUseCase", () => {
  it("should create appointment and publish SNS event", async () => {
    const repo = {
      save: jest.fn(),
      findByInsuredId: jest.fn(),
      update: jest.fn()
    };

    const sns = {
      send: jest.fn()
    };

    const useCase = new CreateAppointmentUseCase(
      repo as any,
      sns as any,
      "arn:test"
    );

    const result = await useCase.execute(appointmentMock);

    expect(repo.save).toHaveBeenCalled();
    expect(sns.send).toHaveBeenCalled();
    expect(result.message).toBe("Appointment in process");
  });
});