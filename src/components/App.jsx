import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';


class App extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      text: '',
      dueDate:''
    };
  }

  addReminder(){
    this.props.addReminder(this.state.text, this.state.dueDate);
    console.log('this.state.dueDate', this.state.dueDate);
  }
  deleteReminder(id){
    console.log('>>>>>ID for Delete= ',id);
    console.log('Props having functions = ', this.props);
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const { reminders } = this.props;
    return (
      <ul className="lis-group col-sm-4">
        {
          reminders.map(reminder =>{
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div className="list-item delete-button"
                  onClick={() => this.deleteReminder(reminder.id)}>
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
    render() {
        return (
            <div className="App">
                <div className="title">Pending Task</div>
                <div className="form-inline reminder-form">
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="I have to..."
                      onChange={event => this.setState({text: event.target.value})}
                      />
                    <input
                      className="from-control"
                      type = "datetime-local"
                      onChange = {event => this.setState({dueDate: event.target.value})}/>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() =>this.addReminder()}>Add Pending Tasks</button>
                </div>
                { this.renderReminders() }
                <div
                  className = 'btn btn-danger'
                  onClick = {() => this.props.clearReminders()}
                  >
                  Clear All Reminders
                </div>
            </div>
        );
    }
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({addReminder}, dispatch);
// }

function mapStateToProps(state) {
  return {
    reminders: state
  }
}
export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App);
