import {useEffect, useState} from 'react'
import Heading from '../Heading'
import CourseItem from '../CourseItem'
import TailSpin from 'react-loader-spinner'
import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/te/courses')
        if (!response.ok) {
          throw new Error('Failed to fetch courses')
        }
        const data = await response.json()
        const updatedData = data.courses.map(each => ({
          id: each.id,
          logoUrl: each.logo_url,
          name: each.name,
        }))
        setCourses(updatedData)
        setIsLoading(false)
        setError(false)
      } catch (error1) {
        console.error(error1)
        setIsLoading(false)
        setError(true)
      }
    }

    fetchCourses()
  }, [])

  const handleRetry = () => {
    setIsLoading(true)
    setError(false)
    fetchCourses()
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <div data-testid="loader" className="spinner">
            <TailSpin
              height={80}
              width={80}
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius={1}
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      ) : error ? (
        <div>
          <Heading />
          <div>
            <img src="failure-view-image-url" alt="failure view" />
          </div>
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button type="button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : (
        <div>
          <Heading />
          <h1>Courses</h1>
          <ul className="war">
            {courses.map(course => (
              <CourseItem key={course.id} details={course} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Home
