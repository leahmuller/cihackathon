import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Container from '../components/Container';

function Files(props) {

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .catch(() => {
        props.history.push('/profile')
      })
  }, [props])
  
  return (
    <Container>
      <h1>Manage Files</h1>


    </Container>
  );
}

export default Files