import { useContext, useEffect, useState } from "react";
import ArticleList from "../Articles/ArticleList";
import SearchBar from "./SearchBar";
import axios from "axios";
import MessageContext from "../../contexts/Message";

function Home(){
  const [articleList, setArticleList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(()=>{
      setIsLoading(true)
      axios.get('https://backend-nc-news-project.onrender.com/api/articles')
      .then((response)=>{
        setArticleList([...response.data.articles])
        setIsLoading(false)
      })
    }, [])
  
  return (<>
      <SearchBar />
      {isLoading ? <p>Loading...</p> : <ArticleList articleList={articleList}/>}
  </>)

}

export default Home;