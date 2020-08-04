import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationError(err: ValidationError): Errors {
  const validationErors: Errors = {};

  err.inner.forEach((e) => {
    validationErors[e.path] = e.message;
  });

  return validationErors;
}
