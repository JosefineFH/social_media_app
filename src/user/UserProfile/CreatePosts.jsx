import { useState } from "react";
import { Form } from "react-bootstrap"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

export default function CreatePost() {

  const [convertedText, setConvertedText] = useState("Some default content");

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <ReactQuill
        theme='snow'
        value={convertedText}
        onChange={setConvertedText}
        style={{minHeight: '300px'}}
      />
      </Form.Group>
    </Form>
  )
}