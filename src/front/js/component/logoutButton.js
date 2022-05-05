import React, {useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import {Context} from "../store/appContext";

export const LogoutButton = () => {
    const {store, actions } = useContext(Context);
    const tokenDestroyer = actions.deleteToken
  return (   
    <Link to="/"> 
    <Button variant="primary btn-lg" onClick={tokenDestroyer} style={{marginRight: '5px'}}>Log out</Button>
  </Link>
  );
  };