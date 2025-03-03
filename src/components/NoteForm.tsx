import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};
export const NNoteForm = ({ onSubmit }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const handleSubmi = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  };
  return (
    <div className="card w-full max-w-3xl bg-base-100 shadow-2xl rounded-2xl p-8">
      <div className="card-body space-y-6">
        <h2 className="text-2xl font-bold text-primary text-center">
          Create a New Note
        </h2>
        <form className="space-y-4" onSubmit={handleSubmi}>
          <div className="form-control">
            <label className="label font-semibold text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter title..."
              className="input input-bordered w-full"
              ref={titleRef}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-lg">Tags</label>
            <CreatableSelect
              isMulti
              className="w-full"
              value={selectedTags.map((tag) => {
                return { label: tag.label, id: tag.id };
              })}
              onChange={tags => {
                setSelectedTags(tags.map(tag => {
                  return {label:tag.label,id:tag.id}
                }))
              }}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-lg">Body</label>
            <textarea
              className="textarea textarea-bordered w-full h-48"
              placeholder="Write your note here..."
              ref={markdownRef}
            ></textarea>
          </div>
          <div className="card-actions flex justify-between mt-6">
            <Link to=".." className="btn btn-outline btn-error w-32">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary w-32">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
