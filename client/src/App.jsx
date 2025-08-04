import React from 'react'

const App = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className=' flex justify-center items-center w-[20rem]'>
          <input className='border p-1 rounded-lg m-1' type="text" placeholder='Message' />
          <button className='border p-1 rounded-lg'>Send Message</button>
        </div>
    </div>

  )
}

export default App