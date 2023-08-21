import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { auth } from "../firebase-config"
import { useHistory } from 'react-router-dom';
import { useContext } from "react"
import { UserContext } from "../App"

export default function Signup() {

    let { user, setUser } = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmpassword) {
            try {
                const result = await auth.createUserWithEmailAndPassword(email, password)
                window.M.toast({ html: `Welcome ${name} (${result.user.email})`, classes: "green" })
                history.push("/")
            } catch (err) {
                window.M.toast({ html: err.message, classes: "red" })
            }
        } else {
            window.M.toast({ html: "Password and confirm password are not same", classes: "red" })
        }
    }

    return (
        <div className="center container" style={{ maxWidth: "500px", overflow: "hidden" }}>
            <h3>Please SignUp...</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <input type="text" placeholder="Username" onChange={(e) => { setName(e.target.value) }} value={name} />
                    <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    <input type="password" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmpassword} />
                </div>
                <button type="submit" className="btn blue">Sign Up</button>
            </form>
            <h6 style={{margin: "3rem"}}>Already have an account ? <Link to="/login">Log in</Link></h6>
        </div>
    )
}
