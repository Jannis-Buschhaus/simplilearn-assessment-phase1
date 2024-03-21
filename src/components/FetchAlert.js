import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';

export default function FetchAlert(props) {

  const dispatch = useDispatch();

  return (
    <div style={{display: "flex", justifyContent: "center", width: "100vw", zIndex: "7",position: "absolute", top: "65px", left: "0", opacity: "0.9"}}>
      <Alert style={{width: "40%"}} show={props.show} dismissible key={props.keyName} variant={props.variant} onClose={()=>dispatch({type: "clearAlert"})}>
        {props.msg}
      </Alert>
    </div>
  )
}
