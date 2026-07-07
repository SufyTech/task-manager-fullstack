from fastapi import Header, HTTPException
from app.db.supabase_client import supabase

def get_current_user(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    try:
        user_response = supabase.auth.get_user(token)
        return {"user": user_response.user, "token": token}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")