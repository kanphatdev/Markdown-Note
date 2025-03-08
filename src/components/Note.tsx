import { ArrowRight, PenLine, Trash2 } from "lucide-react";
import { useNote } from "../hooks/useNote";
import { Link } from "react-router-dom";
import   ReactMarkdown from "react-markdown";
export const Note = () => {
  const note = useNote();
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h1 className="text-2xl font-bold">{note.title}</h1>
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
        <div className="flex gap-2 mx-2">
          <Link to={`/${note.id}/edit`}>
            <div className="">
              <button className="btn  btn-primary capitalize">
                edit <PenLine />
              </button>
            </div>
          </Link>

          <div className="">
            <button className="btn btn-outline btn-error capitalize">
              delete <Trash2 />
            </button>
          </div>
          <Link to={".."}>
            <div className="">
              <button className="btn btn-outline btn-accent capitalize">
                back <ArrowRight />
              </button>
            </div>
          </Link>
        </div>
      </div>
      <ReactMarkdown>
        {note.markdown}
      </ReactMarkdown>
    </>
  );
};
