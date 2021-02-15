import faker from 'faker'

import { mockAuthentication } from '~/domain/test/mock-authentication'
import { InvalidCredentialsError } from '~/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '~/domain/errors/unexpected-error'
import { HttpPostClientSpy } from '~/data/test/mock-http-client'
import { RemoteAuthentcation } from '~/data/usecases/authentication/remote-authentication'
import { HttpStatusCode } from '~/data/protocols/http/http-reponse'
import { AuthenticationParams } from '~/domain/usecases/authentication'
import { AccountModel } from '~/domain/models/account-model'

type SutTypes = {
  sut: RemoteAuthentcation
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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
    sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  } )

  test('SHould call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsError if HttpsPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if hpptPostClient return 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpsPostClient return 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
