import React,{useState, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import DishPosts from './components/DishPosts'
import DishPost from './components/DishPost'
import dishData from './data/post_data'
import Navigate from './components/Navigate'
import NewDishPost from './components/NewDishPost'
import EditDishPost from './components/EditDishPost'
import SignIn from './components/SignIn'
import Register from './components/Register'


const App = () => {
  const [dishPosts, setDishPosts] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)
  useEffect(() => {
    setDishPosts(dishData)
  },[])
  
  function getPostFromId(id) {
    return dishPosts.find((post) =>  post._id === parseInt(id))
}
function getNextId(){
  const ids = dishPosts.map((post) => post._id)
  return ids.sort()[ids.length-1] + 1
}

function addDishPost(post) {
  setDishPosts([...dishPosts, post])
}
function deleteDishPost(id) {
  const updatedPosts = dishPosts.filter((post) => post._id !== parseInt(id))
  setDishPosts(updatedPosts)
}
function updateDishPost(updatedPost) {
  const otherPosts = dishPosts.filter((post) => post._id !== updatedPost._id)
  setDishPosts([...otherPosts, updatedPost])
}
// Register user
function registerUser(user) {
  setLoggedInUser(user.username) 
}

// Login user
function loginUser(user) {
  setLoggedInUser(user.username) 
}

// Logout user
function logoutUser() {
  setLoggedInUser(null) 
}
  return (
    <div >
        <BrowserRouter>
          <Navigate loggedInUser={loggedInUser} logoutUser={logoutUser}/>
        
          <h1>Many Mumbling Mice</h1>
          
          
          <Route exact path="/" render={(props) => <DishPosts {...props} postData={dishPosts} /> } />
          {/* <Route exact path="/posts/:id" render={(props) => <DishPost {...props} post={getPostFromId(props.match.params.id)} /> } /> */}
          <Route exact path="/posts/new" render={(props) => <NewDishPost {...props} addDishPost={addDishPost} nextId={getNextId()}/> }/>
          <Route exact path="/posts/edit/:id" render={(props) => <EditDishPost {...props} updateDishPost={updateDishPost} post={getPostFromId(props.match.params.id)}/> }/>
          <Route exact path="/posts/:id" render={(props) => <DishPost {...props} post={getPostFromId(props.match.params.id)} showControls deleteDishPost={deleteDishPost}/> } />
          <Route exact path="/auth/login" render={(props) => <SignIn {...props} loginUser={loginUser}/>} />
          <Route exact path="/auth/register" render={(props) => <Register {...props} registerUser={registerUser}/>} />
        </BrowserRouter>
    </div>
  )
}


export default App