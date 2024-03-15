import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MessageContext from "../../contexts/Message";
import UserContext from "../../contexts/User";

function Account(props){
    const [collapsedState, setCollapsedState] = useState('none')
    const {setResponseMessage} = useContext(MessageContext)
    const {setCurrentUser} = useContext(UserContext)
    const [usersList, setUsersList] = useState()
    const [selectedUser, setSelectedUser] = useState({avatar_url: "", username: "", kudos: 0})
    const [previewDisplayState, setPreviewDisplayState] = useState('none')
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        setIsLoading(true)
        axios.get("https://backend-nc-news-project.onrender.com/api/users")
        .then((users)=>{
            setUsersList(users.data.users)
            setIsLoading(false)
        })
    },[])

    function collapseToggle(){
        if(collapsedState==='none'){
            setCollapsedState('block')
            setPreviewDisplayState('none')
        } else {
            setCollapsedState('none')
        }
    }
    function postUser(event){
        event.preventDefault()
        const postedUser = {}
        postedUser.username = event.target[0].value
        postedUser.avatar_url = event.target[1].value
        axios.post('https://backend-nc-news-project.onrender.com/api/users', postedUser)
        .then((response)=>{
            setCollapsedState('none')
            setResponseMessage(`You have successfully created your account and now logged in as: ${response.data.user.username}`)
            setSelectedUser(response.data.user)
            const tempUserList = [...usersList]
            tempUserList.push(response.data.user)
            setUsersList(tempUserList)
            setCurrentUser(response.data.user)
        })
    }

    function selectedUserChanged(event){
        setPreviewDisplayState('block')
        setCollapsedState('none')
        setSelectedUser(JSON.parse(event.target.value))
    }

    function logInUser(event){
        setCurrentUser(selectedUser)
    }

    return (
    <>
        <button onClick={collapseToggle}>{collapsedState==='none' ? "Sign Up" : "Sign In"}</button>
        <form onSubmit = {postUser} style={{display: `${collapsedState}`}}>
            <label htmlFor='username'>Username: </label>
            <input id='username' required/>
            <br/>
            <label htmlFor='avatar_url'>Profile pic: </label>
            <input id='avatar_url' required/>
            <br/>
            <button type='submit'>Create User</button>
        </form>
        <br/>

        {collapsedState==='none' ?  (!isLoading ? <><label htmlFor="select-user">Choose your fighter: </label>
        <select id="select-user" onChange={selectedUserChanged}>
            {usersList.map((user)=>{
                return <option key={user.username} value={JSON.stringify(user)}>{user.username}</option>
            })}
        </select>
        <div style={{display: `${previewDisplayState}`}} >
            <p>{selectedUser.username}</p>
            <img src={selectedUser.avatar_url} style={{width:100+'px'}}/>
            <p>{selectedUser.kudos}</p>
            <button onClick={logInUser}>Log me in</button>
        </div></> : <p>Loading...</p>) :  <p></p>}
    </>)
}

export default Account