//component that decide which main components to load read or create/update
var MainApp = React.createClass({
    // initial mode is 'read' mode
    getInitialState: function() {
        return {
            currentMode : 'read',
            taskId: null
        };
    },

    //used when user click something that changes current mode
    changeAppMode: function(newMode, taskId) {
        this.setState({currentMode: newMode});
        if(taskId !== undefined){
            this.setState({taskId: taskId});
        }
    },

    //render the component based on select or current mode
    render: function() {
        var modeComponent =
            <ReadTasksComponent changeAppMode={this.changeAppMode}/>;

        switch(this.state.currentMode) {
            case 'read' :
                break;
            case 'readOne' :
                modeComponent = <ReadOneTaskComponent taskId={this.state.taskId} changeAppMode={this.changeAppMode} />;
                break;
            case 'create' :
                modeComponent = <CreateTaskComponent changeAppMode={this.changeAppMode} />;
                break;
            case 'update' :
                modeComponent = <UpdateTaskComponent taskId={this.state.taskId} changeAppMode={this.changeAppMode} />;
                break;
            case 'delete' :
                modeComponent = <DeleteTaskComponent taskId={this.state.taskId} changeAppMode={this.changeAppMode} />;
                break;
            default :
                break;
        }

        return modeComponent;
    }
});

// go and render the whole react component on the div with id 'content'
ReactDOM.render(< MainApp />, document.getElementById('content'));