import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../lib/errorLib";
import config from "../config";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./Notes.css";

export default function Notes() {
  const file = useRef(null);
  const { id } = useParams();
  const nav = useNavigate();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /* We get the id of our note from the URL using useParams hook that comes with React Router. 
  The id is a part of the pattern matching in our route (/notes/:id). */
  useEffect(() => {
    const loadNote = () => {
      return API.get("notes", `/notes/${id}`);
    };

    const onLoad = async () => {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        /* If there is an attachment, we use the key to get a secure link to the file we uploaded to S3. 
        We then store this in the new note object as note.attachmentURL. */
        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    };
    onLoad();
  }, [id]);

  const validateForm = () => {
    return content.length > 0;
  };

  const formatFilename = (str) => {
    return str.replace(/^\w+-/, "");
  };

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
  };

  const handleSubmit = (event) => {
    let attachment;

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
  };

  const handleDelete = (event) => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you suer you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
  };
  return (
    <div className="Notes">
      {note && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Attachment</Form.Label>
            {note.attachment && (
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </p>
            )}
            <Form.Control onChange={handleFileChange} type="file" />
          </Form.Group>
          <LoaderButton
            block="true"
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block="true"
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}
