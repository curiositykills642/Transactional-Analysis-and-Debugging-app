import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "./WalletAnalysis.css"

const FileUpload = ({ onFileRead }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setErrorMessage('Invalid file type. Only CSV files are allowed.');
      } else {
        setErrorMessage('');
        // Read the contents of the accepted file(s)
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            // File content is available in reader.result
            onFileRead(file.name, reader.result);
          };
          reader.readAsText(file);
        });
      }
    },
    accept: '.csv', // Specify the file types that are allowed (only CSV files in this case)
    multiple: false, // Set to 'true' if you want to handle multiple files at once
  });

  return (
    <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
      <input {...getInputProps()} />
      <button type="button" className="dropzone-button">
        {isDragActive ? 'Drop CSV file here' : 'Drag and drop a CSV file here'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
