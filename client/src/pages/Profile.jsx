import React, { useState } from 'react'
import axios from 'axios';

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('username', userData.username);
      console.log("sending File");

      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }

        });
        console.log('Image uploaded:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
        // Optionally, handle error scenarios here
      }
    } else {
      console.error('No image selected');
      // Optionally, provide feedback to the user about selecting an image
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    handleSubmit();
  };

  return (
    <>
      <div className='w-[20%] h-[100vh] bg-darkgrey flex flex-col items-center'>
        <div className='bg-lightgrey w-[200px]  h-[200px] rounded-[50%] border-maingreen border mt-10 flex justify-center items-center  overflow-hidden'>
          <input type="file" accept="image/*" onChange={handleFileChange} className=' opacity-0 absolute h-[150px] w-[100px]' />
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Image"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            // <img src={plusicon} width="110vw" alt="Plus Icon" />
            <div className='text-5xl'>➕</div>
          )}

        </div>
        <div className='mt-5 font-bold text-maingreen text-center text-3xl'>{userData.name}</div>
        <div className='text-[#a8a8a896]'>@{userData.username}</div>
        <div className='flex gap-10 mt-3 text-[#a8a8a896]'>
          <div>
            <span className='text-[#a8a8a8bd] mr-2'>{userData.email}</span>

          </div>
          <div>
            <span className='text-maingreen mr-2'>{userData.friends.length}</span>
            followers
          </div>

        </div>

        <div className='flex flex-wrap max-w-[400px] justify-center text-center mt-6 ml-4 gap-5 select-none'>
          {userData.interests.map((interest, index) => (
            <div key={index} className='text-[#a8a8a896] w-[100px] bg-lightgrey p-2 border-maingreen border-2 rounded-lg  mt-2'>{interest}</div>
          ))
          }
        </div>
      </div>

      <div className='tindersection'>
        jfkdj
      </div>


    </>


  )
}

export default Profile