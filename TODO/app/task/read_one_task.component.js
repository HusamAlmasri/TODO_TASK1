//component that contains logic to read one task
window.ReadOneTaskComponent = React.createClass({
     getInitialState: function() {
        return {
            id: 0,
            taskName: '',
            taskDescription: '',
        };
    },

    componentDidMount: function() {
        var taskId = this.props.taskId;

        this.serverRequest = $.get("http://localhost:63342/TODO/api/tasks/read_one.php?id=" + taskId,
            function(task) {
                this.setState({id: task.id});
                this.setState({taskName:task.taskName});
                this.setState({taskDescription: task.taskDescription});
            }.bind(this));

        $('.page-header h1').text("Read Task");
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return (
            <div>
                <a href="#"
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary m-b-1em'> Read Tasks
                </a>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Task Name</td>
                            <td>{this.state.taskName}</td>
                        </tr>
                        <tr>
                            <td>Task Description</td>
                            <td>{this.state.taskDescription}</td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});