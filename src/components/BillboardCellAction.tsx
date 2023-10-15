import React from 'react';
import { BillboardColumn } from './BillboardColumn';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import AlertModal from './modals/AlertModal';

interface Props {
  data: BillboardColumn;
}

const BillboardCellAction: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Billboard ID copied to clipboard');
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh();
      toast.success('Billboard deleted');
    } catch (error) {
      toast.error('Make sure you have no billboard');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
			<AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BillboardCellAction;
