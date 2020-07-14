import React, { useState, useEffect } from "react";
import { API, Auth, Logger } from "aws-amplify";
import Container from "../components/Container";

const logger = new Logger('Files.js', 'DEBUG');

function Files(props) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Auth.currentAuthenticatedUser().catch(() => {
      props.history.push("/profile");
    });

    onLoad();

    async function onLoad() {
      try {
        var files = await loadFiles();
        setFiles(files);
      } catch (e) {
        logger.debug(e);
      }
      setIsLoading(false);
    }

    logger.debug("files: " + files + " isLoading: " + isLoading);
  }, [props, files, isLoading]); // react-hooks/exhaustive-deps

  function loadFiles() {
    return API.get("helloworldAPI", "/helloworld");
  }

  //function renderFilesList(files) {
  //  return null;
  //}

  //function renderFiles() {
  //  return <div className="files">{!isLoading && renderFilesList(files)}</div>;
  //}

  return (
    <Container>
      <h1>Manage Files</h1>
    </Container>
  );
}

export default Files;
