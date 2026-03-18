import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from './Message'
import CardComponent from './CardComponent'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import './Nav.css'
import './index.css'
import React, { useState, useEffect } from 'react';
import { db, auth, provider } from './firebase'; // Custom Firebase config
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'; // Auth methods
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; // Firestore methods
import FirestoreExample from './FirestoreExample';

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("Welcome!")
  const [page, setPage] = useState("about");
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('')
  const [dogImage, setDogImage] = useState("");
  const [joke, setJoke] = useState("");
  const [advice, setAdvice] = useState("");
  const fetchDog = async () => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };
  const fetchJoke = async () => {
  const res = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
  const data = await res.json();
  if (data.type === "single") {
    setJoke(data.joke);
  } else {
    setJoke(data.setup + " " + data.delivery);
  }
  };
  const fetchAdvice = async () => {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();
  setAdvice(data.slip.advice);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); });
    return () => unsubscribe();
  }, []);
    const handleLogin = async () => {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
      console.error('Login failed', error); }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);  
    }
  };
  const fetchMessages = async () => {
    const snapshot = await getDocs(collection(db, 'messages'));
    const list = snapshot.docs.map(doc => doc.data());
    setMessages(list);
  };
  const sendMessage = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: input,
      name: user.displayName,
      timestamp: Date.now()
  });

  setInput('');
  fetchMessages();
};
useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h1>Firebase + React App with Google Log-in</h1>
        {/* If user is logged in, show greeting, logout button, and messages */}
        {user ? (
          <div>
            <h2>Hello, {user.displayName}</h2>
            <button onClick={handleLogout}>Log Out</button>
            <ul>
              {messages.map((msg, i) => (
                <li key={i}>
                  <strong>{msg.name || 'Anon'}:</strong> {msg.text}
                </li>
              ))}
            </ul>
          </div>
        ) : (
        // If no user is logged in, show login button
          <div>
            <p>Please log in with Google to continue.</p>
            <button onClick={handleLogin}>Login with Google</button>
          </div>
        )}
      </div>
      <div>
      <h1>My React + Firestore App</h1>
      <FirestoreExample />
      </div>
      <div className="api-container">
        <div className="api-card">
          <h2>Dog API</h2>
          <button onClick={fetchDogImage}>Get Dog</button>
          {dogImage && <img src={dogImage} alt="dog" />}
        </div>
        <div className="api-card">
          <h2>Joke API</h2>
          <button onClick={fetchJoke}>Get Joke</button>
          {joke && (
            <p>
              {joke.setup} <br />
              <strong>{joke.delivery}</strong>
            </p>
          )}
        </div>
        <div className="api-card">
          <h2>Advice API</h2>
          <button onClick={fetchAdvice}>Get Advice</button>
          {advice && <p>{advice}</p>}
        </div>
      </div>
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
      <div className="card-container">
        {cardsData.map((card, index) => (
        <CardComponent key={index} title={card.title} content={card.content} />
        ))}
      </div>
      <Footer />
    </>
  )
}

export default App;