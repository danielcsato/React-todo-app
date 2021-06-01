import axios from 'axios';
import { getTime } from './util';

const BASE_URL = 'http://localhost:8080';

//using this to create a random id until backend fix, give it two number param
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createTodo = (name) => {
  const body = {
    // TODO backend only accepts ID as int change this to uuidv4() later
    id: randomInteger(0, 1000000000000),
    title: name,
    isDone: false,
    // TODO error when using getTime()  ????? seems like it throws error when theres any other character than number in the request
    creationTimestamp: '20210531',
  };
  axios
    .post(`${BASE_URL}/api/todo`, body)
    .then(console.log('TODO ADDED'))
    .catch((err) => console.log('REQUEST FAILED', err));
};

export const getTodos = async (setTodos) => {
  axios
    .get(`${BASE_URL}/api/todo`)
    .then((res) => setTodos(res.data), console.log('TODOS DOWNLOADED'))
    .catch((err) => console.log('REQUEST FAILED', err));
};

export const getTodoById = (id) => {
  axios
    .get(`${BASE_URL}/api/todo/${id}`)
    .then((res) => console.log('TODO DOWNLOADED', res))
    .catch((err) => console.log('REQUEST FAILED', err));
};

// TODO put call currently not working
export const updateTodo = (id, title, isDone) => {
  const body = {
    id,
    title,
    isDone,
    creationTimestamp: getTime(),
  };
  axios
    .put(`${BASE_URL}/api/todo/${id}`, body)
    .then((res) => console.log('TODO UPDATED', res))
    .catch((err) => console.log('REQUEST FAILED', err));
};
export const deleteTodo = (id, state) => {
  axios
    .delete(`${BASE_URL}/api/todo/${id}`)
    .then((res) => {
      console.log('TODO DELETED', res);
      state(false);
    })
    .catch((err) => console.log('REQUEST FAILED', err));
};

export { BASE_URL };
