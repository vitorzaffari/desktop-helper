import './TasksForm.scss'


const TasksForm = () => {
  return (
    <div className='tasks-form-div'>
        <div className="tasks-label">
            <h3>Add a new task</h3>
        </div>
        <div className="task-input-wrap">
            <label htmlFor="name">Enter the task name</label>
            <input className='task-input' type="text" />
        </div>
    </div>
  )
}

export default TasksForm