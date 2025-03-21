class Todo < ApplicationRecord
  belongs_to :project
  
  validates :title, presence: true, length: { maximum: 140 }
  validates :description,  length: { maximum: 600 }

  attribute :is_completed, :boolean, default: false
  attribute :created_at, :datetime, default: -> { Time.current }
  attribute :completed_at, :datetime

  def mark_as_completed
    self.is_completed = true
    self.completed_at = Time.current
    save
  end

  def mark_as_uncompleted
    self.is_completed = false
    self.completed_at = nil
    save
  end
end