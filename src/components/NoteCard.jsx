import {useRef , useEffect , useState} from 'react'
import { setNewOffset , autoGrow , setZIndex, bodyParser } from '../utils';
import { db } from '../appwrite/databases';
import Spinner from '../icons/Spinner';
import DeleteButton from './DeleteButton'
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';


const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const { setSelectedNote } = useContext(NotesContext);


  const body = bodyParser(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  },[]);

  const mouseDown = (e) => {
    if(e.target.className === "card-header"){
      setZIndex(cardRef.current);
    
      mouseStartPos.x = e.clientX
      mouseStartPos.y = e.clientY
  
      document.addEventListener('mousemove' , mouseMove);
      document.addEventListener('mouseup' , mouseUp);

      setSelectedNote(note);
    }
  }

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x : mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

   // console.log("mouseMoveDir: " , mouseMoveDir);
    mouseStartPos.x = e.clientX
    mouseStartPos.y = e.clientY

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current); //{x,y}
    saveData("position", newPosition);
    //db.notes.update(note.$id, {'position':JSON.stringify(newPosition)})
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = async () => {
    
    setSaving(true);
    
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
};
 
  return (
    <div  className='card' 
      ref={cardRef}
      style={{
        backgroundColor:colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >

      <div className="card-header"
        
        onMouseDown={mouseDown}
        style={{ backgroundColor: colors.colorHeader}}
      >
        <DeleteButton noteId={note.$id} /> 
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>
              Saving...
            </span>
          </div>
        )};
      </div>
      
      <div></div>

      <div className='card-body'>
        <textarea
          onKeyUp={handleKeyUp}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {autoGrow (textAreaRef)}}
        ></textarea>
      </div>  
    </div>
  );
};

export default NoteCard
