
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { motion, useMotionValue, useTransform } from "framer-motion";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getAllUsers");
      console.log('Response:', response.data);

      // Filter out the current user and users who are already friends
      const filteredUsers = response.data.filter(user => user.username !== userData.username);

      const filtered2Users = filteredUsers.filter(user => !userData.friends.includes(user.username));

      const filtered3Users = filtered2Users.filter(user => !userData.requestSent.includes(user.username));

      const filtered4Users = filtered3Users.filter(user => !userData.requestReceived.includes(user.username));

      console.log('Filtered users:', filtered4Users);
      // Update state variables
      setAllUsers(filtered4Users);
      setCurrentUser(filtered4Users[0]);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Optionally, handle error scenarios here
    }
  };
  useEffect(() => {
    // Call the getAllUsers function when the component mounts
    getAllUsers();
  }, []); // Make sure to include userData in the dependency array


  const RightSwipe = () => {
    // Remove the current user from allUsers
    const updatedUsers = allUsers.filter(user => user.username !== currentUser.username);
    if (updatedUsers.length === 0) {
      getAllUsers();
      return;
    }

    // Set the new list of users after swipe
    setAllUsers(updatedUsers);

    // Set the next user as the current user
    setCurrentUser(updatedUsers[0]);
  };

  const LeftSwipe = () => {
    // Remove the current user from allUsers
    const updatedUsers = allUsers.filter(user => user.username !== currentUser.username);
    if (updatedUsers.length === 0) {
      getAllUsers();
      return;
    }
    // Set the new list of users after swipe
    setAllUsers(updatedUsers);

    // Set the next user as the current user
    setCurrentUser(updatedUsers[0]);
  };


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
  const xInput = [-20, 0, 20];
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
            {/* <span className='text-maingreen mr-2'>{userData.friends.length}</span> */}
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

      >
        <motion.div
          style={{ x, background }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => {
            if (info.offset.x > 150) {
              RightSwipe();
            } else if (info.offset.x < -150) {
              LeftSwipe();
            }
          }}
          className=' w-[70%] h-[80%]  mx-auto bg-darkgrey border-2 border-maingreen flex flex-col items-center'>
          <p className='text-maingreen text-center mt-10 font-bold text-2xl capitalize'>Find Friends with Similar Interests</p>
          <div className='bg-lightgrey w-[200px]  h-[200px] rounded-[50%] border-maingreen border mt-10'></div>
          <div className='mt-5 font-bold text-maingreen text-center text-3xl'>{currentUser.name}</div>
          <div className='text-[#a8a8a896]'>@{currentUser.username}</div>
          <div className='flex gap-10 mt-3 text-[#a8a8a896]'>
            <div>
              <span className='text-[#a8a8a8bd] mr-2'>{currentUser.email}</span>

            </div>
            <div>
              {/* <span className='text-maingreen mr-2'>{currentUser.friends.length}</span> */}
              followers
            </div>

          </div>

          <div className='flex flex-wrap max-w-[400px] justify-center text-center mt-6 ml-4 gap-5 select-none'>
            {userData.interests.map((interest, index) => (
              <div key={index} className='text-[#a8a8a896] w-[100px] bg-lightgrey p-2 border-maingreen border-2 rounded-lg  mt-2'>{interest}</div>
            ))
            }
          </div>






        </motion.div>

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