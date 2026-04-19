const apiUrl = import.meta.env.VITE_API_URL; // https://todo-redev.herokuapp.com/api
const TOKEN = import.meta.env.VITE_API_TOKEN; //токен

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: TOKEN,
};

const logIn = {
  register: async (data) => {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },

  log: async (formData) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  },
};

const apiTodo = {
  addTask: async (title) => {
    const response = await fetch(`${apiUrl}/todos`, {
      method: "POST",
      headers,
      body: JSON.stringify({ title: title }),
    });

    if (!response.ok) {
      throw new Error(`задача не создана, error status: ${response.status}`);
    }
    return response.json();
  },
  getTasks: async () => {
    const response = await fetch(`${apiUrl}/todos`, { headers });

    if (!response.ok) {
      throw new Error(`задача не добавлена, error status: ${response.status}`);
    }
    return response.json();
  },

  deleteTask: async (id) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!response.ok) {
      throw new Error(`задача не удалена, error status: ${response.status}`);
    }
    return response.json();
  },

  isDoneCheck: async (id) => {
    const response = await fetch(`${apiUrl}/todos/${id}/isCompleted`, {
      method: "PATCH",
      headers,
    });
    if (!response.ok) {
      throw new Error(`задача не выполнена, error status: ${response.status}`);
    }
    return response.json();
  },

  editTask: async (id, title) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        title: title,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `изменения не сохранены, error status: ${response.status}`,
      );
    }
    return response.json();
  },

  clearTasks: async (tasks) => {
    const completedTask = tasks.filter((item) => item.isCompleted);
    const deletedTask = completedTask.map(async (item) => {
      const response = await fetch(`${apiUrl}/todos/${item.id}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) {
        throw new Error(`задачи не очищены, error: ${response.status}`);
      }
      return response.json();
    });

    const result = await Promise.all(deletedTask);
    return result; //[массив удалённых]
  },
};

export { logIn, apiTodo };
