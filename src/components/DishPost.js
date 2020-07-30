import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import {useGlobalState} from '../config/store'
import {deleteDishPost} from '../services/dishPostServices'
import { linkStyles, stylePrice , styleName,  formStyles} from '../styles';
const DishPost = ({history, post, showControls}) => {
    //Use of global state and setting values from store
    const {store, dispatch} = useGlobalState()
    const {dishPosts, loggedInUser} = store
    const [errorMessage, setErrorMessage] = useState(null)
    // return null if there is no post
    if (!post) return null
    
    
    
    const {name, username, modified_date,  price, description} = post 
    const allowEditDelete = loggedInUser && loggedInUser === 'admin'
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
                setErrorMessage("There was a problem on the server.")
        })
    }

    // Handle the edit button
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/posts/edit/${post._id}`)
    }
    //return a dish post
    return (
         <div>
            <Link style={linkStyles} to={`/posts/${post._id}`}>
                
                <p style={styleName}>{name}</p>
                
                <p style={stylePrice}>${price}</p>
                <p style={formStyles}>{description}</p>
                <p style={formStyles}>Posted on: {modified_date.toLocaleString()}</p>
               
                {showControls && allowEditDelete && (
                    <div>                        
                        <Button variant="contained" color="primary" onClick={handleDelete}style={formStyles} >
                            Delete
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleEdit} style={formStyles}>
                            Edit
                        </Button>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default DishPost

