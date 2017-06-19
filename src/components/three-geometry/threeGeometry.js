/**
 * Created by ccf on 3/9/17.
 */
const Init = function () {
  const renderer = new THREE.WebGLRenderer({
    canvas:document.getElementById('mainCanvas')
  });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();

  const camera = new THREE.MeshBasicMaterial({
    color:0xffffff
  });
  // plane
  const planeGeo = new THREE.PlaneGeometry(1.5, 1.5);
  const plane = new THREE.Mesh(planeGeo, material);
  plane.position.x = 1;
  scene.add(plane);

  // triangle
  const triGeo = new THREE.Geometry();
  triGeo.vertices = [new THREE.Vector3(0, -0.8, 0),
    new THREE.Vector3(-2, -0.8, 0), new THREE.Vector3(-1, 0.8, 0)];
  triGeo.faces.push(new THREE.Face3(0, 2, 1));
  const triangle = new THREE.Mesh(triGeo, material);
  scene.add(triangle);

  renderer.render(scene, camera);
}
module.exports = Init;
