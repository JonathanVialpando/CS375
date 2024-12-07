import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xD6D6D6);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement);
camera.position.set(0, 1.6, 4); 
camera.rotation.set(0, 0, 0); 


const rectangleGeometry = new THREE.BoxGeometry(2.5, 5, 2.5); 
const rectangleMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xaaaaaa,        
    opacity: 0.3,          
    transparent: true,     
    roughness: 0,          
    metalness: 0,         
    transmission: 1.0,     
    clearcoat: 1.0,        
    clearcoatRoughness: 0, 
    depthWrite: false,     
});
const seeThroughBox = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
seeThroughBox.position.set(0, 0, 0); 
scene.add(seeThroughBox);

const seeThroughBox2 = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
seeThroughBox2.position.set(5, 0, 0); 
scene.add(seeThroughBox2);

const seeThroughBox3 = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
seeThroughBox3.position.set(10, 0, 0); 
scene.add(seeThroughBox3);

const seeThroughBox4 = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
seeThroughBox4.position.set(10, 0, 8); 
scene.add(seeThroughBox4);

const seeThroughBox5 = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
seeThroughBox5.position.set(5, 0, 8); 
scene.add(seeThroughBox5);

const seeThroughBox6 = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
seeThroughBox6.position.set(0, 0, 8); 
scene.add(seeThroughBox6);

// Create the ground
const planeGeometry = new THREE.PlaneGeometry(40, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xD6D6D6 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; 
plane.receiveShadow = true; 
scene.add(plane);

// Create the red carpet
const carpetGeometry = new THREE.PlaneGeometry(4, 40);
const carpetMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000, 
    roughness: 1.3, 
    metalness: 0,    
    side: THREE.DoubleSide
});
const carpet = new THREE.Mesh(carpetGeometry, carpetMaterial);
carpet.rotation.x = Math.PI / 2; 
carpet.rotation.z = Math.PI / 2; 
carpet.position.set(0, 0.1, 4);  
scene.add(carpet);


// Loading in all of my six objects
let beerTap;
const loader = new GLTFLoader();
loader.load(
    'assets/beerTap/scene.glb',
    function (gltf) {
        gltf.scene.position.set(0, 1.7, 0);
        gltf.scene.scale.set(4, 4, 4);
        beerTap = gltf.scene; 
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;   
                child.receiveShadow = true; 
            }
        });
        scene.add(beerTap);
        spotlight1.target = gltf.scene;
    }
);

let openSign;
loader.load(
    'assets/openSign/scene.gltf', 
    function (gltf) {
        gltf.scene.position.set(5, 1.7, 0); 
        gltf.scene.scale.set(4, 4, 4);      
        openSign = gltf.scene;

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;   
                child.receiveShadow = true; 
            }
        });
        scene.add(gltf.scene);
        spotlight2.target = gltf.scene;
    }
);

let key;
loader.load(
    'assets/key/scene.gltf', 
    function (gltf) {
        gltf.scene.position.set(10, 1.7, 0); 
        gltf.scene.scale.set(10, 10, 10);      
        key = gltf.scene;

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;  
                child.receiveShadow = true; 
            }
        });
        scene.add(gltf.scene);
        spotlight3.target = gltf.scene;
    }
);

let giftBox;
loader.load(
    'assets/giftBox/uploads_files_4008356_GiftBox_gltf.gltf', 
    function (gltf) {
        gltf.scene.position.set(10, 1, 8); 
        gltf.scene.scale.set(.3, .3, .3);    
        giftBox = gltf.scene;

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;   
                child.receiveShadow = true; 
            }
        });
        scene.add(gltf.scene);
        spotlight4.target = gltf.scene;
    }
);

let bunny;
loader.load(
    'assets/bunny/Bunny Lamp.gltf', 
    function (gltf) {
        gltf.scene.position.set(5, 1, 8); 
        gltf.scene.scale.set(.1, .1, .1);     
        bunny = gltf.scene;

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;   
                child.receiveShadow = true; 
            }
        });
        scene.add(gltf.scene);
        spotlight5.target = gltf.scene;
    }
);

