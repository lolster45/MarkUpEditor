//React...
import React, { useState, useEffect } from "react";

//Components...
import MarkUpNav from "./components/nav-folder/MarkUpNav.jsx"
import Rules from "./components/RulesPopUp-folder/Rules.jsx"

//React icons...
import {RxHamburgerMenu} from "react-icons/rx"
 
 
const App = () => {

  //States...
  const [mainData, setMainData] = useState([
    {
      documentName: "University Scam",
      markUpString: "how do you do fellow kids"
    },
    {
      documentName: "Twitter inc",
      markUpString: "#What am I doing here..."
    },
    {
      documentName: "Vivo X Fold 2",
      markUpString: "Surprisignly a *great* phone"
    },
  ])
  const [stationNum, setStationNum] = useState(0);
  const [userMarkdown, setUserMarkdown] = useState("");
  const [showSideNav, setShowSideNav] = useState(false); 
  const [showRules, setShowRules] = useState(false); 
 
  useEffect(() => {
    setUserMarkdown(mainData[stationNum].markUpString)
  }, [stationNum])

 
  //Handles the user changes in the textarea...
  const handleMarkdownChange = (e) => {
    setUserMarkdown(e.target.value);
  };



  //Checks individual word for any changes...
  const checkWord = (line) => {
    const words = line.split(" ");
    const formattedWords = words.map((word, index) => {

    //This one is for plain bold...
    if (word.startsWith("*") && word[1] !== "*" && word.endsWith("*") ) {
      console.log("activated bold")
      return <strong key={index}>{`${word.slice(1, -1)} `}</strong>;
    }   

    //Checks for special character after *, like (",", "?") etc...
    if (word.startsWith("*") && word[1] !== "*" && word.endsWith("*", word.length - 1) ) {
      console.log("activated bold but with special character") 
      return <strong key={index}>{`${word.slice(1, -2)}${word.slice(-1)} `}</strong>;
    }   

    //This one is for just plain italics... 
    if (word.startsWith("*") && word[1] === "*" && word[word.length - 1] === "*" && word.endsWith("*") ) {
      //console.log("activated italics")
      return <em key={index}>{`${word.slice(2, -2)} `}</em>;
    }
    
    //This is one is a combo of bold and header...
    if (
        word[0] === "#" && 
        word[1] === "*" && 
        word[2] !== "*" && //This line here seperates it from becoming italics header...
        word[word.length - 1] === "*" &&
        word.endsWith("*")  
      ) {
      console.log("activated bold header") 
      return <h1 style={{color: "red"}} key={index}><strong>{`${word.slice(2, -1)} `}</strong></h1>
    }
   
    //This is one is a combo of italics and header...
    if (
        word.startsWith("#**") && 
        word.endsWith("**") 
      ) {
      console.log("activated italics header")
      return <h1 className="header-line" key={index}><em>{`${word.slice(3, -2)} `}</em></h1>
    }

    else { 
      //console.log("activated normal text")
      return word + " ";
    }

    });
    return formattedWords;
  };

  //This one checks for the sentence itself while checkWord function checks the individual word...
  const getFormattedMarkdown = () => {  
    const lines = userMarkdown.split("\n");
    return lines.map((line, index) => {

      //possbile line for multiple para in blockquotes (if(line.startsWith(">") && !lines[index - 1]))...
      if(line.startsWith(">") && !lines[index - 1]) {
        return (
          <blockquote key={index}>
            {checkWord(line.slice(1))}
          </blockquote>
        )  
      }
      
      if(/["0123456789"]/.test(line[0]) && line[1] === "." ){
        return (       
          <li key={index} className="list-num">
            <span>{line.slice(0, 2)}</span> {checkWord(line.slice(2))}
          </li>      
        )
      }
        
      if (line[0] === "-") {
        console.log("un list")
        return <li key={index}>{checkWord(line.slice(1))}</li>
      }

      //Bold sentence...(checks each word if you use any of the markup rules with checkWord function)...
      if (line.startsWith("*") && line[1] !== "*" && line.endsWith("*") ) {
        console.log("activated bold sentence") 
        return <strong key={index}>{checkWord(line.slice(1, -1))}</strong>;
      }   
 
      //Itaclis sentece...(checks each word if you use any of the markup rules with checkWord function)...
      if (line.startsWith("**") && line.endsWith("**") ) { 
        console.log("activated italics")
        return <em key={index}>{checkWord(line.slice(2, -2))}</em>;
      }

      if (line[0] === "#" && line[1] !== "#" && line[1] !== "*") { 
        console.log("header 1")
        return <h1 className="header-line" key={index}>{checkWord(line.slice(1))}</h1>;
      } 
      else if (line[0] === "#" && line[1] === "#" && line[2] !== "#" && line[2] !== "*") {
        return <h2 className="header-line" key={index}>{checkWord(line.slice(2))}</h2>
      }
      else if (line[0] === "#" && line[1] === "#" && line[2] === "#" && line[3] !== "#" && line[3] !== "*") {
        return <h3 className="header-line" key={index}>{checkWord(line.slice(3))}</h3>
      }
      else if (line[0] === "#" && line[1] === "#" && line[2] === "#" && line[3] === "#" && line[4] !== "#" && line[4] !== "*") {
        return <h4 className="header-line" key={index}>{checkWord(line.slice(4))}</h4>
      }
      else if (line[0] === "#" && line[1] === "#" && line[2] === "#" && line[3] === "#" && line[4] === "#" && line[5] !== "#" && line[5] !== "*") {
        return <h5 className="header-line" key={index}>{checkWord(line.slice(5))}</h5>
      }
      else if (line[0] === "#" && line[1] === "#" && line[2] === "#" && line[3] === "#" && line[4] === "#" && line[5] === "#" && line[6] !== "#" && line[6] !== "*") {
        return <h6 className="header-line" key={index}>{checkWord(line.slice(6))}</h6>
      }

      //Combination of <h1> with <strong>
      if (
          line[0] === "#" && 
          line[1] === "*" && 
          line[2] !== "*" && //This line here seperates it from becoming italics header...
          line.endsWith("*")
        ) {
        console.log("activated bold header sentence") 
        return <h1 key={index}><strong>{`${line.slice(2, -1)} `}</strong></h1>
      }
      if (
          line[0] === "#" && 
          line[1] === "#" &&  
          line[2] === "*" && 
          line[3] !== "*" && //This line here seperates it from becoming italics header...
          line.endsWith("*")
        ) {
        console.log("activated bold header sentence") 
        return <h2 key={index}><strong>{`${line.slice(3, -1)} `}</strong></h2>
      }
      if (
          line[0] === "#" && 
          line[1] === "#" &&  
          line[2] === "#" &&  
          line[3] === "*" && 
          line[4] !== "*" && //This line here seperates it from becoming italics header...
          line.endsWith("*")
        ) {
        console.log("activated bold header sentence") 
        return <h3 key={index}><strong>{`${line.slice(4, -1)} `}</strong></h3>
      }
      if (
          line[0] === "#" && 
          line[1] === "#" &&  
          line[2] === "#" &&  
          line[3] === "#" &&  
          line[4] === "*" && 
          line[5] !== "*" && //This line here seperates it from becoming italics header...
          line.endsWith("*")
        ) {
        console.log("activated bold header sentence") 
        return <h4 key={index}><strong>{`${line.slice(5, -1)} `}</strong></h4>
      }
      if (
          line[0] === "#" && 
          line[1] === "#" &&  
          line[2] === "#" &&  
          line[3] === "#" &&  
          line[4] === "#" &&  
          line[5] === "*" && 
          line[6] !== "*" && //This line here seperates it from becoming italics header...
          line.endsWith("*")
        ) {
        console.log("activated bold header sentence") 
        return <h5 key={index}><strong>{`${line.slice(6, -1)} `}</strong></h5>
      }
      if (
          line[0] === "#" && 
          line[1] === "#" &&  
          line[2] === "#" &&  
          line[3] === "#" &&  
          line[4] === "#" &&  
          line[5] === "#" &&  
          line[6] === "*" && 
          line[7] !== "*" && //This line here seperates it from becoming italics header...
          line.endsWith("*")
        ) {
        console.log("activated bold header sentence") 
        return <h6 key={index}><strong>{`${line.slice(7, -1)} `}</strong></h6>
      }

      //Combination of <h1> with <em>
      if (
          line[0] === "#" && 
          line[1] === "*" && 
          line[2] === "*" && //This line here seperates it from becoming italics header...
          line[line.length - 2] === "*" &&
          line.endsWith("*")  
        ) {
        console.log("activated italics header sentence") 
        return <h1 style={{color: "red"}} key={index}><em>{`${line.slice(3, -2)} `}</em></h1>
      }


      

      
      else {
        return <div className="normal-text-line" key={index}>{checkWord(line)}</div>;
      }
    });
  };


  //Saves the users changes to maindata...
  const saveChanges = () => {
    const temp = Array.from(mainData)

    temp[stationNum].markUpString = userMarkdown

    setMainData(temp)
  }



  return (
    <section className="App">
      <MarkUpNav 
        show={showSideNav} 
        data={mainData} 
        setShowSideNav={setShowSideNav}
        setStationNum={setStationNum}
        setShowRules={setShowRules}
        
      />
      <Rules showRules={showRules} setShowRules={setShowRules}/>
      <nav className="main-nav">
        <div className="left-side-nav">
          <span onClick={() => setShowSideNav(prev => !prev)}><RxHamburgerMenu/></span>
          <h1>MARKDOWN</h1>           
          <div className="document-details">
            <span>Document Name</span>
            <span>{mainData[stationNum].documentName}</span>
          </div>
        </div>
        <button onClick={saveChanges}>Save Changes</button>
      </nav>
      <section className="markup-wrap">
        <div className="markdown">
          <h2>MARKDOWN</h2>
          <textarea
            className="textarea-block"
            value={userMarkdown}
            onChange={handleMarkdownChange}
          />
        </div>
        <div id="preview" className="preview-wrap">
          <h2>PREVIEW</h2>
          <div className="preview-text">
            {getFormattedMarkdown()}
          </div>
        </div>
      </section>
    </section>
  );
};

export default App;