import React, { useRef, useState, useEffect } from "react";
import { API, Storage, Logger } from "aws-amplify";
import { useParams, useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

import Container from "../components/Container";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Algorithms.css";

const logger = new Logger("Algorithms", "DEBUG");

export default function Algorithms() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [algorithm, setAlgorithm] = useState(null);
  const [label, setLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadAlgorithm() {
      return API.get("algorithms", `/algorithms/${id}`);
    }

    async function onLoad() {
      try {
        const algorithm = await loadAlgorithm();
        const { label, attachment } = algorithm;

        if (attachment) {
          algorithm.attachmentURL = await Storage.vault.get(attachment);
        }

        setLabel(label);
        setAlgorithm(algorithm);
      } catch (e) {
        logger.debug(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return label.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveAlgorithm(algorithm) {
    return API.put("algorithms", `/algorithms/${id}`, {
      body: algorithm,
    });
  }

  async function handleSubmit(event) {
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

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveAlgorithm({
        label,
        attachment: attachment || algorithm.attachment,
      });
      history.push("/algorithms");
    } catch (e) {
      logger.debug(e);
      setIsLoading(false);
    }
  }

  function deleteAlgorithm() {
    return API.del("algorithms", `/algorithms/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this algorithm?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteAlgorithm();
      history.push("/algorithms");
    } catch (e) {
      logger.debug(e);
      setIsDeleting(false);
    }
  }

  return (
    <Container>
      <div className="Algorithms">
        {algorithm && (
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="label">
              <FormControl
                value={label}
                componentClass="textarea"
                onChange={(e) => setLabel(e.target.value)}
              />
            </FormGroup>
            {algorithm.attachment && (
              <FormGroup>
                <FormLabel>Attachment</FormLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={algorithm.attachmentURL}
                  >
                    {formatFilename(algorithm.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>
            )}
            <FormGroup controlId="file">
              {!algorithm.attachment && <FormLabel>Attachment</FormLabel>}
              <FormControl onChange={handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              //bsSize="large"
              //bsStyle="primary"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Save
            </LoaderButton>
            <LoaderButton
              block
              //bsSize="large"
              //bsStyle="danger"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </LoaderButton>
          </form>
        )}
      </div>
    </Container>
  );
}
