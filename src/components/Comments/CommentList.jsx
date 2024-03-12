import { useContext, useEffect, useState } from "react"
import FocusArticleContext from "../../contexts/FocusArticle"
import axios from "axios"

function CommentList(){
    const {focusArticle} = useContext(FocusArticleContext)
    const [commentList, setCommentList] = useState([])

    useEffect(()=>{
        axios.get(`https://backend-nc-news-project.onrender.com/api/articles/${focusArticle}/comments`)
        .then((response)=>{
            setCommentList([...response.data.articleComments])
        })
    },[])

    return (
    <>  
        <h2>Comments: {commentList.length}</h2>
        {commentList.map((comment)=>{
            return(
            <div key={comment.comment_id}>
                <h4>Author: {comment.author}</h4>
                <h4>Date: {comment.created_at}</h4>
                <p>Description: {comment.body}</p>
                <h5>Votes: {comment.votes}</h5>
            </div>
        )})}
    </>)
}

export default CommentList