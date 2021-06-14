import React, {useRef, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Avatar, ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () =>{
        await auth.signOut();
        history.push('/')
    }
    //get the avatar image
    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type:'image/jpeg'})
    }
    useEffect(() => {
      if(!user) {
          history.push('/');
          return
        }
    axios.get('https://api.chatengine.io/users/me', {
        headers:{
            "project-id" : process.env.REACT_APP_PROYECT_CHAT,
            "user-name"  : user.email,
            "user-secret" : user.uid
        }
    }).then(()=>{
        setLoading(false);
    }).catch(()=>{
        let formdata = new Formdata();
        formdata.append('email', user.email);
        formdata.append('username', user.email)
        formdata.append('secret', user.uid);
        getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name)
                    axios.post('https://api.chatengine.io/users',
                                formdata,
                                {headers: { "private-key":process.env.REACT_APP_SECRET_KEY}}
                        ).then(()=> setLoading(false))
                         .catch((e)=> console.log(e))
                    
                })
    })
    }, [user, history])

    if (!user || loading) return ''  
    return ( 
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">Welcome to Gaia</div>
                <div className="logout-tab" onClick={handleLogout}>Logout</div>
            </div>
            <ChatEngine 
            height="calc(100vh - 66px)"
            projectID = {process.env.REACT_APP_PROYECT_CHAT}
            userName={user.email}
            userSecret={user.uid}
            />
        </div>
     );
}
 
export default Chats;