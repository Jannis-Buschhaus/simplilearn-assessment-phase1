/**
* Movie App created by Jannis Robin Buschhaus for SimpliLearn Phase 1 Assessment.
* This application requires the installation of the following dependencies: create-react-app, bootstrap, react-bootstrap, redux, react-redux, axios, react-router, react-router-dom
*/

// Importing required modules
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Importing Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Importing App Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Home from "./components/Home";

//The App component is the main entry point of the application.
function App() {
  return (
    <>
      <BrowserRouter>
        <Container className="bg-dark text-warning text-center" style={{ minHeight: "100vh" }} fluid>
          <Row>
            <Col >
              <Header />
            </Col>
          </Row>
          <Row className="bg-white text-dark" style={{ minHeight: "90vh" }}>
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