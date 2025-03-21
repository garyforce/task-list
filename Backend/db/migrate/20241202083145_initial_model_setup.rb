class InitialModelSetup < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest, null: false
    
      t.timestamps
    end
    
    create_table :projects do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
    
      t.timestamps
    end
    
    create_table :todos do |t|
      t.references :project, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.boolean :is_completed, default: false
      t.datetime :completed_at
    
      t.timestamps
    end
  end
end
