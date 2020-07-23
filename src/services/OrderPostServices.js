import api from '../config/api';

// Returns a single post based on the id provided
export function getOrderFromId(orderPosts,id) {
    const order =  orderPosts.find((order) =>  order._id === id)
    console.log('hello')
    return order
}
export async function getAllOrderPosts() {
    const response = await api.get("/orders")
    return response.data
}
export async function addOrderPost(newOrder) {
    const response = await api.post("/orders", newOrder)
    return response.data
}