export interface AddBlogProps {
    titleTextInputRef: React.RefObject<HTMLInputElement>;
    messageTextInputRef: React.RefObject<HTMLTextAreaElement>;
    imageInputRef: React.RefObject<HTMLInputElement>;
    handleSubmit: (e: React.FormEvent) => void;
  }