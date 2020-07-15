import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { API, Logger } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import Container from "../components/Container";
import config from "../config";

const logger = new Logger("NewAlgorithm", "DEBUG");

export default function NewAlgorithm() {
  const file = useRef(null);
  const history = useHistory();
  const [label, setLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return label.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      await createAlgorithm({ label, attachment });
      logger.debug("Success:" + label);
      history.push("/algorithms");
      setIsLoading(false);
    } catch (e) {
      logger.debug("Error in createAlgorithm:" + e);
      setIsLoading(false);
    }
  }

  function createAlgorithm(algorithm) {
    logger.debug(algorithm);
    var res = API.post("algorithms", "/algorithms", {
      body: algorithm,
    });
    logger.debug(res);
  }

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="label">
            <FormControl
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="file">
            <FormLabel>Attachment</FormLabel>
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
            Create
          </LoaderButton>
        </form>
      </Container>
    </>
  );
}
