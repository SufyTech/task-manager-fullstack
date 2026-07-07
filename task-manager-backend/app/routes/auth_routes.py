from fastapi import APIRouter, HTTPException
from app.models.schemas import SignupRequest, LoginRequest
from app.db.supabase_client import supabase

router = APIRouter()

@router.post("/signup")
def signup(data: SignupRequest):
    result = supabase.auth.sign_up({
        "email": data.email,
        "password": data.password
    })
    if result.user is None:
        raise HTTPException(status_code=400, detail="Signup failed")
    return {"message": "Signup successful", "user_id": result.user.id}

@router.post("/login")
def login(data: LoginRequest):
    try:
        result = supabase.auth.sign_in_with_password({
            "email": data.email,
            "password": data.password
        })
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "access_token": result.session.access_token,
        "refresh_token": result.session.refresh_token,
        "user_id": result.user.id
    }