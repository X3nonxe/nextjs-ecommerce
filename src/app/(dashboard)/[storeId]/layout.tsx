import Navbar from '@/components/Navbar';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
};

const layout = async (props: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: props.params.storeId,
      userId,
    },
  });

	if (!store) {
		redirect('/');
	}

	return (
		<>
			<Navbar />
			{props.children}
		</>
	)
};

export default layout;
