import React, { useState, useEffect } from "react";
import { API, Logger } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import Container from "../components/Container";
import "./AlgorithmList.css";

const logger = new Logger("AlgorithmList", "DEBUG");

export default function AlgorithmList(props) {
  const { isAuthenticated } = useAppContext();
  const [algorithms, setAlgorithms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const algorithms = await loadAlgorithms();
        setAlgorithms(algorithms);
        //logger.debug(algorithms);
      } catch (e) {
        logger.debug(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated, props]);

  function loadAlgorithms() {
    return API.get("algorithms", "/algorithms");
  }

  function renderAlgorithmsList(algorithms) {
    return [{}].concat(algorithms).map((algorithm, i) =>
      i !== 0 ? (
        <LinkContainer
          key={algorithm.algorithmId}
          to={`/algorithms/${algorithm.algorithmId}`}
        >
          <ListGroupItem>
            {algorithm.label.trim().split("\n")[0]}
            <br />
            <small>
              {"Created: " + new Date(algorithm.createdAt).toLocaleString()}
            </small>
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="create" to="/create">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new algorithm
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  return (
    <>
      <Container>
        <div className="Algorithms">
          <div className="algorithm">
            <h1>Your Algorithms</h1>
            <ListGroup>
              {!isLoading && renderAlgorithmsList(algorithms)}
            </ListGroup>
          </div>
        </div>
      </Container>
    </>
  );
}
