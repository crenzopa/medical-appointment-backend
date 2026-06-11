import { handler } from "../../src/presentation/handlers/createAppointment.handler";

describe("CreateAppointment Handler", () => {
  it("should return success response", async () => {
    const event = {
      body: JSON.stringify({
        insuredId: "00001",
        scheduleId: 100,
        countryISO: "PE"
      })
    };

    const response = await handler(event as any, {} as any);

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body.message).toBe("Appointment in process");
  });
});