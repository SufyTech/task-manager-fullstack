const NEXT_PUBLIC_API_URL = "https://task-manager-fullstack-c4uj.onrender.com";

function getToken(): string | null {
  return localStorage.getItem("access_token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// ---- AUTH ----
export async function signup(email: string, password: string) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
  }
  return data;
}

// ---- TASKS ----
export async function getTasks(status: string | null = null, page = 1, limit = 10) {
  let url = `${NEXT_PUBLIC_API_URL}/api/tasks?page=${page}&limit=${limit}`;
  if (status) url += `&status=${status}`;
  const res = await fetch(url, { headers: authHeaders() });
  const data = await res.json();
  console.log("getTasks response:", data);
  return data;
}

export async function createTask(title: string, categoryId: string | null = null) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/tasks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, category_id: categoryId }),
  });
  return res.json();
}

export async function updateTask(taskId: string, updates: Record<string, any>) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteTask(taskId: string) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
}

// ---- CATEGORIES ----
export async function getCategories() {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/categories`, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function createCategory(name: string) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/categories`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  });
  return res.json();
}
export function logout() {
  localStorage.removeItem("access_token");
  window.location.href = "/login";
}

export function getStoredEmail(): string | null {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.email || null;
  } catch {
    return null;
  }
}