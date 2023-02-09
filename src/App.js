import './App.css';

//Assets 
import './Data/css/flag-icons.css'
import nations from './Data/nation'
import logo from './Data/image/logof.png';

import { useEffect, useState } from "react";

function App() {
  
  const [country,setCountry] = useState([]);
  const [cflag,setCFlag]=useState('');
  const [score,setScore] = useState({totalScore:0,correct:0,incorrect:0});
  const [showAns,setShowAns] = useState(false);
  const [selected,setSelected] = useState({});

  const generateRandomNations = () =>{
    let cts = [];
    for (let i = 0; i < 4; i++) {
      const r=(Math.floor(Math.random() * nations.length));
      cts.push(nations[r]);
    }
    setCountry(cts);
    const index=Math.floor(Math.random()*4);
    setCFlag(cts[index]);
  }

  const checkAnswer = (country) =>{
    setSelected(country);
    if (country.name===cflag.name){
      setScore({...score,correct:score.correct+1,totalScore:score.totalScore+1})
    }else{
      setScore({...score,incorrect:score.incorrect+1,totalScore:score.totalScore+1})
    }
    setShowAns(true);
    setTimeout(()=>{
      setShowAns(false);
      nextQuestion();
    },5000)
  }

  const nextQuestion =()=>{
    generateRandomNations();
  }
  useEffect(()=>{
    generateRandomNations();
    // eslint-disable-next-line
  },[])


  
  return (
    <>
    <nav className='navbar'>
      <img src={logo} alt="" />
      <h2>Game of flags</h2>
    </nav>
    <div className="Container">

    <div className="flags">
      {
        cflag && <span className={`fi fi-${(cflag["alpha-2"]).toLowerCase()}`}></span>
      }
    </div>

    <div className="correctAnswer">
    {showAns?<h2 className={cflag.name === selected.name?'correct':'inCorrect'}> Answer : {cflag.name}</h2>:null}
    </div>

    <div className="options">
      {
        country.map(c=><button className='btn' key={c.name} onClick={e=>checkAnswer(c)}>{c.name}</button>)
      }
    </div>

    <div className="Scoreboard">
      <h3>Correct:{score.correct} </h3>
      <h3> Incorrect:{score.incorrect}</h3>
      <h3>Total:{score.totalScore}</h3>
    </div>
    </div>
    </>
  );
}

export default App;