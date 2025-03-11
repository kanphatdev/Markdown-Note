import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Note, Tag } from "../App";
import { NoteCard } from "../components/NoteCard";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  onSearchQueryString: (query: string, tags: Tag[]) => void;
};

const NoteList = ({ availableTags, notes, onSearchQueryString }: NoteListProps) => {
  const [searchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const tagIds = searchParams.get("tags")?.split(",") || [];
    setTitle(query);
    setSelectedTags(availableTags.filter(tag => tagIds.includes(tag.id)));
  }, [searchParams, availableTags]);

  const filteredNote = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
      );
    });
  }, [title, selectedTags, notes]);

  useEffect(() => {
    onSearchQueryString(title, selectedTags);
  }, [title, selectedTags, onSearchQueryString]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-3xl font-semibold capitalize text-primary">Notes</h1>
        <div className="flex gap-3">
          <Link to="/new">
            <button className="btn btn-accent capitalize">Create Note</button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <label className="input input-bordered  flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

    
        </div>
      </div>

      <div className="container py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6 lg:mb-8">
          {filteredNote.map((note) => (
            <NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
