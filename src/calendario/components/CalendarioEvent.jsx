import PropTypes from 'prop-types';

export const CalendarioEvent = ({event}) => {
  
  const {title, user} = event;

  return (
  <>
    <strong> {title} </strong>
    <br/>
    <span> - {user.name}</span>
  </>    
  )
}

CalendarioEvent.propTypes = {
  event: PropTypes.object
}