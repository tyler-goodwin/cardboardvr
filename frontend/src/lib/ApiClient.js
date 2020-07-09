import axios from 'axios';

export default class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: "/api/v1"
    })
  }

  async getAvailableProducts() {
    try {
      const res = await this.client.get("/products")
      if (res.status !== 200) {
        throw new Error(`Unexpected HTTP Status: ${res.status}`);
      }
      return res.data;
    } catch (err) {
      throw new Error(`Could not retrieve products: ${err}`);
    }
  }
}