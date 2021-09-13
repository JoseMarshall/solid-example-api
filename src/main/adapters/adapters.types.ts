import { MessageBody } from '../../utils/utils.types';

export interface EndpointResponse {
  status: number;
  body: unknown;
  msg: MessageBody;
}
