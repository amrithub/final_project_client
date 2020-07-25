import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {getPostFromId,updateDishPost} from '../services/dishPostServices'

const EditDishPost = ({history, match}) => {
    const {store, dispatch} = useGlobalState()
    const {dishPosts} = store
    const postId = match && match.params ? match.params.id : -1
    const post = getPostFromId(dishPosts, postId)
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
        const updatedPost = {
            _id: post._id,
            username: post.username,
            title: formState.title,
            category: formState.category || "general",
            modified_date: new Date(),
            content: formState.content
        }
        updateDishPost(updatedPost).then(() => {
            const otherPosts = dishPosts.filter((post) => post._id !== updatedPost._id)
            dispatch({
                type: "setDishPosts",
                data: [updatedPost, ...otherPosts]
            })
            history.push(`/posts/${post._id}`)
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on edit", error)
            if(status === 403)
                setErrorMessage("Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }
    
    const initialFormState = {
        title: "",
        category: "",
        content: ""
    } 

    const [formState,setFormState] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {
        // Set the formState to the fields in the post after mount and when post changes
        post && setFormState({
            title: post.title,
            category: post.category,
            content: post.content
        })
    },[post])

    return (
        <form id="editPostForm" onSubmit={handleSubmit}>
            <div style={divStyles}>
                <label style={labelStyles}>Title</label>
                <input style={inputStyles} required type="text" name="title" value={formState.title} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Category</label>
                <input style={inputStyles} type="text" name="category" value={formState.category} onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Content</label>
                <textarea form="editPostForm" required style={textAreaStyles} name="content" value={formState.content} onChange={handleChange}></textarea>
            </div>
            <input type="submit" value="Update post"></input>
        </form>
    ) 
}

export default withRouter(EditDishPost)