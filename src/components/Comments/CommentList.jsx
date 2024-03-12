import { useContext, useEffect, useState } from "react"
import FocusArticleContext from "../../contexts/FocusArticle"
import axios from "axios"
import UserContext from "../../contexts/User"

function CommentList(props){
    const {focusArticle} = useContext(FocusArticleContext)
    const {currentUser} = useContext(UserContext)
    const {commentList} = props
    const {setCommentList} = props
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        axios.get(`https://backend-nc-news-project.onrender.com/api/articles/${focusArticle}/comments`)
        .then((response)=>{
            setCommentList([...response.data.articleComments])
        })
        setIsLoading(false)
    },[])

    function deleteComment(event){
        console.log(commentList[event.target.value])
        const previousCommentList = [...commentList]
    }

    return isLoading ? <p>Comments Loading...</p> :(
    <>  
        <h2>Comments: {commentList.length}</h2>
        {commentList.map((comment, index)=>{
            return(
            <div key={comment.created_at}>
                <h4>Author: {comment.author}</h4>
                <h4>Date: {comment.created_at}</h4>
                <p>Description: {comment.body}</p>
                <h5>Votes: {comment.votes}</h5>
                {currentUser.username===comment.author ? 
                <button value={index} onClick={deleteComment}>Delete Comment</button> : <></>}
            </div>
        )})}
    </>)
}

export default CommentList