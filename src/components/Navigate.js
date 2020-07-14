import React from 'react'
import {Link} from 'react-router-dom'

const Nav = ({loggedInUser, logoutUser}) => {
    const divStyles = {
        display: 'flex'
    }
    const linkStyles = {
        fontSize: '1.2em',
        textDecoration: 'none',
        margin: '.5em'
    }
    return (
        <div style={divStyles}>
            {loggedInUser 
            ? (<div>
                <Link style={linkStyles} to="/">{loggedInUser}</Link>
                <Link style={linkStyles} onClick={logoutUser} to="/">Logout</Link>
                </div>)
            : (<div>
                <Link style={linkStyles} to="/">guest</Link>
                <Link style={linkStyles} to="/auth/login">Login</Link>
                <Link style={linkStyles} to="/auth/register">Register</Link>
                </div>)
            }
            <div >
                <Link style={linkStyles} to="/">Home</Link>
                <Link style={linkStyles} to="/posts/new">Add a post</Link>
            </div>
        </div>
    )
}

export default Nav
