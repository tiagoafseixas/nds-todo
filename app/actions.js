export const ADD_TODO = 'ADD_TODO';
export const GET_TODOS = "GET_TODOS";

export function addTodo(target) {
  return { type: ADD_TODO, "target" : target };
}

export function getTodos() {
  return { type: GET_TODOS };
}