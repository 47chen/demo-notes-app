import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";
import { s3Upload } from "../lib/awsLib";

export default function NewNote() {
  //It simply tells React to store a value for us so that we can use it later.
  //We can set/get the current value of a ref by using its current property.
  const file = useRef(null);
  const nav = useNavigate();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return content.length > 0;
  };

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({ content });
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  //We make our create call in createNote by making a POST request to /notes and passing in our note object.
  const createNote = (note) => {
    return API.post("notes", "/notes", {
      body: note,
    });
  };

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            value={content}
            as="textarea"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}
