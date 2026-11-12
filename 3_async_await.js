const BASE_URL = 'https://jsonplaceholder.typicode.com';
 
async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
 
function sortPostsByTitleLengthDesc(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}
 
function sortCommentsByName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
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
 
async function getSortedPosts() {
  const posts = await request('/posts');
  return sortPostsByTitleLengthDesc(posts);
}
 
async function getSortedComments() {
  const comments = await request('/comments');
  return sortCommentsByName(comments);
}
 
async function getUsers() {
  const users = await request('/users');
  return pickUserFields(users);
}
 
async function getNotCompletedTodos() {
  const todos = await request('/todos');
  return filterNotCompleted(todos);
}
 
async function main() {
  try {
    const posts = await getSortedPosts();
    console.log('=== POSTS по убыванию длины title (первые 3) ===');
    console.log(posts.slice(0, 3));
 
    const comments = await getSortedComments();
    console.log('=== COMMENTS по имени (первые 3) ===');
    console.log(comments.slice(0, 3));
 
    const users = await getUsers();
    console.log('=== USERS (первые 3) ===');
    console.log(users.slice(0, 3));
 
    const todos = await getNotCompletedTodos();
    console.log(`=== TODOS completed=false (всего ${todos.length}, первые 3) ===`);
    console.log(todos.slice(0, 3));
  } catch (err) {
    console.error('Ошибка:', err);
  }
}
 
main();
 
