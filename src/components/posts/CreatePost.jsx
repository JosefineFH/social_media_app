import axios from "axios";
import { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

export default function CreatePostForm(){
    // let navigate = useNavigate();
    const [convertedText, setConvertedText] = useState();
    const [auth, setAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const url = BASE_URL + "/posts"
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
  
    async function CreatePost(data){
      const options = {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      };
      // const tagArray = [{'tags' : data.tags}]
      // formData.tags
      // console.log(tagArray)
      console.log(data)
  
      try {
        const response =  await axios.post(url, data, options)
        console.log(response.data)
        
      } catch (error) {
        console.log(error)
      }finally{
        // console.log("data is sendt")
      }
    }
  
    //   if (isLoading) {
    //   if (!auth) {
    //     navigate('/')
    //   }
    //   return <div>Loading</div>;
    // }
    // if (isError) {
    //   return <div>{isError}</div>;
    // }
  
    return (
      <Form onSubmit={handleSubmit(CreatePost)}>
        <InputGroup className="mb-3">
            <Form.Label>Title </Form.Label>
            <div className="input_group-container">
              <input name="title"
                {...register("title", { required: true})}
                type="text"
                placeholder="Enter title..."
              />
            </div>
          </InputGroup>
  
          <InputGroup className="mb-3">
            <Form.Label>Body </Form.Label>
            <div className="input_group-container">
              <textarea name="body"
                {...register("body")}
                type="text"
              />
            </div>
          </InputGroup>
  
        <InputGroup className="mb-3">
            <Form.Label>media (use url)</Form.Label>
            <div className="input_group-container">
              <input name="media"
                {...register("media")}
                type="url"
              />
            </div>
          </InputGroup>
  
          <InputGroup className="mb-3">
            <Form.Label>Tags </Form.Label>
            <div className="input_group-container">
              <input name="tags"
                {...register("tags")}
                type="text"
              />
            </div>
          </InputGroup>
  
          <Button className="primary" type="submit">
            Update
          </Button>
      </Form>
    )
}