let chair;
loader.load(
    'assets/chair/scene.gltf', 
    function (gltf) {
        gltf.scene.position.set(0, 1.5, 8); 
        gltf.scene.scale.set(2, 2, 2);      
        chair = gltf.scene;

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;   
                child.receiveShadow = true; 
            }
        });
        scene.add(gltf.scene);
        spotlight6.target = gltf.scene;
    }
);



// Creating six spotlights for my six models
const spotlight1 = new THREE.SpotLight(0xffffff, 900); 
spotlight1.position.set(0, 5, 0);
spotlight1.angle = Math.PI / 12;
spotlight1.distance = 15;
spotlight1.penumbra = 0.5;
spotlight1.castShadow = true;
scene.add(spotlight1);
scene.add(spotlight1.target);

const spotlight2 = new THREE.SpotLight(0xffffff, 900); 
spotlight2.position.set(5, 5, 0);
spotlight2.angle = Math.PI / 12;
spotlight2.distance = 15;
spotlight2.penumbra = 0.5;
spotlight2.castShadow = true;
scene.add(spotlight2);
scene.add(spotlight2.target);

const spotlight3 = new THREE.SpotLight(0xffffff, 900); 
spotlight3.position.set(10, 5, 0);
spotlight3.angle = Math.PI / 12;
spotlight3.distance = 15;
spotlight3.penumbra = 0.5;
spotlight3.castShadow = true;
scene.add(spotlight3);
scene.add(spotlight3.target);

const spotlight4 = new THREE.SpotLight(0xffffff, 900); 
spotlight4.position.set(10, 5, 8);
spotlight4.angle = Math.PI / 12;
spotlight4.distance = 15;
spotlight4.penumbra = 0.5;
spotlight4.castShadow = true;
scene.add(spotlight4);
scene.add(spotlight4.target);

const spotlight5 = new THREE.SpotLight(0xffffff, 900); 
spotlight5.position.set(5, 5, 8);
spotlight5.angle = Math.PI / 12;
spotlight5.distance = 15;
spotlight5.penumbra = 0.5;
spotlight5.castShadow = true;
scene.add(spotlight5);
scene.add(spotlight5.target);

const spotlight6 = new THREE.SpotLight(0xffffff, 900); 
spotlight6.position.set(0, 5, 8);
spotlight6.angle = Math.PI / 12;
spotlight6.distance = 15;
spotlight6.penumbra = 0.5;
spotlight6.castShadow = true;
scene.add(spotlight6);
scene.add(spotlight6.target);

// Makes my scene more bright
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1,10,1);
scene.add(light);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(4, 0, 0); 
directionalLight1.target.position.set(0, 0, 0);
scene.add(directionalLight1);
scene.add(directionalLight1.target);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(4, 0, 0); 
directionalLight2.target.position.set(5, 0, 0); 
scene.add(directionalLight2);
scene.add(directionalLight2.target);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(4, 0, 0); 
directionalLight2.target.position.set(10, 0, 0); 
scene.add(directionalLight2);
scene.add(directionalLight2.target);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(4, 0, 0); 
directionalLight2.target.position.set(10, 0, 8); 
scene.add(directionalLight2);
scene.add(directionalLight2.target);

const directionalLight5 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(4, 0, 0); 
directionalLight2.target.position.set(5, 0, 8); 
scene.add(directionalLight2);
scene.add(directionalLight2.target);

const directionalLight6 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(4, 0, 0); 
directionalLight2.target.position.set(0, 0, 8); 
scene.add(directionalLight2);
scene.add(directionalLight2.target);


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


    if (beerTap) beerTap.rotation.y += 0.01;
    if (giftBox) giftBox.rotation.y += 0.01;
    if (key) key.rotation.y += 0.01;
    if (openSign) openSign.rotation.y += 0.01;
    if (chair) chair.rotation.y += 0.01;
    if (bunny) bunny.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
