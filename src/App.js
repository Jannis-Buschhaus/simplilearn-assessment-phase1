/*
* Movie App for SimpliLearn Phase 1 React Assessment
* The following dependencies need to be installed to run this app:
* npm install react react-bootstram redux react-redux axios test
*/

import React from "react";

//Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//App Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

//App component
function App() {
  return (
    <>
      <Container className="bg-dark text-warning text-center" style={{minHeight: "100vh"}} fluid>
        <Row>
          <Col >
            <Header />
          </Col>
        </Row>
        <Row className="bg-white text-dark" style={{minHeight: "90vh"}}>
          <Col></Col>
          <Col xs="8">
            <Main />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
