import React from "react"
import {BiExit} from 'react-icons/bi'
import {AiFillQuestionCircle} from "react-icons/ai"

//Styles...
import "./markup.scss"

const MarkUpNav = ({data, show, setShowSideNav, setStationNum, setShowRules}) => {
  return (
    <section className={`black-overlay ${show ? "active" : ""}`}>
      <nav className={`file-navigator ${show ? "active" : ""}`}>
      <span 
        className="exit-btn" 
        onClick={() => setShowSideNav(false)} 
      >
      <BiExit/>
      </span>
      <AiFillQuestionCircle 
        className="question-icon"
        onClick={() => {
          setShowSideNav(false)
          setShowRules(true)

        }}
      />
      <h1>PROJECTS</h1>
        {
          data.map((item, i) => (
            <div 
              key={i}
              className="single-proj-tab" 
              onClick={() => {
                setStationNum(i)
                setShowSideNav(false)
              }}   
            >
              {i + 1}) {item.documentName.toUpperCase()}
            </div>
          ))
        }
      </nav>
    </section>
  )
}

export default MarkUpNav