'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import React from 'react'

type Props = {}

const SetupPage = (props: Props) => {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  React.useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return null
}

export default SetupPage
