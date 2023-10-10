'use client';

import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import React from 'react';
import { Button } from './button';
import Image from 'next/image';

interface Props {
  disableUpload?: boolean;
  onChanged: (imageUrl: string) => void;
  onRemoved: (imageUrl: string) => void;
  value: string[];
}

const ImageUpload: React.FC<Props> = ({ disableUpload, onChanged, onRemoved, value }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChanged(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden" key={url}>
            <div className="z-10 absolute top-2 right-2">
              <Button variant={'destructive'} size={'icon'} type="button" onClick={() => onRemoved(url)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image className="object-cover" fill src={url} alt={'Image'} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="ji1boled">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" disabled={disableUpload} variant={'secondary'} onClick={onClick}>
              <ImagePlus className="h-4 w-4 mr-2" />
							Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
