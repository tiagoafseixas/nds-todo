export const ADD_TODO = 'ADD_TODO';
export const GET_TODOS = 'GET_TODOS';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function addTodo(target) { return { type: ADD_TODO, "target" : target }; }
export function toggleTodo(id) { return {type: TOGGLE_TODO, "id" : id } }
export function deleteTodo(id) { return {type: DELETE_TODO, "id" : id } }
export function getTodos() { return { type: GET_TODOS }; }