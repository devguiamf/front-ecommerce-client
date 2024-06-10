import { AbstractControl } from "@angular/forms"

export interface singupResponse {
  authToken: string,
  user: {
    name: string,
    email: string,
    password: string,
    city: string,
    state: string,
    role: string,
    address: {
      cep: string,
      address: string,
      number: string,
      state: string,
      city: string
    }
  }
}

export interface singupRequest {
  email: string,
  password: string,
  name: string,
  cpf: string,
  phone: string,
  address: {
    cep: string,
    address: string,
    number: string,
    state: string,
    city: string,
  }
}

export interface CepResponseApi {
  cep: number
  logradouro: string,
  complemento:string,
  bairro:string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}

export interface CepResponsePipe {
  address: string,
  state: string,
  city: string,
}