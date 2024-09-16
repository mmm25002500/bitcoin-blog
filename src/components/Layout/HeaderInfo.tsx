import { useState } from 'react';

const HeaderInfo = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`relative flex bg-[#F7931A] w-full px-16 py-1 text-[17px] z-40 ${!open && 'hidden'}`}>
      <p className="text-black text-center grow">🚧 網站施工測試中</p>
      <button
        className='text-black'
        onClick={() => setOpen(false)}
      >
        x
      </button>
    </div>
  )
}

export default HeaderInfo;
