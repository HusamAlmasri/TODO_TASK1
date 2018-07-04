window.TaskRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.tasks.taskName}</td>
                <td>{this.props.tasks.taskDescription}</td>
                <td>
                    <a href="#"
                       onClick={() => this.props.changeAppMode('readOne', this.props.tasks.id)}
                       className="btn btn-info m-r-1em"> Read One
                    </a>
                    <a href="#"
                       onClick={() => this.props.changeAppMode('update', this.props.tasks.id)}
                       className="btn btn-primary m-r-1em"> Edit
                    </a>
                    <a href="#"
                       onClick={() => this.props.changeAppMode('delete', this.props.tasks.id)}
                       className="btn btn-danger"> Delete
                    </a>
                </td>
            </tr>
        );
    }
});