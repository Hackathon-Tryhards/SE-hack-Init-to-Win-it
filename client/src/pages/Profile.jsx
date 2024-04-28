
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { motion, useMotionValue, useTransform } from "framer-motion";

import { Toaster, toast } from 'sonner'


const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [success, setSuccess] = useState(false);

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

  //   useEffect(() => {
  //     const handleKeyDown = (event) => {
  //         if (event.key === 'ArrowLeft') {
  //             LeftSwipe();
  //         } else if (event.key === 'ArrowRight') {
  //           RightSwipe();
  //         }
  //     };

  //     window.addEventListener('keydown', handleKeyDown);

  //     // Cleanup function to remove the event listener when the component unmounts
  //     return () => {
  //         window.removeEventListener('keydown', handleKeyDown);
  //     };
  // }, []);


  useEffect(() => {
    // Call the getAllUsers function when the component mounts
    getAllUsers();
  }, []); // Make sure to include userData in the dependency array


  const RightSwipe = () => {
    // Remove the current user from allUsers
    const updatedUsers = allUsers.filter(user => user.username !== currentUser.username);
    try {
      const response = axios.post('http://localhost:3000/sendRequest', {
        sender: userData.username,
        friend: currentUser.username
      });
      console.log('Friend request sent');
      setSuccess(true);

    }
    catch (error) {
      console.error('Error sending friend request:', error);
      // Optionally, handle error scenarios here
    }

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
    setSuccess(false);
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

  const acceptFriend = async (friend) => {
    try {
      const response = await axios.post('http://localhost:3000/friend', {
        sender: userData.username,
        friend: friend,
        activity: 'add'
      });
      console.log('Friend request accepted:', response.data);
    } catch (error) {
      console.error('Error accepting friend request:', error);
      // Optionally, handle error scenarios here
    }
  };

  const rejectFriend = async (friend) => {
    try {
      const response = await axios.post('http://localhost:3000/rejectRequest', {
        sender: userData.username,
        friend: friend
      });
      console.log('Friend request rejected:', response.data);
    } catch (error) {
      console.error('Error accepting friend request:', error);
      // Optionally, handle error scenarios here
    }
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
            <div className='text-5xl'> ➕ </div>
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
        className='tindersection w-[50%] flex flex-col gap-5 h-screen items-center'

      >

        <div className='ml-10 w-[500px] h-[300px] border-2 border-maingreen rounded-xl'>
          fjdfjkdj
        </div>
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
          className=' w-[50%] h-[50%]  mx-auto bg-darkgrey border-2 rounded-xl border-maingreen flex flex-col items-center'>
          <p className='text-maingreen text-center mt-10 font-bold text-xl capitalize'>Find Friends with Similar Interests</p>
          <div className='bg-lightgrey w-[100px]  h-[100px] rounded-[50%] border-maingreen border mt-10'></div>
          <div className='mt-5 font-bold text-maingreen text-center text-3xl'>{currentUser.name}</div>
          <div className='text-[#a8a8a896]'>@{currentUser.username}</div>
          <div className='flex gap-10 mt-3 text-[#a8a8a896]'>
            <div>
              <span className='text-[#a8a8a8bd] mr-2'>{currentUser.email}</span>

            </div>
            <div>
              followers
            </div>

          </div>

          <div className='flex flex-wrap max-w-[400px] justify-center text-center mt-6 ml-4 gap-5 select-none'>
            {userData.interests.map((interest, index) => (
              <div key={index} className='text-[#a8a8a896] w-[100px] bg-lightgrey p-2 border-maingreen border-2 rounded-lg  mt-2'>{interest}</div>
            ))
            }
          </div>


          <p className='text-sm text-maingreen mt-7'>
            Swipe right to make a friend request and left to skip
          </p>









        </motion.div>
        {
          success ? (
            <Toaster position="bottom-right" richColors>
              {toast.success('Friend Request Sent')}
            </Toaster>
          ) : null
        }

      </motion.div>

      <div className='tindersection w-[50%] h-screen'>
        {/* <div className='w-[400px] h-[900px] mt-10 mx-auto bg-lightgrey'>

        </div> */}

        <div className='friendrequests bg-lightgrey w-[90%] h-[150px] border-2  overflow-x-hidden overflow-scroll border-maingreen rounded-xl'>
          <p className='text-maingreen text-center font-bold text-2xl capitalize'>Friend Requests</p>
          <div className='text-center text-white'>
            {/* ruchir khare sent you a request <button className=' text-white text-3xl items-center flex  rounded-lg ml-2'>✅</button> <button className=' text-white  rounded-lg ml-2'>✅</button> */}
            {userData.requestReceived.map((request, index) => (
              <div key={index}>
                <p>{userData.requestReceived[index]} sent you a request</p>
                <button onClick={() => acceptFriend(userData.requestReceived[index])} className='text-white text-3xl items-center flex rounded-lg ml-2'>Accept</button>
                <button onClick={() => rejectFriend(userData.requestReceived[index])} className='text-white rounded-lg ml-2'>Reject</button>
              </div>
            ))}

          </div>

        </div>

        <div className='mt-36 w-[700px] border-2 rounded-lg border-maingreen'>
            <p className='text-maingreen text-center mt-7 font-bold text-2xl capitalize'>Find Communities to Join</p>
          <div className='flex flex-wrap gap-4 mt-5 mb-6'>

            <div className='bg-maingreen w-[300px] p-3 rounded-lg ml-5'>
              WebDev
            </div>
            <div className='bg-maingreen w-[300px] p-3 rounded-lg ml-5'>
              Blockchain
            </div>
            <div className='bg-darkgrey text-maingreen w-[300px] p-3 rounded-lg ml-5'>
              AIML
            </div>
            <div className='bg-darkgrey text-maingreen w-[300px] p-3 rounded-lg ml-5'>
              Trading
            </div>
            <div className='bg-maingreen w-[300px] p-3 rounded-lg ml-5'>
              WebDev
            </div>
            <div className='bg-maingreen w-[300px] p-3 rounded-lg ml-5'>
              WebDev
            </div>

          </div>
        </div>

      </div>




    </>


  )
}

export default Profile