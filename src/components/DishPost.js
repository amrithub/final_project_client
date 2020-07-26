import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {deleteDishPost} from '../services/dishPostServices'
const DishPost = ({history, post, showControls}) => {
   // console.log(post)
    const {store, dispatch} = useGlobalState()
    const {dishPosts, loggedInUser} = store
    const [errorMessage, setErrorMessage] = useState(null)
    // return null if there is no post
    if (!post) return null
    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }
    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }
    //const {title, modified_date, category, content} = post
    const {title, username, modified_date, category, content} = post 
    const allowEditDelete = loggedInUser && loggedInUser === 'ba'
    function handleDelete(event) {
        event.preventDefault()
        deleteDishPost(post._id).then(() => {
            console.log("deleted post")
            const updatedPosts = dishPosts.filter((dishPost) => dishPost._id !== post._id)
            dispatch({
                type: "setDishPosts",
                data: updatedPosts
            })
            history.push("/")
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on edit", error)
            if(status === 403)
                setErrorMessage("Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }

    // Handle the edit button
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/posts/edit/${post._id}`)
    }

    return (
        <div>
            <Link style={linkStyles} to={`/posts/${post._id}`}>
                <h1>{title}</h1>
               

                <p>{modified_date.toLocaleString()}</p>
                <p>{category}</p>
                <p>{content}</p>
                {showControls && allowEditDelete && (
                    <div>
                        <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                        <button style={buttonStyles} onClick={handleEdit}>Edit</button>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default DishPost

