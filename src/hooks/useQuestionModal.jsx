import { useState } from "react";

// Centralizes modal control
const useQuestionModal = () => {
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  const questionClose = () => setQuestionModalOpen(false);
  const questionOpen = () => setQuestionModalOpen(true);

  return { questionModalOpen, questionClose, questionOpen };
};

export default useQuestionModal;
