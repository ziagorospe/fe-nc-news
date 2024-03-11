import axios from "axios";
import { useEffect, useState } from "react";

function SearchBar(){

    const [categoryList, setCategoryList] = useState([])

    useEffect(()=>{
        axios.get('https://backend-nc-news-project.onrender.com/api/topics')
        .then((response)=>{
            setCategoryList([...response.data.topics])
        })
    },[])

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
        <select name="Categories" id="">
          <option value="">All Categories</option>
          {categoryList.map((category) => {
            return (
              <option value={category.slug}>
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