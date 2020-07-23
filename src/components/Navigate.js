import React from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {logoutUser} from '../services/authServices'
const Navigate = () => {
    const divStyles = {
        display: 'flex'
    }
    const linkStyles = {
        fontSize: '1.2em',
        textDecoration: 'none',
        margin: '.5em'
    }
    // Logout user
    function handleLogout() {
        logoutUser().then((response) => {
            console.log("Got back response on logout", response.status)
        }).catch ((error) => {
            console.log("The server may be down - caught an exception on logout:", error)
        })
        // Even if we catch an error, logout the user locally
        dispatch({
            type: "setLoggedInUser",
            data: null
        })
    }
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    return (
        <div style={divStyles}>
            {loggedInUser 
            ? (<div>
                <Link style={linkStyles} to="/">{loggedInUser}</Link>
                <Link style={linkStyles} onClick={handleLogout} to="/">Logout</Link>
               
                <Link style={linkStyles} to="/posts">Home</Link>
                <Link style={linkStyles} to="/orders/new">Add order</Link>
                <Link style={linkStyles} to="/posts/new">Add Dish Post</Link>
                </div>)
            : (<div>
                {/* <Link style={linkStyles} to="/">guest</Link> */}
                <Link style={linkStyles} to="/auth/login">Login</Link>
                <Link style={linkStyles} to="/auth/register">Register</Link>
                </div>)
            }
            
        </div>
    )
}
export default Navigate
