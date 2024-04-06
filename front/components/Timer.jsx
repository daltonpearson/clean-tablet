import PropTypes from 'prop-types';

function Timer({ timer }) {
  return (
    <p role="alert" style={{ color: '#ffee58', fontSize: '5em' }}>
      {timer}
    </p>
  );
}

Timer.propTypes = {
  timer: PropTypes.number,
};

export default Timer;
