require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  def setup
    @product = Product.new(
      name: 'High Quality',
      unit_price: 20
    )
  end

  test 'should be valid' do
    assert @product.valid?
  end

  test 'should have name' do
    @product.name = nil
    assert_not @product.valid?
    @product.name = ''
    assert_not @product.valid?
    @product.name = '   '
    assert_not @product.valid?
  end

  test 'should have price' do
    @product.unit_price = nil
    assert_not @product.valid?
  end

  test 'should have positive unit price' do
    @product.unit_price = 0
    assert_not @product.valid?

    @product.unit_price = -10
    assert_not @product.valid?
  end
end
