import { BsFillPlusCircleFill, BsFillGridFill, BsFillCloudUploadFill, BsFillEyeFill } from 'react-icons/bs';
import MenuItems from './MenuItems';


const TutorMenu = () => {
  return (
    <>
      <MenuItems
        label='Create Session'
        address='/dashboard/create-session'
        icon={BsFillPlusCircleFill}
      />
      <MenuItems
        label='My Sessions'
        address='/dashboard/my-sessions'
        icon={BsFillGridFill}
      />
      <MenuItems
        label='Upload Materials'
        address='/dashboard/upload-materials'
        icon={BsFillCloudUploadFill}
      />
      <MenuItems
        label='View Materials'
        address='/dashboard/view-materials'
        icon={BsFillEyeFill}
      />
    </>
  )
}

export default TutorMenu;