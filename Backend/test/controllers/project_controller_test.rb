require "test_helper"

class ProjectControllerTest < ActionDispatch::IntegrationTest

  setup do
    @user = users(:one)
    @project = projects(:one)
    @other_user = users(:two)
    @other_project = projects(:two)
    log_in_as @user
  end

  test "should get index" do
    get project_index_url
    assert_response :success
  end

  test "should show project" do
    get project_url(@project)
    assert_response :success
  end

  test "should create project" do
    assert_difference('Project.count') do
      post project_index_url, params: { title: 'New Project' }
    end
    assert_response :created
  end

  test "should not create project without title" do
    assert_no_difference('Project.count') do
      post project_index_url, params: { title: '' }
    end
    assert_response :unprocessable_entity
  end

  test "should update project" do
    patch project_url(@project), params: { title: 'Updated Title' }
    assert_response :success
  end

  test "should not update project with invalid data" do
    patch project_url(@project), params: { title: '' }
    assert_response :unprocessable_entity
  end

  test "should destroy project" do
    assert_difference('Project.count', -1) do
      delete project_url(@project)
    end
    assert_response :no_content
  end

  test "should not update project if not authorized" do
    log_in_as @other_user
    patch project_url(@project), params: { title: 'Updated Title' }
    assert_response :unauthorized
  end

  test "should not destroy project if not authorized" do
    log_in_as @other_user
    assert_no_difference('Project.count') do
      delete project_url(@project)
    end
    assert_response :unauthorized
  end
end