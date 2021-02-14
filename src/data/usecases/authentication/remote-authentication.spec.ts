import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentcation } from './remote-authentication'

describe('RemoteAuthentcation', () => {
  test('Should call HttpPostClient with correct URL', async () => {


    const url = 'any_url'
    const httpPostCLientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentcation(url, httpPostCLientSpy)
    sut.auth()
    expect(httpPostCLientSpy.url).toBe(url)
  } )
})
