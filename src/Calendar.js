import React, {Component} from 'react';
import Header from './Calendar/Header';
import Dates from './Calendar/Dates';
import {Link} from 'react-router-dom';
import moment from 'moment';
import './Calendar.css'

class Calendar extends Component{
    constructor(props){
        super(props);
        var {props: {year, month}} = this;
        if(!(month<=12 && typeof parseInt(month) === 'number')){
            month = null;
        }
        if(!(year >= 1 && year<=3000 && typeof parseInt() === 'number')){
            year = null;
        }
        this.state = {
            year: year || moment().year(),
            month: month || moment().month()+1
        };
        this.datesArr = [[],[],[],[],[],[],[]];
        
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.update = this.update.bind(this);
        this.updateMonth = this.updateMonth.bind(this);
        // this.updateYear = this.updateYear.bind(this);
    }

    componentWillMount(){
        let date = new Date(`${this.state.year}/${moment().month(this.state.month).format("M")}/1`);
        for(let t = 0; t<moment(`${this.state.year}/${this.state.month}/01`).day(); t++){
            this.datesArr[t].push('-');
        }
        for(let i = 1; i<=moment(date).daysInMonth(); i++){
            date = new Date(`${this.state.year}/${this.state.month}/${i}`);
            // console.log(moment(date).day());
            this.datesArr[moment(date).day()].push(i);
        } 
    }

    changeMonth(changedMonth){
        console.log(changedMonth, moment().month(changedMonth).format("M"));
        this.setState({
            month: moment().month(changedMonth).format("M")
        });
    }

    changeYear(changedYear){
        console.log(changedYear);
        this.setState({
            year: changedYear
        });
    }

    update(){
        this.datesArr = [[],[],[],[],[],[],[]];
        let date = new Date(`${this.state.year}/${moment().month(this.state.month).format("M")}/1`);
        for(let t = 0; t<moment(`${this.state.year}/${moment().month(this.state.month).format("M")}/01`).day(); t++){
            this.datesArr[t].push('-');
        }
        for(let i = 1; i<=moment(date).daysInMonth(); i++){
            date = new Date(`${this.state.year}/${moment().month(this.state.month).format("M")}/${i}`);
            this.datesArr[moment(date).day()].push(i);
        } 
        // console.log(moment(date).daysInMonth());
        // console.log(moment().month(this.state.month).format("MMMM"));
        // console.log(this.state.year);
    }

    // componentDidUpdate(){
    //     const {props: {match: {params:  {year, month}}}} = this;
    //     this.setState({/event/new/:year/:month/:day
    //         year: year,
    //         month: month
    //     })
    // }

    updateMonth = (type) =>{
        let {year, month} = this.state;
        // console.log(year);
        // console.log(month);
        // console.log(type);
    
        if(type === 'decr'){
            if(month !== 1){
                this.setState({
                    month: --month
                })
                this.props.history.push(`/calendar/${year}/${month}`);
            }else{
                month = 12;
                this.setState({
                    month: month,
                    year: --year
                })
                this.props.history.push(`/calendar/${year}/${month}`);
            }
        }
        else{
            if(month !== 12){
                this.setState({
                    month: ++month
                });
                this.props.history.push(`/calendar/${year}/${month}`);
            }else{
                month = 1;
                this.setState({
                    month: month,
                    year: ++year
                });
                this.props.history.push(`/calendar/${year}/${month}`);
            }
        }
        this.update();
    }

    // updateYear = (year, month, type) =>{
    //     if(type === 'decr' && month === 1){
    //         this.props.history.push(`/calendar/${year}/${month--}`);            
    //         this.setState({
    //             year: year--
    //         })
    //     }else if(type === 'incr' && month === 12){
    //         this.setState({
    //             year: year++
    //         })
    //     }
    //     return this.state.year;
    // }

    

    render(){
        // const {props: {match: {params:  {year, month}}}} = this;
        // console.log("year: ", year, "month: ", month)
        // console.log(this.props);
        // this.update();
        return(
            <div className="Calendar">
                {/* <Link to={`/calendar/${this.updateYear(this.state.year, this.state.month, 'decr')}/${this.updateMonth(this.state.year, this.state.month, 'decr')}`}> */}
                <button className="decr"><i onClick={() => this.updateMonth('decr')} className="fa fa-arrow-left" aria-hidden="true"></i></button>
                {/* </Link> */}
                {/* <Link to={`/calendar/${this.updateYear(this.state.year, this.state.month, 'incr')}/${this.updateMonth.bind(this.state.year, this.state.month, decr)(this.state.year, this.state.month, 'incr')}`}> */}
                <button className="incr"><i onClick={() => this.updateMonth('incr')} className="fa fa-arrow-right" aria-hidden="true"></i></button>
                {/* </Link> */}
                    
                <Header year={this.state.year} month={this.state.month} passYear={this.changeYear} passMonth={this.changeMonth}/>
                {/* <button onClick={}><i class="fa fa-arrow-right" aria-hidden="true"></i></button>       */}
                <button className="link-submit" onClick={this.update}><Link to={`/calendar/${this.state.year}/${this.state.month}`}>Sumbit</Link></button>
                <table>
                    <thead>
                        <tr id="nameDays">
                            <td>Sunday</td>
                            <td>Monday</td>
                            <td>Tuesday</td>
                            <td>Wednesday</td>
                            <td>Thursday</td>
                            <td>Friday</td>
                            <td>Saturday</td>   
                        </tr>
                    </thead>
                    <tbody>
                        <Dates datesArr={this.datesArr[0]} year={this.state.year} month={this.state.month} day="Sunday"/>
                        <Dates datesArr={this.datesArr[1]} year={this.state.year} month={this.state.month} day="Monday"/>
                        <Dates datesArr={this.datesArr[2]} year={this.state.year} month={this.state.month} day="Tuesday"/> 
                        <Dates datesArr={this.datesArr[3]} year={this.state.year} month={this.state.month} day="Wednesday"/>
                        <Dates datesArr={this.datesArr[4]} year={this.state.year} month={this.state.month} day="Thursday"/>
                        <Dates datesArr={this.datesArr[5]} year={this.state.year} month={this.state.month} day="Friday"/>
                        <Dates datesArr={this.datesArr[6]} year={this.state.year} month={this.state.month} day="Saturday"/>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;

//<Switch>
/* <Route exact path={`/${this.state.year}`} component={()=><Calendar currentYear={this.state.year} changeYear={this.handleYear}/>} />
{/* <Route exact path='/year/month' component={()=><Calendar changeYear={this.handleYear}/>} /> */
// </Switch> */}