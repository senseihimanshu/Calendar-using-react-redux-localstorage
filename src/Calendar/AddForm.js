import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import './AddForm.css';

class AddForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            show: false,
            notesArr: [],
            active: false
        };
    }

    clearFields = (e) => {
        document.getElementById('note').value = '';
        document.getElementById('time').value = '';
        if(this.state.notesArr.length > 0){
            this.setState({
                active: true
            });
            (e.target.parentNode.parentNode.parentNode).style.backgroundColor = 'yellow';
        }else{
            this.setState({
                active: false
            });
        }
    }

    setValue = (e) =>{
        // let key =  e.target['name'];
        // console.log(key);
        let reminder = '', time = '';
        let {notesArr} = this.state;
        reminder = document.getElementById('note').value;
        time = document.getElementById('time').value;
        if(reminder !== '' && time !== ''){
            notesArr.push({
                reminder,
                time
            });
    
            this.setState({
                notesArr: notesArr       
            });
            console.log(this.state, notesArr);

            document.getElementById('message').innerHTML = 'Submitted';
            setTimeout(()=>{
                if(document.getElementById('message')){
                    document.getElementById('message').innerHTML = '';
                }
                this.setState({
                    open: false
                });
            }, 2500);
            this.clearFields(e);
        }
    }

    pushObj = (e) =>{
        e.preventDefault();
        this.setValue(e);
    }

    toggleOpen(open){
        this.setState({
            open: !open
        });
        // console.log(open);
    }

    toggleShow(show){
        this.setState({
            show: !show
        });
    }

    render(){
        return(
            <div className="AddForm">
                <div>
                    <button onClick={this.toggleOpen.bind(this, this.state.open)} id="add">{!this.state.open?<Link to={`/event/new/${this.props.year}/${this.props.month}/${this.props.date}`}><i className="fa fa-plus" aria-hidden="true"></i></Link> : <i className="fa fa-times" aria-hidden="true"></i>}</button>
                
                    <button id="show"><Link to={`/event/view/${this.props.date}${this.props.month}${this.props.year}`}>Show</Link></button>
                    {/* <button onClick={() => this.toggleShow(this.state.show)} id="edit"><Link to={`/event/edit/${this.props.reminders[`${this.props.date}${this.props.month}${this.props.year}`]}`}>Edit</Link></button> */}
                </div>
                
                {this.state.open?
                    <form>
                        <div id="message"></div>
                        <div>
                            <label htmlFor="note">Note:</label>
                            <input type="text" id="note" name="note" />
                        </div>
                        <div>
                            <label htmlFor="time">Time:</label>
                            <input type="time" id="time" name="time" />
                        </div>
                        <button onClick={this.pushObj} type="submit"><i className="fa fa-check" aria-hidden="true"></i></button>
                        <button onClick={this.toggleOpen.bind(this, this.state.open)}>Close</button>
                    </form>  :
                    <div></div>
                }

                {this.state.show?
                    <ul className='reminders'><div>Reminders:
                        {this.props.reminders[`${this.props.date}${this.props.month}${this.props.year}`].map((cur, index)=>{
                            return <li key={cur.note+index}><span>({cur.time})</span>{cur.note}<button><i className="fa fa-pencil move" aria-hidden="true"></i></button>
                            <button><i className="fa fa-trash move" aria-hidden="true"></i></button>
                            </li>
                        })}
                    </div></ul> :
                    <div></div>
                }
                
            </div>
        );        
    }
}


const mapStateToProps = (state) => {
    if(state!==undefined)
        return {
            reminders: state.addNote.reminders
    };
    return{
        reminders: {}
    }
}

// const mapDispatchToProps=(dispatch)=>{
//     return {
//         addReminder: () => {
//           dispatch({ type: "ADD_REMINDER", 
//             payload: {
//                 // reminder: AddForm.
//             }
//         });
//         }
//     };
// }

export default connect(mapStateToProps)(AddForm);