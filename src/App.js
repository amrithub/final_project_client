//Import all the requirements
import React, {useReducer, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import DishPosts from './components/DishPosts'
import DishPost from './components/DishPost'
import Button from '@material-ui/core/Button';
import Navigate from './components/Navigate'
import NewDishPost from './components/NewDishPost'
import EditDishPost from './components/EditDishPost'
import SignIn from './components/SignIn'
import Register from './components/Register'
import stateReducer from './config/stateReducer'
import {StateContext} from './config/store'
import {getOrderFromId, getAllOrderPosts} from './services/OrderPostServices'
import {getPostFromId, getAllDishPosts} from './services/dishPostServices'
import OrderPosts from './components/OrderPosts'
import OrderPost from './components/OrderPost'
import NewOrderPost from './components/NewOrderPost'
import { heading } from './styles';
// import material ui modules for styling





const App = () => {
  // initial state for state reducer
  const initialState = {
    dishPosts: [],
    orderPosts: [],
    loggedInUser: null
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer,initialState)
  const {dishPosts, orderPosts, loggedInUser} = store
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



function fetchOrderPosts() {
  getAllOrderPosts().then((orderData) => {
    dispatch({
      type: "setOrderPosts",
      data: orderData
    })
  }).catch((error) => {
    console.log("An error occurred fetching orders from the server:", error) 
  })
}
useEffect(() => {
  fetchOrderPosts()
},[])
useEffect(() => {
    fetchDishPosts()
},[])
  
  return (
    <div >
     
      <StateContext.Provider value={{store,dispatch}}>
        <BrowserRouter>
          <Navigate />
          <p style={heading}>Order your favourite Meal for Today</p>
          
          <Route exact path="/" component={DishPosts} />
          <Route exact path="/posts/:id" render={(props) => <DishPost {...props} post={getPostFromId(dishPosts,props.match.params.id)} showControls /> } />
         <div>
         { loggedInUser === 'admin'?
          (<Route exact path="/orders" component={OrderPosts} />)
          :
          (<div> 
            </div>)}
         </div>
          
          <Route exact path="/orders/:id" render={(props) => <OrderPost {...props} order={getOrderFromId(orderPosts,props.match.params.id)} showControls /> } />
          <Route exact path="/posts/new" component={NewDishPost} />
          <Route exact path="/orders/new" component={NewOrderPost} />
          <Route exact path="/posts/edit/:id" component={EditDishPost} /> 
          <Route exact path="/auth/login" component={SignIn} />
          <Route exact path="/auth/register" component={Register} />
        </BrowserRouter>
      </StateContext.Provider>
      
    </div>
  )
}

export default App