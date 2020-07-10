class Product < ApplicationRecord
  validates :name, presence: true
  validates :unit_price, numericality: { greater_than: 0 }
end
