import React from 'react'

const Profile = () => {
  return (
        <div className='w-[20%] h-[100vh] bg-darkgrey flex flex-col items-center'>
          <div className='bg-lightgrey w-[200px]  h-[200px] rounded-[50%] mt-10'></div>
          <div className='mt-5 font-bold text-maingreen text-center text-3xl'>Ruchir Khare</div>
          <div className='text-[#a8a8a896]'>@username</div>
          <div className='flex gap-10 text-[#a8a8a896]'>
            <div>
              <span className='text-maingreen mr-2'>16</span>
              followers</div>
            <div>friends</div>
          </div>
          

        </div>

  )
}

export default Profile