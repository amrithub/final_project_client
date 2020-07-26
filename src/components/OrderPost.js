import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {deleteOrderPost} from '../services/OrderPostServices'
const OrderPost = ({history, order, showControls}) => {
    
    const {store, dispatch} = useGlobalState()
    const {orderPosts, loggedInUser} = store
    const [errorMessage, setErrorMessage] = useState(null)
    
    // return null if there is no post
    if (!order) return null
    console.log(order)
    console.log("blue")
    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }
    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }
    const {customer_name, modified_date, delivery_address, order_details, contact_number} = order
    const allowDelete = loggedInUser //&& loggedInUser === post.username
    function handleDelete(event) {
        event.preventDefault()
        deleteOrderPost(order._id).then(() => {
            console.log("deleted order")
            const updatedOrders = orderPosts.filter((orderPost) => orderPost._id !== order._id)
            dispatch({
                type: "setOrderPosts",
                data: updatedOrders
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
        history.push(`/orders/edit/${order._id}`)
        
    }
   // console.log("green")
    return (
        
        <div>
            <Link style={linkStyles} to={`/orders/${order._id}`}>
                <h1>{customer_name}</h1>
                <p>{modified_date.toLocaleString()}</p>
                <p>{delivery_address}</p>
                <p>{order_details}</p>
                <p>{contact_number}</p>

                {showControls && allowDelete && (
                    <div>
                        <h1>Order Details</h1>
                        <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default OrderPost

