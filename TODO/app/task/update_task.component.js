window.UpdateTaskComponent = React.createClass({
    getInitialState: function() {
        return {
            id: 0,
            taskName: '',
            taskDescription: '',
            successUpdate: null
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


    //handling field changes

    onNameChange: function(e) {
        this.setState({taskName: e.target.value});
    },

    onDescriptionChange: function(e) {
        this.setState({taskDescription: e.target.value});
    },

    //handle save changes button clicked
    onSave: function(e) {

        //collect data in the form
        var form_data = {
            id: this.state.id,
            taskName:this.state.taskName,
            taskDescription:this.state.taskDescription,
        };

        //submit form data to api
        $.ajax({
            url: 'http://localhost:63342/TODO/api/tasks/update.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(form_data),
            success: function(response) {
                this.setState({successUpdate: response['message']});
            }.bind(this),
            error: function(xhr, resp, text) {
                //show error to console
                console.log(xhr,resp,text);
            }
        });

        e.preventDefault();
    },

    render: function() {

        return (
            <div>
                {
                    this.state.successUpdate == "Task was updated." ?
                        <div className='alert alert-success'>
                            Task Was Updated.
                        </div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update task." ?
                        <div className='alert alert-danger'>
                            Unable to update task. Please try again.
                        </div>
                        : null
                }

                <a href="#"
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary m-b-1em'>
                    Read Tasks
                </a>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Task Name</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.taskName}
                                    onChange={this.onNameChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Task Description</td>
                            <td>
                                    <textarea
                                        className='form-control'
                                        required
                                        value={this.state.taskDescription}
                                        onChange={this.onDescriptionChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onSave}>Save Changes</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});