import axios from 'axios';

function buildPayload(orderItems) {
  return {
    order: {
      order_items_attributes: orderItems
    }
  }
}

export default class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: "/api/v1"
    })
  }

  async get(path) {
    try {
      const res = await this.client.get(path)
      if (res.status !== 200) {
        throw new Error(`Unexpected HTTP Status: ${res.status}`);
      }
      return res.data;
    } catch (err) {
      throw new Error(`Could not retrieve ${path}: ${err}`);
    }
  }

  async getAvailableProducts() {
    return await this.get("products")
  }

  async getOrders() {
    return await this.get("/orders")
  }

  async getOrderPrices(orderItems) {
    const payload = buildPayload(orderItems);
    return await this.client.post("/orders", JSON.stringify(payload));
  }

  async createOrder(orderItems) {
    const payload = buildPayload(orderItems);
    return await this.client.post("/orders", JSON.stringify(payload));
  }
}