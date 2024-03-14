import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import FocusArticleContext from "../../contexts/FocusArticle"
import axios from "axios"
import CommentList from "../Comments/CommentList"
import NewComment from "../Comments/NewComment"
import ArticleVotes from "../Votes/ArticleVotes"

function Article(props){
    const {focusArticle} = useContext(FocusArticleContext)
    const navigate = useNavigate()
    const [fetchedArticle, setFetchedArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [commentList, setCommentList] = useState([])
    const [voteList, setVoteList] = useState([])
    const [isError, setIsError] = useState()
    const { id } = useParams();

    useEffect(()=>{
        setIsLoading(true)
        axios.get(`https://backend-nc-news-project.onrender.com/api/articles/${id}`)
        .then((response)=>{
            setFetchedArticle(response.data.article)
            setVoteList([response.data.article.votes])
            return axios.get(`https://backend-nc-news-project.onrender.com/api/articles/${id}/comments`)
            
        })
        .then((response)=>{
            setCommentList([...response.data.articleComments])
            setIsLoading(false)
        })
        .catch((err)=>{
            setIsError(<p>{err.response.data.status + ' ' + err.response.data.msg}</p>)
            setIsLoading(false)
        })
        
        
    },[])

    function goBack(event){
        navigate(-1)
    }

    return isLoading ? <p>Loading...</p> : !isError ? (<>
        <button onClick={goBack}>Back</button>
        <article key={fetchedArticle.article_id}>
            <img src={fetchedArticle.article_img_url} alt={fetchedArticle.title} style={{width:200+'px'}} />
            <h1>Title: {fetchedArticle.title}</h1>
            <h2>Author: {fetchedArticle.author}</h2>
            <h3>Topic: {fetchedArticle.topic}</h3>
            <h3>Date {fetchedArticle.created_at}</h3>
            <p>Description: {fetchedArticle.body} </p>
            <ArticleVotes article={fetchedArticle} index="0" voteList={voteList} setVoteList={setVoteList}/>
        </article>
        <NewComment commentList={commentList} setCommentList={setCommentList}/>
        <CommentList commentList={commentList} setCommentList={setCommentList}/>
    </>) : <>{isError}<Link to="/" ><p>Return Home</p></Link></>
}
export default Article