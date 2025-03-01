import { NNoteForm } from "../components/NoteForm";

export const NewNote = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold capitalize mb-6 text-primary">New Note</h1>
      <NNoteForm />
    </div>
  );
};
