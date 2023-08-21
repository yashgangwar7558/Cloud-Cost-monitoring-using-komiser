import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { auth } from "../firebase-config"
import { useHistory } from 'react-router-dom';
import { useContext } from "react"
import { UserContext } from "../App"

export default function Login() {

    let { user, setUser } = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            window.M.toast({ html: `Welcome ${result.user.email}`, classes: "green" })
            history.push("/")
        } catch (err) {
            window.M.toast({ html: err.message, classes: "red" })
        }
    }

    return (
        <div className="center container" style={{ maxWidth: "500px" }}>
            <h3>Please Login Here...</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </div>
                <button type="submit" className="btn blue">Login</button>
            </form>
            <h6 style={{margin: "3rem"}}>New User ? <Link to="/signup">Sign up</Link></h6>
        </div>
    )
}
