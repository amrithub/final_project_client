import React from 'react'
import OrderPost from "./OrderPost"
import {useGlobalState} from '../config/store'

const OrderPosts = ({ordertData}) => {
    const {store} = useGlobalState()
    const {orderPosts} = store
    return (
        <div>
            {orderPosts.sort((a,b) => b.modified_date - a.modified_date).map((order) => <OrderPost key={order._id} order={order} />)}        
        </div>
    )
}


export default OrderPosts
