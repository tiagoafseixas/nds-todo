import React from 'react';
import TodoList from "./TodoList";
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { addTodo } from '../actions';
import { connect } from 'react-redux';

class TodoForm extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            headerTitle: "New Todo Task",
            title : {
                errorMessage:""
            },
            duedate : {
                value: new Date()
            },
            duetime : {
                value: new Date()
            }
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.formReset = this.formReset.bind(this);
        this.formValidate = this.formValidate.bind(this);
    }

    formReset(event)
    {
        this.setState({
            title:{value: ""},
            duedate:{value: new Date()},
            duetime:{value: new Date()},
            description:{value: null}
        });
    }

    formValidate(event)
    {
        let error = false;
        if(event.target.title.value === '') {
            this.setState({ title : {errorMessage:"This field is mandatory!"}});
            error = true;
        }

        if(event.target.duedate.value === '') {
            this.setState({ duedate : {errorMessage:"This field is mandatory!"}});
            error = true;
        }

        return !error;
    }

    formSubmit(event)
    {
        event.preventDefault();
        if (this.formValidate(event)) {
            //this.props.onSubmit(event);
            let m = event;
            this.props.dispatch(addTodo(m));
        }
    }

    render()
    {
         return (
            <Card>
                <CardHeader title={this.state.headerTitle} />
                <Divider />
                <CardText>
                    <form className="todo-form" onSubmit={this.formSubmit}>
                        <TextField
                            hintText="Task Title" floatingLabelText="Title"
                            name="title" value={this.state.title.value}
                            errorText={this.state.title.errorMessage}
                        />
                        <DatePicker
                            hintText="Task Due Date" floatingLabelText="Due Date"
                            name="duedate" autoOk={true}
                            defaultDate={this.state.duedate.value}
                            errorText={this.state.duedate.errorMessage}
                        />
                        <TimePicker
                            format="24hr" hintText="Task Due Time"
                            floatingLabelText="Due Time" name="duetime"
                            autoOk={true}
                            defaultTime={this.state.duetime.value}
                        />

                        <TextField
                            hintText="Enter a complete task description" floatingLabelText="Description"
                            name="description"
                            multiLine={true} rows={2} rowsMax={4}
                        />

                        <FlatButton type="submit" label="Add Todo Item" primary={true}/>
                        <FlatButton type="button" label="Clear Form" secondary={true} onClick={this.formReset}/>
                    </form>
                </CardText>
            </Card>
        );
    }
};

const mapStateToProps = (state, ownProps) =>
{
    return {
    }
};

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        addTodo: (event, callback) => {
            event.preventDefault();
            console.log(event);
            console.log(callback);
            if(callback(event)) {
                dispatch(addTodo(event));
            }
        }
    }
};

export default connect()(TodoForm);