import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class Form extends Component{
    setValue = () => {
        let reminder = document.getElementById('note').value;
        let time = document.getElementById('time').value;

        return{
            reminder,
            time
        }
        
    }

    clearFields = () => {
        document.getElementById('note').value = '';
        document.getElementById('time').value = '';
    }

    render(){
        return(
            <form>
                <h1>{this.props.date} {moment(this.props.month).format('MMMM')} {this.props.year}</h1>
                <h3>Add Note</h3>
                <div id="message"></div>
                <div>
                    <label htmlFor="note">Note:</label>
                    <input type="text" id="note" name="note" required />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input type="time" id="time" name="time" required />
                </div>

                <button type="submit" onClick={(e) => {
                    if(this.setValue().reminder !== '' && this.setValue().time !==''){
                        e.preventDefault();
                        this.props.addReminder(`${this.props.date}${this.props.month}${this.props.year}`, this.setValue().reminder, this.setValue().time);
                        this.clearFields();}
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
    return{
        addReminder: (key, note, time) => {
            dispatch({
            type: 'ADD_NOTE',
            payload: {
                key,
                note,
                time 
            }
        })}
    }
}


export default connect(null, mapDispatchToProps)(Form);