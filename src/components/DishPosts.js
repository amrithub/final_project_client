import React from 'react'
import DishPost from "./DishPost"
import {useGlobalState} from '../config/store'

const DishPosts = ({postData}) => {
    const {store} = useGlobalState()
    const {dishPosts} = store
    return (
        <div>
            {dishPosts.sort((a,b) => b.modified_date - a.modified_date).map((post) => <DishPost key={post._id} post={post} />)}        
        </div>
    )
}


export default DishPosts
