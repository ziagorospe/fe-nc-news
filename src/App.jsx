import { useEffect, useState } from "react"
import { Routes, Route, useLocation} from 'react-router-dom';
import axios from 'axios'
import Home from "./components/Home/Home"
import UserContext from "./contexts/User"
import PostArticle from "./components/PostArticle/PostArticle";
import Account from "./components/Account/Account";
import Navbar from "./components/Navbar/Navbar";
import Article from "./components/Articles/Article";
import UserMessage from "./components/UserMessage/UserMessage";
import FocusArticleContext from "./contexts/FocusArticle";
import MessageContext from "./contexts/Message";
import './App.css'
import NotFoundPage from "./components/NotFound/NotFoundPage";
import mascot from '../assets/nc-news-mascot-no-bg.png'


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
    <>
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <div className="head-box">
        <img className="mascot "src={mascot}/>
        <div className="main-title">
          <h1>ZG News</h1>
          <h2>Your #1 Source of Misinformation</h2>
        </div>
      {currentUser.username ? <div className="user-area"><p>Logged in as {currentUser.username}</p><img src={currentUser.avatar_url}/></div> : null}
      </div>
      <div className="innerBorderBox">
      <Navbar />
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
            <Route path="account" element={
              <Account />
            }/>
            <Route path="*" element={
              <NotFoundPage/>
            }/>
          </Routes>
        </FocusArticleContext.Provider>
      </MessageContext.Provider>
      </div>
      </UserContext.Provider>
      </>
  )
}

export default App
