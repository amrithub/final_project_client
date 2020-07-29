import React from 'react'
import OrderPost from "./OrderPost"
import Navigate from './Navigate'
import {useGlobalState} from '../config/store'
//import api from '../config/api'; 

const OrderPosts = ({ordertData}) => {
    console.log()
    const {store} = useGlobalState()
    const {orderPosts, loggedInUser} = store
    return (
        <div>
        {loggedInUser === 'admin'?
    
        (<div>
            {orderPosts.sort((a,b) => b.modified_date - a.modified_date).map((order) => <OrderPost key={order._id} order={order} />)}        
        </div>)
        :(<div>
        <h1>You are not authorized to view this page</h1>
        </div>)}
        </div>)
}


export default OrderPosts
