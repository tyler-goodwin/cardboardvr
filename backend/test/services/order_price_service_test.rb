require 'test_helper'

class OrderPriceServiceTest < ActiveSupport::TestCase
  def setup
    @product1 = products(:one) # Unit price 10
    @product2 = products(:two) # Unit price 5
    @order = Order.new
  end

  test 'should calculate price for empty order' do
    expected = {
      shipping_price: 30,
      total_price: 30
    }
    assert_equal expected, OrderPriceService.new.calculate_prices(@order)
  end

  test 'should correctly calculate price for order < 10' do
    expected = {
      shipping_price: 30,
      total_price: (10 * 9) + 30
    }

    @order.order_items.build(
      product: @product1,
      quantity: 9
    )

    actual = OrderPriceService.new.calculate_prices(@order)
    assert_equal expected, actual
  end

  test 'should correctly calculate price for order > 10 and <= 20' do
    expected = {
      shipping_price: 0,
      total_price: 10 * 20
    }

    @order.order_items.build(
      product: @product1,
      quantity: 20
    )

    actual = OrderPriceService.new.calculate_prices(@order)
    assert_equal expected, actual
  end

  test 'should correctly calculate price for order > 20' do
    expected = {
      shipping_price: 0,
      total_price: 210 * 0.9
    }

    @order.order_items.build(
      quantity: 21,
      product: @product1
    )

    actual = OrderPriceService.new.calculate_prices(@order)
    assert_equal expected, actual
  end

  test 'should correctly calculate price for multiple line items with qty < 10 total' do
    expected = {
      shipping_price: 30,
      total_price: 50
    }

    @order.order_items.build(
      [
        { quantity: 1, product: @product1 },
        { quantity: 2, product: @product2 }
      ]
    )

    actual = OrderPriceService.new.calculate_prices(@order)
    assert_equal expected, actual
  end

  test 'should correctly calculate price for multiple line items with qty = 20 total' do
    expected = {
      shipping_price: 0,
      total_price: 190
    }

    @order.order_items.build(
      [
        { quantity: 18, product: @product1 },
        { quantity: 2,  product: @product2 }
      ]
    )

    actual = OrderPriceService.new.calculate_prices(@order)
    assert_equal expected, actual
  end

  test 'should correctly calculate price for multiple line items with qty > 20 total' do
    expected = {
      shipping_price: 0,
      total_price: 210 * 0.9
    }

    @order.order_items.build(
      [
        { quantity: 20, product: @product1 },
        { quantity: 2,  product: @product2 }
      ]
    )

    actual = OrderPriceService.new.calculate_prices(@order)
    assert_equal expected, actual
  end
end
