"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>
  maxImages?: number
  disabled?: boolean
}

export function ImageUpload({ value = [], onChange, setFiles, maxImages = 5, disabled }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return
      const files = Array.from(e.dataTransfer.files)
      handleFiles(files)
    },
    [disabled],
  )

  const handleFiles = async (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    if (imageFiles.length === 0) return
    if (value.length + imageFiles.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`)
      return
    }

    // send original files to parent
    if (setFiles) setFiles((prev: any) => [...prev, ...imageFiles])

    // Convert files to data URLs for preview
    const newImages = await Promise.all(
      imageFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })
      }),
    )
    onChange([...value, ...newImages])
  }

  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index)
    onChange(newImages)
    if (setFiles) setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging && "border-primary bg-primary/5",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer hover:border-primary/50",
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={disabled || value.length >= maxImages}
          onChange={(e) => {
            const files = Array.from(e.target.files || [])
            handleFiles(files)
          }}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className={cn("flex flex-col items-center gap-2", !disabled && "cursor-pointer")}>
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium">Drop images here or click to upload</p>
            <p className="text-sm text-muted-foreground">
              PNG, JPG, GIF up to 10MB ({value.length}/{maxImages})
            </p>
          </div>
        </label>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <Image src={url || "/placeholder.svg"} alt={`Product image ${index + 1}`} fill className="object-cover rounded-lg" />
              {!disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
