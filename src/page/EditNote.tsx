import { NoteData, Tag } from "../App";
import { NNoteForm } from "../components/NoteForm";
import { useNote } from "../hooks/useNote";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export const EditNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) => {
  const note = useNote();
  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      {/* Title */}


      {/* Form Component */}
      <div className="w-full max-w-3xl">
        <NNoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
          onSubmit={(data) => onSubmit(note.id, data)}
          onAddTag={onAddTag}
          availableTags={availableTags}
        />
      </div>
    </div>
  );
};
