class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  default_scope { includes(:product) }

  validates :order, :product, presence: true
  validates :quantity, numericality: { greater_than: 0, only_integer: true }

  delegate :name, to: :product, prefix: :product
  delegate :unit_price, to: :product
end
