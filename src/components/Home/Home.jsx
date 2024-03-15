import { useContext, useEffect, useState } from "react";
import ArticleList from "../Articles/ArticleList";
import SearchBar from "./SearchBar";
import axios from "axios";
import MessageContext from "../../contexts/Message";
import { Link, useParams, useSearchParams } from 'react-router-dom'
import './Home.css'

function Home(){
  const [articleList, setArticleList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState("")
  const [articleQueries, setArticleQueries] = useState({sort: "", order: ""})
  const [isError, setIsError] = useState()
  
  
  useEffect(()=>{
    const tempArtQ = {...articleQueries}
    if(searchParams.get("topic")){
      setCurrentCategory(searchParams.get("topic"))
    } else {
      setCurrentCategory("")
    }
    if(searchParams.get("sort")){     
      tempArtQ.sort = searchParams.get("sort")
    } else {
      tempArtQ.sort = ""
    }
    if(searchParams.get("order")){
      tempArtQ.order = searchParams.get("order")
    } else {
      tempArtQ.order = ""
    }
    setArticleQueries(tempArtQ)
  },[searchParams])
  
  useEffect(()=>{
      setIsLoading(true)
      let categoryQuery = ""
      let sortQuery = ""
      let orderQuery = ""
      let completeQuery = ""
      if(currentCategory){
        categoryQuery += `topic=${currentCategory}`
      }
      if(articleQueries.sort && currentCategory){
        sortQuery += `&sort=${articleQueries.sort}`
      } else if(articleQueries.sort){
        sortQuery += `sort=${articleQueries.sort}`
      }
      if(articleQueries.order && (articleQueries.sort || currentCategory)){
        orderQuery += `&order=${articleQueries.order}`
      } else if (articleQueries.order){
        orderQuery += `order=${articleQueries.order}`
      }
      if(currentCategory || articleQueries.sort ||  articleQueries.order){
        completeQuery += `?` + categoryQuery + sortQuery + orderQuery
      }
      axios.get(`https://backend-nc-news-project.onrender.com/api/articles${completeQuery}`)
      .then((response)=>{
        setArticleList([...response.data.articles])
        setIsLoading(false)
      })
      .catch((err)=>{
        setIsError(<p>{err.response.data.status + ' ' + err.response.data.msg}</p>)
        setIsLoading(false)
      })
    }, [currentCategory, articleQueries])

    function reRender(event){
      setSearchParams()
    }
  
  return (<>
      <SearchBar currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} setArticleQueries={setArticleQueries} articleQueries={articleQueries}/>
      {isLoading ? <p>Loading...</p> : ( !isError ? <ArticleList articleList={articleList}/> : <>{isError}<a href="" onClick={reRender}>Reload</a></>)}
  </>)

}

export default Home;