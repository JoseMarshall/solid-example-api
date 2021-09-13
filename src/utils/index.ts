import pino, { stdTimeFunctions } from 'pino';

import { MessageBody } from './utils.types';

export const makeMsgBody = (msg: MessageBody, payload?: any) => ({ msg, payload });

export const logger = pino({
  name: 'SOLID-Example-App',
  prettyPrint: true,
  timestamp: stdTimeFunctions.isoTime,
});
