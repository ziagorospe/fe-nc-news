import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import capitalize from "../../utils/capitalize";
capitalize

function SearchBar(props){
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryList, setCategoryList] = useState([])
  const {currentCategory} = props
  const {setCurrentCategory} = props
  const {setArticleQueries} = props
  const {articleQueries} = props

  useEffect(()=>{
      axios.get('https://backend-nc-news-project.onrender.com/api/topics')
      .then((response)=>{
          setCategoryList([...response.data.topics])
      })
  },[])

  function changeCategory(event){
    setCurrentCategory(event.target.value)
    const tempParams = new URLSearchParams(searchParams)
    if(event.target.value){
      tempParams.set('topic', event.target.value)
      setSearchParams(tempParams) 
    } else {
      tempParams.delete('topic')
      setSearchParams(tempParams)
    } 
  }

  function queryAdvanced(event){
    const args = event.target.value.split('&')
    const sortBy = args[0]
    const order = args[1]
    if(currentCategory){
      setSearchParams({topic: currentCategory, sort: sortBy, order: order})
    } else {
      setSearchParams({sort: sortBy, order: order})
    }
    
    setArticleQueries({sort: sortBy, order: order})
  }

  return (
      <div className="search-bar">
        <div className="topic-div">
          <label htmlFor="select-topic">Topic:</label>
          <select id="select-topic" value={currentCategory} onChange={changeCategory} name="Categories">
            <option value="">All Categories</option>
            {categoryList.map((category) => {
              return (
                <option key={category.slug} value={category.slug}>
                  {capitalize(category.slug)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="sort-div">
        <label htmlFor="select-sort">Sort By:</label>
        <select id="select-sort" onChange={queryAdvanced} value={`${articleQueries.sort}&${articleQueries.order}`} name="Sort Adv">
          <option value={(`created_at&desc` || "")}>Newest</option>
          <option value={`comment_count&desc`}>Hottest</option>
          <option value={`votes&desc`}>Top Rated</option>
          <option value={`created_at&asc`}>Oldest</option>
          <option value={`comment_count&asc`}>Most Ignored</option>
          <option value={`votes&asc`}>Most Hated</option>
          <option value={`title&asc`}>A-Z</option>
          <option value={`title&desc`}>Z-A</option>
      </select>
      </div>
    </div>
  )
}

export default SearchBar;