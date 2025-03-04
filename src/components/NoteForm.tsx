import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export const NNoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current || !markdownRef.current) return;

    onSubmit({
      title: titleRef.current.value,
      markdown: markdownRef.current.value,
      tags: selectedTags,
    });
    navigate("..");
  };

  return (
    <div className="card w-full max-w-3xl bg-base-100 shadow-2xl rounded-2xl p-8">
      <div className="card-body space-y-6">
        <h2 className="text-2xl font-bold text-primary text-center">
          Create a New Note
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="form-control">
            <label className="label font-semibold text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter title..."
              className="input input-bordered w-full"
              ref={titleRef}
            />
          </div>

          {/* Tags Input */}
          <div className="form-control">
            <label className="label font-semibold text-lg">Tags</label>
            <CreatableSelect
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
              isMulti
              value={selectedTags.map((tag) => ({ label: tag.label, value: tag.id }))}
              options={availableTags.map((tag) => ({ label: tag.label, value: tag.id }))}
              onChange={(tags) => {
                setSelectedTags(tags.map((tag) => ({ label: tag.label, id: tag.value })));
              }}
              styles={{ control: (base) => ({ ...base, width: "100%" }) }}
            />
          </div>

          {/* Body Input */}
          <div className="form-control">
            <label className="label font-semibold text-lg">Body</label>
            <textarea
              className="textarea textarea-bordered w-full h-48"
              placeholder="Write your note here..."
              ref={markdownRef}
            ></textarea>
          </div>

          {/* Buttons */}
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
