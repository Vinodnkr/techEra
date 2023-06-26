import {Component} from 'react'
import {Link} from 'react-router-dom'

export default class CourseItem extends Component {
  render() {
    const {details} = this.props
    const {id, logoUrl, name} = details
    return (
      <Link to={`courses/${id}`}>
        <li
          style={{
            listStyle: 'none',
            display: 'flex',
            margin: '20px',
            textDecoration: 'none',
            color: '#1e293b',
            fontWeight: '600',
          }}
        >
          <div style={{marginRight: '30px'}}>
            <img src={logoUrl} alt={name} />
          </div>
          <p>{name}</p>
        </li>
      </Link>
    )
  }
}
