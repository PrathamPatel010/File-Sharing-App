import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router';
const DownloadPage = () => {
    const backend_base = import.meta.env.VITE_BACKEND_BASE;
    const [password,setPassword] = useState('');

    // destructuring and renaming id to fileID using URL params
    const {id:fileID} = useParams();

    const getFileInfo = async() => {
        const response = await axios.get(`${backend_base}/file/${fileID}`);
        console.log(response.data);
    }

    const downloadFile = async(e) => {
        try{
            e.preventDefault();
            await axios.post(`${backend_base}/file/${fileID}`,{password},{withCredentials:true});
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
                <h3>Enter Password to download</h3>
            </div>
            <div>
                <article>
                    <form onSubmit={downloadFile} className="form-download mt-3">
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="password-input form-control" placeholder="password"/>
                        <button type="submit" className="btn btn-success mt-3">Download</button>
                    </form>
                </article>
            </div>
        </>
    )
}

export default DownloadPage;