import { useEffect, useState } from 'react'
import DashboardContentWrapper from '../components/DashboardContentWrapper'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { formatUnixTimestamp } from '../utils/common'
import { defaultSidebarUrls } from '../utils/urls'
import CreateAudienceModal from '../components/modals/CreateAudience'
import { getAudiences } from '../utils/api'
import { Link } from 'react-router-dom'

export const Audience = () => {

    const [showCreateAudienceModal, setShowCreateAudienceModal] = useState(false);

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

    const audienceView = (
        <>
            <Navbar current='Audience' />
            <Sidebar items={defaultSidebarUrls} current='Audience' />

            <DashboardContentWrapper>
                <h1 className="text-left text-3xl font-bold mb-10">Create and Manage your audiences here</h1>
                <div className="flex items-center justify-between flex-row">
                    <div className="flex items-center gap-x-2">
                        <button type="button" className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                        </svg>
                        </button>
                        <button onClick={() => setShowCreateAudienceModal(true)} type="button" className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                        Create New
                        </button>
                    </div>
                </div>
                <hr className="my-10" />
                <div className='flex flex-col'>
                    <h2 className="text-2xl font-bold mb-4">Audiences</h2>
                    <div className="space-y-4">
                        {audiences.map((audience, index) => {
                            return (
                                <div key={index} className="p-4 bg-white border rounded-xl text-gray-800 space-y-2 text-left">
                                    <div className="flex justify-between">
                                        <div className="text-gray-400 text-xs">Audience</div>
                                        <div className="text-gray-400 text-xs">{formatUnixTimestamp(audience.createdAt)}</div>
                                    </div>
                                    <Link to={"/campaigns/"+(audience.id || '')} className="font-bold hover:text-yellow-800 hover:underline">{audience.title}</Link>
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
    );

    return (
        <>
            <CreateAudienceModal isOpen={showCreateAudienceModal} onClose={function (audience: Audience | undefined): void {
                setShowCreateAudienceModal(false);
                if(audience != undefined){
                    let _audiences = [...audiences];
                    _audiences.unshift(audience);
                    setAudiences(_audiences);
                    setTimeout(() => refreshAudiences(), 1000);
                }
            } } />
            {audienceView}
        </>
    )
}
