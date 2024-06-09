import React, { ReactNode } from 'react'

type CustomerProps = {
    customer: Customer;
    children: ReactNode
}

const CustomerRow: React.FC<CustomerProps> = ({customer, children}) => {
  return (
    <>
        <div className="bg-white p-2 flex items-center space-x-4">
            <img className="h-12 w-12 rounded-full object-cover" src={"https://picsum.photos/200?l="+customer.id} alt="User Display Picture" />
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 text-left">{customer.name}</h3>
                <p className="text-sm text-gray-500 text-left">{customer.email}</p>
            </div>
            {children}
        </div>
        <hr />
    </>
  )
}

export default CustomerRow