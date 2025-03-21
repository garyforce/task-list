require "test_helper"

class UserControllerTest < ActionDispatch::IntegrationTest
  include AuthenticationHelpers
  
  test "should create user" do
    assert_difference('User.count') do
      post user_index_url, params: { name: 'Test User', email: 'test@example.com', password: 'password' }
    end

    assert_response :created
    assert_not_nil session[:user_id]
  end

  test "should not create user with invalid params" do
    assert_no_difference('User.count') do
      post user_index_url, params: { name: '', email: 'invalid', password: '' }
    end

    assert_response :unprocessable_entity
  end

  test "should destroy user" do
    user = users(:one)
    log_in_as(user)

    assert_difference('User.count', -1) do
      delete user_url(user)
    end

    assert_response :no_content
    assert_nil session[:user_id]
  end

  test "should not destroy other user" do
    user = users(:one)
    other_user = users(:two)
    log_in_as(user)

    assert_no_difference('User.count') do
      delete user_url(other_user)
    end

    assert_response :unauthorized
  end
end