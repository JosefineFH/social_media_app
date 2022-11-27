import axios from "axios";
import { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

export default function CreatePostForm(){
    const [convertedText, setConvertedText] = useState();
    // const [auth, setAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const url = BASE_URL + "/posts"
    const navigate  = useNavigate();
    const [successMessage, setSuccessMessage] = useState(null)
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
  
    async function CreatePost(data){
      const message = data.body;
      const title = data.title;
      const tags = [];
      const media = data.media
      tags.push(data.tags)

      const formData = {
        title: title,
        body: message,
        tags: tags,
        media:media
      };

      const options = {
        // headers: { Authorization: `Bearer ${auth.accessToken}` },
      };
  
      try {
        const response =  await axios.post(url, formData, options)
        console.log(response)
        if(response.status === 200){
          setSuccessMessage(<p>Your post has been posted</p>)
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      } catch (error) {
        console.log(error)
        setIsError(error.response.data.errors[0].message)
      }finally{
        // console.log("data is sendt")
      }
      if (isError) {
        return <div>{isError}</div>;
      }
    }

    console.log(successMessage)
  
    //   if (isLoading) {
    //   if (!auth) {
    //     navigate('/')
    //   }
    //   return <div>Loading</div>;
    // }
    // if (isError) {
    //   return <div>{isError}</div>;
    // }
  
    return (<>
    <div className="message">{successMessage}</div>
      <Form className="form_container create_post"  onSubmit={handleSubmit(CreatePost)}>
        <InputGroup>
            <Form.Label>Title </Form.Label>
            <div className="input_group-container">
              <input name="title"
                {...register("title", { required: true})}
                type="text"
                placeholder="Enter title..."
              />
            </div>
            {errors.title && <span className="error">Please enter a title</span>}
          </InputGroup>
  
          <InputGroup className="mb-3">
            <Form.Label>Body </Form.Label>
            <div className="input_group-container">
              <textarea name="body"
                {...register("body")}
                type="text"
              />
            </div>
            {errors.body && <span className="error">Please enter a something in the body. Max 280 symboled</span>}
          </InputGroup>
  
        <InputGroup className="mb-3">
            <Form.Label>media (use url)</Form.Label>
            <div className="input_group-container">
              <input name="media"
                {...register("media")}
                type="url"
              />
            </div>
            {errors.media && <span className="error">Please enter a image url</span>}
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
      </>
    )
}