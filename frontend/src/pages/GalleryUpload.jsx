import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const GalleryUpload = () => {
    const [files, setFiles] = useState([]);

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token
    const navigate = useNavigate()

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    }, [])

const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
};

const handleClear =()=>{
    setFiles([])
}

  return (
    <section className='gallery-upload'>
        <form action="post" encType='multipart/form-data'>
            <label htmlFor="gupload">Upload To Gallery</label>
            <input className='fileupload'
                id='gupload' 
                type="file" 
                name='gallery'
                multiple
                onChange={handleFiles}
            />         
            <div className="button-conrol">
                <button>Submit</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </form>
        <Link to="/restaurants/:id">Go Back</Link>
        <div className="display-area">
        {            
            files.map(file=>(
            <p key={file.name}>{file.name}</p>
        ))}       
        </div>        
    </section>

   
  )
}

export default GalleryUpload
