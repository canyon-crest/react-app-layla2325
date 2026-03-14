import { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

function FirestoreExample() {
  const [input, setInput] = useState('');    
  const [items, setItems] = useState([]);     

  const addItem = async () => {
    if (!input.trim()) return;                
    try {
      await addDoc(collection(db, 'items'), {
        text: input,
        createdAt: serverTimestamp()
      });
      setInput('');                           
      alert('Item added! Click "Refresh List" to see it'); 
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'items'));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched items:', list);
      setItems(list);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  return (
    <div>
      <h2>Firestore Example</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add Item</button>
      <button onClick={fetchItems}>Refresh List</button>
      <div style={{border:'1px solid red', padding: '10px', marginTop: '20px'}}>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.text} {item.createdAt?.toDate ? `- ${item.createdAt.toDate().toLocaleString()}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FirestoreExample;