class Api::V1::OrdersControllerTest < ActionDispatch::IntegrationTest
  test 'should return expected orders in json format' do
    expected = Order.all
    get api_v1_orders_path
    assert_response :ok
    assert_equal expected.to_json, @response.body
  end

  test 'should create order' do
    assert_difference 'Order.count', 1 do
      post api_v1_orders_path, params: {
        order_items_attributes: [
          { product_id: products(:one).id, quantity: 1 }
        ]
      }, as: :json
    end
    assert_includes @response.body, products(:one).name
    assert_response :ok
  end

  test 'should not create order without items' do
    assert_no_difference 'Order.count', 1 do
      post api_v1_orders_path, params: { order_items_attributes: [] }, as: :json
    end
    assert_response :bad_request
  end

  test 'should calculate price' do
    expected = { 'shipping_price' => 30, 'total_price' => 40 }
    post api_v1_orders_calculate_price_path, params: {
      order_items_attributes: [
        { product_id: products(:one).id, quantity: 1 }
      ]
    }, as: :json
    json = JSON.parse(@response.body)
    assert_equal expected['shipping_price'], json['shipping_price']
    assert_equal expected['total_price'], json['total_price']
    assert_response :ok
  end

  test 'should calculate price with no items' do
    expected = { 'shipping_price' => 30, 'total_price' => 30 }
    post api_v1_orders_calculate_price_path, params: {
      order_items_attributes: []
    }, as: :json
    json = JSON.parse(@response.body)
    assert_equal expected['shipping_price'], json['shipping_price']
    assert_equal expected['total_price'], json['total_price']
    assert_response :ok
  end
end
