import user_icon from '../assets/user_icon.svg';
import dashboard from '../assets/dashboard.svg';
import ticket from '../assets/ticket.svg';
import users from '../assets/users.svg';
import chart from '../assets/chart.svg';
import trending from '../assets/trending.svg';
import '../App.css'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/authSlice';

export default function Home() {
  const userName: string = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-nav gap-4 h-full max-w-7xl mx-auto p-5">
      <div className="hidden bg-background-dark03 dark:bg-background-light03 rounded-xl py-10 px-5 md:flex flex-col gap-10">
        <button className='flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5' onClick={() => dispatch(logout())}>
          <img src={user_icon} alt="user icon" className="w-12 h-auto dark:invert" />
          <span>{userName.split(' ')[0]}</span>
        </button>
        <Link to={'/'} className='flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5'>
          <img src={dashboard} alt="ticket" className="w-10 h-auto dark:invert" />
          <span>Dashboard</span>
        </Link>
        <Link to={'/tickets'} className='flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5'>
          <img src={ticket} alt="ticket" className="w-10 h-auto dark:invert" />
          <span>Tickets</span>
        </Link>
        <button className='flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5'>
          <img src={users} alt="ticket" className="w-10 h-auto dark:invert" />
          <span>Users</span>
        </button>
        <button className='flex flex-row justify-between items-center hover:backdrop-brightness-75  dark:hover:backdrop-brightness-200 dark:hover:backdrop-brightness-200transition-all duration-100 rounded-lg h-12 px-5'>
          <img src={chart} alt="ticket" className="w-10 h-auto dark:invert" />
          <span>Reports</span>
        </button>
        <button className='flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5'>
          <img src={trending} alt="ticket" className="w-10 h-auto dark:invert" />
          <span>Performance</span>
        </button>
      </div>
      <Outlet />
    </div>
  )
}