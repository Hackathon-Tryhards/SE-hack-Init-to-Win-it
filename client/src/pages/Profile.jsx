
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { motion, useMotionValue, useTransform } from "framer-motion";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState('');


  const handleSubmit = async () => {
    console.log(selectedFile);
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

  const x = useMotionValue(0);
  const xInput = [-40, 0, 40];
  const background = useTransform(x, xInput, [
    '#232323',
    '#232323',
    '#232323'
  ]);

  return (
    <>
      <div className='w-[20%] h-[100vh] bg-darkgrey flex flex-col items-center'>
        <div className='bg-lightgrey w-[200px]  h-[200px] rounded-[50%] border-maingreen border mt-10 flex justify-center items-center  overflow-hidden'>
          <input type="file" accept="image/*" onChange={handleFileChange} className=' opacity-0 absolute h-[150px] w-[100px]' />
          {imageURL ? (
            <img src={imageURL} alt="User Photo" className="w-full h-full object-cover rounded-lg" />
          ) : selectedFile ? (

            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Image"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
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



















































      <motion.div
        className='tindersection w-[50%] h-screen flex items-center'
        style={{ x, background }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 150) {
            console.log('Swiped Right');
          } else if (info.offset.x < -150) {
            console.log('Swiped Left');
          }
        }}
      >
        <div className=' w-[70%] h-[80%]  mx-auto bg-darkgrey border-2 border-maingreen flex flex-col items-center'>
          <p className='text-maingreen text-center mt-10 font-bold text-2xl capitalize'>Find Friends with Similar Interests</p>
          <div className='bg-lightgrey w-[200px]  h-[200px] rounded-[50%] border-maingreen border mt-10'></div>
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

          <div className='flex justify-center mt-4'>
            <button className='mr-2 bg-[#34ff453b] text-white p-2 rounded'>
              &#10004; {/* This is the HTML entity for the tick emoji */}
            </button>
            <button className='ml-2 bg-red-500 text-white p-2 rounded'>
              &#10060; {/* This is the HTML entity for the cross emoji */}
            </button>
          </div>





        </div>

      </motion.div>

      <div className='tindersection w-[50%] h-screen'>
        {/* <div className='w-[400px] h-[900px] mt-10 mx-auto bg-lightgrey'>

        </div> */}

        <div className='friendrequests'>
          jfkdj
        </div>


      </div>


    </>


  )
}

export default Profile