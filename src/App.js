import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import Four04 from './404/404';
import Form from './Calendar/Form';
import EditForm from './Calendar/EditForm';
import ViewForm from './Calendar/ViewForm';

class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     year: 2019,
  //     month: 6  
  //   };
  //   this.handleYear = this.handleYear.bind(this);
  // }
  // handleYear(changedYear){
  //   this.setState({
  //     year: changedYear
  //   });
  // }

  render (){
    return(
      <div className="App">
          <Switch>
            <Route exact path={`/calendar/:year/:month`} render={routeProps => <Calendar year={routeProps.match.params.year} month={routeProps.match.params.month} {...routeProps}/> } />
            <Route exact path={`/event/new/:year/:month/:date`} render={routeProps => <Form year={routeProps.match.params.year} month={routeProps.match.params.month} date={routeProps.match.params.date} {...routeProps} /> } />
            <Route exact path={`/event/edit/:date:month:year/:time`} render={routeProps => <EditForm year={routeProps.match.params.year} month={routeProps.match.params.month} date={routeProps.match.params.date} time={routeProps.match.params.time} {...routeProps} /> } />
            <Route exact path={`/event/view/:date:month:year`} render={routeProps => <ViewForm year={routeProps.match.params.year} month={routeProps.match.params.month} date={routeProps.match.params.date} {...routeProps} /> } />
            <Route exact path={'/calendar'} render={(routeProps)=><Calendar {...routeProps}/>}/>
            <Route exact path={'/'} render={()=> <Redirect to="/calendar"/>}/>
            <Route component={Four04}/> 
          </Switch>
      </div>)
  };
}

export default App;
