import React, { useEffect } from 'react';
import { useAppContext } from "../libs/contextLib";
import Container from '../components/Container';

function Protected(props) {
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
    }

    onLoad();
  }, [isAuthenticated, props]);
  
  return (
    <Container>
      <h1>Protected route</h1>
    </Container>
  );
}

export default Protected