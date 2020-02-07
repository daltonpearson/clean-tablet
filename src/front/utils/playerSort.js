export default function playerSort(crit, dir) {
  return function innerSort(p1, p2) {
    if (p1[crit] > p2[crit]) {
      return dir;
    } else if (p1[crit] == p2[crit]) {
      if (p1.name > p2.name) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return -1 * dir;
    }
  }
}