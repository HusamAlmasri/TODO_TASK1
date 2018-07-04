//component for holding table header and rows
window.TasksTable = React.createClass ({
    render: function() {
        var rows = this.props.tasks
            .map(function(task, i) {
                return (
                    <TaskRow
                        key={i}
                        task={task}
                        changeAppMode={this.props.changeAppMode } />
                );
            }.bind(this));

        return (
            !rows.length
                ? <div className="alert alert-danger">No Tasks Found.</div>
                : <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
        );
    }
});