import { HttpResponse } from "~/data/protocols/http/http-reponse";

export type HttpPostParams = {
  url: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  body?: object
}

export interface HttpPostClient {
  post (params: HttpPostParams): Promise<HttpResponse>
}
