export interface Submission {
  id: string;
  timestamp: string;
  type: string;
  data: any;
  cantoId: string;
  cantoUrl: string;
  name: string;
  source: 'CANTO';
}

// --- Canto API Configuration ---
const CANTO_CONFIG = {
  tenant: 'usnawomen50',
  // Credentials must be supplied by the environment or user
  appId: '', 
  appSecret: '',
  accessToken: '' 
};

// --- Helper Functions ---

const getAccessToken = async (): Promise<string | null> => {
  if (CANTO_CONFIG.accessToken) return CANTO_CONFIG.accessToken;

  // Attempt Client Credentials Flow if keys are present
  if (CANTO_CONFIG.appId && CANTO_CONFIG.appSecret) {
    try {
      const params = new URLSearchParams();
      params.append('app_id', CANTO_CONFIG.appId);
      params.append('app_secret', CANTO_CONFIG.appSecret);
      params.append('grant_type', 'client_credentials');

      const response = await fetch('https://oauth.canto.com/oauth/api/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });
      
      if (response.ok) {
        const data = await response.json();
        // Cache the token
        CANTO_CONFIG.accessToken = data.accessToken;
        return data.accessToken;
      } else {
        console.error("Canto Auth Error:", await response.text());
      }
    } catch (e) {
      console.error("Failed to authenticate with Canto", e);
    }
  }
  return null;
};

// --- Main Service Methods ---

export const saveSubmission = async (type: string, data: any): Promise<void> => {
  console.log(`Uploading submission to Canto: ${type}`);

  const token = await getAccessToken();
  if (!token) {
    throw new Error("Canto Configuration Missing. Please provide App ID/Secret or Access Token.");
  }

  const timestamp = new Date().toISOString();
  const metadata = {
    ...data,
    submissionType: type,
    submissionDate: timestamp
  };

  const formData = new FormData();
  
  // Prepare File
  let fileToUpload: Blob;
  let fileName: string;

  if (data.imageBase64) {
    // Upload Image
    const response = await fetch(data.imageBase64);
    fileToUpload = await response.blob();
    // Ensure unique filename
    fileName = data.fileName || `submission-${Date.now()}.png`;
  } else {
    // Create JSON file for text-only submissions
    const jsonString = JSON.stringify(metadata, null, 2);
    fileToUpload = new Blob([jsonString], { type: 'application/json' });
    fileName = `${type}-${Date.now()}.json`;
  }

  formData.append('file', fileToUpload, fileName);
  // Add tags to organize in Canto
  formData.append('tags', `USNA50,${type}`);
  // Store full metadata in description for easy retrieval without downloading the file
  // Note: Description is often limited to 1024-2000 chars depending on config.
  formData.append('description', JSON.stringify(metadata));
  
  const uploadUrl = `https://${CANTO_CONFIG.tenant}.canto.com/api/v1/upload`;

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Canto Upload Failed:", errText);
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const result = await response.json();
  console.log("Uploaded successfully:", result);
};

export const getSubmissions = async (): Promise<Submission[]> => {
  const token = await getAccessToken();
  
  if (!token) {
    console.warn("Cannot fetch submissions: No Canto Access Token.");
    return [];
  }

  try {
    // Search for all assets tagged USNA50
    const searchUrl = `https://${CANTO_CONFIG.tenant}.canto.com/api/v1/search?q=tag:USNA50&limit=100&sortBy=time&sortDirection=descending`;
    
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const result = await response.json();
      
      if (result.results) {
        return result.results.map((item: any) => {
          // Parse metadata from description
          let parsedData: any = {};
          try {
            parsedData = JSON.parse(item.description);
          } catch {
            parsedData = { note: item.description };
          }

          // Determine type
          const type = parsedData.submissionType || 'UNKNOWN';

          return {
            id: item.id,
            timestamp: new Date(Number(item.time) * 1000).toISOString(),
            type,
            data: parsedData,
            cantoId: item.id,
            cantoUrl: item.url.direct, // Direct URL to the asset
            name: item.name,
            source: 'CANTO'
          };
        });
      }
    } else {
        console.error("Canto Search Failed:", await response.text());
    }
  } catch (error) {
    console.error("Error fetching from Canto:", error);
  }

  return [];
};

export const clearAllSubmissions = async (): Promise<void> => {
  // Deleting from Canto via API usually requires individual DELETE calls per asset ID
  // and often requires higher permissions. 
  // For safety and simplicity in this demo, we do not implement bulk delete here.
  console.warn("Bulk delete not supported for Canto storage in this version.");
  alert("Bulk delete is disabled for Canto storage safety.");
};
