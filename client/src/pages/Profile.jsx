import { useState, useEffect } from 'react'
import axios from 'axios';
import { motion, useMotionValue, useTransform } from "framer-motion";

import { Toaster, toast } from 'sonner'
import { set } from 'date-fns';

const Profile = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [allGoals, setAllGoals] = useState(userData.goals);
  const [currentUser, setCurrentUser] = useState({});
  // const [success, setSuccess] = useState(false);
  const [requestReceived, setRequestReceived] = useState(userData.requestReceived);

  useEffect(() => {
    const getUserPhoto = () => {
      if (Object.keys(userData.photo).length !== 0) {
        // console.log(userData);

        const { contentType, data } = userData.photo;

        const uint8Array = new Uint8Array(data.data);
        const blob = new Blob([uint8Array], { type: contentType });

        const url = URL.createObjectURL(blob);
        setImageURL(url);
      }
    }

    getUserPhoto();
  }, [userData.photo])


  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getAllPosts");
      console.log('Response:', response.data);
      setAllGoals(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Optionally, handle error scenarios here
    }
  };

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
      if (filtered4Users.length > 0)
        setCurrentUser(filtered4Users[0]);
      else
        setCurrentUser({});
    } catch (error) {
      console.error('Error fetching users:', error);
      // Optionally, handle error scenarios here
    }
  };

  // useEffect(() => {
  //   setUserData(JSON.parse(localStorage.getItem('userData')));
  // }, []);


  useEffect(() => {
    getAllUsers();
    getAllPosts();

  }, []);


  const RightSwipe = () => {
    // Remove the current user from allUsers
    const updatedUsers = allUsers.filter(user => user.username !== currentUser.username);
    try {
      const response = axios.post('http://localhost:3000/sendRequest', {
        sender: userData.username,
        friend: currentUser.username
      });
      console.log('Friend request sent');


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
    setRequestReceived(requestReceived.filter(request => request !== friend));

    try {
      const response = await axios.post('http://localhost:3000/friend', {
        sender: userData.username,
        friend: friend,
        activity: 'add'
      });
      console.log('Friend request accepted:', response.data);
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const rejectFriend = async (friend) => {
    setRequestReceived(requestReceived.filter(request => request !== friend));

    try {
      const response = await axios.post('http://localhost:3000/rejectRequest', {
        sender: userData.username,
        friend: friend
      });
      console.log('Friend request rejected:', response.data);
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submit')
    if (!selectedFile) {
      console.error('No file selected');
      setError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('username', userData.username);

      console.log(formData);

      const response = await axios.post('http://localhost:3000/upload', formData);
      console.log('Image uploaded successfully:', response.data);
    }
    catch (error) {
      console.log('Error uploading image:');
      console.log(error);
    }
  }

  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
    await handleSubmit(event);
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
        <form className='bg-lightgrey w-[200px]  h-[200px] rounded-[50%] border-maingreen border mt-10 flex justify-center items-center  overflow-hidden' onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} className='opacity-0 absolute h-[150px] w-[100px]' />
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Image"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : imageURL ? (
            <img src={imageURL} alt="User Photo" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className='text-5xl'> ➕ </div>
          )}
        </form>

        <div className='mt-5 font-bold text-maingreen text-center text-3xl'>{userData.name}</div>
        <div className='text-[#a8a8a896]'>@{userData.username}</div>
        <div className='flex gap-10 mt-3 text-[#a8a8a896]'>
          <div>
            <span className='text-[#a8a8a8bd] mr-2'>{userData.email}</span>

          </div>
          <div>
            {userData && userData.friends && <span className='text-maingreen mr-2'>{userData.friends.length}</span>}Friends
          </div>

        </div>

        <div className='flex flex-wrap max-w-[400px] justify-center text-center mt-6 ml-4 gap-5 select-none'>
          {userData && userData.interests && userData.interests.map((interest, index) => (
            <div key={index} className='text-[#a8a8a896] w-[100px] bg-lightgrey p-2 border-maingreen border-2 rounded-lg  mt-2'>{interest}</div>
          ))
          }
        </div>

      </div>

      <motion.div
        className='tindersection w-[50%] flex flex-col gap-5 h-screen items-center'
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
          className=' w-[50%] h-[70%]  my-auto bg-darkgrey border-2 rounded-xl border-maingreen flex flex-col items-center'>


          <p className='text-maingreen text-center mt-10 font-bold text-xl capitalize'>Find Friends with Similar Interests</p>
          <div className='bg-lightgrey w-[200px]  h-[200px] rounded-[50%] border-maingreen border mt-10'></div>
          <div className='mt-5 font-bold text-maingreen text-center text-3xl'>{currentUser.name}</div>
          <div className='text-[#a8a8a896]'>@{currentUser.username}</div>
          <div className='flex gap-10 mt-3 text-[#a8a8a896]'>
            <div>
              <span className='text-[#a8a8a8bd] mr-2'>{currentUser.email}</span>

            </div>
            <div>
              {currentUser && currentUser.friends && <span className='text-maingreen mr-2'>{currentUser.friends.length}</span>}Friends
            </div>

          </div>

          <div className='flex flex-wrap max-w-[500px] justify-center text-center mt-6 ml-4 gap-5 select-none'>
            {currentUser && currentUser.interests && currentUser.interests.map((interest, index) => (
              <div key={index} className='text-[#a8a8a896] w-[100px] bg-lightgrey p-2 border-maingreen border-2 rounded-lg  mt-2'>{interest}</div>
            ))
            }
          </div>


          <p className='text-sm text-maingreen mt-6'>
            Swipe right to make a friend request
          </p>
          <p className='text-sm text-maingreen mt-3'>
            Swipe left to skip
          </p>









        </motion.div>


      </motion.div>

      <div className='tindersection w-[50%] h-screen'>
        {/* <div className='w-[400px] h-[900px] mt-10 mx-auto bg-lightgrey'>

        </div> */}

        <div className='friendrequests bg-lightgrey w-[90%] h-[350px] border-2 border-maingreen rounded-xl overflow-x-hidden overflow-y-auto mt-5'>
          <p className='text-maingreen text-center font-bold text-2xl capitalize p-4'>Friend Requests</p>
          <div className='text-center text-white'>
            {requestReceived && requestReceived.map((request, index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b border-gray-300">
                <p>{request} sent you a request</p>
                <div className="flex items-center">
                  <button onClick={() => acceptFriend(request)} className='text-white text-2xl flex items-center justify-center bg-green-500 rounded-lg px-3 py-1 ml-2'>Accept</button>
                  <button onClick={() => rejectFriend(request)} className='text-white text-2xl flex items-center justify-center bg-red-500 rounded-lg px-3 py-1 ml-2'>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-8 w-[90%] border-2 rounded-lg border-maingreen h-[300px] overflow-scroll overflow-x-hidden'>
          <p className='text-maingreen text-center mt-7 font-bold text-2xl capitalize'>Goals to be achieved</p>
          <p className='text-maingreen text-center mt-7 font-bold text-2xl capitalize'></p>
          {allGoals && allGoals.length > 0 && allGoals.map((goal, index) => (
            <div key={index} className='bg-maingreen w-[80%] p-3 rounded-lg mt-3 text-center mx-auto'>
              {goal.goal}
            </div>
          ))}


        </div>

      </div>
    </>
  );
}

export default Profile