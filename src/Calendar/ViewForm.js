import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './ViewForm.css'

class ViewForm extends Component{

    render(){
        return(
            <div className="ViewForm">
                <h1>VIEW PAGE</h1>
                {(`${this.props.date}${this.props.month}${this.props.year}` in this.props.reminders) ?
                    <ul>
                    {this.props.reminders[`${this.props.date}${this.props.month}${this.props.year}`].map((cur, index)=>{
                        return <li key={`${cur.note}+${index}`}>({cur.time})<span>{cur.note}</span>
                        <button id="edit"><Link to={`/event/edit/${this.props.date}${this.props.month}${this.props.year}/${cur.time}`}>Edit</Link></button>
                        </li>
                    })}
                </ul> : <div className="comment">Please Add Some Notes!</div>
                }
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state, state.addNote, state.addNote.reminder);
    return {
        reminders: state.addNote.reminders
    };
};

export default connect(mapStateToProps)(ViewForm);