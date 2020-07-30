import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {deleteOrderPost} from '../services/OrderPostServices'
import Button from '@material-ui/core/Button';
import {linkStyles, stylePrice, formStyles, errorMessage } from '../styles';
const OrderPost = ({history, order, showControls}) => {
    
    const {store, dispatch} = useGlobalState()
    const {orderPosts, loggedInUser} = store
    const [errorMessage, setErrorMessage] = useState(null)
    
    // return null if there is no post
    if (!order) return null
    
    const {customer_name, modified_date, delivery_address, order_details, contact_number} = order
    const allowDelete = loggedInUser && loggedInUser === 'admin'
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


    
    return (
        
        <div>
            <Link style={linkStyles} to={`/orders/${order._id}`}>
                <p style={stylePrice}>Order Details</p>
                <p style={stylePrice}>{customer_name}</p>
                
                <p style={formStyles}>{delivery_address}</p>
                <p style={formStyles}>{order_details}</p>
                <p style={formStyles}>{contact_number}</p>
                <p style={formStyles}>{modified_date.toLocaleString()}</p>

                {showControls && allowDelete && (
                    <div>
                        
                        <Button variant="contained" color="primary" onClick={handleDelete} style={formStyles}>
                            Delete
                        </Button>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default OrderPost

