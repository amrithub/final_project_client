import React from 'react'
import DishPost from "./DishPost"

const DishPosts = ({postData}) => {
    return (
        <div>
            {postData.sort((a,b) => b.modified_date- a.modified_date).map((post) => <DishPost key={post._id} post={post} />)} 
        </div>
    )
}

export default DishPosts
