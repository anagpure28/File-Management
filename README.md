# File Management System

A full-stack web application for uploading, managing, and downloading files with a modern React frontend and Express.js backend.

## Features

- **File Upload**: Support for multiple file types (PDF, JPG, PNG, DOCX)
- **Drag & Drop Interface**: Intuitive file upload with progress tracking
- **File Management**: View, download, and delete uploaded files
- **Image Preview**: Preview images before uploading
- **File Validation**: Size and type restrictions for security
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Clean API endpoints for file operations

## Tech Stack

**Frontend:**
- React.js
- Axios for API calls
- Modern CSS with responsive design

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Multer for file handling
- CORS for cross-origin requests

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn package manager

### Backend Setup

1. **Create project structure:**
   ```bash
   mkdir file-management-system
   cd file-management-system
   mkdir backend
   cd backend
   ```

2. **Initialize and install dependencies:**
   ```bash
   npm init -y
   npm install express mongoose multer cors path fs dotenv
   npm install --save-dev nodemon
   ```

3. **Create directory structure:**
   ```bash
   mkdir models routes uploads
   ```

4. **Update package.json scripts:**
   ```json
   {
     "scripts": {
       "start": "nodemon server.js"
     }
   }
   ```

5. **Copy backend files** (server.js, models/File.js, routes/files.js)

6. **Start MongoDB** (ensure MongoDB is running on default port 27017)

7. **Run the backend:**
   ```bash
   npm run start
   ```

### Frontend Setup

1. **Create React application:**
   ```bash
   cd ../
   npx create-react-app frontend
   cd frontend
   ```

2. **Install additional dependencies:**
   ```bash
   npm install axios
   ```

3. **Replace default files** with the provided components and styles

4. **Start the frontend:**
   ```bash
   npm run dev
   ```

## Testing the Application

### Manual Testing Checklist

**File Upload Testing:**
- ✅ Upload single file (PDF, JPG, PNG, DOCX)
- ✅ Upload multiple files at once
- ✅ Progress bar displays correctly
- ✅ File size validation (reject files > 10MB)
- ✅ File type validation (reject unsupported formats)
- ✅ Image preview before upload

**File Management Testing:**
- ✅ File list displays with correct metadata
- ✅ Download functionality works
- ✅ Delete functionality works with confirmation
- ✅ File count updates after operations
- ✅ Responsive design on mobile devices

### API Testing

```bash
# Test health endpoint
curl https://file-management-pssi.onrender.com/api/health

# Test file list
curl https://file-management-pssi.onrender.com/api/files
```

## API Documentation

### Endpoints

#### Upload Files
- **POST** `/api/files/upload`
- **Body**: FormData with 'files' field
- **Response**:
  ```json
  {
    "message": "Files uploaded successfully",
    "files": [
      {
        "_id": "file_id",
        "originalName": "document.pdf",
        "filename": "files-123456789.pdf",
        "size": 1024000,
        "mimetype": "application/pdf",
        "uploadDate": "2025-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### Get All Files
- **GET** `/api/files`
- **Response**: Array of file objects

#### Download File
- **GET** `/api/files/download/:id`
- **Response**: File download stream

#### Delete File
- **DELETE** `/api/files/:id`
- **Response**:
  ```json
  {
    "message": "File deleted successfully"
  }
  ```

## File Structure

```
file-management-system/
├── backend/
│   ├── models/
│   │   └── File.js
│   ├── routes/
│   │   └── files.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.js
│   │   │   └── FileList.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Configuration Options

### File Upload Limits
- Maximum file size: 10MB
- Supported formats: PDF, JPG, PNG, DOCX
- Multiple file upload: Enabled

### Database Configuration
- Default MongoDB connection: `mongodb cluster`
- Collection: `files`

## Deployment

### Production Deployment

1. **Environment Variables:**
   ```env
   mongo_url = mongodb_uri
   ```

2. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

3. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **File Upload Fails:**
   - Check file size (must be < 10MB)
   - Verify file type is supported
   - Ensure uploads directory exists

3. **CORS Errors:**
   - Verify frontend URL in CORS configuration
   - Check if both frontend and backend are running


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request
