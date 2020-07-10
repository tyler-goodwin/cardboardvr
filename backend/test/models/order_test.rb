require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  def setup
    @product = products(:one)
    @order = Order.new(
      shipping_price: 10,
      total_price: 40,
      order_items_attributes: [
        {
          product_id: @product.id,
          quantity: 2
        }
      ]
    )
    # Skip price updates to verify validation logic
    @order.stubs(:update_prices)
  end

  test 'should be valid' do
    assert @order.valid?
  end

  test 'should have shipping price' do
    @order.shipping_price = nil
    assert_not @order.valid?
  end

  test 'should not have negative shipping price' do
    @order.shipping_price = -1
    assert_not @order.valid?
  end

  test 'should have total price' do
    @order.total_price = nil
    assert_not @order.valid?
  end

  test 'should have 0 total price' do
    @order.total_price = 0
    assert_not @order.valid?
  end

  test 'should not have negative total price' do
    @order.total_price = -1.0
    assert_not @order.valid?
  end
end
