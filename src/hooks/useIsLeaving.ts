import { useState, useEffect, useCallback } from "react";

type NavigationType = "link" | "navigation" | "unload";

interface PendingNavigation {
  type: NavigationType;
  event: Event;
  url?: string;
}

interface UseIsLeavingOptions {
  preventDefault?: boolean;
}

interface UseIsLeavingReturn {
  isLeaving: boolean;
  pendingNavigation: PendingNavigation | null;
  handleUserDecision: (wantsToLeave: boolean) => void;
}

const useIsLeaving = (
  options: UseIsLeavingOptions = {},
): UseIsLeavingReturn => {
  const { preventDefault = true } = options;
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [pendingNavigation, setPendingNavigation] =
    useState<PendingNavigation | null>(null);

  const handleUserDecision = useCallback(
    async (wantsToLeave: boolean) => {
      if (!pendingNavigation) return;

      if (wantsToLeave) {
        const { type, event, url } = pendingNavigation;

        switch (type) {
          case "link":
            window.location.href = url!;
            break;
          case "navigation":
            window.history.go((event as PopStateEvent).state || -1);
            break;
          case "unload":
            window.removeEventListener("beforeunload", handleBeforeUnload);
            if (url) {
              window.location.href = url;
            } else {
              window.location.reload();
            }
            break;
        }
      }

      setIsLeaving(false);
      setPendingNavigation(null);
    },
    [pendingNavigation],
  );

  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (!preventDefault) return;

      setIsLeaving(true);
      setPendingNavigation({ type: "unload", event });
      event.preventDefault();
      event.returnValue = "";
    },
    [preventDefault],
  );

  const handleLinkClick = useCallback(
    (event: MouseEvent) => {
      if (!preventDefault) return;

      const link = (event.target as Element).closest("a");
      if (!link) return;

      const isSameOrigin = link.origin === window.location.origin;
      if (!isSameOrigin) {
        event.preventDefault();
        setIsLeaving(true);
        setPendingNavigation({
          type: "link",
          event,
          url: link.href,
        });
      }
    },
    [preventDefault],
  );

  const handlePopState = useCallback(
    (event: PopStateEvent) => {
      if (!preventDefault) return;

      event.preventDefault();
      setIsLeaving(true);
      setPendingNavigation({
        type: "navigation",
        event,
      });
    },
    [preventDefault],
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleLinkClick as EventListener);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleLinkClick as EventListener);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handleBeforeUnload, handleLinkClick, handlePopState]);

  return {
    isLeaving,
    pendingNavigation,
    handleUserDecision,
  };
};

export default useIsLeaving;
