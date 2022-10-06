import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../lib/errorLib";

export default function Notes() {
  const file = useRef(null);
  const { id } = useParams();
  const nav = useNavigate();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");

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

      onLoad();
    };
  }, [id]);

  return <div className="Notes">Empty Container</div>;
}
