from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.supabase_client import supabase
from app.routes.auth_routes import router as auth_router
from app.routes.task_routes import router as task_router
from app.routes.category_routes import router as category_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://task-manager-fullstack-sooty.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(task_router, prefix="/api", tags=["tasks"])
app.include_router(category_router, prefix="/api", tags=["categories"])

@app.get("/")
def health_check():
    return {"status": "connected", "message": "Task Manager API is running"}