import { ErrorType } from "../DataTypes/error";

class ApplicationError extends Error {
  status: number;
  error: ErrorType[];
  constructor(status: number, message: string, error: ErrorType[]) {
    super(message);
    this.status = status;
    this.error = error;
  }
}

export default ApplicationError;
