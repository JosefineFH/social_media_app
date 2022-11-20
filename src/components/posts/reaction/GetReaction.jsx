import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";


export default function GetPostReaction(props){
    const [page, setPage] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useContext(AuthContext)

    const id = props.id;
    
    if(!id){
        <p>There is no post id to get post reactions</p>
    }
    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }
    const url = BASE_URL + `/posts/${id}?_reactions=true`;

    useEffect(() => {
        async function getReaction(){
            try {
                const reaction = await axios.get(url, options)
                const data = reaction.data
                console.log(data.reactions)
            } catch (error) {
                
            }finally{
                setLoader(false)
            }
        }
        getReaction()
    }, [])

    return(
        <p>Reaction</p>
    )
}