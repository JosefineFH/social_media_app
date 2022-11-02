import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

export default function EditUser() {
  let navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const url = BASE_URL + `/profiles/${auth.name}`

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function updateUser(data) {
    const message = document.querySelector(".message")
    const options = {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    };

    const updateUrl = url + '/media'
    console.log(updateUrl)

    try {
      const response = await axios.put(updateUrl, data, options)
      auth.avatar = data.avatar
      auth.banner = data.banner
      if (response.status === 200) {
        localStorage.setItem('user authentication', JSON.stringify(auth));
        message.innerHTML = "<div class=''><p class='success'>Your profile is updated</p></div>";
        window.location.reload(false);
      }
    } catch (error) {
      setIsError("There was an error updating your profile");

    }finally{
      setIsLoading(false);
    }

    if (isLoading) {
      if (!auth) {
        navigate('/')
      }
      return <div>Loading</div>;
    }
    if (isError) {
      return <div>{isError}</div>;
    }
  }

  return (
    <>
      <p>Edit your profile {auth.name}</p>
      <img className="profile_image" src={auth.avatar} />
      <Form className="form_container" onSubmit={handleSubmit(updateUser)}>

        <InputGroup className="mb-3">
          <Form.Label>Banner (use url)</Form.Label>
          <div className="input_group-container">
            <input name="banner"
              {...register("banner")}
              type="url"
              defaultValue={auth.banner}
            />
          </div>
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Label>Avatar (use url)</Form.Label>
          <div className="input_group-container">
            <input name="avatar"
              {...register("avatar")}
              type="url"
              defaultValue={auth.avatar}
            />
          </div>
        </InputGroup>

        <Button className="primary" type="submit">
          Update
        </Button>
      </Form>
      <div className="message"></div>
    </>
  )
}