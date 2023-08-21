import React from 'react'
import { Link } from 'react-router-dom'
import todoicon from "../images/todoicon.png"
import "./navbar.css"
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { useContext } from "react"
import { UserContext } from "../App"
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase-config';

export default function Navbar() {

    let { user, setUser } = useContext(UserContext)
    const history = useHistory()

    return (
        <nav>
            <div className="nav-wrapper blue">
                <img src={todoicon} alt="todologo" style={{height: "40px",width: "40px",margin: "1rem"}}></img>
                <Link to="/" className="brand-logo todo-btn" style={{ marginLeft: '0.5rem' }}>TODO APP</Link>
                <ul id="nav-mobile" className="right" style={{ marginRight: '1rem' }}>
                    {
                        user ? 
                        <li>
                           <button className="btn red" onClick={() => {
                               console.log(user);
                               auth.signOut()
                               history.push("/login")
                           }}>Logout</button>
                        </li>
                        :
                        <>
                           <li className="login-btn"><Link to="/login">LOGIN</Link></li>
                           <li className="signup-btn"><Link to="/signup">SIGN UP</Link></li>
                        </>
                    }
                </ul>
            </div>
        </nav>

    )
}
