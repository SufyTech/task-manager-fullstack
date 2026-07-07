from fastapi import APIRouter, Depends, HTTPException
from app.auth.dependencies import get_current_user
from app.db.supabase_client import supabase
from pydantic import BaseModel

router = APIRouter()

class CategoryCreate(BaseModel):
    name: str

@router.post("/categories")
def create_category(cat: CategoryCreate, auth=Depends(get_current_user)):
    user = auth["user"]
    token = auth["token"]
    supabase.postgrest.auth(token)

    result = supabase.table("categories").insert({
        "name": cat.name,
        "user_id": user.id
    }).execute()
    return result.data

@router.get("/categories")
def get_categories(auth=Depends(get_current_user)):
    user = auth["user"]
    token = auth["token"]
    supabase.postgrest.auth(token)

    result = supabase.table("categories").select("*").eq("user_id", user.id).execute()
    return result.data