import { useState } from 'react';
import axios from 'axios';

const Form = () => {
    // managing states using hooks
    const [password,setPassword] = useState('');
    const backend_base = import.meta.env.VITE_BACKEND_BASE;
    const [uploadPercentage,setUploadPercentage] = useState(0);

    // handler for making request to backend
    const handleSubmit = async(e) => {
        e.preventDefault();

        // using FormData for appending file in the request
        const formData = new FormData();
        formData.append('file',e.target.elements.file.files[0]);
        formData.append('password',password);
        try{
            // making request to backend route & using progressEvent to get the info for progress bar
            const response = await axios.post(`${backend_base}/api/upload`,formData,{
                onUploadProgress:(progressEvent)=>{
                    const percentageCompleted = Math.round((progressEvent.loaded/progressEvent.total)*100);
                    setUploadPercentage(percentageCompleted);
                },
            });
            console.log(response.data);
        } catch(err){
            console.log(err.message);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="form-main my-3" encType="multipart/form-data">
                <label htmlFor="file">Select file</label>
                <input type="file" name="file" required/>
                <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Set Password" className="form-control" autoComplete="off" required/>
                <button type="submit" className="btn btn-success mt-3">Share</button>
            </form>

            {/* // coniditional rendering, progress bar will be shown only when file is getting uploaded */}
            {(uploadPercentage > 0) && (
                <div className="progress-div">
                    <div className="container text-center" style={{ width: "50%" }}>
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" style={{ width: `${uploadPercentage}%` }}>{uploadPercentage}%</div>
                    </div>
                </div>
            )}

            {(uploadPercentage==100) && (
                <div  className="link-div">
                    <a>Download Link</a>
                </div>
            )

            }

        </>
    )
}

export default Form;