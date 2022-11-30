import { useState } from "react";

// Centralizes modal control
const useLoginModal = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const loginClose = () => setLoginModalOpen(false);
  const loginOpen = () => setLoginModalOpen(true);

  return { loginModalOpen, loginClose, loginOpen };
};

export default useLoginModal;
