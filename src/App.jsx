import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from './Message'
import React from 'react'
import CardComponent from './CardComponent'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("Welcome!")

  const cardsData = [
    {title: "Card 1", content: "This is the first card." },
    { title: "Card 2", content: "This is the second card." },
    { title: "Card 3", content: "This is the third card." }
  ];

  return (
    <>
      <Message text="Hello from React" name="Layla" />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setMessage("You clicked the button.")}>
          Change Message
        </button>
        <p>{message}</p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="card-container">
        {cardsData.map((card, index) => (
        <CardComponent key={index} title={card.title} content={card.content} />
        ))}
      </div>
    </>
  )
}

export default App
