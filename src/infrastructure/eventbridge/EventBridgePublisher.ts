import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

export class EventBridgePublisher {
  private client = new EventBridgeClient({});

  async publish(appointmentId: string) {
    await this.client.send(
      new PutEventsCommand({
        Entries: [
          {
            Source: "appointment.system",
            DetailType: "AppointmentCompleted",
            Detail: JSON.stringify({ appointmentId })
          }
        ]
      })
    );
  }
}