import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {divStyles, inputStyles, labelStyles} from '../styles'
import {useGlobalState} from '../config/store'
import {addDishPost} from '../services/dishPostServices'
const NewDishPost = ({history}) => {
    const divStyles = {
        display: "grid",
        width: "100vw"
    }
    const inputStyles = {
        width: "70vw",
        margin: ".5em"
    }
    const labelStyles = {
        fontSize: "1.2em"
    }
    const textAreaStyles = {
        height: "200px",
        margin: ".5em",
        width: "70vw"
    }
    // function getNextId(){
    //     const ids = dishPosts.map((post) => post._id)
    //     return ids.sort()[ids.length-1] + 1
    // }

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const newPost = {
            name: formState.name,
            price: formState.price,
            description: formState.description         }
        addDishPost(newPost).then((newPost) => {
            dispatch({
                type: "setDishPosts",
                data: [newPost, ...dishPosts]
            })
            
            history.push(`/posts/${newPost._id}`)
            console.log("yellow")
        }).catch((error) => {
            console.log("Caught an error on server adding a post", error)
        })
    }
    const initialFormState = {
        name: "",
        price: "",
        description: ""
        
    } 
    const [formState,setFormState] = useState(initialFormState)
    const {store, dispatch} = useGlobalState()
    const {dishPosts} = store

    //const [formState,setFormState] = useState(initialFormState)
    return (
        <form id="newPostForm" onSubmit={handleSubmit}>
            <div style={divStyles}>
                <label style={labelStyles}>Name</label>
                <input style={inputStyles} required type="text" name="name" placeholder="Enter a Dish-Name" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Price</label>
                <input style={inputStyles} type="number" name="price" placeholder="Enter the price" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Description</label>
                <textarea form="newPostForm" required style={textAreaStyles} name="description" placeholder="Enter the Description" onChange={handleChange}></textarea>
            </div>
            <input type="submit" value="Add post"></input>
        </form>
    ) 
}

export default withRouter(NewDishPost)