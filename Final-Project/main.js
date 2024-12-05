import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);
camera.position.set(0, 1.6, 10); 
camera.rotation.set(0, 0, 0); 

// Create the ground
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xD6D6D6 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; 
plane.receiveShadow = true; 
scene.add(plane);



let loadedModel;
const loader = new GLTFLoader();
loader.load(
    'assets/scene.glb',
    function (gltf) {
        gltf.scene.position.set(0, 1.7, 0);
        gltf.scene.scale.set(4, 4, 4);
        loadedModel = gltf.scene; 
        scene.add(loadedModel);
        spotlight1.target = gltf.scene;
    }
);

const spotlight1 = new THREE.SpotLight(0xffffff, 100); 
spotlight1.position.set(0, 5, 0);
spotlight1.angle = Math.PI / 12;
spotlight1.distance = 15;
spotlight1.penumbra = 0.5;
spotlight1.castShadow = true;
scene.add(spotlight1);
scene.add(spotlight1.target);

// Makes my scene more bright
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1,1,1);
scene.add(light);

// Set up first-person controls
const controls = new PointerLockControls(camera, document.body);

// Enable pointer lock on click
document.body.addEventListener('click', () => {
    controls.lock();
});

// Keyboard input
const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
};
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW': keys.backward = true; break;
        case 'KeyS': keys.forward = true; break;
        case 'KeyA': keys.left = true; break;
        case 'KeyD': keys.right = true; break;
    }
});
document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW': keys.backward = false; break;
        case 'KeyS': keys.forward = false; break;
        case 'KeyA': keys.left = false; break;
        case 'KeyD': keys.right = false; break;
    }
});

// Move the camera
const velocity = new THREE.Vector3();
const speed = 0.1;

function animate() {
    requestAnimationFrame(animate);

    // updating the velovity
    if (keys.forward) velocity.z = -speed;
    if (keys.backward) velocity.z = speed;
    if (keys.left) velocity.x = -speed;
    if (keys.right) velocity.x = speed;

    // using the velocity for the controls
    controls.moveRight(velocity.x);
    controls.moveForward(velocity.z);
    velocity.set(0, 0, 0);


    loadedModel.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();