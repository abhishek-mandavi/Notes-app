import {useState, useEffect} from 'react';
//import { fakeData as notes} from "../assets/fakeData.js";
//import { databases } from '../appwrite/config.js';
import NoteCard from "../components/NoteCard";
//import { db } from '../appwrite/databases.js';

import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';
import Controls from '../components/Controls';

const NotesPage = () => {
  const { notes } = useContext(NotesContext);
  // const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   init();
  // },[]);

  // const init = async () => {
  //   const response = await db.notes.list();
  //   // const response = await databases.listDocuments(
  //   //   import.meta.env.VITE_DATABASE_ID,
  //   //   import.meta.env.VITE_COLLECTION_NOTES_ID,
  //   // );
  //   setNotes(response.documents);
  //   //console.log(response);
  // };
  
  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id}/>
      ))}

      <Controls/>
    </div>
  )
}

export default NotesPage
