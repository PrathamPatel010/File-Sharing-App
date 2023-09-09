import { useState } from 'react';
import axios from 'axios';

const Form = () => {
    // managing states using hooks
    const [password,setPassword] = useState('');
    const backend_base = import.meta.env.VITE_BACKEND_BASE;


    // handler for making request to backend
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',e.target.elements.file.files[0]);
        formData.append('password',password);
        console.log(formData);
        try{
            const response = await axios.post(`${backend_base}/api/upload`,formData);
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
        </>
    )
}

export default Form;