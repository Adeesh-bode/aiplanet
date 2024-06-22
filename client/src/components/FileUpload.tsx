import React, { useState } from 'react';
import axios from 'axios';
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";


import LogoLight from '../assets/aiplanet_logo_light.svg';
import LogoDark from '../assets/aiplanet_logo_dark.svg';

interface FileUploadProps {
    onUpload: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);

            const formData = new FormData();
            for (let i = 0; i < event.target.files.length; i++) {
                formData.append('files', event.target.files[i]);
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
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput')!.click();
    };

    return (
        <div className='h-16 px-5 py-3 shadow shadow-bottom shadow-black flex justify-between'>
            <div className=''>
                {
                    (isDarkMode)? (<img src={LogoDark} alt='ai planet logo' className='object-cover'/>): 
                    (<img src={LogoLight} alt='ai planet logo' className='object-cover'/>)
                }
            </div>
            <div className='flex justify-between gap-4'>
                <div className='flex justify-between items-center gap-3'>
                    {selectedFiles && selectedFiles.length > 0  && selectedFiles.length < 5  && (
                        Array.from(selectedFiles).map((file, index) => (
                            <div key={index} className='w-fit flex justify-center items-center gap-2 text-[#0FA958 '>
                                <IoDocumentTextOutline className='' /> 
                                <span>{file.name}</span>
                            </div>
                        ))
                    ) }
                    {
                        ( selectedFiles && selectedFiles.length > 4 && <div>Mutiple documents selected</div> ) 
                    }
                </div>
                <div className='flex justify-between items-center gap-3 '>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                    />
                    <button onClick={triggerFileInput} className='h-full border border-[#0FA958] py-3 px-1 flex justify-between gap-2  items-center'>
                        <CiCirclePlus />
                        <span>Upload Files</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
