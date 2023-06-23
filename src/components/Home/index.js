import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Heading from '../Heading'

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
        setCourses(data.courses)
        setIsLoading(false)
        setError(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
        setError(true)
      }
    }

    fetchCourses()
  }, [])

  const handleRetry = () => {
    setIsLoading(true)
    setError(false)
    // eslint-disable-next-line no-undef
    fetchCourses()
  }

  return (
    <div>
      {isLoading ? (
        <p data-testid="loader">Loading</p>
      ) : error ? (
        <div>
          <img src="failure-view-image-url" alt="failure view" />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : (
        <div>
          <Heading />
          <h1>Courses</h1>
          <ul>
            {courses.map(course => (
              <button type="button" key={course.id}>
                <Link to={`/courses/${course.id}`}>
                  <img src={course.logo_url} alt={course.name} />
                  {course.name}
                </Link>
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Home
