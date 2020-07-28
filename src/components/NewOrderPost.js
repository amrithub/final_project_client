import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {divStyles, inputStyles, labelStyles} from '../styles'
import {useGlobalState} from '../config/store'
import {addOrderPost} from '../services/OrderPostServices'
const NewOrderPost = ({history}) => {
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
   
    const errorStyles = {
        color: "red"
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
        const newOrder = {
            customer_name: formState.customer_name,
            delivery_address: formState.delivery_address,
            order_details: formState.order_details,
            contact_number: formState.contact_number
        
        }
        addOrderPost(newOrder).then((newOrder) => {
            dispatch({
                type: "setOrderPosts",
                data: [newOrder, ...orderPosts]
            })
            history.push(`/orders/${newOrder._id}`)
        
    }).catch((error) => {
        const status = error.response ? error.response.status : 500
        console.log("caught error on edit", error)
        if(status === 403)
            setErrorMessage("Log in to make your order")
        else
            setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
    })
    }
    const initialFormState = {
        title: "",
        category: "",
        content: ""
        
    } 
    const [errorMessage, setErrorMessage] = useState(null);
    const [formState,setFormState] = useState(initialFormState)
    const {store, dispatch} = useGlobalState()
    const {orderPosts, loggedInUser} = store

    //const [formState,setFormState] = useState(initialFormState)
    // if(loggedInUser)
    return (
        
        <form id="newOrderForm" onSubmit={handleSubmit}>
             {errorMessage && <p style={errorStyles}>{errorMessage}</p>}
             
             (
            <div style={divStyles}>
                <label style={labelStyles}>customer Name</label>
                <input style={inputStyles} required type="text" name="customer_name" placeholder="Enter your name" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Delivery Address</label>
                <input style={inputStyles} type="text" name="delivery_address" placeholder="Enter your address of delivery" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Order Details</label>
                <textarea form="newOrderForm" required style={textAreaStyles} name="order_details" placeholder="Enter post here" onChange={handleChange}></textarea>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Contact Number</label>
                <input style={inputStyles} type="number" name="contact_number" placeholder="Enter your phone number" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Add order"></input>
        </form>
    ) 
    // else
    // return(
    //     <div>
    //           {/* <h1>Login first</h1>  */}
    //         </div>)
    // }

             }



export default withRouter(NewOrderPost)