import React, { useState } from 'react';
import { fileAPI } from '../services/Api';

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previews, setPreviews] = useState([]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const newPreviews = [];
    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews[index] = e.target.result;
          setPreviews([...newPreviews]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    setUploading(true);
    setUploadProgress(0);

    try {
      await fileAPI.uploadFiles(formData, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      });

      alert('Files uploaded successfully!');
      setSelectedFiles([]);
      setPreviews([]);
      setUploadProgress(0);
      onUploadSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="upload-container">
      <h2>Upload Files</h2>
      
      <div className="file-input-container">
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          onChange={handleFileSelect}
          className="file-input"
        />
        <p className="file-hint">
          Supported formats: PDF, JPG, PNG, DOCX (Max 10MB per file)
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <h3>Selected Files:</h3>
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-preview">
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">({formatFileSize(file.size)})</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="remove-file-btn"
                  style={{
                    background: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'red',
                    fontSize: '15px',
                    marginTop: '10px',
                    padding: '5px 0px',
                    border: '1px solid #b6b6b6',
                    borderRadius: '5px',
                  }}
                >
                  ❌
                </button>
              </div>
              {previews[index] && (
                <img
                  src={previews[index]}
                  alt="Preview"
                  className="image-preview"
                  style={{ width: '80px', marginTop: '5px', borderRadius: '4px' }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <span>{uploadProgress}%</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className="upload-button"
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>
    </div>
  );
};

export default FileUpload;
