export default function (state, action) {
    switch(action.type) {

        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setDishPosts": {
            return {
                ...state,
                dishPosts: action.data
            }
        }
        case "setOrderPosts": {
            return {
                ...state,
                orderPosts: action.data
            }
        }

        
        default: 
            return state
    }
}