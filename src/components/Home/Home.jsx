import { useContext, useEffect, useState } from "react";
import ArticleList from "../Articles/ArticleList";
import SearchBar from "./SearchBar";
import axios from "axios";
import MessageContext from "../../contexts/Message";
import { useParams, useSearchParams } from 'react-router-dom'

function Home(){
  const [articleList, setArticleList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentCategory, setCurrentCategory] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();
  
  
  useEffect(()=>{
    if(searchParams.get("topic")){
      setCurrentCategory(searchParams.get("topic"))
    }
  },[])
  
  useEffect(()=>{
      setIsLoading(true)
      let categoryQuery = ""
      let completeQuery = ""
      if(currentCategory){
        categoryQuery += `topic=${currentCategory}`
      }
      if(currentCategory){
        completeQuery += `?` + categoryQuery
      }
      axios.get(`https://backend-nc-news-project.onrender.com/api/articles${completeQuery}`)
      .then((response)=>{
        setArticleList([...response.data.articles])
        setIsLoading(false)
      })
    }, [currentCategory])
  
  return (<>
      <SearchBar currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
      {isLoading ? <p>Loading...</p> : <ArticleList articleList={articleList}/>}
  </>)

}

export default Home;