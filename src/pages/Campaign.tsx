import React, { useEffect, useState } from 'react'
import { NavbarWithPrevNext } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { defaultSidebarUrls } from '../utils/urls'
import DashboardContentWrapper from '../components/DashboardContentWrapper'
import { useParams } from 'react-router-dom'
import { getAudience, getAudienceByRules, getAudiences, getCampaignLogs } from '../utils/api'
import CustomerRow from '../components/CustomerRow'
import { startCampaign as startCampaignAPI } from '../utils/api'

export const Campaign: React.FC = () => {

    const params = useParams();

    const [audience, setAudience] = useState<Audience>();
    const [campaignLogs, setCampaignLogs] = useState<Map<string, string>>(new Map());

    const [audiencesNav, setAudiencesNav] = useState<{prev:string | undefined, next:string | undefined}>();

    const [isCampaignStarted, setIsCampaignStarted] = useState(false);

    const refreshAudience = () => {
        getAudience(Number(params.id)).then((_audience) => {
            return _audience;
        }).then(async (_audience: Audience) => {
            if(typeof _audience.rules == 'string') _audience.rules = JSON.parse(_audience.rules);
            if(_audience.isCompleted) refreshSentLogs();
            const customers = await getAudienceByRules(_audience.rules);
            _audience.users = customers;
            setAudience(_audience as Audience);
        }).catch(err => console.log(err));
    }

    const refreshSentLogs = () => {
        getCampaignLogs(Number(params.id)).then((_campaignLogs: CampaignLog[]) => {
            const _logMap = campaignLogs;
            for(const log of _campaignLogs){
                _logMap.set(log.Customer.email, log.status);
            }
            setCampaignLogs(_logMap);
            if(_campaignLogs.length == audience?.users?.length){
                setIsCampaignStarted(false);
                refreshAudience();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        refreshAudience();
        getAudiences().then((_audiences) => {
            _audiences = _audiences.reverse();
            const currIdx = _audiences.findIndex(obj => obj.id == Number(params.id));

            let audienceNav = {
                next: (currIdx != 0)? '/campaigns/' + _audiences[currIdx - 1].id : undefined,
                prev: (currIdx != (_audiences.length - 1))? '/campaigns/' + _audiences[currIdx + 1].id : undefined
            };

            setAudiencesNav(audienceNav);
        }).catch(err => console.log(err));
    }, []);

    const startCampaign = () => {
        setIsCampaignStarted(true);
        startCampaignAPI(Number(params.id)).then((res) => {
            console.log(res);
            setTimeout(() => refreshSentLogs(), 2000);
        }).catch(err => console.log(err));
    }

  return (
    <>
        <NavbarWithPrevNext
        current='Campaigns'
        prevLink={audiencesNav?.prev}
        nextLink={audiencesNav?.next}
        />
        <Sidebar items={defaultSidebarUrls} current='Campaigns' />
        <DashboardContentWrapper>
            <h1 className="text-left text-3xl font-bold mb-10">{audience?.title}</h1>
            <div className="flex items-center justify-between flex-row">
                <div className="flex items-center gap-x-2">
                    <button type="button" className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                        </svg>
                    </button>
                    <button disabled={audience?.isCompleted || isCampaignStarted} onClick={() => startCampaign()} type="button" className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                        {isCampaignStarted && <svg className="animate-spin h-5 w-5 mr-2 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.292l1.292-1.292a1 1 0 000-1.414L6 11.586V9.293C6.083 9.11 6.17 8.93 6.255 8.755a1 1 0 011.414 0l1.292 1.292a1 1 0 001.414 0L12 7.707c.167.167.322.342.474.528C12.696 9.07 12 11.5 12 12c0 .5.696 2.93 1.868 3.965a7.72 7.72 0 00.632.634L11.293 17H9.293a1 1 0 00-.528.474 8.01 8.01 0 01-1.415 0L6 14.707c-.292-.292-.585-.585-.832-.889-.202-.232-.33-.481-.376-.765z"></path>
                        </svg>}
                        {!audience?.isCompleted && !isCampaignStarted && 'Start Campaign'}
                        {audience?.isCompleted && !isCampaignStarted && 'Campaign Completed'}
                        {isCampaignStarted && 'Campaign Started'}
                    </button>
                </div>
            </div>
            <hr className="my-10" />
            <div className='flex flex-col'>
                <h2 className="text-2xl font-bold mb-4">Customers</h2>
                <div className="space-y-4">
                    {audience?.users && audience.users.map((customer: Customer) => {
                        return (
                            <CustomerRow customer={customer}>
                                {campaignLogs.size > 0 && campaignLogs.get(customer.email) == 'SENT' &&
                                    <div className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-green-500">
                                        SENT
                                    </div>
                                }
                                {campaignLogs.size > 0 && campaignLogs.get(customer.email) == 'FAILED' &&
                                    <div className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-red-500">
                                        FAILED
                                    </div>
                                }
                            </CustomerRow>
                        );
                    })}
                </div>
            </div>
        </DashboardContentWrapper>
    </>
  )
}
