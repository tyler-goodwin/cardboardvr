class Api::V1::ProductsController < ApplicationController
  def index
    products = ProductService.new.available_products
    render json: products
  end
end
