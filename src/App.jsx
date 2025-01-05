import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NotesContext";
function App() {
  //const [count, setCount] = useState(0)

  return (
    <div id="app">
      <NotesProvider>
        <NotesPage/>
      </NotesProvider>
    </div>
  )
}

export default App
