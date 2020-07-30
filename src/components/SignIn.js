import React, {useState} from 'react'
import {divStyles, inputStyles, labelStyles,errorStyles, formStyles} from '../styles'
import {useGlobalState} from '../config/store'
import {loginUser} from '../services/authServices'
//check history for and initialise username
const SignIn = ({history}) => {
    const initialFormState = {
        username: "",
        password: ""
        
    } 
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [userDetails,setUserDetails] = useState(initialFormState)
    const {dispatch} = useGlobalState()
    console.log(userDetails)
    
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    //function to handle submit of sign in form
    function handleSubmit(event) {
        event.preventDefault()
        // Attempt login on server
        loginUser(userDetails).then((response) => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.push("/")
    
        }).catch((error) => {
            if (error.response && error.response.status === 401)
                setErrorMessage("Authentication failed. Please check your username and password.")
            else   
                setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
        })		
    }
    
    
    return (
        
        <form onSubmit={handleSubmit}>
            
            {errorMessage && <p style={errorStyles}>{errorMessage}</p>}
            <div style={divStyles}>
                <label style={labelStyles}>Username</label>
                <input style={inputStyles} required type="text" name="username" placeholder="Enter a username" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Password</label>
                <input style={inputStyles} required type="password" name="password" placeholder="Enter a password" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Login" style={formStyles}></input>
            
        </form>
    )
}
export default SignIn