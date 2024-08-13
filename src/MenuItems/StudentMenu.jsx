import { BsFillCalendarFill, BsFillFileEarmarkPlusFill, BsFillFileEarmarkFill, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import MenuItems from './MenuItems';


const StudentMenu = () => {
  return (
    <>
      <MenuItems
        label='Booked Sessions'
        address='/dashboard/booked-sessions'
        icon={BsFillCalendarFill}
      />
      <MenuItems
        label='Create Note'
        address='/dashboard/create-note'
        icon={BsFillFileEarmarkPlusFill}
      />
      <MenuItems
        label='Manage Notes'
        address='/dashboard/manage-notes'
        icon={BsFillFileEarmarkFill}
      />
      <MenuItems
        label='Study Materials'
        address='/dashboard/study-materials'
        icon={BsFillFileEarmarkTextFill}
      />
    </>
  )
}

export default StudentMenu;