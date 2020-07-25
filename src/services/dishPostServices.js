// connect to server via api
import api from '../config/api';

// Returns a single post based on the id provided
export function getPostFromId(dishPosts,id) {
    const post =  dishPosts.find((post) =>  post._id === id)
    console.log('hello')
    return post
}
export async function getAllDishPosts() {
    const response = await api.get("/posts")
    return response.data
}
export async function addDishPost(newPost) {
    const response = await api.post("/posts", newPost)
    return response.data
}
