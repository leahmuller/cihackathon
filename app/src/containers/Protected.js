import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Container from '../components/Container';

function Protected(props) {

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .catch(() => {
        console.log(props.history);
        props.history.push('/profile')
      })
  }, [props])
  
  return (
    <Container>
      <h1>Protected route</h1>
    </Container>
  );
}

export default Protected