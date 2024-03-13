import axios from "axios"
import { useContext, useState } from "react"
import FocusArticleContext from "../../contexts/FocusArticle"
import UserContext from "../../contexts/User"
import MessageContext from "../../contexts/Message"

function NewComment(props){
    const {focusArticle} = useContext(FocusArticleContext)
    const {currentUser} = useContext(UserContext)
    const {setResponseMessage} = useContext(MessageContext)
    const {commentList} = props
    const {setCommentList} = props
    const [commentText, setCommentText] = useState("")
    const [commentMessage, setCommentMessage] = useState("")

    function postComment(event){
        event.preventDefault()
        setCommentMessage(commentText)
        setCommentText("")
        setResponseMessage("")
        if(currentUser){
            const messageToPost = event.target[0].value
            const tempComment = {
                username: currentUser.username,
                body: messageToPost
            }
            const previousCommentList = [...commentList]
            const created_at = new Date().toISOString();
            const optimisticComment = {comment_id: commentList[0].comment_id+1, body: tempComment.body, article_id: focusArticle, author: currentUser.username, votes: 0, created_at: created_at}
            setCommentList([optimisticComment, ...previousCommentList])
            axios.post(`https://backend-nc-news-project.onrender.com/api/articles/${focusArticle}/comments`,tempComment)
            .then((response)=>{
                setResponseMessage("Comment posted")
            })
            .catch(()=>{
                setCommentList(previousCommentList)
                setResponseMessage("Could not post comment")
            })
        } else {
            setResponseMessage("Go log in to comment")
        }  
    }

    function changeText(event){
        setCommentText(event.target.value)
    }

    return (<form onSubmit={postComment}>
        <label htmlFor="comment-text">What's on your mind?:</label>
        <br/>
        <input onChange={changeText} value={commentText} id="comment-text" type="text" placeholder="Write..." required/>
        <button type="submit">Post!</button>
    </form>)
}

export default NewComment