import GetPostReaction from "./GetReaction";

export default function ReactToPost(props){
  return(<>
    <GetPostReaction id={props.id}/>
    <p>A registered user may react to any Post with an emoji</p>
  </>
  )
}