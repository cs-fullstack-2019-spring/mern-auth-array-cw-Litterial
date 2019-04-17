import React, {Component} from 'react'
import {BrowserRouter as Link,Router,Route} from "react-router-dom";

export default class SignUp extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            message:''
        }


    }

    createUser=(e)=>
    {
        e.preventDefault();
        console.log(e.target);
        fetch('/users/newuser', {
                method:'POST',

                headers:
                    {
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                    },
                body:JSON.stringify({
                    username:e.target.username.value,
                    password:e.target.password.value,
                    // fav_books:e.target.fav_books.value
                }),
            })
                .then(data=>data.text())//fitlers out text. this will help us read a message on the screen
                .then(message=>this.setState({message:message}))


    };


    render()
    {
        return(
            <div>
                <form onSubmit={this.createUser}>
                    <label htmlFor='username'>UserName:</label>
                    <input type='text' id='username' name='username'/>
                    <p></p>
                    <label htmlFor='password'>Password:</label>
                    <input type='passsword' id='password' name='password'/>
                    <p></p>
                    {/*<label htmlFor='fav_books'>Favorite Book:</label>*/}
                    {/*<input type='text' id='fav_books' name='fav_books'/>*/}
                    <button>Submit</button>
                </form>
                <h1>{this.state.message}</h1>
            </div>
        )

    }
}