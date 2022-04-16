import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {Category} from "../component/category";

import { Context } from "../store/appContext";

export const Testing = () => {
	const { store, actions } = useContext(Context);

	return (
	    <Category />
    )
};
