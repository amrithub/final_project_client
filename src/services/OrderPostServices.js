import api from '../config/api';

// Returns a single post based on the id provided
export function getOrderFromId(orderPosts,id) {
    const order =  orderPosts.find((order) =>  order._id === id)
    //console.log(order)
    return order
}
export async function getAllOrderPosts() {
    const response = await api.get("/orders")
    console.log('all orders')
    return response.data
}
export async function addOrderPost(newOrder) {
    const response = await api.post("/orders", newOrder)
    return response.data
}
export async function deleteOrderPost(id) {
    console.log("check")
    const response = await api.delete(`/orders/${id}`)
    return response.data
}

// export async function updateBlogPost(post) {
//     const response = await api.put(`/posts/${post._id}`, post)
//     return response.data
// }