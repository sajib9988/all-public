import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuItems = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        `flex items-center p-2 text-base font-normal rounded-lg dark:text-white
        ${isActive ? 'bg-green-400' : 'text-gray-900 dark:text-white'} 
        hover:bg-blue-500 dark:hover:bg-gray-700`
      }
    >
      {Icon && <Icon className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />}
      <span className='flex-1 ml-3 whitespace-nowrap'>{label}</span>
    </NavLink>
  )
}

MenuItems.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.elementType
}

export default MenuItems;