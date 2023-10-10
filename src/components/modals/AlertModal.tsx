'use client';

import React from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title="Are you sure?" description="This action cannot be undone" isOpen={isOpen} onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button disabled={loading} onClick={onConfirm} variant="destructive">
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
