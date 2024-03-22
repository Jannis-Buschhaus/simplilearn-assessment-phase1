//FetchAlert is a component that renders a dismissible alert message with the result of the API call.

//Importing the necessary libraries
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';

// Importing stylesheets
import '../style/fetchAlert.css'

//The FetchAlert Component
export default function FetchAlert(props) {

  const dispatch = useDispatch();

  return (
    <div className='alertContainer'>
      <Alert className='alertStyle' show={props.show} dismissible key={props.keyName} variant={props.variant} onClose={() => dispatch({ type: "clearAlert" })}>
        {props.msg}
      </Alert>
    </div>
  )
}