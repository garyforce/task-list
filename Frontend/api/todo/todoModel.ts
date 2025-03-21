interface TodoModel {
    id: number;
    title: string;
    description?: string;
    project_id: number;
    is_completed: boolean;
    completed_at?: Date;
    created_at: Date;
    updated_at: Date;
}

interface CreateTodoParams {
    title: string;
    description?: string;
    project_id: number;
    is_completed?: boolean;
}

interface UpdateTodoParams {
    title?: string;
    description?: string;
    is_completed?: boolean;
}