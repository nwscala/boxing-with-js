Rails.application.routes.draw do
  resources :items
  resources :boxes
  delete "boxes/:box_id/items/:item_id", to: "boxes#remove_box_item"  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
