'use client';

import React from 'react';
import Heading from './ui/heading';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Separator } from './ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { BillboardColumn, columns } from './BillboardColumn';
import { DataTable } from './ui/data-tables';

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Billboards (${data.length})`} description="Manage your billboards" />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='label' />
    </>
  );
};

export default BillboardClient;
