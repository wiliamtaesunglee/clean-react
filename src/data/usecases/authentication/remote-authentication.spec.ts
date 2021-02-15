import faker from 'faker'

import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentcation } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentcation
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentcation(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteAuthentcation', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  } )
})
