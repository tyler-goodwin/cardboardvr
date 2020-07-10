class Api::V1::OrdersController < ApplicationController
  def index
    @orders = Order.all
    render json: @orders
  end

  def create
    @order = Order.new(order_params)

    if @order.save
      render json: {
        message: 'Order Successfully Placed!',
        order: @order
      }
    else
      render json: {
        message: 'Failed to place order.',
        errors: []
      }, status: :bad_request
    end
  end

  def prices
    @order = Order.new(order_params)
    prices = OrderPriceService.new.calculate_prices(@order)
    render json: prices
  end

  private

  def order_params
    params.require(:order).permit(
      order_items_attributes: %i[product_id quantity]
    )
  end
end
