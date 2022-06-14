import * as React from "react"
import { useState } from "react"
import "./Chip.css"


export function Chip({ label = "", isActive = false, onClick = () => {}, onClose = () => {}}) {




  let buttonClassName = "";
  if (isActive == false){
    buttonClassName = "chip"
  }
  else {
    buttonClassName = "chip active"
  }

    
  

  return (
    <button className= {buttonClassName} onClick = {onClick}>
      <p className="label">{label}</p>
      <span className="close" role="button"  onClose = {onClose}>{`X`}</span>
    </button>
  )
}

export default Chip
