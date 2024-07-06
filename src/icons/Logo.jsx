import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon-hh.png'

export default function Logo() {
  const navigate = useNavigate()
  return (
    <div className="flex items-end w-[162px]" onClick={() => navigate('/')}>
      <img
        className="w-[38px] h-[36px]"
        src={logo}
        alt="logo"
      />
      <h1 className="text-font-logo">Hahoot</h1>
    </div>
  );
}
