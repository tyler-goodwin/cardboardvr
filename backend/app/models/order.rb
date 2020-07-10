class Order < ApplicationRecord
  validates :shipping_price, numericality: { greater_than_or_equal_to: 0 }
  validates :total_price, numericality: { greater_than: 0 }

  has_many :order_items, dependent: :destroy, autosave: true
  accepts_nested_attributes_for :order_items, reject_if: :all_blank

  before_validation :update_prices
  before_validation :ensure_items_present

  def as_json(_options)
    super(
      include: {
        order_items: {
          only: %i[product_id quantity],
          methods: %i[product_name unit_price]
        }
      }
    )
  end

  private

  def update_prices
    prices = OrderPriceService.new.calculate_prices(self)
    self.shipping_price = prices[:shipping_price]
    self.total_price = prices[:total_price]
    true
  end

  def ensure_items_present
    errors.add(:order_items, 'must contain at least 1 item') unless total_qty.positive?
  end

  def total_qty
    order_items.map(&:quantity).sum
  end
end
