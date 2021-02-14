import { HttpPostClient } from '../../protocols/http/http-post-client'
import { RemoteAuthentcation } from './remote-authentication'

describe('RemoteAuthentcation', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }

    const url = 'any_url'
    const httpPostCLientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentcation(url, httpPostCLientSpy)
    sut.auth()
    expect(httpPostCLientSpy.url).toBe(url)
  } )
})
