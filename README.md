# Medical Appointment Backend - AWS Serverless

Sistema de agendamiento de citas médicas basado en arquitectura serverless en AWS.

---

# Arquitectura General

Este proyecto implementa una arquitectura event-driven en AWS utilizando:

- API Gateway
- AWS Lambda
- DynamoDB
- SNS
- SQS (PE / CL / Confirmation)
- EventBridge
- Serverless Framework
- TypeScript
- Clean Architecture
- Strategy Pattern
- Interceptor de trazabilidad

---

# Principios de Diseño

- Clean Architecture
- SOLID Principles
- Dependency Injection
- Strategy Pattern (por país PE / CL)
- Event-Driven Architecture
- Separation of Concerns
- Observabilidad con Interceptor

---

# Flujo del Sistema

## Crear cita médica (POST)

1. Cliente envía solicitud
2. Lambda recibe request
3. Se guarda en DynamoDB con estado `PENDING`
4. Se publica evento en SNS
5. SNS enruta a SQS según país:
   - PE → SQS_PE
   - CL → SQS_CL
6. Lambda procesa según estrategia de país
7. Se almacena en base de datos RDS (simulado)
8. Se envía evento a EventBridge
9. Lambda final actualiza estado a `COMPLETED`

---

## 2. Consultar citas (GET)

1. Cliente consulta por `insuredId`
2. Lambda consulta DynamoDB
3. Retorna lista de citas con su estado actual

---

# Endpoints

## GET /health

Health check del sistema.

---

## POST /appointments

Crea una nueva cita médica.

### Request
```json
{
  "insuredId": "00001",
  "scheduleId": 100,
  "countryISO": "PE"
}