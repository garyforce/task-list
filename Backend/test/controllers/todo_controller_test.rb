require "test_helper"

class TodoControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @project = projects(:one)
    @todo = todos(:one)
    @other_user = users(:two)
    @other_project = projects(:two)
    @other_todo = todos(:two)
    log_in_as @user
  end

  test "should get index without filters" do
    get todo_index_url
    assert_response :success
  end
  
  test "should get index with filters" do
    get todo_index_url, params: { filters: { title: 'Test' } }
    assert_response :success
  end

  test "should not get index if not logged in" do
    log_out
    get todo_index_url
    assert_response :unauthorized
  end

  test "should get project todos" do
    get project_todos_project_index_url(project_id: @project.id)
    assert_response :success
  end

  test "should get project todos with filters" do
    get project_todos_project_index_url(project_id: @project.id), params: { filters: { title: 'Test' } }
    assert_response :success
  end

  test "should not get project todos if project not found" do
    get project_todos_project_index_url(project_id: -1)
    assert_response :not_found
  end

  test "should show todo" do
    get todo_url(@todo)
    assert_response :success
  end

  test "should create todo" do
    assert_difference('Todo.count') do
      post todo_index_url, params: { title: 'New Todo', description: 'New Description', project_id: @project.id }
    end
    assert_response :created
  end

  test "should update todo" do
    patch todo_url(@todo), params: { title: 'Updated Title' }
    assert_response :success
  end

  test "should destroy todo" do
    assert_difference('Todo.count', -1) do
      delete todo_url(@todo)
    end
    assert_response :no_content
  end

  test "should complete todo" do
    put complete_todo_url(@todo.id)
    assert_response :success
  end

  test "should not show todo of another user" do
    get todo_url(@other_todo)
    assert_response :unauthorized
  end

  test "should not update todo of another user" do
    patch todo_url(@other_todo), params: { title: 'Updated Title' }
    assert_response :unauthorized
  end

  test "should not destroy todo of another user" do
    delete todo_url(@other_todo)
    assert_response :unauthorized
  end

  test "should not complete todo of another user" do
    put complete_todo_url(@other_todo.id)
    assert_response :unauthorized
  end
end
