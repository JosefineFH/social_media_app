import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

export default function EditUser() {
  const items = JSON.parse(localStorage.getItem('user authentication'));
  const token = items.accessToken;
  const url = BASE_URL + `/profiles/${items.name}`
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function updateUser(data) {
    const message = document.querySelector(".message")
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const updateUrl = url + '/media'

    try {
      const response = await axios.put(updateUrl, data, options)
      console.log(response)
      items.avatar = data.avatar
      items.banner = data.banner
      if(response.status === 200){
        localStorage.setItem('user authentication', JSON.stringify(items));
        message.innerHTML = "<div class=''><p class='success'>Your profile is updated</p></div>";
        window.location.reload(false);
      }
    } catch (error) {
      message.innerHTML = `<div class=''>
      <p class='error'>${error.message}</p>
      </div>`;

    }

  }


  return (
    <>
      <p>Edit your profile {items.name}</p>
      <img className="profile_image" src={items.avatar}/>
      <Form className="form_container" onSubmit={handleSubmit(updateUser)}>

        <InputGroup className="mb-3">
          <Form.Label>Banner (use url)</Form.Label>
          <div className="input_group-container">
            <input name="banner"
              {...register("banner")}
              type="url"
              defaultValue={items.banner}
            />
          </div>
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Label>Avatar (use url)</Form.Label>
          <div className="input_group-container">
            <input name="avatar"
              {...register("avatar")}
              type="url"
              defaultValue={items.avatar}
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