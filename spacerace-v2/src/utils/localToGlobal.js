export const localToGlobal = function (object, camera) {
  let widthHalf = window.innerWidth / 2;
  let heightHalf = window.innerHeight / 2;

  let pos = object.position.clone();
  pos.project(camera);
  pos.x = pos.x * widthHalf + widthHalf;
  pos.y = -(pos.y * heightHalf) + heightHalf;

  return pos;
},