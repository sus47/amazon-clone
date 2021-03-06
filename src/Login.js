import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';
function Login() {
    const history = useHistory();
    //this allows us to programmatically change the login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault();
        //this prevent page from refreshing

        //some firebase login
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }
    const register = e => {
        e.preventDefault();
        //some firebase register
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error =>
                alert(error.message))
    }


    return (
        <div className="login">
            <Link to='/'>
                <img
                    className="login_logo"
                    src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-768x307.png"
                />
            </Link>
            <div className="login_container">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type='submit'
                        onClick={signIn}
                        className="login_signInButton">
                        Sign In
                        </button>
                </form>
                <p>By signing-in you agree to AMAZON FAKE CLONE Conditions
                    of use & Sale. Please see our Privacy Notice,
                    our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <button
                    onClick={register}
                    className="login_registerButton">
                    Create your Amazon Account
                    </button>
            </div>
        </div >
    )
}

export default Login
