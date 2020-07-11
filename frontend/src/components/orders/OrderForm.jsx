import React, { Component } from 'react';
import "./OrderForm.css";

function initialQtys(products) {
  const qtys = {}
  products.forEach(p => { qtys[p.id] = "0" });
  return qtys;
}

function toOrderItems(quantities) {
  return Object.keys(quantities).map(k => {
    return {
      product_id: k,
      quantity: quantities[k],
    };
  });
}

export default class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shipping: 0,
      total: 0,
      quantities: initialQtys(props.products),
    };
    this.handleQtyUpdate = this.handleQtyUpdate.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleQtyUpdate(event) {
    const { quantities } = this.state;
    const name = event.target.name;
    const value = event.target.value;
    quantities[name] = value;
    this.setState({ quantities }, this.updatePrices);
  }

  submitForm(event) {
    const { submitOrder } = this.props;
    const { quantities } = this.state;
    const orderItems = toOrderItems(quantities);
    submitOrder(orderItems);
    event.preventDefault();
  }

  async updatePrices() {
    const { fetchPrices } = this.props;
    const { quantities } = this.state;

    const { shipping_price, total_price } = await fetchPrices(toOrderItems(quantities));
    this.setState({
      shipping: shipping_price,
      total: total_price,
    });
  }

  render() {
    const { products } = this.props;
    const { shipping, total, quantities } = this.state;

    return (
      <div>
        <form onSubmit={this.submitForm}>
          {
            products.map(product => (
              <label key={product.id}>
                {product.name}
                <input
                  type="number"
                  name={product.id}
                  min="0"
                  value={quantities[product.id]}
                  onChange={this.handleQtyUpdate}
                />
              </label>
            ))
          }
          <div className="OrderForm_Prices">
            <div>Shipping: ${shipping}AUD</div>
            <div><strong>Total: ${total}AUD</strong></div>
            <input type="submit" value="Place Order" />
          </div>
        </form>
      </div>
    );
  }
}