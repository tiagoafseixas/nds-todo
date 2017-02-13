import React, { PropTypes } from 'react';
import {Table, TableRow, TableRowColumn} from 'material-ui/Table';

class TodoRow extends React.Component
{
    render() {
        return(
            <TableRow className = "todo-row">
                <TableRowColumn></TableRowColumn>
                <TableRowColumn>{this.props.title}</TableRowColumn>
                <TableRowColumn>{this.props.duedate} {this.props.duetime}</TableRowColumn>
                <TableRowColumn>{this.props.description}</TableRowColumn>
            </TableRow>
        )
    }
};

TodoRow.propTypes = {
    title: PropTypes.string.isRequired
};

export default TodoRow;