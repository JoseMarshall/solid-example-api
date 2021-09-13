import { Request, Response } from 'express';

import { ApiErrorsName, ApiErrorsType } from '../../constants/errors';
import { makeMsgBody } from '../../utils';
import CustomError from '../../validators/errors/custom-error';
import { EndpointResponse } from './adapters.types';

type Controller = (req: Request) => Promise<EndpointResponse>;

// eslint-disable-next-line import/prefer-default-export
export const adaptExpressRoute =
  (controller: Controller) => async (req: Request, res: Response) => {
    try {
      const data = await controller(req);
      return res.status(data.status).json(makeMsgBody(data.msg, data.body));
    } catch (error) {
      return error instanceof CustomError
        ? res
            .status(error.statusCode)
            .json(makeMsgBody({ i18nCode: error.i18nCode, defaultValue: error.message }, { error }))
        : res.status(500).json(
            makeMsgBody(
              { i18nCode: 'E-1002', defaultValue: 'error on server' },
              {
                error: new CustomError({
                  statusCode: 500,
                  name: ApiErrorsName.GenericName,
                  type: ApiErrorsType.GenericType,
                  message: 'error on server',
                  i18nCode: 'E-1002',
                  stack: error.stack,
                  details: error,
                }),
              }
            )
          );
    }
  };

export function invalidRouteHandler() {
  return {
    handle: async (_req: Request) => ({
      status: 404,
      body: {},
      msg: {
        i18nCode: 'W-1000',
        defaultValue: 'route not found',
      },
    }),
  };
}
