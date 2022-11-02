import { useState } from "react";

export default function GetUserPost(props){
  const userName = props.name
  const [posts, setPosts] = useState(null);

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