class UserController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    if user.id == current_user.id
      if user.destroy
        session[:user_id] = nil
        head :no_content
      else
        render json: user.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  private
      def user_params
        params.permit(:name, :email, :password)
      end
end
