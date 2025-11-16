import * as THREE from 'three';
import '/src/style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

// Scene
const scene = new THREE.Scene();

// Create a Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64); // radius, width segments, height segments
const material = new THREE.MeshStandardMaterial({
	color: '#00ff83',
	roughness: 0.6
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Screen Size
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

// Light Object
const light = new THREE.PointLight(0xffffff, 100, 100);//color, instensity, position
light.position.set(0,10,10); //x,y,z
scene.add(light);

// Camera Object
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20; // camera z-axis position
/*
  field of view (FOV) - recommended <= 50, if it's > 50 then it will start creating 
  a distortion effect
*/
scene.add(camera); //add camera

// Renderer Object
const canvas = document.querySelector('.webgl'); // get the canvas HTML element
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2); //increase resolution
renderer.render(scene, camera); // render scene + camera

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resizing looop
window.addEventListener("resize", () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Camera update
	camera.updateProjectionMatrix();
	camera.aspect = sizes.width / sizes.height;
	renderer.setSize(sizes.width, sizes.height);
});

//render loop
const loop = () => {
	controls.update();
	renderer.render(scene,camera);
	window.requestAnimationFrame(loop);
};
loop();

// GSAP animations
const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {z: 0, x: 0, y:0}, {z: 1, x:1, y:1});
tl.fromTo('nav', {y: '-100%'}, {y: '0%'});
tl.fromTo('.title', {opacity: 0}, {opacity: 1});
tl.fromTo('.orpheus', {x: '-110%'}, {x:'0%'});
tl.fromTo('.rocketFroggy', {x: '110%'}, {x:'0%'});


// Mouse Color Animation

let isDown = false;
let rgb = []; // red, green, blue => 0-255
window.addEventListener("mousedown", () => (isDown = true));
window.addEventListener("mouseup", () => (isDown = false));

window.addEventListener("mousemove", (e) => {
	if(isDown) {
		rgb = [
			Math.round((e.pageX / sizes.width) * 255), //red
			Math.round((e.pageY / sizes.height) * 255), //green
			100 //blue
		];
	}
	// animate sphere color
	let newColors = new THREE.Color(`rgb(${rgb.join(',')})`);
	gsap.to(mesh.material.color, {r: newColors.r, g: newColors.g, b: newColors.b});
});

// click events
let infoBtn = document.querySelector('.info');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.close-btn');
let isClicked = true;
infoBtn.addEventListener('click', () => {
	popup.classList.remove('hidden');
	popup.classList.add('fade-out');
	setTimeout(() => {
		popup.classList.remove('fade-out');
	}, 50);
	isClicked = !isClicked;
});

closeBtn.addEventListener('click', () => {
	popup.classList.add('fade-out');
	setTimeout(() => {
		popup.classList.add('hidden');
		popup.classList.remove('fade-out');
	}, 500);
})

