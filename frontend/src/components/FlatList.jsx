import React, { useState, useEffect } from "react";
import { fileAPI } from "../services/Api";

const FileList = ({ refreshTrigger }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fileAPI.getFiles();
      console.log("Fetched files:", response);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      alert("Error fetching files");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId, filename) => {
    try {
      await fileAPI.downloadFile(fileId, filename);
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed");
    }
  };

  const handleDelete = async (fileId, filename) => {
    if (window.confirm(`Are you sure you want to delete "${filename}"?`)) {
      try {
        await fileAPI.deleteFile(fileId);
        fetchFiles();
      } catch (error) {
        console.error("Delete error:", error);
        alert("Delete failed");
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    return (
      new Date(dateString).toLocaleDateString() +
      " " +
      new Date(dateString).toLocaleTimeString()
    );
  };

  const getFileIcon = (mimetype) => {
    if (mimetype.startsWith("image/")) return "🖼️";
    if (mimetype === "application/pdf") return "📄";
    if (mimetype.includes("word")) return "📝";
    return "📁";
  };

  if (loading) {
    return <div className="loading">Loading files...</div>;
  }

  return (
    <div className="file-list-container">
      <h2>Uploaded Files ({files.length})</h2>

      {files.length === 0 ? (
        <p className="no-files">No files uploaded yet.</p>
      ) : (
        <div className="file-grid">
          {files.map((file) => (
            <div key={file._id} className="file-card">

              {/* {file.mimetype.startsWith("image/") ? (
                <div className="file-preview2">
                  <img 
                    src={file.publicUrl} 
                    alt={file.originalName}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="file-preview2-fallback">
                    <span className="file-icon">{getFileIcon(file.mimetype)}</span>
                  </div>
                </div>
               ) : (
                 <div className="file-icon-container">
                   <span className="file-icon">{getFileIcon(file.mimetype)}</span>
                 </div>
               )} */}

              <div className="file-header">
                <span className="file-name" title={file.originalName}>
                  {file.originalName.replace(/\.[^/.]+$/, "")}
                </span>
              </div>

              <div className="file-details">
                <div className="file-detail">
                  <strong>Type:</strong>{" "}
                  {file.mimetype.split("/")[1].toUpperCase()}
                </div>
                <div className="file-detail">
                  <strong>Size:</strong> {formatFileSize(file.size)}
                </div>
                <div className="file-detail">
                  <strong>Uploaded:</strong> {formatDate(file.uploadDate)}
                </div>
              </div>

              <div className="file-actions">
                <button
                  onClick={() => handleDownload(file._id, file.originalName)}
                  className="download-button"
                >
                  <svg
                    className="button-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file._id, file.originalName)}
                  className="delete-button"
                >
                  <svg
                    className="button-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;