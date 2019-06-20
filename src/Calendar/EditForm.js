import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


class EditForm extends Component{
    setValue = () => {
        console.log(this.props);
        let obj = this.props.reminders[`${this.props.date}${this.props.month}${this.props.year}`].filter((cur)=>{
            return cur.time === this.props.time;
        });
        console.log(obj);
        
        let reminder = document.getElementById('note').value;
        let time = document.getElementById('time').value;

        return{
            obj,
            reminder,
            time
        }
    }

    render(){
        return(
            <form>
                <h1>EDIT PAGE</h1>
                <div id="message"></div>
                <div>
                    <label htmlFor="note">Note:</label>
                    <input type="text" id="note" name="note" required />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input type="time" id="time" name="time" defaultValue={this.props.time} required />
                </div>
                
                <button type="submit" onClick={(e) => {
                    if(this.setValue().reminder !== '' && this.setValue().time !==''){
                        e.preventDefault();
                        this.props.editReminder(`${this.props.date}${this.props.month}${this.props.year}`, this.setValue().reminder, this.setValue().time, this.props.time);
                        console.log(this.setValue().reminder, this.setValue().time, this.props.time);
                    }
                        
                        else{
                            alert('Complete Fields');
                        }
                    }
                    }>
                    <i className="fa fa-check" aria-hidden="true"></i>
                </button>
                
                <button><Link to={`/calendar`}><i className="fa fa-times" aria-hidden="true"></i></Link></button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    console.log('IN Dispatcher');
    return{
        editReminder: (key, note, time, oldTime) => {
            dispatch({
            type: 'EDIT_NOTE',
            payload: {
                key,
                note,
                time,
                oldTime
            }
        })}
    }
}

const mapStateToProps = state => {
    console.log(state.addNote.reminders);
    return{
        reminders: state.addNote.reminders
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);