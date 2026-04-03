import { apiUrl, headers } from "./api";

const apiTodo = {
  getTasks: async () => {
    const response = await fetch(`${apiUrl}/todos`, { headers });
    return response.json();
  },

  deleteTask: async (id) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
      headers,
    });
    return response.json();
  },

  isDoneCheck: async (id) => {
    const response = await fetch(`${apiUrl}/todos/${id}/isCompleted`, {
      method: "PATCH",
      headers,
    });
    return response.json();
  },

  editTask: async (id, newTitle) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        title: newTitle,
      }),
    });
    return response.json();
  },

  clearTasks: async (tasks) => {
    const completedTask = tasks.filter((item) => item.isDone);
    const deletedTask = completedTask.map(async (item) => {
      try {
        const response = await fetch(`${apiUrl}/todos/${item.id}`, {
          method: "DELETE",
          headers,
        });
        return response.json();
      } catch (error) {
        console.log(error);
      }
    });

    const result = await Promise.all(deletedTask);
    return result; //[массив удалённых]
  },
};

export default apiTodo;
