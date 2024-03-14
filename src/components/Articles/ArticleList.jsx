import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import FocusArticleContext from '../../contexts/FocusArticle'
import ArticleVotes from '../Votes/ArticleVotes';

function ArticleList(props){
    const {setFocusArticle} = useContext(FocusArticleContext)
    const {articleList} = props
    const [voteList, setVoteList] = useState(articleList.map((article)=>{
        return article.votes
    }))

    function setSelectedArticle(event){
        setFocusArticle(event.target.attributes[0].value)
    }

    return <>
        {
            articleList.map((article, index)=>{
                return (
                <article key={article.article_id}>
                    <img src={article.article_img_url} alt={article.title} style={{width:200+'px'}} />
                    <Link to={`/article/${article.article_id}`}>
                        <h2>Title: {article.title}</h2>
                    </Link>
                    <h3>Author: {article.author}</h3>
                    <h4>Topic: {article.topic}</h4>
                    <h4>Date {article.created_at}</h4>
                    <ArticleVotes article={article} index={index} voteList={voteList} setVoteList={setVoteList}/>
                    <Link to={`/article/${article.article_id}`} >
                        <h4 onClick={setSelectedArticle} value={article.article_id}>Comments: {article.comment_count}</h4>
                    </Link>
                </article>)
            })
        }
    </>
}

export default ArticleList