import { HttpRequest } from '../../../controllers/controllers.type';

export interface CreateUserHttpRequest extends HttpRequest {
  body: {
    name: string;
    email: string;
  };
  query: {};
}
