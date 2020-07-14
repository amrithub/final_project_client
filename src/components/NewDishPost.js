import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'

const NewDishPost = ({history, addDishPost, nextId}) => {
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
            _id: nextId,
            title: formState.title,
            category: formState.category || "general",
            modified_date: new Date(),
            content: formState.content
        }
        addDishPost(newPost)
        history.push(`/posts/${nextId}`)
    }
    const initialFormState = {
        title: "",
        category: "",
        content: ""
    } 
    const [formState,setFormState] = useState(initialFormState)
    return (
        <form id="newPostForm" onSubmit={handleSubmit}>
            <div style={divStyles}>
                <label style={labelStyles}>Title</label>
                <input style={inputStyles} required type="text" name="title" placeholder="Enter a title" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Category</label>
                <input style={inputStyles} type="text" name="category" placeholder="Enter a category" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Content</label>
                <textarea form="newPostForm" required style={textAreaStyles} name="content" placeholder="Enter post here" onChange={handleChange}></textarea>
            </div>
            <input type="submit" value="Add post"></input>
        </form>
    ) 
}

export default withRouter(NewDishPost)