/*
* Movie App for SimpliLearn Phase 1 React Assessment
* The following dependencies need to be installed to run this app:
* npm install react react-bootstram redux react-redux axios test
*/

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

//Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//App Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Home from "./components/Home";

//App component
function App() {
  return (
    <>
    <BrowserRouter>
      <Container className="bg-dark text-warning text-center" style={{minHeight: "100vh"}} fluid>
        <Row>
          <Col >
            <Header />
          </Col>
        </Row>
        <Row className="bg-white text-dark" style={{minHeight: "90vh"}}>
          <Col></Col>
          <Col xs="8">
            <Routes>
              <Route path="/" element={<Navigate replace to={"/home/"} />}></Route>
              <Route path={"/home/"} element={<Home />}></Route>
              <Route path={"/movies/"} element={<Main />}></Route>
            </Routes>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
