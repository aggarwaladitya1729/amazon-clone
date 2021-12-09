import React , {useState} from 'react' ;
import "../stylings/login.css" ;
import {Link , useHistory} from "react-router-dom" ;
import {auth} from "../firebase" ;

function Login() {


    const [email , setEmail] = useState("") ;
    const [password , setPassword] = useState("") ;

    const signIn = (e) => {
        e.preventDefault() ;
        //Firebase Login
        auth
            .signInWithEmailAndPassword(email , password)
            .then(auth => {
                history.push("/") ;
            })
            .catch(err => {
                alert(err.message) ;
            })
    }

    const history = useHistory() ;
    const register = (e) => {
        e.preventDefault() ;
        //Firebase Register
        auth
            .createUserWithEmailAndPassword(email , password)
            .then(auth => {
                console.log(auth) ;
                if(auth) // matlab agar naya user create hua ho tab
                    history.push("/") ; // account banne k baad home page par redirect kiya
            })
            .catch(err => {
                console.log("Error in signing in user see login.jsx file register function") ;
                alert(err.message) ;
            })
    }

    return (
        <div className="login">
            <Link to="/">
                <img 
                    className="login_logo"
                    src="https://th.bing.com/th/id/OIP.vwY-F9xvepGwJxSGNIGsgwHaEo?w=282&h=180&c=7&o=5&dpr=1.25&pid=1.7" 
                    alt="Amazon logo"
                />
            </Link>
            <div className="login_container">
                <h1 className="login_title">Sign In</h1>
                <form>
                    <h5>E-Mail</h5>
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
                        onClick={signIn} 
                        type="submit" 
                        className="login_button">Sign In
                    </button>
                    <button 
                        onClick={register} 
                        type="submit" 
                        className="login_button">Register
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Login
