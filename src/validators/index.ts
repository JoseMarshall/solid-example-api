import { ObjectSchema, ValidationError } from 'joi';

import { ApiErrorsI18nCode, ApiErrorsName, ApiErrorsType } from '../constants';
import CustomError from './errors/custom-error';

function JoiValidator<T>(schema: ObjectSchema, i18nCode?: ApiErrorsI18nCode) {
  return async (payload: unknown) => {
    try {
      return (await schema.validateAsync(payload)) as Promise<T>;
    } catch (error) {
      throw (error as ValidationError).isJoi
        ? new CustomError({
            details: { validationDetails: error.details, isJoi: true },
            statusCode: 422,
            stack: '',
            type: ApiErrorsType.ValidationError,
            name: ApiErrorsName.NoMatchedSchema,
            i18nCode: i18nCode ?? 'E-1014',
            message: '',
          })
        : new CustomError({
            details: error,
            statusCode: 500,
            stack: error.stack,
            type: ApiErrorsType.InternalError,
            name: ApiErrorsName.GenericName,
            i18nCode: 'E-1002',
            message: '',
          });
    }
  };
}

export default JoiValidator;
