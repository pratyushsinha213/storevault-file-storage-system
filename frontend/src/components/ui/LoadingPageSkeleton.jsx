import React from 'react'
import { Skeleton } from './skeleton'

const LoadingPageSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen p-6 space-y-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between px-4">
                    <Skeleton className="w-32 h-8 rounded-md" /> {/* Logo */}
                    <div className="flex space-x-4">
                        <Skeleton className="w-16 h-6 rounded-md" />
                        <Skeleton className="w-16 h-6 rounded-md" />
                        <Skeleton className="w-16 h-6 rounded-md" />
                    </div>
                </div>


                {/* Hero Section Skeleton */}

                <div>
                    <Skeleton className="mx-4 rounded-lg h-96" /> {/* Hero image */}
                </div>
                <div className="flex flex-col-reverse items-center justify-between gap-8 px-4 mt-10 lg:flex-row">
                    {/* Left: Text placeholders */}
                    <div className="w-full space-y-4 lg:w-1/2">
                        <Skeleton className="w-3/4 h-10 rounded-md" />
                        <Skeleton className="w-full h-6 rounded-md" />
                        <Skeleton className="w-5/6 h-6 rounded-md" />
                        <Skeleton className="w-40 h-12 rounded-lg" /> {/* CTA button */}
                    </div>

                    {/* Right: Image or illustration placeholder */}
                    <div className="flex justify-center w-full lg:w-1/2">
                        <Skeleton className="w-full h-64 rounded-xl" />
                    </div>
                </div>
            </div >
  )
}

export default LoadingPageSkeleton