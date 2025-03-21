class ProjectController < ApplicationController
  before_action :set_project, only: %i[show update destroy]
  before_action :authorize_user, only: [:update, :destroy]

  def index
    if current_user
      render json: current_user.projects.all
    else
      render json: { error: 'User not logged in' }, status: :unauthorized
    end
  end

  def show
    render json: @project
  end

  def create
    project = Project.new(project_params.merge(user: current_user))
    if project.save
      render json: project, status: :created
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @project.destroy
      head :no_content
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private
      def set_project
        @project = Project.find_by(id: params[:id])
        render json: { error: 'Project not found' }, status: :not_found unless @project
      end

      def project_params
        params.permit(:title)
      end

      def authorize_user
        unless @project.user == current_user
          render json: { error: 'Not Authorized' }, status: :unauthorized
        end
      end
end
