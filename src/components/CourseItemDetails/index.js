import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Heading from '../Heading'

const CourseItemDetails = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [courseDetails, setCourseDetails] = useState(null)
  const [error, setError] = useState(false)
  const {id} = useParams()
  const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(courseDetailsApiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch course details')
      }
      const data = await response.json()
      setCourseDetails(data.course_details)
      setIsLoading(false)
      setError(false)
    } catch (error1) {
      console.error(error1)
      setIsLoading(false)
      setError(true)
    }
  }
  useEffect(() => {
    fetchCourseDetails()
  }, [id])

  const handleRetry = () => {
    setIsLoading(true)
    setError(false)
    fetchCourseDetails()
  }

  return (
    <div>
      {isLoading ? (
        <p data-testid="loader">Loading</p>
      ) : error ? (
        <div>
          <img src="failure-view-image-url" alt="failure view" />
          <p>We cannot seem to find the page you are looking for</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : (
        <div>
          <Heading />
          <img src={courseDetails.image_url} alt={courseDetails.name} />

          <h1>{courseDetails.name}</h1>
          <p>{courseDetails.description}</p>
        </div>
      )}
    </div>
  )
}

export default CourseItemDetails
