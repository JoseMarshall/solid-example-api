import { Express, NextFunction, Request, Response, Router } from 'express';
import { readdirSync } from 'fs';

import { ApiErrorsName, ApiErrorsType } from '../../constants';
import { logger, makeMsgBody } from '../../utils';
import CustomError from '../../validators/errors/custom-error';

export default (app: Express): void => {
  app.get('/api', (_req: Request, res: Response) =>
    res.status(200).json({
      msg: process.env.WELCOME_MSG,
      date: new Date().toJSON(),
    })
  );

  /**
   * Load all routes from routes folder
   */
  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.includes('__tests__')) {
      const router = (await import(`../routes/${file}`)).default(Router());
      app.use(`/api/v1/${file}`, router);
    }
  });

  /**
   * Global error handler, handles all generic errors
   */
  // eslint-disable-next-line no-undef
  app.use((err: NodeJS.ErrnoException, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.message);
    return res.status(500).json(
      makeMsgBody(
        { i18nCode: 'E-1002', defaultValue: err.message },
        {
          error: new CustomError({
            statusCode: 500,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: err.message,
            i18nCode: 'E-1002',
            stack: err.stack ?? '',
            details: { err },
          }),
        }
      )
    );
  });
};
