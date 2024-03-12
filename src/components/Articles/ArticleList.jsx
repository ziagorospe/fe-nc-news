import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import FocusArticleContext from '../../contexts/FocusArticle'
import axios from "axios";

function ArticleList(props){
    const {setFocusArticle} = useContext(FocusArticleContext)
    const {articleList} = props
    const [voteList, setVoteList] = useState(articleList.map((article)=>{
        return article.votes
    }))
    const [voteErrorMsg, setVoteErrorMsg] = useState("")

    function setSelectedArticle(event){
        setFocusArticle(event.target.attributes[0].value)
    }

    function updateVote(event){
        setVoteErrorMsg("")
        const voteMod = event.target.value*1
        const articleId = event.target.id
        const voteIndex = event.target.attributes.index.value*1
        const tempVote = [...voteList]
        tempVote[voteIndex] += voteMod
        setVoteList(tempVote)
        
         axios.patch(`https://backend-nc-news-project.onrender.com/api/articles/${articleId}`,{
             inc_votes: voteMod
         })
         .then((response)=>{
            
         })
         .catch(()=>{
            const tempVote = [...voteList]
            tempVote[voteIndex] -= voteMod
            setVoteList(tempVote)
         })

    }

    return <>
        {
            articleList.map((article, index)=>{
                return (<article key={article.article_id}>
                    <img src={article.article_img_url} alt={article.title} style={{width:200+'px'}} />
                    <h1>Title: {article.title}</h1>
                    <h2>Author: {article.author}</h2>
                    <h3>Topic: {article.topic}</h3>
                    <h3>Date {article.created_at}</h3>
                    <div>
                        
                        <button onClick={updateVote} value="1" id={article.article_id} index={index}>+</button>
                        {voteErrorMsg ? <p>couldn't vote</p> : <></>}
                        <h4>Votes: {voteList[index]}</h4>
                        <button onClick={updateVote} value="-1" id={article.article_id} index={index}>-</button>
                    </div>
                    <Link to="/article" >
                        <h4 onClick={setSelectedArticle} value={article.article_id}>Comments: {article.comment_count}</h4>
                    </Link>
                </article>)
            })
        
        }
    </>
}

export default ArticleList