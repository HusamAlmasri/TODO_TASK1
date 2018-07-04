//component that contains all the logic and other small components that forms the REACT task view

window.ReadTasksComponent = React.createClass({
    getInitialState: function() {
        return {
            tasks: []
        };
    },

    //on mount fetch all tasks and store them as this components state
    componentDidMount: function() {
        this.serverRequest = $.get("http://localhost:63342/TODO/api/tasks/read.php", function(tasks) {
            this.setState({
                tasks: tasks.data
            });
        }.bind(this));
    },

    //on unmount kill tasks fetching in case request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    //render components on page
    render: function() {
        //list tasks
        var filteredTasks = this.state.tasks;
        $('.page-header h1').text("Read Tasks");

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode = {this.props.changeAppMode} />

                <TasksTable
                    tasks={filteredTasks}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );

    }

});