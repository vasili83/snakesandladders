import { useState } from 'react'
import './App.css'

function App() {

  const ladders:[number, number][] = [[15,25], [3,16], [21,32]];
  const snakes:[number, number][] = [[2,12], [4,30], [22,35]];

  let [dice1, setDice1] = useState<number>(0);
  let [dice2, setDice2] = useState<number>(0);
  let [diceSum, setDiceSum] = useState<number>(0);
  let [playerpos, setPlayerpos] = useState<number>(1);
  let [winlosemssg, setWinlosemssg] = useState<string>("");

  const throwDice = ()=>{
  const newDice1 = Math.floor(Math.random() * 6) + 1;
  const newDice2 = Math.floor(Math.random() * 6) + 1;
  const newSum = newDice1 + newDice2;

  setDice1(newDice1);
  setDice2(newDice2);
  setDiceSum(newSum);
  movePlayer(newSum);
  }


  const checkLaddersOrSnakes = (currentPos:number):number=>{

    const moveUp: number = ladders
      .map(arrPair => (Math.min(...arrPair) === currentPos ? Math.max(...arrPair) : 0))
      .find(n => n !== 0) || 0;

    const moveDown: number = snakes
      .map(arrPair => (Math.max(...arrPair) === currentPos ? Math.min(...arrPair) : 0))
      .find(n => n !== 0) || 0;

    const newPos = moveUp !== 0 ? moveUp : (moveDown !== 0 ? moveDown : currentPos);
    return newPos;
  }

  const movePlayer = (rolledDiceSum:number)=>{
    const newPos = checkLaddersOrSnakes(rolledDiceSum);
    if(newPos < 37){
      setPlayerpos((oldPos) => oldPos + newPos);
      youWin(playerpos) && setWinlosemssg("Je bent precies op vak 36 gekomen!");
      youLose(playerpos) && setWinlosemssg("Helaas verloren; vanaf vak 35 kun je nooit meer op 36 komen.. refresh je pagina");
    }
  }

  let youWin = (pos:number):boolean => pos === 36;
  let youLose = (pos:number):boolean => pos === 35;

  return (
    <>
      <header>
        <h1>Snake & Ladders</h1>
      </header>
      <main>
        <h2>{winlosemssg}</h2>
        <h3>Speler positie: {playerpos}</h3>
        <p>Dobbelsteen 1: {dice1!==0 && dice1} | Dobbelsteen 2: {dice2!==0 && dice2}</p>
        <p>{diceSum}</p>
        <button onClick={throwDice}>Gooi!</button>
      </main>
    </>
  )
}

export default App
