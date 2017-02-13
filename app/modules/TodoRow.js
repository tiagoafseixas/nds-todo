import React, { PropTypes } from 'react';
import {Table, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionAlarm from 'material-ui/svg-icons/action/alarm';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDone from 'material-ui/svg-icons/action/done';

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
                    <IconButton tooltip="SVG Icon">
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

TodoRow.propTypes = {
    title: PropTypes.string.isRequired
};

export default TodoRow;