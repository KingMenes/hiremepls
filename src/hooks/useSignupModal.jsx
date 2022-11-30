import { useState } from "react";

// Centralizes modal control
const useSignupModal = () => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const signupClose = () => setSignupModalOpen(false);
  const signupOpen = () => setSignupModalOpen(true);

  return { signupModalOpen, signupClose, signupOpen };
};

export default useSignupModal;
