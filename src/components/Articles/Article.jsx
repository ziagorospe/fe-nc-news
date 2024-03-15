import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import FocusArticleContext from "../../contexts/FocusArticle"
import axios from "axios"
import CommentList from "../Comments/CommentList"
import NewComment from "../Comments/NewComment"
import ArticleVotes from "../Votes/ArticleVotes"
import './Article.css'
import capitalize from "../../utils/capitalize"


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

    return isLoading ? <p>Loading...</p> : !isError ? (
    <div className="article-page">
        <button onClick={goBack}>Back</button>
        <article className="single-article" key={fetchedArticle.article_id}>
            <div className="single-article-header">
                <img src={fetchedArticle.article_img_url} alt={fetchedArticle.title} />
                <div className="single-article-header-info">
                    <h2>{fetchedArticle.title}</h2>
                    <h3>By: {fetchedArticle.author}</h3>
                    <h4>It's about {capitalize(fetchedArticle.topic)}</h4>
                    <h4>Posted: {fetchedArticle.created_at.slice(0, 19).replace('T', ' ')}</h4>
                </div>
            </div>
            <div className="single-article-body-votes">
                <p>{fetchedArticle.body} </p>
                <ArticleVotes article={fetchedArticle} index="0" voteList={voteList} setVoteList={setVoteList}/>
            </div>
        </article>
        <NewComment commentList={commentList} setCommentList={setCommentList}/>
        <CommentList commentList={commentList} setCommentList={setCommentList}/>
    </div>) : <>{isError}<Link to="/" ><p>Return Home</p></Link></>
}
export default Article