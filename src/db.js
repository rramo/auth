const { DataStore } = require('notarealdb');
 
const store = new DataStore('./data');
const users = store.collection('users');

module.exports.db = {
  store,
  users
}