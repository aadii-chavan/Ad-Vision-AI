// This file handles the API communication with the Python backend

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
}

/**
 * Sends a chat message to the backend and returns the AI response
 */
export const sendChatMessage = async (question: string): Promise<ChatResponse> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Chat request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in chat request:', error);
    throw new Error('Failed to get response from AI assistant');
  }
};

/**
 * Checks if the backend API is available
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/health');
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
