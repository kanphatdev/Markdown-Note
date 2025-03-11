import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NewNote } from "./page/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./page/NoteList";
import { NoteLayout } from "./layout/NoteLayout";
import { Note } from "./components/Note";
import { EditNote } from "./page/EditNote";

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
  const navigate = useNavigate();
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
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
          : note
      )
    );
  };
  
  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  
  const onSearchQueryString = (query: string, tags: Tag[]) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (tags.length > 0) params.set("tags", tags.map(tag => tag.id).join(","));
  
  };

  
  return (
    <div className="container my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} onSearchQueryString={onSearchQueryString} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
};

export default App;
