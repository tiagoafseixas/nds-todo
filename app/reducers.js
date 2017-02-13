"use strict";

import { combineReducers } from 'redux';
import { ADD_TODO } from './actions';

const API_URL = 'http://localhost:8080/api/';

function todolist(state = [], action)
{
    switch (action.type) {
        case ADD_TODO:
            let postParams = Object.keys(action.target).map((key, value) => {
                return encodeURIComponent(action.target[key].name) + '=' + encodeURIComponent(action.target[key].value);
            }).join('&');
            let formParams = {
                
            };

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
        default:
            return state;
    }
}

const TODO_APP_REDUCERS = combineReducers({
  todolist
});

export default TODO_APP_REDUCERS;