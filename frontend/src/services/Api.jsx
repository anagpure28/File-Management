import axios from 'axios';

const API_BASE_URL = 'https://file-management-2-31uy.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fileAPI = {
  uploadFiles: (formData, onUploadProgress) => {
    return api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  },

  getFiles: () => {
    return api.get('/files');
  },

  downloadFile: (fileId, filename) => {
    return api.get(`/files/download/${fileId}`, {
      responseType: 'blob',
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    });
  },

  deleteFile: (fileId) => {
    return api.delete(`/files/${fileId}`);
  },
};

export default api;
