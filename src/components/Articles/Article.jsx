import { useContext, useEffect, useState } from "react"
import FocusArticleContext from "../../contexts/FocusArticle"
import axios from "axios"
import CommentList from "../Comments/CommentList"

function Article(props){
    const {focusArticle} = useContext(FocusArticleContext)
    const [fetchedArticle, setFetchedArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        setIsLoading(true)
        axios.get(`https://backend-nc-news-project.onrender.com/api/articles/${focusArticle}`)
        .then((response)=>{
            setFetchedArticle(response.data.article)
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
            <h4>Votes: {fetchedArticle.votes}</h4>
        </article>
        <CommentList />
    </>) : <p>Return Home</p>
}
export default Article