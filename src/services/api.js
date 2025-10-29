const API_BASE = 'https://json-server-vercel-pglc.vercel.app/';

export const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },
  
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },
  
  put: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },
  
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
};