export type BasicRequest = {
  path: string
  // eslint-disable-next-line prettier/prettier
  authenticated: boolean
  headers?: any
  body?: any
  formData?: FormData
}

export type BasicResponse<T> = {
  body: T
}

export type RequestState = {
  loading: boolean
  error: string
}