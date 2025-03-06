import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { NoteCard } from "../components/NoteCard";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

export type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNote = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-3xl font-semibold capitalize text-primary">
          Notes
        </h1>
        <div className="flex gap-3">
          <Link to="/new">
            <button className="btn btn-accent capitalize">Create Note</button>
          </Link>
          <button className="btn btn-warning capitalize">Edit Tags</button>
        </div>
      </div>

      <form className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search notes..."
            className="input input-bordered input-primary max-w-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactSelect
            isMulti
            value={selectedTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            options={availableTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            onChange={(tags) =>
              setSelectedTags(
                tags
                  ? tags.map((tag) => ({ label: tag.label, id: tag.value }))
                  : []
              )
            }
            styles={{ control: (base) => ({ ...base, width: "100%" }) }}
          />
        </div>
      </form>
      <div className="container py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6 lg:mb-8">
          {filteredNote.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
