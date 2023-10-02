'use client'

import StoreModal from '@/components/modals/StoreModal'
import React from 'react'

type Props = {}

const ModalProviders = (props: Props) => {
	const [isMounted, setIsMounted] = React.useState(false)
	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<StoreModal />
		</>
	)
}

export default ModalProviders