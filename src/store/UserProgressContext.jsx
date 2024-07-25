import { createContext, useState } from "react";

const UserProgessContext = createContext({
  progress: "",
  showCart: () => {},
});

export function UserProgressProvider({ children }) {
  const [progress, setProgress] = useState("");

  function updateProgress(progressState) {
    setProgress(progressState);
  }

  const progressCtx = {
    progress,
    showCart: updateProgress,
  };

  return (
    <UserProgessContext.Provider value={progressCtx}>
      {children}
    </UserProgessContext.Provider>
  );
}

export default UserProgessContext;
