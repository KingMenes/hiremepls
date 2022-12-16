import { useState } from "react";

// Centralizes modal control
const useDeleteQuestionModal = () => {
  const [deleteQuestionModalOpen, setDeleteQuestionModalOpen] = useState(false);

  const deleteQuestionClose = () => setDeleteQuestionModalOpen(false);
  const deleteQuestionOpen = () => setDeleteQuestionModalOpen(true);

  return { deleteQuestionModalOpen, deleteQuestionClose, deleteQuestionOpen };
};

export default useDeleteQuestionModal;
