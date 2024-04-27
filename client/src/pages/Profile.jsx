import React from 'react'

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <>
      <div className='w-[20%] h-[100vh] bg-darkgrey flex flex-col items-center'>
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
      </div>

      <div className='tindersection'>
          jfkdj
      </div>
      
        
    </>


  )
}

export default Profile