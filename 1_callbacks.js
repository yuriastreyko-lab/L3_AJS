const https = require('https');
 
const BASE_URL = 'https://jsonplaceholder.typicode.com';
 
function request(path, callback) {
  https
    .get(`${BASE_URL}${path}`, (res) => {
      let raw = '';
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        try {
          callback(null, JSON.parse(raw));
        } catch (err) {
          callback(err, null);
        }
      });
    })
    .on('error', (err) => callback(err, null));
}
 
function sortPostsByTitleLengthDesc(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}
 
function sortCommentsByName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
}
 
function getSortedPosts(callback) {
  request('/posts', (err, posts) => {
    if (err) return callback(err, null);
    callback(null, sortPostsByTitleLengthDesc(posts));
  });
}
 
function getSortedComments(callback) {
  request('/comments', (err, comments) => {
    if (err) return callback(err, null);
    callback(null, sortCommentsByName(comments));
  });
}
 
getSortedPosts((err, posts) => {
  if (err) return console.error('Ошибка posts:', err);
  console.log('=== POSTS по убыванию длины title (первые 3) ===');
  console.log(posts.slice(0, 3));
});
 
getSortedComments((err, comments) => {
  if (err) return console.error('Ошибка comments:', err);
  console.log('=== COMMENTS по имени (первые 3) ===');
  console.log(comments.slice(0, 3));
});