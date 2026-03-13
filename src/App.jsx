import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from './Message'
import React from 'react'
import CardComponent from './CardComponent'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import 'Nav.css'
import 'index.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("Welcome!")
  const [page, setPage] = useState("about");

  const cardsData = [
    {title: "React", content: "React is a Javascript library used to build user interfaces with components." },
    { title: "Props", content: "Props allow components to receive data from a parent component." },
    { title: "UseState", content: "useState lets a component store and update interactive" }
  ];

  return (
    <>
      <Nav setPage={setPage}/>
      {page === "home" && <Home />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      <Home />
      <About />
      <Contact />
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
      <Footer />
    </>
  )
}

export default App
