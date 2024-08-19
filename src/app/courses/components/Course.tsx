import { Course } from "@/types/course";
import Image from "next/image";

interface ICourseProps {
    course: Course
}

export const CourseItem = ({course}: ICourseProps) => {
    return (
    <div className="flex flex-col gap-2" role="group" aria-label={`Course: ${course.title}`}>
        <Image src={course.instructor_image_url} alt="course instructor image" width={300} height={300} role="img" />
        <h3>{course.instructor_name}</h3>
        <p className="text-2xl font-bold">{course.title}</p>
    </div>)
}