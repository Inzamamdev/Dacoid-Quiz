import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveQuizResult = (score: number, total: number) => {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("QuizDB", 1);
    console.log("request", request);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log("db", db);
      if (!db.objectStoreNames.contains("history")) {
        db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("history", "readwrite");
      const store = transaction.objectStore("history");

      const addRequest = store.add({
        date: new Date().toLocaleString(),
        score,
        total,
      });

      addRequest.onsuccess = () => resolve();
      addRequest.onerror = () => reject(addRequest.error);
    };

    request.onerror = () => reject(request.error);
  });
};

export const getQuizHistory = async (): Promise<
  { date: string; score: number; total: number }[]
> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("QuizDB", 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("history", "readonly");
      const store = transaction.objectStore("history");

      const getRequest = store.getAll();

      getRequest.onsuccess = () => {
        resolve(getRequest.result);
      };

      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
