import { useContext, useEffect, useState } from "react"
import FocusArticleContext from "../../contexts/FocusArticle"
import axios from "axios"
import UserContext from "../../contexts/User"
import MessageContext from "../../contexts/Message"

function CommentList(props){
    const {setResponseMessage} = useContext(MessageContext)
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
        setResponseMessage("")
        const index = event.target.value;
        const commentId = event.target.id;
        const previousCommentList = [...commentList]
        const tempCommentList = [...commentList]
        tempCommentList.splice(index, 1)
        setCommentList(tempCommentList)
        axios.delete(`https://backend-nc-news-project.onrender.com/api/comments/${commentId}`)
        .catch(()=>{
            setResponseMessage("Could not delete comment")
            setCommentList(previousCommentList)
        })

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
                <button id={comment.comment_id} value={index} onClick={deleteComment}>Delete Comment</button> : <></>}
            </div>
        )})}
    </>)
}

export default CommentList