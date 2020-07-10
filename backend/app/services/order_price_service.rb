class OrderPriceService
  def calculate_prices(order)
    total_qty = 0
    shipping_price = 30
    total_price = 0

    order.order_items.each do |item|
      total_qty += item.quantity
      total_price += item.quantity * item.unit_price
    end

    shipping_price = 0 if total_qty >= 10
    total_price *= 0.9 if total_qty > 20

    {
      total_price: total_price + shipping_price,
      shipping_price: shipping_price
    }
  end
end
