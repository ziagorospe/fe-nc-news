import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import FocusArticleContext from '../../contexts/FocusArticle'
import ArticleVotes from '../Votes/ArticleVotes';
import capitalize from '../../utils/capitalize';
import './ArticleList.css'

function ArticleList(props){
    const {setFocusArticle} = useContext(FocusArticleContext)
    const {articleList} = props
    const [voteList, setVoteList] = useState(articleList.map((article)=>{
        return article.votes
    }))

    function setSelectedArticle(event){
        setFocusArticle(event.target.attributes[0].value)
    }

    return <div className='article-list-container'>
        {
            articleList.map((article, index)=>{
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                return (
                <article key={article.article_id}>
                    <div className='article-img-container'>
                        <img src={article.article_img_url} alt={article.title} />
                    </div>
                    
                    <div className='article-info'>
                        <Link to={`/article/${article.article_id}`}>
                            <h2>{article.title}</h2>
                        </Link>
                        <div className='article-row-container'>
                        <div className='article-text-info'>
                            <h3>By: {article.author}</h3>
                            <h4>It's about {capitalize(article.topic)}</h4>
                            
                            <h4>Posted: {article.created_at.slice(0, 19).replace('T', ' ')}</h4>
                        </div>
                        <div className='article-vote-comment'>
                            <ArticleVotes article={article} index={index} voteList={voteList} setVoteList={setVoteList}/>
                            <Link to={`/article/${article.article_id}`} >
                                <h4 className='article-list-comments' onClick={setSelectedArticle} value={article.article_id}>Comments: {article.comment_count}</h4>
                            </Link>
                        </div>
                        </div>
                    </div>
                </article>)
            })
        }
    </div >
}

export default ArticleList