import { li } from '../styles/Scoreboard.module.css';

function MapFn(crit) {
  return function innerMap(pl, ind) {
    return (
      <li
        style={{ backgroundColor: pl.color }}
        className={li}
        key={pl.name + '_' + ind}
      >
        <p>{pl.name}</p>
        <p>{pl[crit]}</p>
      </li>
    );
  };
}

export default MapFn;
