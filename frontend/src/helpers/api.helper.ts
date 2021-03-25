import * as axios from 'axios'
export class ApiHelper {
  private url = 'localhost:2503'

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
      auth: {
        username: token,
        password: '',
      },
      data: JSON.stringify(data),
      url: `${this.url}/${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.default.request(configs)
    const resJson = JSON.parse(response.data)
    if (resJson.error) {
      throw new Error(resJson.message)
    }
    return resJson
  }
}
