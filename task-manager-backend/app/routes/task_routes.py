from fastapi import APIRouter, Depends, HTTPException
from app.auth.dependencies import get_current_user
from app.db.supabase_client import supabase
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class TaskCreate(BaseModel):
    title: str
    category_id: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None
    category_id: Optional[str] = None

@router.post("/tasks")
def create_task(task: TaskCreate, auth=Depends(get_current_user)):
    user = auth["user"]
    token = auth["token"]
    supabase.postgrest.auth(token)

    result = supabase.table("tasks").insert({
        "title": task.title,
        "user_id": user.id,
        "category_id": task.category_id
    }).execute()
    return result.data

@router.get("/tasks")
def get_tasks(
    auth=Depends(get_current_user),
    status: Optional[str] = None,
    page: int = 1,
    limit: int = 10
):
    user = auth["user"]
    token = auth["token"]
    supabase.postgrest.auth(token)

    query = supabase.table("tasks").select("*").eq("user_id", user.id)

    if status:
        query = query.eq("status", status)

    start = (page - 1) * limit
    end = start + limit - 1
    query = query.range(start, end)

    result = query.execute()
    return result.data

@router.put("/tasks/{task_id}")
def update_task(task_id: str, task: TaskUpdate, auth=Depends(get_current_user)):
    user = auth["user"]
    token = auth["token"]
    supabase.postgrest.auth(token)

    update_data = {k: v for k, v in task.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = supabase.table("tasks").update(update_data).eq("id", task_id).eq("user_id", user.id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Task not found")
    return result.data

@router.delete("/tasks/{task_id}")
def delete_task(task_id: str, auth=Depends(get_current_user)):
    user = auth["user"]
    token = auth["token"]
    supabase.postgrest.auth(token)

    result = supabase.table("tasks").delete().eq("id", task_id).eq("user_id", user.id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}