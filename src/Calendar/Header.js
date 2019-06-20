import React, {Component} from 'react';
import moment from 'moment';
import './Header.css';

class Header extends Component{

    constructor(props){
        super(props);
        this.handleYear = this.handleYear.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
    }

    handleYear(e){
        this.props.passYear(e.target.value);
    }

    handleMonth(e){
        this.props.passMonth(e.target.value);
    }

    render(){
        const years = [];
        const months = [];
        for(let i = 1; i<=3000; i++){
            years.push(i);
        }
        for(let i = 0; i<12; i++){
            months.push(i);
        }
        const yearsList = years.map(cur => <option key={cur}>{cur}</option>);
        const monthsList = months.map(cur => <option key={cur}>{moment().month(cur).format("MMMM")}</option>);
        return(
            <div className="Header">
                <select id="year" defaultValue={this.props.year} onChange={this.handleYear}>{yearsList}</select>
                <select id="month" defaultValue={moment().month(this.props.month-1).format("MMMM")} onChange={this.handleMonth}>{monthsList}</select>
            </div>
        );
    }
}

export default Header;