import React, {useState} from 'react'
//import {divStyles, inputStyles, labelStyles} from '../styles'
import {divStyles, inputStyles, labelStyles, formStyles, errorStyles} from '../styles'
import {useGlobalState} from '../config/store'
import {registerUser} from '../services/authServices';
const Register = ({history}) => {
    const initialFormState = {
        username: "",
        email: "",
        password: "",
        //userRole: ""
    } 
    const [errorMessage, setErrorMessage] = useState(null);
    const [userDetails,setUserDetails] = useState(initialFormState)
    const {dispatch} = useGlobalState()
   
   
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        registerUser(userDetails).then(() => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.push("/")
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
			if(status === 409) {
                // There was some other error - maybe the server or db is down
                setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
				
            }
            else {
                // This username is already registered. Let the user know.
				setErrorMessage("This username already exists. Please login, or specify another username.")				
                
            }
			console.log(`registration failed with error: ${error} and status ${status}`)
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
                <label style={labelStyles}>Email</label>
                <input style={inputStyles} required type="email" name="email" placeholder="Enter an email" onChange={handleChange}></input>
            </div>
            <div style={divStyles}>
                <label style={labelStyles}>Password</label>
                <input style={inputStyles} required type="password" name="password" placeholder="Enter a password" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Register" style={formStyles}></input>
            
        </form>
    )
}
export default Register