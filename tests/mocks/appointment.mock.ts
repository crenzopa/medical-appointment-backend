export const createAppointmentMock = {
  insuredId: "00001",
  scheduleId: 100,
  countryISO: "PE"
};

export const appointmentMockList = [
  {
    appointmentId: "apt-1",
    insuredId: "00001",
    scheduleId: 100,
    countryISO: "PE",
    status: "COMPLETED"
  },
  {
    appointmentId: "apt-2",
    insuredId: "00001",
    scheduleId: 101,
    countryISO: "PE",
    status: "PENDING"
  }
];

export const emptyAppointmentMock: any[] = [];

export const appointmentProcessedMock = {
  appointmentId: "apt-1",
  insuredId: "00001",
  scheduleId: 100,
  countryISO: "PE",
  status: "COMPLETED"
};