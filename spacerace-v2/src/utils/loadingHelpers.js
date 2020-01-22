import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from "three";

const loadingHelpers = {

  // Load gltf
  loadModel: function (manager, models, key, model) {
    let loader = new GLTFLoader(manager);
    loader.load(
      model,
      function (gltf) {
        models[key] = gltf.scene;
      },
      function (xhr) { console.log("xhr:", xhr) },
      // called when loading has errors
      function (error) {
        console.error(error);
      }
    );
  },

  // Load texture
  loadTexture: function (manager, textures, key, texture) {
    let loader = new THREE.TextureLoader(manager);
    loader.load(
      texture,
      function (res) {
        textures[key] = res;
      },
      function (xhr) { console.log("xhr:", xhr) },
      // called when loading has errors
      function (error) {
        console.log(error);
      }
    );
  }
};

export {
  loadingHelpers
}
