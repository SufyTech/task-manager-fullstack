"use client";

import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getCategories,
  createCategory,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, LogOut } from "lucide-react";
import { logout, getStoredEmail } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>("none");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadTasks();
    loadCategories();
    setEmail(getStoredEmail());
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    await createTask(title, categoryId === "none" ? null : categoryId);
    setTitle("");
    loadTasks();
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategoryName) return;
    await createCategory(newCategoryName);
    setNewCategoryName("");
    loadCategories();
  }

  async function handleToggleStatus(taskId: string, currentStatus: string) {
    const newStatus = currentStatus === "done" ? "pending" : "done";
    await updateTask(taskId, { status: newStatus });
    loadTasks();
  }

  async function handleDelete(taskId: string) {
    await deleteTask(taskId);
    loadTasks();
  }

  function categoryName(catId: string | null) {
    if (!catId) return null;
    return categories.find((c) => c.id === catId)?.name;
  }

  return (
    <div className="min-h-screen bg-muted/40 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">My Tasks</h1>
          <div className="flex items-center gap-3">
            {email && (
              <span className="text-sm text-muted-foreground">{email}</span>
            )}
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add a category</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAddCategory}
              className="flex flex-col sm:flex-row gap-2"
            >
              <Input
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add a task</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAddTask}
              className="flex flex-col sm:flex-row gap-2"
            >
              <Input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1"
              />
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No category</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit">Add Task</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {tasks.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No tasks yet — add one above.
              </p>
            )}
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={task.status === "done"}
                    onCheckedChange={() =>
                      handleToggleStatus(task.id, task.status)
                    }
                  />
                  <div>
                    <p
                      className={
                        task.status === "done"
                          ? "line-through text-muted-foreground"
                          : ""
                      }
                    >
                      {task.title}
                    </p>
                    {categoryName(task.category_id) && (
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        {categoryName(task.category_id)}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(task.id)}
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
