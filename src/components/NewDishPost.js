import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {divStyles, inputStyles, labelStyles,errorStyles, textAreaStyles} from '../styles'
import {useGlobalState} from '../config/store'
import {addDishPost} from '../services/dishPostServices'
const NewDishPost = ({history}) => {

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
           
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on edit", error)
            if(status === 403)
                setErrorMessage("you are not authorised to post dish orders")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
        }
    const initialFormState = {
        name: "",
        price: "",
        description: ""
        
    } 
    const [errorMessage, setErrorMessage] = useState(null);
    const [formState,setFormState] = useState(initialFormState)
    const {store, dispatch} = useGlobalState()
    const {dishPosts, loggedInUser} = store
    
    
    return (
        <div>
        {loggedInUser?
        (<form id="newPostForm" onSubmit={handleSubmit}>
            {errorMessage && <p style={errorStyles}>{errorMessage}</p>}
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
        </form>)
        :
        (<div>
            You are not permitted to make a post
        </div>)}
        </div>
    
    ) 
}

export default withRouter(NewDishPost)