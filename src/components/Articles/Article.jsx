import { useContext, useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import FocusArticleContext from "../../contexts/FocusArticle"
import axios from "axios"
import CommentList from "../Comments/CommentList"
import NewComment from "../Comments/NewComment"
import ArticleVotes from "../Votes/Votes"

function Article(props){
    const {focusArticle} = useContext(FocusArticleContext)
    const [fetchedArticle, setFetchedArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [commentList, setCommentList] = useState([])
    const [voteList, setVoteList] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        setIsLoading(true)
        axios.get(`https://backend-nc-news-project.onrender.com/api/articles/${id}`)
        .then((response)=>{
            setFetchedArticle(response.data.article)
            setVoteList([response.data.article.votes])
            setIsLoading(false)
        })
    },[])

    return isLoading ? <p>Loading...</p> : fetchedArticle ? (<>
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
    </>) : <Link to="/" ><p>Return Home</p></Link>
}
export default Article