export default function (state, action) {
    switch(action.type) {
        case "setDishPosts": {
            return {
                ...state,
                dishPosts: action.data
            }
        }
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        default: 
            return state
    }
}