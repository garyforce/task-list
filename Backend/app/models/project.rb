class Project < ApplicationRecord
  belongs_to :user

  has_many :todos, dependent: :destroy

  validates :title, presence: true
  
  
end