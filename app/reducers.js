"use strict";

import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actions';

const API_URL = 'http://localhost:8080/api/';

function todolist(state = [], action)
{
    console.log(action);
    switch (action.type) {
        case ADD_TODO:
            let postParams = Object.keys(action.target).map((key, value) => {
                return encodeURIComponent(action.target[key].name) + '=' + encodeURIComponent(action.target[key].value);
            }).join('&');

            console.log(postParams);

            fetch(API_URL + 'todos/', {
                method : 'post',
                headers : {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body : postParams
            }).then( (response) => {
                response.json().then( data => { 
                    return [...state, data];
                });
            }).catch( (err) => console.log(err));
        case TOGGLE_TODO:
            console.log("dispatching toggle todo with id " + event.target._id.value);
            fetch(API_URL + 'todos/' + event.target._id.value + '/completed', {
                method: 'post',
                body : {}
            }).then( (response) => {
                console.log(response);
            }).catch( (err) => {
                console.log(err);
            });
        case DELETE_TODO:
            console.log("dispatching toggle todo with id " + action.id);
            fetch(API_URL + 'todos/' + action.id + '', {
                method: 'delete',
                body : {}
            }).then( (response) => {
                console.log(response);
            }).catch( (err) => {
                console.log(err);
            });
        default:
            return state;
    }
}

const TODO_APP_REDUCERS = combineReducers({
  todolist
});

export default TODO_APP_REDUCERS;