import { GetAppointmentsByInsuredIdUseCase } from "../../src/application/use-cases/GetAppointmentsByInsuredIdUseCase";
import {
  appointmentMockList,
  emptyAppointmentMock
} from "../mocks/appointment.mock";

describe("GetAppointmentsByInsuredIdUseCase", () => {

  it("should return appointments for a valid insuredId", async () => {

    const repository = {
      findByInsuredId: jest.fn().mockResolvedValue(appointmentMockList)
    };

    const useCase = new GetAppointmentsByInsuredIdUseCase(repository as any);

    const result = await useCase.execute("00001");

    expect(repository.findByInsuredId).toHaveBeenCalledTimes(1);
    expect(repository.findByInsuredId).toHaveBeenCalledWith("00001");

    expect(result.insuredId).toBe("00001");
    expect(result.total).toBe(appointmentMockList.length);
    expect(result.appointments).toEqual(appointmentMockList);
  });

  it("should return empty list when no appointments exist", async () => {

    const repository = {
      findByInsuredId: jest.fn().mockResolvedValue(emptyAppointmentMock)
    };

    const useCase = new GetAppointmentsByInsuredIdUseCase(repository as any);

    const result = await useCase.execute("99999");

    expect(result.insuredId).toBe("99999");
    expect(result.total).toBe(0);
    expect(result.appointments).toEqual([]);
  });

});