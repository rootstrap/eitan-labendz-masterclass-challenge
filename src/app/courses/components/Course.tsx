'use client'

import { useState } from 'react'
import { Course, ResponseStatus } from '@/types/course'
import Image from 'next/image'
import { toast } from 'react-toastify'

import { HeartIcon } from '@/components/HeartIcon'
import { Spinner } from '@/components/Spinner'
import { addToFavorites, removeFromFavorites } from '@/actions/favorite'

interface ICourseProps {
  course: Course
}

export const CourseItem = ({ course }: ICourseProps) => {
  const [favorite, setFavorite] = useState(course.favorite)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFavorite = async () => {
    // TODO: Show what course was added/removed in toast
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
      className="flex flex-col gap-2 cursor-pointer text-left"
      role="group"
      aria-label={`Course: ${course.title}`}
      onClick={handleToggleFavorite}
      disabled={isLoading}
    >
      <div className="relative">
        <Image
          priority
          src={course.instructor_image_url}
          alt="course instructor image"
          width={300}
          height={300}
          role="img"
        />
        {isLoading ? <Spinner /> : <HeartIcon active={favorite} />}
      </div>
      <h4>{course.instructor_name}</h4>
      <p className="text-2xl font-bold">{course.title}</p>
    </button>
  )
}
