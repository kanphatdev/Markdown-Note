import { ArrowRight, PenLine, Trash2 } from "lucide-react";
import { useNote } from "../hooks/useNote";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};
export const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      {/* Header with title, tags, and buttons */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{note.title}</h1>
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {note.tags.map((tag) => (
                <span
                  className="badge badge-accent px-3 py-1 text-sm"
                  key={tag.id}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={`/${note.id}/edit`}>
            <button className="btn btn-primary capitalize flex items-center gap-1">
              Edit <PenLine size={18} />
            </button>
          </Link>

          <button
            className="btn btn-outline btn-error capitalize flex items-center gap-1"
            onClick={() => {
              onDelete(note.id);
              navigate("..");
            }}
          >
            Delete <Trash2 size={18} />
          </button>

          <Link to={".."}>
            <button className="btn btn-outline btn-accent capitalize flex items-center gap-1">
              Back <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="prose max-w-none mt-4">
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </>
  );
};
