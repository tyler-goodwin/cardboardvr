require 'test_helper'

class OrderItemTest < ActiveSupport::TestCase
  def setup
    @order = Order.new
    @product = products(:one)
    @order_item = @order.order_items.build(
      product: @product,
      quantity: 1
    )
  end

  test 'should be valid' do
    assert @order_item.valid?
  end

  test 'should have order' do
    @order_item.order = nil
    assert_not @order_item.valid?
  end

  test 'should have product' do
    @order_item.product = nil
    assert_not @order_item.valid?
  end

  test 'should have quantity' do
    @order_item.quantity = nil
    assert_not @order_item.valid?
  end

  test 'should have positive quantity' do
    @order_item.quantity = 0
    assert_not @order_item.valid?
    @order_item.quantity = -10
    assert_not @order_item.valid?
  end
end
