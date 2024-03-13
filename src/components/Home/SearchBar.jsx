import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

function SearchBar(props){
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryList, setCategoryList] = useState([])
  const {currentCategory} = props
  const {setCurrentCategory} = props

  useEffect(()=>{
      axios.get('https://backend-nc-news-project.onrender.com/api/topics')
      .then((response)=>{
          setCategoryList([...response.data.topics])
      })
  },[])


  function changeCategory(event){
    setCurrentCategory(event.target.value)
    if(event.target.value){
      setSearchParams({topic: event.target.value}) 
    } else {
      setSearchParams("")
    }
    
  }

  return (
      <form>
          <div>
              <select name="Sort By">
                  <option value="">Sort By</option>
                  <option value="created_at">Latest</option>
                  <option value="title">Title</option>
                  <option value="votes">Votes</option>
                  <option value="comment_count">Comments</option>
              </select>
              <select name="Order By">
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
              </select>
          </div>
          <div>
      <input type="text" />
      <select value={currentCategory} onChange={changeCategory} name="Categories" id="">
        <option value="">All Categories</option>
        {categoryList.map((category) => {
          return (
            <option key={category.slug} value={category.slug}>
              {category.slug}
            </option>
          );
        })}
      </select>
      <button type="submit">Search</button>
    </div>
      </form>
  )
}

export default SearchBar;