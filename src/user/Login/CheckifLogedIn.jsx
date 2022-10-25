import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export let userName = '';

export default function GetFromLocalStorage(){
  const [auth, setauth] = useState([]);
  let history = useNavigate();

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('user authentication'));
  if(items !== null ){
      setauth(items);
      if(items.email && items.accessToken){
        userName = items.name;

        history("/dashboard");
      }
  } else {
    console.log("You are not logged in");
    history("/login");
  }
}, []);
}