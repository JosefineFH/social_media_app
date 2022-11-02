import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";

export default function GetUserPost(props){
  let navigate = useNavigate();
  const userName = props.name
  const [posts, setPosts] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);


  // if (isLoading) {
  //   if (!auth) {
  //     navigate('/')
  //   }
  //   return <div>Loading</div>;
  // }
  // if (isError) {
  //   return <div>{isError}</div>;
  // }

  return(
    <>
    <div className="message_container">
    {(() => {
        if (posts === null) {
          return (
            <div><p>There is noe posts her for now. Way dont you make one</p><a>Link Here</a></div>
          )
        } 
      })()}
    </div>
      
    </>
  )
}