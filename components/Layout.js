import React from 'react';
import Header from './Header';
import Head from 'next/head'; //this is the HTML <Head> element
import { Container } from 'semantic-ui-react';

export default (props) => {
  return(
      <Container>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>
        <Header />
          {props.children}
      </Container>
  );
};
