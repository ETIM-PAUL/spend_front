import React from 'react'
import Layout from '@/components/Layout'
import WalletId from "@/components/WalletId"


const AccountDetails = () => {
  return (
    <Layout>
      <div className='pt-16 pb-5'>
        <div className='flex gap-6 w-'>
          <span className='text-5xl pr-3'>&#8592;</span>
          <div className='grid space-y-2'>
            <span className='tracking-[0.08px] text-3xl'>Accounts</span>

          </div>
        </div>

        <WalletId type="account" />
      </div>
    </Layout>
  )
}

export default AccountDetails