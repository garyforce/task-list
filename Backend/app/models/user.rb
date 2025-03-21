class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless URI::MailTo::EMAIL_REGEXP.match?(value)
      record.errors.add attribute, (options[:message] || "is not an email")
    end
  end
end

class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, length: { maximum: 40 }
  validates :email, email: true, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }

  has_many :projects, dependent: :destroy

end