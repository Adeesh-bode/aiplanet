import React, { useState } from 'react';
import axios from 'axios';

interface FileUploadProps {
    onUpload: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFiles) return;

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        try {
            const response = await axios.post('http://localhost:8000/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onUpload(response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload Files</button>
        </div>
    );
};

export default FileUpload;
