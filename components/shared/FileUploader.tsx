"use client"
import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from '../ui/button';
import Image from 'next/image';
import { convertFileToUrl } from '@/lib/utils'


type FileUploaderProps = {
    onFieldChange: (url: string) => void
    imageUrl: string,
    setFiles:Dispatch<SetStateAction<File[]>>
}

 
export function FileUploader({imageUrl, onFieldChange, setFiles}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [onFieldChange, setFiles]);

 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });
 
  return (
    <div {...getRootProps()} className='flex items-center max-h-80 cursor-pointer flex-col overflow-auto rounded-xl'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center'>
            <Image 
            src={imageUrl}
            alt='image'
            width={250}
            height={250}
            className='px-1 w-full h-fit object-cover object-center'
            /> 
        </div>
      ) : (
        <div className="flex items-center flex-col py-5 text-grey-500">
        <Image src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" priority/>
        <h3 className="mb-2 mt-2">Drag photo here</h3>
        <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
        <Button type="button" className="rounded-full">
          Select from computer
        </Button>
      </div>
      )}
    </div>
  );
}
