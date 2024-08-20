'use client'

import React from 'react'
import { useState } from 'react'
import { Course, ResponseStatus } from '@/types/course'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { HeartIcon } from '@/components/HeartIcon'
import { addToFavorites, removeFromFavorites } from '@/actions/favorite'
import { Spinner } from '@/components/Spinner'

interface ICourseProps {
  course: Course
}

export const CourseItem = ({ course }: ICourseProps) => {
  const [favorite, setFavorite] = useState(course.favorite)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFavorite = async () => {
    setIsLoading(true)
    if (favorite) {
      const { status, message } = await removeFromFavorites(course.id)
      if (status === ResponseStatus.success) setFavorite(false)
      toast[status](message)
    } else {
      const { status, message } = await addToFavorites(course.id)
      if (status === ResponseStatus.success) setFavorite(true)
      toast[status](message)
    }
    setIsLoading(false)
  }

  return (
    <button
      className="flex flex-col gap-2 cursor-pointer text-left group"
      role="group"
      aria-label={`Course: ${course.title}`}
      onClick={handleToggleFavorite}
      disabled={isLoading}
    >
      <div className="relative overflow-hidden h-96 rounded-lg">
        <Image
          priority
          src={course.instructor_image_url}
          alt={`${course.instructor_name} image`}
          width={300}
          height={384}
          role="img"
          className="object-cover h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-2"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#272727] to-transparent"></div>
        <div className="absolute bottom-16 w-full text-center flex flex-col justify-start h-8">
          <h4 className="text-2xl font-bold">{course.instructor_name}</h4>
          <p className="font-semibold">{course.title}</p>
        </div>
        <div className="absolute top-1 right-1">
          {isLoading ? <Spinner /> : <HeartIcon active={favorite} />}
        </div>
      </div>
    </button>
  )
}
