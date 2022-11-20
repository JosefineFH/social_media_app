import axios from "axios";
import { forEach } from "lodash";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";

export default function GetPostReaction(props) {
    const [reactions, setReactions] = useState([]);
    const [symbolsList, setSymbolsList] = useState();
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useContext(AuthContext)

    const id = props.id;

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }
    const url = BASE_URL + `/posts/${id}?_reactions=true`;

    useEffect(() => {
        async function getReaction() {
            try {
                const response = await axios.get(url, options)
                const reactionList = response.data.reactions
                setReactions(reactionList)
                console.log(reactionList)

            } catch (error) {

            } finally {
                setLoader(false)
            }
        }
        getReaction()
    }, [])

    async function isChecked(e) {
        const checked = e.target.checked;
        const checkedName = e.target.name;
        const checkedPostId = e.target.id;
        let checkedValue = e.target.value;

        if(checked === true){
            checkedValue ++
        }
        const data = {
            symbol: checkedName,
            postId: checkedPostId,
            count: `${checkedValue}`
        };
        console.log(data)
        const reactUrl = BASE_URL + `/posts/${checkedPostId}/react/${checkedName}`
        console.log(reactUrl)
        try {
            const response = await axios.put(reactUrl, data, options);
            if (response.status === 200) {
                console.log("success")
            //   setSuccessMessage(`<div className="success"><p>You ar now logging in!</p></div>`)
            }
          } catch (error) {
            const errorMessage = <div className="error">{error.response.data.errors[0].message}</div>;
            // setIsError(errorMessage);
            console.log(error)
      
          }
        
    }

    const reactSymbol = [
        "😇",
        "😛",
        "🧡",
        "👍"
    ]

    return (
        <>
            {reactSymbol.map((react) => {
                let icons = react;
                let postId;
                let count
                reactions.map((symbol) => {
                    let symbols = symbol.symbol
                    if (symbols === react) {
                        icons = symbols;
                        postId = symbol.postId
                        count = symbol.count
                    }

                })
                return (
                    <>
                        <label for="vehicle1">{react}</label>
                        <input type="checkbox" id={props.id} value={count} name={icons} onChange={isChecked}/>
                    </>
                )
            })
            }

        </>
    )
}