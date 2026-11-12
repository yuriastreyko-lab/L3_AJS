const BASE_URL = 'https://jsonplaceholder.typicode.com';
 
function request(path) {
  return fetch(`${BASE_URL}${path}`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  });
}
 
function pickUserFields(users) {
  return users.map(({ id, name, username, email, phone }) => ({
    id,
    name,
    username,
    email,
    phone,
  }));
}
 
function filterNotCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}
 
function getUsers() {
  return request('/users').then(pickUserFields);
}
 
function getNotCompletedTodos() {
  return request('/todos').then(filterNotCompleted);
}
 
getUsers()
  .then((users) => {
    console.log('=== USERS (первые 3) ===');
    console.log(users.slice(0, 3));
  })
  .catch((err) => console.error('Ошибка users:', err));
 
getNotCompletedTodos()
  .then((todos) => {
    console.log(`=== TODOS completed=false (всего ${todos.length}, первые 3) ===`);
    console.log(todos.slice(0, 3));
  })
  .catch((err) => console.error('Ошибка todos:', err));
 
