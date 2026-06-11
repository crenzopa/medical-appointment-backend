import { randomUUID } from "crypto";

export const lambdaInterceptor = (handler: Function) => {
  return async (event: any, context: any) => {
    const start = Date.now();
    const correlationId = randomUUID();

    console.log("========== REQUEST START ==========");
    console.log("CorrelationId:", correlationId);
    console.log("Event:", JSON.stringify(event));

    try {
      const response = await handler(event, context, correlationId);

      const duration = Date.now() - start;

      console.log("========== REQUEST SUCCESS ==========");
      console.log("CorrelationId:", correlationId);
      console.log("Duration(ms):", duration);
      console.log("Response:", JSON.stringify(response));

      return {
        statusCode: response?.statusCode || 200,
        body: JSON.stringify({
          correlationId,
          data: response?.body || response
        })
      };
    } catch (error: any) {
      const duration = Date.now() - start;

      console.log("========== REQUEST ERROR ==========");
      console.log("CorrelationId:", correlationId);
      console.log("Duration(ms):", duration);
      console.log("Error:", error);

      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          correlationId,
          message: error.message || "Internal Server Error"
        })
      };
    }
  };
};