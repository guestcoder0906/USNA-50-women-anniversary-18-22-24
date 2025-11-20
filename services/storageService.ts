export interface Submission {
  id: string;
  timestamp: string;
  type: string;
  data: any;
  cantoId?: string;
  cantoUrl?: string;
  source: 'LOCAL' | 'CANTO';
}

// --- Canto API Configuration ---
// Please populate these values to enable Canto integration
const CANTO_CONFIG = {
  // The tenant name from your Canto URL (e.g., https://[tenant].canto.com)
  tenant: 'usnawomen50', 
  // For client-side demos, we are using a direct token if available, 
  // or we will attempt to use the App ID/Secret flow (which typically requires a backend proxy).
  appId: '', 
  appSecret: '',
  // If you have a generated Bearer token, place it here.
  accessToken: '' 
};

const LOCAL_STORAGE_KEY = 'usna50thSubmissions';
const CANTO_TAG_PREFIX = 'USNA50_';

// --- Helper Functions ---

// Convert Base64 string to Blob for upload
const base64ToBlob = async (base64: string): Promise<Blob> => {
  const response = await fetch(base64);
  return await response.blob();
};

// Internal Local Storage Fallback
const saveLocal = (type: string, data: any): Submission => {
  const current = localStorage.getItem(LOCAL_STORAGE_KEY);
  const submissions: Submission[] = current ? JSON.parse(current) : [];
  
  const newSubmission: Submission = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    type,
    data,
    source: 'LOCAL'
  };
  
  submissions.push(newSubmission);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(submissions));
  return newSubmission;
};

// --- Main Service Methods ---

export const saveSubmission = async (type: string, data: any): Promise<void> => {
  console.log(`Processing submission: ${type}`);

  // 1. Always save locally first as backup/offline cache
  const localRecord = saveLocal(type, data);

  // 2. If Canto is configured, attempt upload
  if (CANTO_CONFIG.accessToken) {
    try {
      const formData = new FormData();
      
      // Prepare Metadata
      const metadata = {
        ...data,
        submissionType: type,
        submissionDate: localRecord.timestamp
      };

      // Prepare File
      let fileToUpload: Blob;
      let fileName: string;

      if (data.imageBase64) {
        fileToUpload = await base64ToBlob(data.imageBase64);
        fileName = data.fileName || `submission-${localRecord.id}.png`;
      } else {
        // Create a JSON file for text-only submissions
        const jsonString = JSON.stringify(metadata, null, 2);
        fileToUpload = new Blob([jsonString], { type: 'application/json' });
        fileName = `${type}-${localRecord.id}.json`;
      }

      formData.append('file', fileToUpload, fileName);
      // Add tags for filtering
      formData.append('tags', `USNA50,${CANTO_TAG_PREFIX}${type}`);
      // Store metadata in description or custom fields
      formData.append('description', JSON.stringify(metadata));
      formData.append('name', fileName);

      // Canto Upload API Call
      const response = await fetch(`https://${CANTO_CONFIG.tenant}.canto.com/api/v1/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CANTO_CONFIG.accessToken}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Uploaded to Canto:", result);
        // Ideally, we would update the local record with the Canto ID here
      } else {
        console.warn("Canto upload failed, data saved locally only.", await response.text());
      }

    } catch (error) {
      console.error("Error uploading to Canto:", error);
      // Note: We suppress the error for the user since we have a local backup
    }
  } else {
    console.log("Canto not configured, skipping upload.");
  }
};

export const getSubmissions = async (): Promise<Submission[]> => {
  const submissions: Submission[] = [];

  // 1. Fetch Local Data
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) {
      submissions.push(...JSON.parse(localData));
    }
  } catch (e) {
    console.error("Error reading local storage", e);
  }

  // 2. Fetch Canto Data (if configured)
  if (CANTO_CONFIG.accessToken) {
    try {
      // Search for assets with our tag
      const response = await fetch(`https://${CANTO_CONFIG.tenant}.canto.com/api/v1/search?q=tag:USNA50&limit=100`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CANTO_CONFIG.accessToken}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.results) {
            const cantoSubmissions: Submission[] = result.results.map((item: any) => {
                // Try to parse original data from description
                let parsedData = {};
                try {
                    parsedData = JSON.parse(item.description);
                } catch {
                    parsedData = { note: item.description };
                }

                // Determine type from tags
                const typeTag = item.tags?.find((t: string) => t.startsWith(CANTO_TAG_PREFIX));
                const type = typeTag ? typeTag.replace(CANTO_TAG_PREFIX, '') : 'UNKNOWN';

                return {
                    id: item.id,
                    timestamp: new Date(item.dateCreated * 1000).toISOString(), // Canto uses unix timestamp
                    type,
                    data: parsedData,
                    cantoId: item.id,
                    cantoUrl: item.url.direct, // Direct image link
                    source: 'CANTO'
                };
            });
            
            // Merge strategy: Prefer Canto data, but keeping simple array concat for this demo
            // In a real app, you'd de-duplicate based on IDs
            return cantoSubmissions; 
        }
      }
    } catch (error) {
      console.error("Error fetching from Canto:", error);
    }
  }

  return submissions;
};

export const clearAllSubmissions = async (): Promise<void> => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log("All local submissions cleared.");
    // Note: We do not delete from Canto API via this admin function for safety
  } catch(error) {
     console.error("Failed to clear local submissions:", error);
     throw error;
  }
};