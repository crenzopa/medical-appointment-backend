import { AppError } from "../../domain/errors/AppError";

export const handleError = (error: any) => {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: {
        message: error.message,
        code: error.code
      }
    };
  }

  return {
    statusCode: 500,
    body: {
      message: "Unexpected error"
    }
  };
};