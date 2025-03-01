import CreatableSelect from "react-select/creatable";

export const NNoteForm = () => {
  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6">
      <div className="card-body space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="badge badge-secondary text-lg">Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter title..."
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="badge badge-secondary text-lg">Tags</span>
          </label>
          <CreatableSelect isMulti className="w-full" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="badge badge-secondary text-lg">Body</span>
          </label>
          <textarea 
            className="textarea textarea-bordered w-full h-40" 
            placeholder="Write your note here..."
          ></textarea>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary">Save</button>
          <button className="btn btn-error">Cancel</button>
        </div>
      </div>
    </div>
  );
};
