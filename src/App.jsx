import { useEffect, useState } from "react"
import { Routes, Route, useLocation} from 'react-router-dom';
import axios from 'axios'
import Home from "./components/Home/Home"
import UserContext from "./contexts/User"
import PostArticle from "./components/PostArticle/PostArticle";
import DeletePage from "./components/Deleting/DeletePage";
import Account from "./components/Account/Account";
import Navbar from "./components/Navbar/Navbar";
import Article from "./components/Articles/Article";
import UserMessage from "./components/UserMessage/UserMessage";
import FocusArticleContext from "./contexts/FocusArticle";
import MessageContext from "./contexts/Message";


function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "zmoney",
    name: "zia",
    avatar_url: "https://static.wikia.nocookie.net/legendsofthemultiuniverse/images/1/1d/DK-3.png"
  })
  const [focusArticle, setFocusArticle] = useState([])
  const [responseMessage, setResponseMessage] = useState("")
  const location = useLocation();

  useEffect(()=>{
    setResponseMessage("")
  },[location])

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <Navbar />
      {currentUser.username ? <><p>Logged in as {currentUser.username}</p><img style={{width:100+'px'}} src={currentUser.avatar_url}/></> : null}
      <MessageContext.Provider value={{responseMessage, setResponseMessage}}>
        <UserMessage />
        <FocusArticleContext.Provider value={{focusArticle, setFocusArticle}}>
          <Routes>
            
              <Route path="/" element={
                <Home />
              }/>
              <Route path="article/:id" element={
                <Article focusArticle={focusArticle}/>
              } />
            
            <Route path="post-article" element={
              <PostArticle />
            }/>
            <Route path="delete" element={
              <DeletePage />
            }/>
            <Route path="account" element={
              <Account />
            }/>
          </Routes>
        </FocusArticleContext.Provider>
      </MessageContext.Provider>
      </UserContext.Provider>
  )
}

export default App
