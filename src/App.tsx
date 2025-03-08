import { Navigate, Route, Routes } from "react-router-dom";
import { NewNote } from "./page/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./page/NoteList";
import { NoteLayout } from "./layout/NoteLayout";
import { Note } from "./components/Note";

export type Note = {
  id: string;
  title: string;
  markdown: string;
  tags: Tag[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", []);

  const notesWithTags: Note[] = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    ]);
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <div className="container my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={
          tags

        } 
        notes={notesWithTags}/>} />
        <Route
          path="/new"
          element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />}
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<Note/>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
};

export default App;
