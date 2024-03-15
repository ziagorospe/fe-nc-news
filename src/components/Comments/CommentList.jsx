import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import FocusArticleContext from "../../contexts/FocusArticle"
import axios from "axios"
import UserContext from "../../contexts/User"
import MessageContext from "../../contexts/Message"
import CommentVotes from "../Votes/CommentVotes"
import './CommentList.css'

function CommentList(props){
    const {setResponseMessage} = useContext(MessageContext)
    const {focusArticle} = useContext(FocusArticleContext)
    const {currentUser} = useContext(UserContext)
    const {commentList} = props
    const {setCommentList} = props
    const { id } = useParams();
    const [voteList, setVoteList] = useState(commentList.map((comment)=>{
        return comment.votes
    }))

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

    return (
    <div className="comment-list-container">  
        <h2>Comments: {commentList.length}</h2>
        {commentList.map((comment, index)=>{
            return(
            <div className="comment-list-item" key={comment.created_at}>
                <h4>By: {comment.author}</h4>
                <h5>Posted: {comment.created_at.slice(0, 19).replace('T', ' ')}</h5>
                <p>{comment.body}</p>
                <CommentVotes comment={comment} index={index} voteList={voteList} setVoteList={setVoteList}/>
                {currentUser.username===comment.author ? 
                <button id={comment.comment_id} value={index} onClick={deleteComment}>Delete Comment</button> : <></>}
            </div>
        )})}
    </div>)
}

export default CommentList