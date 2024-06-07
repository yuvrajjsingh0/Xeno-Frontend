import React, { PropsWithChildren } from 'react'

const DashboardContentWrapper: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <main className="ml-60 pt-16 max-h-screen overflow-auto">
        <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-8 mb-5">
                    {children}
                </div>
            </div>
        </div>
    </main>
  )
}

export default DashboardContentWrapper