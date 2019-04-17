import React, {Component} from 'react'
import {BrowserRouter as Link,Router,Route} from "react-router-dom";

export default class SignIn extends Component{
    constructor(props)
    {
        super(props);
        this.state={login_message:''}

    }


    userSignedin=(e)=>
    {
        e.preventDefault();
        fetch('/users/login',
            {
                method:'POST',
                headers:
                    {
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                    },
                body:JSON.stringify({
                    username:e.target.username.value,
                    password:e.target.password.value,
                })

            })
            .then(info=>info.json())
            .then(data=> {

                if (data.islogged)
                {
                    this.setState({login_message:data.message});
                    this.props.loginSwitch(data.username,data.email,true)
                }

                else
                {
                    this.setState({login_message:data.message});
                }

            });
    };

            render()
    {
        return(
            <div>
                <h1>Sign in</h1>
                <form onSubmit={this.userSignedin}>
                    <label htmlFor='username'>UserName:</label>
                    <input type='text' id='username' name='username'/>
                    <p></p>
                    <label htmlFor='password'>Password:</label>
                    <input type='passsword' id='password' name='password'/>
                    <p></p>
                    <button>Submit</button>
                </form>
                <h1>{this.state.login_message}</h1>

            </div>
        )

    }
}