# Service for retrieving available products
class ProductService
  # DTO Class for each product
  # type: String - Product type to be displayed
  # cost: Integer - Cost of product
  Product = Struct.new(:type, :cost)

  # Dummy products.
  AVAILABLE_PRODUCTS = [
    Product.new('High Quality', 20),
    Product.new('Premium', 30)
  ].freeze

  # Retrieve all available products
  # In reality this would be likely be retrieved from external
  # service/database instead of having hardcoded products
  def available_products
    AVAILABLE_PRODUCTS
  end
end
