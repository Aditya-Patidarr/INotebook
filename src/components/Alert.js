import React from 'react'

export default function Alert(props) {
  const handleUpperClick = () =>{
    let text = props.alert.type;
    if(text==="danger") text = "error";
    let newText = text[0].toUpperCase() + text.substring(1);  
    return newText;
  }
  return (
    <div style={{height:'50px'}}>
    {props.alert && 
    <div className={`alert alert-${props.alert.type} alert-dismissible fade-show`} role="alert">
    <strong>{handleUpperClick()}</strong> : {props.alert.message}
    </div>}
    </div>
  )
}


