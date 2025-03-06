import { Link } from "react-router-dom";
import { SimplifiedNote } from "../page/NoteList";

export const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`} className="w-full md:w-80">
      <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4">
        <div className="card-body space-y-3">
          {/* Title Section */}
          <h2 className="card-title text-lg font-semibold text-primary">
            {title}
          </h2>

          {/* Tags Section */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span className="badge badge-accent px-3 py-1 text-sm" key={tag.id}>
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
