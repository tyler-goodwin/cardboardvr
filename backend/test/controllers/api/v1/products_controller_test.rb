require 'test_helper'

class Api::V1::ProductsControllerTest < ActionDispatch::IntegrationTest
  test 'should return expected products in json format' do
    expected = Product.all
    get api_v1_products_path
    assert_response :ok
    assert_equal expected.to_json, @response.body
  end
end
