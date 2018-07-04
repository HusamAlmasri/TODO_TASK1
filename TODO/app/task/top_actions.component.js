//components that contain functionalities that appear on top of the task table: create task

window.TopActionsComponent = React.createClass({
    render:function() {
        return (
            <div>
                <a href="#"
                   onClick={() => this.props.changeAppMode('create')}
                   className='btn btn-primary m-b-1em'> Create Task
                </a>
            </div>
        );
    }
});