import { useEffect } from "react";

type Handlers = {
  flip?: () => void;
  next?: () => void;
  prev?: () => void;
  known?: () => void;
  review?: () => void;
};

export function useKeyBindings(handlers: Handlers) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // ignore when typing in inputs/textareas
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.getAttribute("contenteditable") === "true")) {
        return;
      }
      switch (e.key) {
        case " ":
          e.preventDefault();
          handlers.flip?.();
          break;
        case "ArrowRight":
          handlers.next?.();
          break;
        case "ArrowLeft":
          handlers.prev?.();
          break;
        case "k":
        case "K":
          handlers.known?.();
          break;
        case "r":
        case "R":
          handlers.review?.();
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlers]);
}
