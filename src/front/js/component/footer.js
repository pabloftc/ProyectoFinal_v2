import React, { Component } from "react";
import SayanImageUrl from "../../img/logo.jpeg";
import { Row, Card, Col, Form, FormControl, Button } from "react-bootstrap";

export const Footer = () => (
  <footer className="footer mt-auto py-3" style={{ padding: "100px", marginTop: "200px" }}>
    <div style={{paddingTop: "100px"}}></div>
    <img
      src={SayanImageUrl}
      style={{ width: "100px", height: "70px", paddingBottom: "40px" }}
    />
    <Row md={3}>
      <Col>
        <p style={{ fontWeight: "bold" }}>Extra security</p>
      </Col>
      <Col style={{textAlign: "center"}}>
        <p style={{ fontWeight: "bold" }}>Resources</p>
      </Col>
      <Col style={{textAlign: "right"}}>
        <p style={{ fontWeight: "bold" }}>About</p>
      </Col>
    </Row>
    <Row >
      <Col>
        <p style={{ color: "gray" }}>Cool Stuff</p>
      </Col>
      <Col style={{textAlign: "center"}}>
        <p style={{ color: "gray" }}>Resources Name</p>
      </Col>
      <Col style={{textAlign: "right"}}>
        <p style={{ color: "gray" }}>Team</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <p style={{ color: "gray" }}>Random Feature</p>
      </Col>
      <Col style={{textAlign: "center"}}>
        <p style={{ color: "gray" }}>Another Name</p>
      </Col>
      <Col style={{textAlign: "right"}}>
        <p style={{ color: "gray" }}>Locations</p>
      </Col>
    </Row>
    <Row > 
      <Col>
        <p style={{ color: "gray" }}>Team Feature</p>
      </Col>
      <Col style={{textAlign: "center"}}>
        <p style={{ color: "gray" }}>Final Name</p>
      </Col>
      <Col style={{textAlign: "right"}}>
        <p style={{ color: "gray" }}>Privacy</p>
      </Col>
    </Row>
  </footer>
);
