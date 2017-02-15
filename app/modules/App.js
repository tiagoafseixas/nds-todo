import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './TodoList';
import TodoForm from './TodoForm';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';

import { connect } from 'react-redux';

const API_URL = 'http://localhost:8080/api/';

class App extends React.Component {

    constructor()
    {
        super();

        this.state = {
            todolist: [],
            currentTodo : {}
        };

        this.handleFormSubmit= this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event)
    {
        let postParams = Object.keys(event.target).map((key, value) => {
            if(!event.target[key]) return "";
            return encodeURIComponent(event.target[key].name) + '=' + encodeURIComponent(event.target[key].value);
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
                this.setState({todolist : [...this.state.todolist, data]}); 
            });
        }).catch( (err) => console.log(err));
    }

    componentDidMount() {
        fetch(API_URL + '/todos/', {
            method : 'get'
        }).then((response) => {
            response.json().then(data => {
                console.log(data);
                this.setState({todolist : data});
            });
        }).catch( (err) => console.log(err));
    }

    render() {
        return(
            <MuiThemeProvider>
                <Grid>
                    <Row>
                        <Col xs={6} md={12}>
                            <AppBar title="Todo App" style={{'marginBottom':'1em'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={8}>
                            <Paper zDepth={1}>
                                <TodoList todolist={this.state.todolist}/>
                            </Paper>
                        </Col>
                        <Col xs={6} md={4}>
                            <TodoForm onSubmit = {e => this.handleFormSubmit(e)} title="" duedate="" duetime="" />
                        </Col>
                    </Row>
                </Grid>
            </MuiThemeProvider>
        )
    }
};

export default connect()(App)