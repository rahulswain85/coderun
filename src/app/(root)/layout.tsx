import React from 'react'
import { Navbar } from '../../../modules/home/components/navbar'
import { currentUserRole } from '../../../modules/auth/actions'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const userRole = await currentUserRole();
  return (
    <main className="flex flexcol min-h-screen">
      <Navbar userRole={userRole} />
      <div className="flex-1 flexcol px-4 pb-4">
        <div className="absolute inset-0 -z-10 h0full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)} dark:bg-size-[116px_16px] bg-[radial-gradient(#dadde2_1px,transparent_1px)] bg-size-[16px_16px]">
          {children}
        </div>
      </div>
    </main>
  );
}

export default RootLayout