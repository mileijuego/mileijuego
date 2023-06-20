/**
 * Returns the rotation to a point in radians.
 * @param mx 
 * @param my 
 * @param px 
 * @param py 
 * @returns 
 */
export function rotationToPoint(
  mx: number,
  my: number,
  px: number,
  py: number,
) {
  const dist_Y = my - py;
  const dist_X = mx - px;
  const angle = Math.atan2(dist_Y, dist_X);
  // const degrees = angle * 180/ Math.PI;
  return angle;
}

export function getRandomFromArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function removeFromArray(arr: any[], el: any) {
  const index = arr.indexOf(el); // get the index of the element to remove

  if (index !== -1) {
    // check if the element was found in the array
    arr.splice(index, 1); // remove the element at the found index
  }
}

export function removeAllFromArray(arr: any[], el: any) {
  return arr.filter((e) => e !== el);
}
