import { BsFillPersonLinesFill, BsFillFileEarmarkTextFill, BsFillHouseFill } from 'react-icons/bs';
import MenuItems from './MenuItems';

const AdminMenu = () => {
  return (
    <>
      <MenuItems
        label='Manage Users'
        address='/dashboard/manage-users'
        icon={BsFillPersonLinesFill}
      />
      <MenuItems
        label='Manage Sessions'
        address='/dashboard/manage-sessions'
        icon={BsFillHouseFill}
      />
      <MenuItems
        label='View Materials'
        address='/dashboard/view-materials-admin'
        icon={BsFillFileEarmarkTextFill}
      />
    </>
  )
}

export default AdminMenu;