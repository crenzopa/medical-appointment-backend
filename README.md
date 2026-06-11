# Medical Appointment Backend (Serverless AWS)

Backend serverless para gestión de citas médicas basado en arquitectura event-driven en AWS.

Permite crear, consultar y procesar citas médicas usando AWS Lambda, API Gateway, DynamoDB, SNS y SQS.

---

# Arquitectura del sistema

El flujo del sistema es el siguiente:

API Gateway → Lambda → DynamoDB → SNS → SQS → Lambdas consumidoras

Flujo detallado:

1. El cliente crea una cita mediante `POST /appointments`
2. API Gateway invoca Lambda
3. Lambda guarda la cita en DynamoDB
4. Se publica un evento en SNS
5. SNS distribuye mensajes a SQS (PE / CL / Confirmation)
6. Lambdas consumidoras procesan cada mensaje
7. Se actualiza el estado de la cita

---

# Tecnologías utilizadas

- Node.js 18+
- TypeScript
- Serverless Framework
- AWS Lambda
- API Gateway
- DynamoDB
- SNS (Simple Notification Service)
- SQS (Simple Queue Service)
- Jest

---

# Endpoints

## Health Check

GET /health

Respuesta:
{
  "status": "ok"
}

---

## Crear cita

POST /appointments

Request:
{
  "insuredId": "00001",
  "scheduleId": 100,
  "countryISO": "PE"
}

Respuesta:
{
  "message": "Appointment created successfully",
  "appointmentId": "uuid"
}

---

## Obtener citas por asegurado

GET /appointments/{insuredId}

Ejemplo:
GET /appointments/00001

Respuesta:
[
  {
    "appointmentId": "uuid",
    "insuredId": "00001",
    "status": "PENDING"
  }
]

---

# Instalación

npm install

---

# Compilación

npm run build

---

# Deploy en AWS

npx serverless deploy

---

# Estructura del proyecto

src/
 ├── application/
 ├── domain/
 ├── infrastructure/
 ├── presentation/
 │    └── handlers/
 ├── shared/

tests/
 ├── unit/
 ├── integration/
 ├── mocks/

---

# Arquitectura AWS

- API Gateway → entrada HTTP
- Lambda → lógica de negocio
- DynamoDB → base de datos
- SNS → eventos
- SQS → procesamiento asíncrono
- Lambdas consumidoras → procesamiento por país

---

# Patrones utilizados

- Clean Architecture
- Domain Driven Design (básico)
- Event-driven architecture
- Strategy Pattern
- Repository Pattern

---

# Testing

npm run test

---

# Autor

Carlos Renzo Paz.

---

# Estado del proyecto

✔ Arquitectura completa  
✔ Backend funcional  
✔ Infraestructura AWS definida  
✔ Listo para deploy en AWS