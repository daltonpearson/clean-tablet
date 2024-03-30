import PropTypes from 'prop-types';
import { name } from '../styles/Name.module.css';

function Name({ playerName }) {
  return <>{playerName && <p className={name}>{playerName}</p>}</>;
}

Name.propTypes = {
  playerName: PropTypes.string,
};

export default Name;
