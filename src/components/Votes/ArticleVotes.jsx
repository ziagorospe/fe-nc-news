import { useContext } from "react"
import UserContext from "../../contexts/User"
import axios from "axios";
import MessageContext from "../../contexts/Message";

function ArticleVotes(props){
    const {article} = props
    const {index} = props
    const {voteList} = props
    const {setVoteList} = props
    const {setResponseMessage} = useContext(MessageContext)
    const {currentUser} = useContext(UserContext)

    function updateVote(event){
        setResponseMessage("")
        if(currentUser){
            const voteMod = event.target.value*1
            const articleId = event.target.id
            const voteIndex = event.target.attributes.index.value*1
            const tempVote = [...voteList]
            tempVote[voteIndex] += voteMod
            setVoteList(tempVote)
            
            axios.patch(`https://backend-nc-news-project.onrender.com/api/articles/${articleId}`,{
                inc_votes: voteMod
            })
            .then((response)=>{
                
            })
            .catch(()=>{
                const tempVote = [...voteList]
                tempVote[voteIndex] -= voteMod
                setVoteList(tempVote)
                setResponseMessage("Could not vote")
            })
        } else {
            setResponseMessage("Go log in to vote") 
        }
    }

    return (
    <div>
        <button onClick={updateVote} value="1" id={article.article_id} index={index}>+</button>
        <h4>Votes: {voteList[index]}</h4>
        <button onClick={updateVote} value="-1" id={article.article_id} index={index}>-</button>
    </div>)
}

export default ArticleVotes