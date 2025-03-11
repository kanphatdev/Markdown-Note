import { NoteData, Tag } from "../App";
import { NNoteForm } from "../components/NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      {/* Title */}
 
      
      {/* Form Component */}
      <div className="w-full max-w-3xl">
        <NNoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
      </div>
    </div>
  );
};
