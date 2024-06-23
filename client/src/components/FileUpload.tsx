import React, { useState } from 'react'; 
import axios from 'axios'; 

import { IoDocumentTextOutline } from "react-icons/io5";  
import { CiCirclePlus } from "react-icons/ci";  

import LogoLight from '../assets/aiplanet_logo_light.svg'; 
import LogoDark from '../assets/aiplanet_logo_dark.svg'; 
import { useAppContext } from '../utils/AppContext'; 

interface FileUploadProps {
    onUpload: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => { 
    const { isDarkMode, toggleDarkMode } = useAppContext(); 
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null); 

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);

            const formData = new FormData();
            const filenames: string[] = [];
            for (let i = 0; i < event.target.files.length; i++) {
                formData.append('files', event.target.files[i]);
                filenames.push(event.target.files[i].name);
            }

            try {
                const response = await axios.post('http://localhost:8000/upload/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                onUpload(filenames); 
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput')!.click();
    };

    return (
        <div className=' md:h-20 px-1 md:px-8 py-2 md:py-4 shadow shadow-bottom shadow-black flex  justify-between items-center'>
            <div className=' w-20 md:w-28 flex-center'>
                {
                    (isDarkMode)? (<img src={LogoDark} alt='ai planet logo' className='object-cover'/>): 
                    (<img src={LogoLight} alt='ai planet logo' className='object-cover'/>)
                }
            </div>
            <div className='flex justify-between items-center gap-1 md:gap-4 text-xs md:text-lg'>
                <div className='w-28 md:w-fit flex  justify-between items-center gap-3 overflow-scroll md:overflow-hidden '>
                    {selectedFiles && selectedFiles.length > 0 && selectedFiles.length < 5 && (
                        Array.from(selectedFiles).map((file, index) => (
                            <div key={index} className='w-full sm:w-fit flex justify-center items-center gap-2 border-r-2 pr-3 text-[#0FA958]'>
                                <IoDocumentTextOutline /> 
                                <span className='truncate'>{file.name}</span>
                            </div>
                        ))
                    )}
                    {selectedFiles && selectedFiles.length > 4 && <div>Mutiple documents selected</div>}
                </div>
                <div className='flex justify-between items-center gap-3 flex-center'>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                    />
                    <button onClick={triggerFileInput} className=' rounded-lg md:rounded-none text-lg h-full border border-[#0FA958] py-1 md:py-2 px-1 md:px-4 flex justify-between gap-2 items-center'>
                        <CiCirclePlus size={25} />
                        <span className='hidden md:inline-block  '>Upload PDF</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
