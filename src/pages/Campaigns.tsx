import { Link } from 'react-router-dom'
import DashboardContentWrapper from '../components/DashboardContentWrapper'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { defaultSidebarUrls } from '../utils/urls'
import { formatUnixTimestamp } from '../utils/common'
import { useEffect, useState } from 'react'
import { getAudiences } from '../utils/api'

const Campaigns = () => {

  const refreshAudiences = () => {
    getAudiences()
    .then(_audiences => {
        _audiences = _audiences.reverse();
        setAudiences(_audiences);
    })
    .catch(err => console.log(err));
  }

  const [audiences, setAudiences] = useState<Audience[]>([]);

  useEffect(() => {
      refreshAudiences();
  }, []);


  return (
    <>
        <Navbar current='Campaigns' />
        <Sidebar items={defaultSidebarUrls} current='Campaigns' />

        <DashboardContentWrapper>
                <h1 className="text-left text-3xl font-bold mb-10">Manage your campaigns here</h1>
                
                <hr className="my-10" />
                <div className='flex flex-col'>
                    <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
                    <div className="space-y-4">
                        {audiences.map((audience, index) => {
                            return (
                                <div key={index} className="p-4 bg-white border rounded-xl text-gray-800 space-y-2 text-left">
                                    <div className="flex justify-between">
                                        <div className="text-gray-400 text-xs">Campaign</div>
                                        <div className="text-gray-400 text-xs">{formatUnixTimestamp(audience.createdAt)}</div>
                                    </div>
                                    <Link to={"/campaigns/"+(audience.id || '')} className="font-bold hover:text-yellow-800 hover:underline">{audience.title}'s Campaign</Link>
                                    <div className="text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                        </svg>Total Users {audience.numUsers}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </DashboardContentWrapper>
    </>
  )
}

export default Campaigns