import { useEffect, useState } from "react";
import ArticleList from "../Articles/ArticleList";
import SearchBar from "./SearchBar";
import axios from "axios";

function Home(){
  const [articleList, setArticleList] = useState([])
  useEffect(()=>{
      axios.get('https://backend-nc-news-project.onrender.com/api/articles')
      .then((response)=>{
        console.log(response.data.articles)
        setArticleList([...response.data.articles])
      })
    }, [])
  
  return (<>
      <SearchBar />
      <ArticleList articleList={articleList}/>
  </>)

}

export default Home;