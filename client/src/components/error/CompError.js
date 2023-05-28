import { useNavigate, useSearchParams } from 'react-router-dom';

export const CompError = () => {

  const [searchParams] = useSearchParams();  
  const msg = searchParams.get('msg');

  const navigate = useNavigate()

  const handleClick = ()=>{
    navigate('/')
  }

  return (
    <div>
      {msg} 
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50 h-10" onClick={handleClick}>Try Again</button>
    </div>
  )
}
