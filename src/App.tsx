import { Navigate, Route, Routes } from "react-router-dom"
import { NewNote } from "./page/NewNote"
export type Note = {
  id:string
  & NoteData
}
export type NoteData = {
  title:string
  markdown:string
  tags:Tag[]
}
export type Tag = {
  id:string
  label:string
}
const App = () => {
  return (
    <div className="container my-4">
     <Routes>
      <Route path="/" element={<h1>home</h1>}/>
      <Route path="/new" element={<NewNote/>}/>
      <Route path="/:id">
      <Route index element={<h1>show</h1>}/>
      <Route path="edit" element={<h1>edit</h1>}/>
      
      </Route>
      <Route path="*" element={<Navigate to={"/"}/>}/>
    </Routes> 
    </div>
    
  )
}
export default App