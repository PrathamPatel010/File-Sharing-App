import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router';
const DownloadPage = () => {
    const backend_base = import.meta.env.VITE_BACKEND_BASE;
    const [password,setPassword] = useState('');
    const [fileName,setFileName] = useState('');
    const [fileSize,setFileSize] = useState('');

    // destructuring and renaming id to fileID using URL params
    const {id:fileID} = useParams();

    // this handler will be called first to fetch file information 
    const getFileInfo = async() => {
        try{
            const response = await axios.get(`${backend_base}/file/${fileID}`);
            if(response.data.status==404){
                setFileName('No File Found');
                setFileSize(0);
                return;
            }
            setFileName(response.data.originalName);
            setFileSize(response.data.fileSize);
        } catch(err){
            console.log(err.message);
        }
    }

    // handler that will be called when we try to download a file
    const downloadFile = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${backend_base}/file/${fileID}`, { password });
            if(response.data && response.data.status==404){
                console.log(response.data.message);
                return;
            }
            if(response.data && response.data.status==401){
                console.log(response.data.message);
                return;
            }
            // here we define blob object and use it to trigger download
            const blob = new Blob([response.data],{type:response.headers['Content-Type']});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display='none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getFileInfo();
    },[fileID]);

    return(
        <>
            <div className="file-info-div text-center mt-4">
                <h3>File-Information</h3>
                <h5>File-Name: {fileName}</h5>
                <h5>File-Size: {fileSize}</h5>
            </div>
            <div>
                <article>
                    <form onSubmit={downloadFile} className="form-download mt-5">
                        <h3>Enter Password to download</h3>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="password-input form-control" placeholder="password" autoComplete="off" autoFocus={false} required/>
                        <button type="submit" className="btn btn-success mt-3">Download</button>
                    </form>
                </article>
            </div>
        </>
    )
}

export default DownloadPage;