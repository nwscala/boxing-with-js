class CreateBoxItems < ActiveRecord::Migration[6.0]
  def change
    create_table :box_items do |t|
      t.belongs_to :box, null: false, foreign_key: true
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
