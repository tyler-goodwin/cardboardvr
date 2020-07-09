import axios from 'axios';

export default class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: "/api/v1"
    })
  }

  async getAvailableProducts() {
    try {
      const res = await this.client.get("/missing")
      console.log(res);
      if (res.status !== 200) {
        throw `Unexpected HTTP Status: ${res.status}`
      }
      return res.data;
    } catch (err) {
      throw `Could not retrieve products: ${err}`
    }
  }
}