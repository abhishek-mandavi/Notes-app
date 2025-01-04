import {useRef , useEffect , useState} from 'react'
import Trash from '../icons/Trash';
import { setNewOffset , autoGrow , setZIndex } from '../utils';


const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);

  useEffect(() => {

  },[]);


  const mouseDown = (e) => {
    setZIndex(cardRef.current);
    
    mouseStartPos.x = e.clientX
    mouseStartPos.y = e.clientY

    document.addEventListener('mousemove' , mouseMove);
    document.addEventListener('mouseup' , mouseUp);
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
        <Trash/> 
      </div>
      
      <div></div>

      <div className='card-body'>
        <textarea
          onFocus={() => {
            setZIndex(cardRef.current);
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
