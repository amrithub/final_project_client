import React from 'react'
import {Link} from 'react-router-dom'
const DishPost = ({history, post, showControls, deleteDishPost}) => {
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
    const {title, modified_date, category, content} = post
    function handleDelete(event) {
        event.preventDefault()
        deleteDishPost(post._id)
        history.push("/")
    }
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
                {showControls && (
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

