import { lambdaInterceptor } from "../../shared/utils/lambdaInterceptor";

const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Medical Appointment API",
    version: "1.0.0",
    description: "API documentation for medical appointments service",
  },
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          200: {
            description: "Service is healthy",
          },
        },
      },
    },
    "/appointments": {
      post: {
        summary: "Create appointment",
        responses: {
          200: {
            description: "Appointment created",
          },
        },
      },
    },
    "/appointments/{insuredId}": {
      get: {
        summary: "Get appointments by insuredId",
        parameters: [
          {
            name: "insuredId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "List of appointments",
          },
        },
      },
    },
  },
};

export const handler = lambdaInterceptor(async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: `
<!DOCTYPE html>
<html>
<head>
  <title>API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        spec: ${JSON.stringify(openApiSpec)},
        dom_id: '#swagger-ui'
      });
    };
  </script>
</body>
</html>
    `,
  };
});