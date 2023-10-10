import { UserButton, auth } from '@clerk/nextjs';
import React from 'react';
import { MainNav } from './MainNav';
import StoreSwitcher from './StoreSwitcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

type Props = {};

const Navbar = async (props: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* store switcher */}
        <StoreSwitcher items={stores} />
        {/* routes */}
        <MainNav className="mx-6" />
        {/* user button */}
        <div className="flex ml-auto items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
