import React from 'react'
import DishPost from "./DishPost"
//import {divStyles, inputStyles, labelStyles,errorStyles, textAreaStyles,imageStyle, flexboxContainer} from '../styles'
import {useGlobalState} from '../config/store'

const DishPosts = () => {
    const {store} = useGlobalState()
    const {dishPosts} = store
    
    return (
        
        <div>
            <img src={ require('../images/meal.jpg') } width="400" height="150"></img>
            
            {dishPosts.sort((a,b) => b.modified_date - a.modified_date).map((post) => <DishPost key={post._id} post={post} />)}        
        </div>
    )
}


export default DishPosts
