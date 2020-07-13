import React, { useState, useEffect } from "react";
import { API, Auth, Logger } from "aws-amplify";
import Container from "../components/Container";

const logger = new Logger('Files.js', 'DEBUG');

function Files(props) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      Auth.currentAuthenticatedUser().catch(() => {
        props.history.push("/profile");
      });

      try {
        const f = await loadFiles();
        console.log(f);
        setFiles(f);
      } catch (e) {
        logger.debug(e);
      }
      setIsLoading(false);
    }

    onLoad();
  }, [props]);

  function loadFiles() {
    return API.get("cihackathonapi", "/algorithms");
  }

  function renderFilesList(files) {
    return null;
  }

  function renderFiles() {
    return <div className="files">{!isLoading && renderFilesList(files)}</div>;
  }

  return (
    <Container>
      <h1>Manage Files</h1>
    </Container>
  );
}

export default Files;
