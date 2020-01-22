import { constants } from "@/utils/constants.js";
import * as THREE from "three";

export const engine = {
  axis: {
    x: new THREE.Vector3(1, 0, 0).normalize(),
    y: new THREE.Vector3(0, 1, 0).normalize(),
    z: new THREE.Vector3(0, 0, 1).normalize()
  },

  translate: function(object) {
    // Calculate acceleration
    object.accel.x = object.force.x / object.mass;
    object.accel.y = object.force.y / object.mass;
    object.accel.z = object.force.z / object.mass;
    object.rotAccel.z = object.force.x / object.mass;
    // Calculate speed
    object.speed.x += object.accel.x;
    object.speed.y += object.accel.y;
    object.speed.z += object.accel.z;
    object.rotSpeed.z += object.rotAccel.z;
    // Descelerate / frictions
    if (object.speed.x != 0)
      object.speed.x =
        object.speed.x > 0
          ? object.speed.x - constants.FRICTIONS.x
          : object.speed.x + constants.FRICTIONS.x;
    if (object.speed.y != 0)
      object.speed.y =
        object.speed.y > 0
          ? object.speed.y - constants.FRICTIONS.y
          : object.speed.y + constants.FRICTIONS.y;
    if (object.speed.z != 0)
      object.speed.z =
        object.speed.z > 0
          ? object.speed.z - constants.FRICTIONS.z
          : object.speed.z + constants.FRICTIONS.z;

    if (object.rotSpeed.z != 0)
      object.rotSpeed.z =
        object.rotSpeed.z > 0
          ? object.rotSpeed.z - constants.ROT_FRICTIONS.z
          : object.rotSpeed.z + constants.ROT_FRICTIONS.z;

    // Always try to rotate to object.rotation.z = 0
    object.balanceRotSpeed =
      ((object.rotation.z * Math.PI) / 180) * constants.ROT_BALANCE_KP;
    object.rotSpeed.z += object.balanceRotSpeed;
    // Limit speed
    if (Math.abs(object.speed.x) >= object.maxSpeed.x)
      object.speed.x =
        (object.maxSpeed.x * object.speed.x) / Math.abs(object.speed.x);
    if (Math.abs(object.speed.y) >= object.maxSpeed.y)
      object.speed.y =
        (object.maxSpeed.y * object.speed.y) / Math.abs(object.speed.y);
    // Move
    object.position.x += object.speed.x;
    object.position.y += object.speed.y;
    object.position.z += object.speed.z;
    object.rotation.z += (Math.PI / -180) * object.rotSpeed.z;
    // Bound rotation
    if (object.rotation.z > constants.MAX_ROTATION) {
      object.rotSpeed.z = 0;
      object.rotation.z = constants.MAX_ROTATION;
    }
    if (object.rotation.z < constants.MIN_ROTATION) {
      object.rotSpeed.z = 0;
      object.rotation.z = constants.MIN_ROTATION;
    }
  }
};
