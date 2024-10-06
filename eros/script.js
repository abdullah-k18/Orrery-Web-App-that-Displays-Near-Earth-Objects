const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('../textures/bg.jpg');
const backgroundGeometry = new THREE.SphereGeometry(500, 64, 64);
const backgroundMaterial = new THREE.MeshBasicMaterial({
    map: backgroundTexture,
    side: THREE.BackSide  
});
const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundMesh);

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.set(-10, 20, 0);
camera.lookAt(0, 0, 0);

const loader = new THREE.GLTFLoader();
loader.load('../models/eros.glb', (gltf) => {
    const erosModel = gltf.scene;

    const box = new THREE.Box3().setFromObject(erosModel);
    const size = box.getSize(new THREE.Vector3());
    const desiredSize = 10;
    const scaleFactor = desiredSize / Math.max(size.x, size.y, size.z);
    erosModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

    erosModel.position.set(0, 0, 0);
    scene.add(erosModel);
}, undefined, (error) => {
    console.error('An error occurred while loading the Eros model:', error);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
