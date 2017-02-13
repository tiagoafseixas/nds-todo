import React from 'react';
import TodoRow from './TodoRow';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class TodoList extends React.Component
{

    constructor()
    {
        super();
    }

    render()
    {
        return(
            <Table selectable={false}>
                <TableHeader displaySelectAll={false}
                    adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Due Date</TableHeaderColumn>
                        <TableHeaderColumn>Description</TableHeaderColumn>
                        <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.props.todolist.map((item) => {
                        return <TodoRow 
                            key={item._id}
                            title={item.title} 
                            duedate={item.duedate}
                            duetime={item.duetime}
                            description={item.description} />
                    })}
                </TableBody>
            </Table>
        )
    }
};

export default TodoList;