import { useState } from 'react'
import { Course } from '@/types/course'
import { CourseItem } from './components/Course'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const getCourses = async (): Promise<Course[]> => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/${process.env.API_VERSION}/courses?email=${process.env.API_EMAIL}`,
      {
        next: {
          revalidate: 3600,
          tags: ['courses'],
        },
        headers: {
          accept: '',
          'content-type': 'application/json',
        },
      }
    )

    if (!res.ok) {
      // A switch statement could be used here to provide different error messages depending on the status code res.status
      // Also a custom ResponseError class could be used to provide more consistent error messages
      throw new Error('Unexpected Error Ocurred. Please try again later.')
    }

    return res.json()
  } catch (err) {
    // err could be shown in the UI or logged
    throw new Error('Unexpected Error Ocurred. Please try again later.')
  }
}

const Courses = async () => {
  const courses = await getCourses()

  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-4 m-7">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default Courses
