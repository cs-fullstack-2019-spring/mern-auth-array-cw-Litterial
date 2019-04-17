import React, {Component} from 'react'
// import {BrowserRouter as Link,Router,Route} from "react-router-dom";
import {BrowserRouter as Router,Link,Route} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

export default class Homepage extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            loggedin:false,
            username:null,
            books:null,
            message:''
        }
    }

loginSwitch=(username,books,loggedin)=>
{
    this.setState({username:username,books:books,loggedin:loggedin})
};
    logout=(e)=>{
        this.setState({
            isLoggedIn: true,
            username: null,
            email: null,
        });
    // This is telling the server to clear the cookie (session) data
    fetch('/users/logout')
    .then(data=>data.text())
    // Console log any messages the server sends back
    .then(data=>console.log(data));
};



    render()
    {
        return(
            <div>
                <Router>
                <Link to ='/'>Home</Link>
                    <Link to ='/signin'>Sign in</Link>
                <Link to ='/signup'>Sign Up</Link>
                <Link to ='signout' onClick={this.logout}>Sign out</Link>
                <Route path ={'/signup'} component={()=><SignUp/>}/>
                <Route path={'/signin'} component={()=><SignIn loginSwitch={this.loginSwitch}/>}/>
                <Route path={'/signout'} component={()=><SignOut/>}/>
                </Router>
            </div>
        )

    }
}