const apiUrl = "https://todo-redev.herokuapp.com/api";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdHlhQGdtYWlsLmNvbSIsImlkIjoyMzg1LCJpYXQiOjE3NzQ4NzMzNTV9.ODiDsMqi-rlszCmPUsHdyYWpfErCfeOraMQQzI7U5vA";

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: TOKEN,
};

export { apiUrl, headers };
