import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export function validateData(schema: any, data: any): boolean {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  return validate(data);
}
