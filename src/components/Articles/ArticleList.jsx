import { useContext } from 'react'
import { Link } from 'react-router-dom'
import FocusArticleContext from '../../contexts/FocusArticle'

function ArticleList(props){
    const {setFocusArticle} = useContext(FocusArticleContext)
    function setSelectedArticle(event){
        setFocusArticle(event.target.attributes[0].value)
    }

    

    const {articleList} = props
    return <>
        {
            articleList.map((article)=>{
                return (<article key={article.article_id}>
                    <img src={article.article_img_url} alt={article.title} style={{width:200+'px'}} />
                    <h1>Title: {article.title}</h1>
                    <h2>Author: {article.author}</h2>
                    <h3>Topic: {article.topic}</h3>
                    <h3>Date {article.created_at}</h3>
                    <div>
                        
                        <button value="1">+</button>
                        <h4>Votes: {article.votes}</h4>
                        <button value="-1">-</button>
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