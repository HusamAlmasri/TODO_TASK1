window.CreateTaskComponent = React.createClass({

    getInitialState: function() {
        return {
            taskName: '',
            taskDescription: '',
            successCreation: null
        };
    },

    //handle name change
    onNameChange: function(e) {
        this.setState({taskName: e.target.value});
    },

    //handle description change
    onDescriptionChange: function(e) {
        this.setState({taskDescription: e.target.value});
    },

    //handle save button clicked
    onSave: function(e) {
        //data in the form
        var form_data = {
            taskName : this.state.taskName,
            taskDescription : this.state.taskDescription,
        };

        //submit data to api
        $.ajax({
            url: "http://localhost:63342/TODO/api/tasks/create.php",
            type: "POST",
            contentType: "application/json",
            data : JSON.stringify(form_data),
            success: function(response) {
                //api message
                this.setState({successCreation: response['message']});

                //empty form
                this.setState({taskName: ""});
                this.setState({taskDescription: ""});
            }.bind(this),
            error: function(xhr, resp, text) {
                //show error to console
                console.log(xhr,resp,text);
            }
        });

        e.preventDefault();
    },

    //render Component Here
    render : function() {

        return (
            <div>
                {
                    this.state.successCreation == "Task was created." ?
                        <div className="alert alert-success">
                            Task Was Saved.
                        </div>
                        : null
                }

                {
                    this.state.successCreation == "Unable to create task." ?
                        <div className="alert alert-danger">
                            Unable to save task. Please try again.
                        </div>
                        : null
                }

                <a href="#"
                   onClick={() => this.props.changeAppMode('read')}
                   className="btn btn-primary m-b-1em"> Read Tasks
                </a>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Task Name</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.taskName}
                                    required
                                    onChange={this.onNameChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Task Description</td>
                            <td>
                                <textarea
                                    className="form-control"
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