import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import FileList from './components/FlatList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📁 File Management System</h1>
        <p>Upload, manage, and download your files easily</p>
      </header>
      
      <main className="app-main">
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        <FileList refreshTrigger={refreshTrigger} />
      </main>
      
      <footer className="app-footer">
        <p>File Management</p>
      </footer>
    </div>
  );
}

export default App;