Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get 'products' => 'products#index'
      get 'orders' => 'orders#index'
      post 'orders' => 'orders#create'
      post 'orders/calculate-price' => 'orders#prices'
    end
  end
end
