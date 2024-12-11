import { useState } from 'react';

const usePasswordVisible = () => {
  const [isVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  return { isVisible, togglePasswordVisibility };
};

export default usePasswordVisible;
