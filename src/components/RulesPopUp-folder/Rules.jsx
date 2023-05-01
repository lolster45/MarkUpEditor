import React from "react"

//React icons...
import {BiExit} from 'react-icons/bi'

//Styles...
import "./rules.scss"

const Rules = ({showRules, setShowRules}) => {
  return (
    <section className={`black-overlay ${showRules ? "active" : ""}`}>
      <div className={`rules-wrap ${showRules ? "active" : ""}`}> 
        <span onClick={() => setShowRules(false)}>
          <BiExit className="exit-icon"/>
        </span>
        <h1>Rules</h1>
        <h4 className="small-header">Basics:</h4>
        <div>
          <strong>Headers: </strong>
          #Header 1, ##Header 2 etc...
        </div>
        <div>
          <strong>BOLD: </strong>
          *input here*
        </div>
        <div>
          <strong>ITALICS: </strong>
          **input here**
        </div>
        <div>
          <strong>BLOCKQUOTE: </strong>
          >input here 
        </div>
        <div>
          <strong>List: </strong>
          "1." (unordered list)
          "-" (orderedlist)
        </div>
        <h4 className="small-header">Combos:</h4>
        <div>
          <strong>Bold Header: </strong>
          #*header 1*, ##*header 2*, etc...
        </div>
        <div>
          <strong>Italics Header: </strong>
          #**header 1**, ##**header 2**, etc...
        </div>
      </div>
    </section>
  )
} 

export default Rules