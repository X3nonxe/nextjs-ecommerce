import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const updateStore = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updateStore);
  } catch (error) {
    console.error('[STORE_PATCH', error);

    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const deleteStore = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(deleteStore);
  } catch (error) {
    console.error('[STORE_DELETE', error);

    return new NextResponse('Internal server error', { status: 500 });
  }
}
