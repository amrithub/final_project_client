import React from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {logoutUser} from '../services/authServices'
import Button from '@material-ui/core/Button';
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
                {/* <Link style={linkStyles} to="/">{loggedInUser}</Link> */}
                <Link style={linkStyles} onClick={handleLogout} to="/">
                    
                <Button variant="contained" color="A100">
                    Log Out
                </Button>
                </Link>
               
                
                <Link style={linkStyles} to="/"><Button variant="contained" color="A100">
                    Home
                </Button></Link>
                
                
                </div>)
            : (<div>
                
                <Link style={linkStyles} to="/auth/login">
                <Button variant="contained" color="A100">
                    Log In
                </Button></Link>
                <Link style={linkStyles} to="/auth/register">
                <Button variant="contained" color="A100">Register</Button>
                </Link>
                <Link style={linkStyles} to="/"><Button variant="contained" color="A100">
                    Home
                </Button></Link>
               
                </div>)
            }
            <div>
                {loggedInUser === 'admin'?
                (<div>
                    <Link style={linkStyles} to="/orders"><Button variant="contained" color="A100">
                   View Orders
                </Button></Link>
                    <Link style={linkStyles} to="/posts/new"><Button variant="contained" color="A100">
                    Post Dish
                </Button></Link>
                </div>)    
                :
                (<div>
                    
                <Link style={linkStyles} to="/orders/new"><Button variant="contained" color="A100">
                    Make Order
                </Button></Link>
                </div>  )}  
            </div>
            
        </div>
    )
}
export default Navigate
