import * as axios from 'axios'
export class ApiHelper {
  private url = 'http://localhost:2503'

  private static _instance: ApiHelper

  public static get Instance(): ApiHelper {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this())
  }

  async Request(
    token: string,
    endpoint: string,
    method: axios.Method,
    data?: any,
  ): Promise<any> {
    const configs: axios.AxiosRequestConfig = {
      data: JSON.stringify(data),
      url: `${this.url}/${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token,
      },
    }
    try {
      const response = await axios.default.request(configs)
      return response.data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async RequestWithoutAuth(
    endpoint: string,
    method: axios.Method,
    data?: any,
  ): Promise<any> {
    const configs: axios.AxiosRequestConfig = {
      data: JSON.stringify(data),
      url: `${this.url}/${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    try {
      const response = await axios.default.request(configs)
      return response.data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}
