import React, {useReducer, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import DishPosts from './components/DishPosts'
import DishPost from './components/DishPost'
//import dishData from './data/post_data'
import Navigate from './components/Navigate'
import NewDishPost from './components/NewDishPost'
import EditDishPost from './components/EditDishPost'
import SignIn from './components/SignIn'
import Register from './components/Register'
import stateReducer from './config/stateReducer'
import {StateContext} from './config/store'
import {getPostFromId, getAllDishPosts} from './services/dishPostServices'



const App = () => {
  // initial state for state reducer
  const initialState = {
    dishPosts: [],
    loggedInUser: null
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer,initialState)
  const {dishPosts} = store
 function fetchDishPosts() {
    getAllDishPosts().then((dishData) => {
      dispatch({
        type: "setDishPosts",
        data: dishData
      })
    }).catch((error) => {
      console.log("An error occurred fetching dish posts from the server:", error) 
    })
}

useEffect(() => {
    fetchDishPosts()
},[])

  
  return (
    <div >
      <StateContext.Provider value={{store,dispatch}}>
        <BrowserRouter>
          <Navigate />
          <h1>order your favourite Dish for Today</h1>
          <Route exact path="/" component={DishPosts} />
          <Route exact path="/posts/:id" render={(props) => <DishPost {...props} post={getPostFromId(dishPosts,props.match.params.id)} showControls /> } />
          <Route exact path="/posts/new" component={NewDishPost} />
          <Route exact path="/posts/edit/:id" component={EditDishPost} /> 
          <Route exact path="/auth/login" component={SignIn} />
          <Route exact path="/auth/register" component={Register} />
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  )
}

export default App