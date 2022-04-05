import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export const LogoutButton = () => {
    const tokenDestroyer = () => {
        sessionStorage.clear()
    }
  return (   
    <Link to="/Paginainicial"> 
    <Button variant="primary" onClick={tokenDestroyer} style={{marginRight: '5px'}}>Log out</Button>
  </Link>
  );
  };