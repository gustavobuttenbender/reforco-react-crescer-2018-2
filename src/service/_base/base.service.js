import axios from 'axios'

const httpService = baseUrl => axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: baseUrl
})

export class BaseService {
  constructor(baseUrl) {
    this.httpService = new httpService(baseUrl)
  }

  get(url) {
    return this.httpService
      .get(url)
      .then(result => result.data)
  }
}