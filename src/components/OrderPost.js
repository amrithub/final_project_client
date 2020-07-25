import React from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'

const OrderPost = ({history, order, showControls}) => {
    
    const {store, dispatch} = useGlobalState()
    const {orderPosts} = store
   
    
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
    const {title, modified_date, category, content} = order
    function handleDelete(event) {
        event.preventDefault()
        const updatedOrders = orderPosts.filter((orderPost) => orderPost._id !== order._id)
        console.log("blue")
        dispatch({
            type: "setOrderPosts",
            data: updatedOrders
        })
        history.push("/")
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
                <h1>{title}</h1>
                <p>{modified_date.toLocaleString()}</p>
                <p>{category}</p>
                <p>{content}</p>
                {showControls && (
                    <div>
                        <h1>fighter</h1>
                        <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                        <button style={buttonStyles} onClick={handleEdit}>Edit</button>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default OrderPost

