export interface HttpRequest {
  body?: Record<string, any>;
  query: Record<string, any>;
}

export type RequestValidator<T extends HttpRequest = HttpRequest> = (req: T) => Promise<T>;
