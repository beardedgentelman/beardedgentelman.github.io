import { Link } from 'react-router-dom'

const UserSideBar = props => {
  return (
    <Link to='#' className='side_bar__user'>
      <div className='side_bar__picture_wrapper'>
        <img src={props.picture} alt={props.name} />
      </div>
      <div className='side_bar__user_info' style={{ display: props.collapsed && 'none' }}>
        <h6 className='side_bar__user_name'>{props.name}</h6>
        <p className='side_bar__user_position'>{props.position}</p>
      </div>
    </Link>
  )
}

export default UserSideBar
