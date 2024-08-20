'use server'

import { ResponseStatus, ToggleFavoriteResponse } from '@/types/course'
import { revalidateTag } from 'next/cache'

export const addToFavorites = async (
  courseId: number
): Promise<ToggleFavoriteResponse> => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/${process.env.API_VERSION}/favorite`,
      {
        method: 'POST',
        headers: {
          accept: '',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: process.env.API_EMAIL,
          course_id: courseId,
        }),
      }
    )
    if (!res.ok) {
      return {
        status: ResponseStatus.error,
        message: 'Unexpected Error Ocurred when trying to add to favorites',
      }
    }
    revalidateTag('courses')
    return {
      status: ResponseStatus.success,
      message: 'Course added to favorites',
    }
  } catch (err) {
    return {
      status: ResponseStatus.error,
      message: 'Unexpected Error Ocurred when trying to add to favorites',
    }
  }
}

export const removeFromFavorites = async (
  courseId: number
): Promise<ToggleFavoriteResponse> => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/${process.env.API_VERSION}/favorite`,
      {
        method: 'DELETE',
        headers: {
          accept: '',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: process.env.API_EMAIL,
          course_id: courseId,
        }),
      }
    )
    if (!res.ok) {
      return {
        status: ResponseStatus.error,
        message:
          'Unexpected Error Ocurred when trying to remove from favorites',
      }
    }
    revalidateTag('courses')
    return {
      status: ResponseStatus.success,
      message: 'Course removed from favorites',
    }
  } catch (err) {
    return {
      status: ResponseStatus.error,
      message: 'Unexpected Error Ocurred when trying to remove from favorites',
    }
  }
}
