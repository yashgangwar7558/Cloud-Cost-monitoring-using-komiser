import React, { useState, useEffect } from 'react'
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { auth, db } from "../firebase-config"
import { useContext } from "react"
import { UserContext } from "../App"
import "./todo.css"
import { useHistory } from 'react-router-dom';

let unsubscribe = () => { };

export default function Todo() {

    const history = useHistory()
    let { user, setUser } = useContext(UserContext)
    let [inputData, setInputData] = useState('')
    let [items, setItems] = useState([])


    // to get previous todos from the firestore
    useEffect(() => {
        if (user) {
            const docRef = db.collection('todos').doc(user.uid)
            unsubscribe = docRef.onSnapshot(docSnap => {   // whenever we want to access database it will give the document stored in firestore
                if (docSnap.exists) {
                    setItems(docSnap.data().todos)  // will give the data stored in that document named todos
                } else {
                    console.log("No docs found in firestore");   // when u delete all items ...u actually delete the whole document
                    setItems([])
                }
            })
        } else {
            history.push("/login")
        }

        return () => {
            unsubscribe()  // to stop using it in the background when not needed
        }
    }, [])


    // to add new todo in the database -- in previous use effect we are getting the old todos from firestore into items and than adding those (items + new input todo) in firestore
    const addItem = () => {
        if (!inputData) {
            alert("Please write something in the input box")
        } else {
            let today = new Date()
            let allInputData = {
                data: inputData,
                date: today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
                time: today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
                checkbox: false
            }
            db.collection('todos').doc(user.uid).set({
                todos: [...items, allInputData]
            })
            setInputData('')
        }
    }


    const handleCheckbox = (id) => {
        const docRef = db.collection('todos').doc(user.uid)
        docRef.get().then(docSnap => {
            const result = docSnap.data().todos.map((item) => {
                if (id === item.time && item.checkbox === false) {
                    return { ...item, checkbox: true }
                } else if (id === item.time && item.checkbox === true) {
                    return { ...item, checkbox: false }
                }
                return item;
            })

            docRef.update({
                todos: result
            })
        })
        
    }


    const deleteItem = (id) => {
        const docRef = db.collection('todos').doc(user.uid)
        docRef.get().then(docSnap => {
            const result = docSnap.data().todos.filter((item) => item.time !== id)
            docRef.update({
                todos: result
            })
        })
    }


    const deleteAllItems = () => {
        const docRef = db.collection("todos").doc(user.uid).delete()
    }


    return (
        <div>
            <h4 className="center">Add your list here 👇</h4>
            <div className="input-div">
                <div className="input-field input">
                    <input type="text" placeholder="✍ Add items" className="input-field"
                        value={inputData}
                        onChange={(e) => {
                            setInputData(e.target.value)
                        }}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                addItem()
                            }
                        }}></input>
                </div>
                <div className="add-btn">
                    <button type="submit" className="btn blue" onClick={() => addItem()}>Add Todo</button>
                </div>
            </div>


            <div className="container todos-div">
                <ul className="collection">
                    {
                        items.map((item, index) => {
                            return (
                                <li className="collection-item each-todo" key={item.time} style={{textDecoration: item.checkbox === true ? 'line-through' : 'none', color: item.checkbox === true ? 'grey' : 'black', fontSize: "1.1rem"}}>
                                    {
                                        item.checkbox === false ? <i className="material-icons left" style={{ cursor:"pointer"}} onClick={() => handleCheckbox(item.time)}>check_box_outline_blank</i> :
                                            <i className="material-icons left" title="UnCheck Item" style={{ color: "green", cursor:"pointer"}} onClick={() => handleCheckbox(item.time)}>check_box</i>
                                    }
                                    {item.data}
                                    <i className="material-icons right" style={{ color: "red", cursor: "pointer" }} onClick={() => deleteItem(item.time)}>delete</i>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="delete-all-div">
                <button type="submit" className="btn red" onClick={() => deleteAllItems()}>Clear All</button>
            </div>
        </div>
    )
}
