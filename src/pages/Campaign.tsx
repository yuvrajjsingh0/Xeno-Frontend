import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { defaultSidebarUrls } from '../utils/urls'

const Campaign = () => {
  return (
    <>
        <Navbar current='Campaigns' />
        <Sidebar items={defaultSidebarUrls} current='Campaigns' />
    </>
  )
}

export default Campaign