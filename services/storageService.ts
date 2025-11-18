export interface Submission {
  id: string;
  timestamp: string;
  type: string;
  data: any;
}

const STORAGE_KEY = 'usna50thSubmissions';

// --- Core Data Functions (Now using LocalStorage) ---

export const saveSubmission = (type: string, data: any): void => {
  try {
    const submissions = getSubmissions();
    const newSubmission: Submission = {
      id: new Date().getTime().toString(), // Simple unique ID
      timestamp: new Date().toISOString(),
      type,
      data,
    };
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    console.log("Submission saved locally:", newSubmission);
  } catch (error) {
    console.error("Failed to save submission to localStorage:", error);
    alert("There was an error saving your submission locally.");
  }
};

export const getSubmissions = (): Submission[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Failed to get submissions from localStorage:", error);
    return [];
  }
};

export const clearAllSubmissions = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("All local submissions cleared.");
    alert("All submissions have been cleared from local storage.");
  } catch(error) {
     console.error("Failed to clear local submissions:", error);
     alert("An error occurred while trying to clear local storage.");
  }
};