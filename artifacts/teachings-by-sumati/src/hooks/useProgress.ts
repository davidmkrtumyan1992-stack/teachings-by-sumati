import { useState, useCallback } from "react";

const STORAGE_KEY_PREFIX = "aci_progress:";

function getStorageKey(courseId: string): string {
  return `${STORAGE_KEY_PREFIX}${courseId}`;
}

function loadWatched(courseId: string): Set<string> {
  try {
    const raw = localStorage.getItem(getStorageKey(courseId));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed as string[]);
  } catch {
    // ignore corrupt storage
  }
  return new Set();
}

function saveWatched(courseId: string, watched: Set<string>): void {
  try {
    localStorage.setItem(getStorageKey(courseId), JSON.stringify([...watched]));
  } catch {
    // ignore quota errors
  }
}

/** Returns progress state for a single course. */
export function useProgress(courseId: string) {
  const [watched, setWatched] = useState<Set<string>>(() => loadWatched(courseId));

  const isWatched = useCallback(
    (classNumber: string | number): boolean => watched.has(String(classNumber)),
    [watched]
  );

  const toggleWatched = useCallback(
    (classNumber: string | number): void => {
      setWatched((prev) => {
        const key = String(classNumber);
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        saveWatched(courseId, next);
        return next;
      });
    },
    [courseId]
  );

  const watchedCount = watched.size;

  return { isWatched, toggleWatched, watchedCount };
}
