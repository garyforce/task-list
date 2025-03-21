class TodoController < ApplicationController
  before_action :set_todo, only: %i[show update destroy complete]
  before_action :authorize_user, only: [:show, :update, :destroy, :complete]

  def index
    if current_user
      todos = Todo.joins(:project).where(projects: { user_id: current_user.id })
      todos = apply_filters(todos, params[:filters]) if params[:filters]
      render json: todos
    else
      render json: { error: 'User not logged in' }, status: :unauthorized
    end
  end

  def project_todos
    project = current_user.projects.find(params[:project_id])
    todos = project.todos
    todos = apply_filters(todos, params[:filters]) if params[:filters]
    render json: todos
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Project not found' }, status: :not_found
  end

  def show
    render json: @todo
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo, status: :created
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def update
    if @todo.update(todo_params)
      if(todo_params[:is_completed] == false)
        @todo.mark_as_uncompleted()
      end
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @todo.destroy
      head :no_content
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def complete
    if @todo.mark_as_completed()
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  private
      def set_todo
        @todo = Todo.find(params[:id])
      end

      def todo_params
        params.permit(:title, :description, :project_id)
      end

      def authorize_user
        unless @todo.project.user == current_user
          render json: { error: 'Not Authorized' }, status: :unauthorized
        end
      end

      def apply_filters(todos, filters)
        filters.each do |key, value|
          if todos.column_names.include?(key.to_s)
            todos = todos.where(key => value)
          else
            raise ArgumentError, "Invalid filter key: #{key}"
          end
        end
        todos
      end
end
