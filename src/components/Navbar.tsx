import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './MainNav'
import StoreSwitcher from './StoreSwitcher'

type Props = {}

const Navbar = (props: Props) => {
	return (
		<div className='border-b'>
			<div className="flex h-16 items-center px-4">
				{/* store switcher */}
				<StoreSwitcher />
				{/* routes */}
				<MainNav className='mx-6' />
				{/* user button */}
				<div className="flex ml-auto items-center space-x-4">
					<UserButton afterSignOutUrl='/' />
				</div>
			</div>
		</div>
	)
}

export default Navbar