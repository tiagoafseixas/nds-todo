import React, { PropTypes } from 'react';
import {Table, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionAlarm from 'material-ui/svg-icons/action/alarm';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDone from 'material-ui/svg-icons/action/done';
import { deleteTodo } from '../actions';
import { connect } from 'react-redux';

class TodoRow extends React.Component
{
    render() {
        return(
            <TableRow className = "todo-row">
                <TableRowColumn>{this.props.title}</TableRowColumn>
                <TableRowColumn>{this.props.duedate} {this.props.duetime}</TableRowColumn>
                <TableRowColumn>{this.props.description}</TableRowColumn>
                <TableRowColumn>
                    <IconButton tooltip="SVG Icon">
                        <ActionAlarm />
                    </IconButton>
                    <IconButton tooltip="SVG Icon" onClick={() => this.props.dispatch(deleteTodo(this.props.id))} >
                        <ActionDelete />
                    </IconButton>
                    <IconButton tooltip="SVG Icon">
                        <ActionDone />
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteFunction: () => {
            dispatch(deleteTodo(ownProps.id));
        }
    }
};

export default connect()(TodoRow);