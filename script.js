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
const backgroundTexture = textureLoader.load('textures/bg.jpg');
const backgroundGeometry = new THREE.SphereGeometry(500, 64, 64);
const backgroundMaterial = new THREE.MeshBasicMaterial({
    map: backgroundTexture,
    side: THREE.BackSide
});
const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundMesh);

const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.padding = '5px';
tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
tooltip.style.color = 'white';
tooltip.style.borderRadius = '5px';
tooltip.style.display = 'none';
tooltip.style.pointerEvents = 'none';
document.body.appendChild(tooltip);

const sunTexture = textureLoader.load('textures/sun.jpg');
const mercuryTexture = textureLoader.load('textures/mercury.jpg');
const venusTexture = textureLoader.load('textures/venus.jpg');
const earthTexture = textureLoader.load('textures/earth.jpg');
const moonTexture = textureLoader.load('textures/moon.jpg');
const marsTexture = textureLoader.load('textures/mars.jpg');
const jupiterTexture = textureLoader.load('textures/jupiter.jpg');
const saturnTexture = textureLoader.load('textures/saturn.jpg');
const saturnRingTexture = textureLoader.load('textures/ring.png');
const uranusTexture = textureLoader.load('textures/uranus.jpg');
const neptuneTexture = textureLoader.load('textures/neptune.jpg');
const plutoTexture = textureLoader.load('textures/pluto.jpg');
const ceresTexture = textureLoader.load('textures/ceres.jpg');
const haumeaTexture = textureLoader.load('textures/haumea.jpg');
const makemakeTexture = textureLoader.load('textures/makemake.jpg');
const erisTexture = textureLoader.load('textures/eris.jpg');

function createTexturedPlanet(size, texture, position) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(position, 0, 0);

    const orbit = new THREE.Object3D();
    orbit.add(planet);
    scene.add(orbit);

    return { planet, orbit };
}

function createEllipsoidPlanet(sizeX, sizeY, sizeZ, texture, position) {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    geometry.scale(sizeX, sizeY, sizeZ);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(position, 0, 0);

    const orbit = new THREE.Object3D();
    orbit.add(planet);
    scene.add(orbit);

    return { planet, orbit };
}

const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const sunPositionXOffset = -1;
sun.position.set(sunPositionXOffset, 0, 0);

const mercuryOrbitOffset = 0.5;
const venusOrbitPositionXOffset = -1;

const mercury = createTexturedPlanet(0.5, mercuryTexture, 5 + mercuryOrbitOffset);
const venus = createTexturedPlanet(0.7, venusTexture, 8);
const earth = createTexturedPlanet(0.9, earthTexture, 12);
const moon = createTexturedPlanet(0.3, moonTexture, 1.5);
const mars = createTexturedPlanet(0.6, marsTexture, 15);
const ceres = createTexturedPlanet(0.3, ceresTexture, 17);
const jupiter = createTexturedPlanet(1.2, jupiterTexture, 20);
const saturn = createTexturedPlanet(1.1, saturnTexture, 25);
const uranus = createTexturedPlanet(1, uranusTexture, 30);
const neptune = createTexturedPlanet(0.8, neptuneTexture, 35);
const pluto = createTexturedPlanet(0.4, plutoTexture, 40);
const haumea = createEllipsoidPlanet(0.5, 0.3, 0.3, haumeaTexture, 45);
const makemake = createTexturedPlanet(0.4, makemakeTexture, 50);
const eris = createTexturedPlanet(0.5, erisTexture, 55);

earth.planet.add(moon.planet);
moon.planet.position.set(2, 0, 0);

function createOrbit(radius, planetName) {
    const orbitGeometry = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    orbit.userData = { name: planetName };
    scene.add(orbit);
    return orbit;
}

const orbits = [];
orbits.push(createOrbit(5 + mercuryOrbitOffset, 'Mercury'));
orbits.push(createOrbit(8, 'Venus'));
orbits.push(createOrbit(12, 'Earth'));
orbits.push(createOrbit(15, 'Mars'));
orbits.push(createOrbit(17, 'Ceres'));
orbits.push(createOrbit(20, 'Jupiter'));
orbits.push(createOrbit(25, 'Saturn'));
orbits.push(createOrbit(30, 'Uranus'));
orbits.push(createOrbit(35, 'Neptune'));
orbits.push(createOrbit(40, 'Pluto'));
orbits.push(createOrbit(45, 'Haumea'));
orbits.push(createOrbit(50, 'Makemake'));
orbits.push(createOrbit(55, 'Eris'));

function createSaturnRing(innerRadius, outerRadius, texture) {
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.y = Math.PI / 2;
    return ring;
}

const saturnRing = createSaturnRing(1.5, 2, saturnRingTexture);
saturnRing.position.set(25, 0, 0);
saturn.orbit.add(saturnRing);

const loader = new THREE.GLTFLoader();

loader.load('models/eros.glb', (gltf) => {
    const erosModel = gltf.scene;

    const box = new THREE.Box3().setFromObject(erosModel);
    const size = box.getSize(new THREE.Vector3());

    const desiredSize = 1;
    const scaleFactor = desiredSize / Math.max(size.x, size.y, size.z);
    erosModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

    erosModel.position.set(13.5, 0, 0);

    scene.add(erosModel);
}, undefined, (error) => {
    console.error('An error happened while loading the Eros model:', error);
});

loader.load('models/bennu.glb', (gltf) => {
    const bennuModel = gltf.scene;

    const box = new THREE.Box3().setFromObject(bennuModel);
    const size = box.getSize(new THREE.Vector3());

    const desiredSize = 1;
    const scaleFactor = desiredSize / Math.max(size.x, size.y, size.z);
    bennuModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

    bennuModel.position.set(-10, 0, 0);
    scene.add(bennuModel);
}, undefined, (error) => {
    console.error('An error happened while loading the Bennu model:', error);
});

loader.load('models/itokawa.glb', (gltf) => {
    const itokawaModel = gltf.scene;

    const box = new THREE.Box3().setFromObject(itokawaModel);
    const size = box.getSize(new THREE.Vector3());

    const desiredSize = 1;
    const scaleFactor = desiredSize / Math.max(size.x, size.y, size.z);
    itokawaModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

    itokawaModel.position.set(18, 0, 0);
    scene.add(itokawaModel);
}, undefined, (error) => {
    console.error('An error happened while loading the Itokawa model:', error);
});

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.set(0, 80, 0);
camera.lookAt(0, 0, 0);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const celestialBodies = [sun, mercury.planet, venus.planet, earth.planet, moon.planet, mars.planet, ceres.planet, jupiter.planet, saturn.planet, uranus.planet, neptune.planet, pluto.planet, haumea.planet, makemake.planet, eris.planet];

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(celestialBodies);

    if (intersects.length > 0) {
        const hoveredBody = intersects[0].object;
        tooltip.style.display = 'block';
        tooltip.style.left = event.clientX + 10 + 'px';
        tooltip.style.top = event.clientY + 10 + 'px';
        tooltip.innerHTML = hoveredBody.userData.name || 'Unknown Body';

        document.body.style.cursor = 'pointer';
    } else {
        tooltip.style.display = 'none';
        document.body.style.cursor = 'default';
    }
});

const toggleOrbitsButton = document.getElementById('toggleOrbitsButton');
const toggleOrbitsIcon = document.getElementById('toggleOrbitsIcon');

const hideOrbitsIconPath = 'icons/remove.svg';
const showOrbitsIconPath = 'icons/show.svg';

let orbitsVisible = true;

toggleOrbitsButton.addEventListener('click', () => {
    orbitsVisible = !orbitsVisible;

    orbits.forEach(orbit => {
        orbit.visible = orbitsVisible;
    });

    toggleOrbitsIcon.src = orbitsVisible ? hideOrbitsIconPath : showOrbitsIconPath;
    toggleOrbitsButton.title = orbitsVisible ? 'Remove Orbits' : 'Show Orbits';
});

let isPaused = false;

const pausePlayButton = document.getElementById('pausePlayButton');
const playPauseIcon = document.getElementById('playPauseIcon');

const pauseIconPath = 'icons/pause.svg';
const playIconPath = 'icons/play.svg';

pausePlayButton.addEventListener('click', () => {
    isPaused = !isPaused;
    playPauseIcon.src = isPaused ? playIconPath : pauseIconPath;
    playPauseIcon.title = isPaused ? 'Play Animation' : 'Pause Animation';
});

function animate() {
    requestAnimationFrame(animate);

    if (!isPaused) {
        mercury.orbit.rotation.y += 0.01;
        venus.orbit.rotation.y += 0.009;
        earth.orbit.rotation.y += 0.008;
        mars.orbit.rotation.y += 0.007;
        ceres.orbit.rotation.y += 0.00425;
        jupiter.orbit.rotation.y += 0.00275;
        saturn.orbit.rotation.y += 0.002375;
        uranus.orbit.rotation.y += 0.0017;
        neptune.orbit.rotation.y += 0.00135;
        pluto.orbit.rotation.y += 0.0012;
        haumea.orbit.rotation.y += 0.00115;
        makemake.orbit.rotation.y += 0.0011;
        eris.orbit.rotation.y += 0.0009;

        mercury.planet.rotation.y += 0.03;
        venus.planet.rotation.y += 0.03;
        earth.planet.rotation.y += 0.03;
        moon.planet.rotation.y += 0.03;
        mars.planet.rotation.y += 0.03;
        ceres.planet.rotation.y += 0.03;
        jupiter.planet.rotation.y += 0.03;
        saturn.planet.rotation.y += 0.03;
        saturnRing.rotation.y += 0.03;
        uranus.planet.rotation.y += 0.03;
        neptune.planet.rotation.y += 0.03;
        pluto.planet.rotation.y += 0.03;
        haumea.planet.rotation.y += 0.03;
        makemake.planet.rotation.y += 0.03;
        eris.planet.rotation.y += 0.03;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

sun.userData = { name: 'Sun' };
mercury.planet.userData = { name: 'Mercury' };
venus.planet.userData = { name: 'Venus' };
earth.planet.userData = { name: 'Earth' };
moon.planet.userData = { name: 'Moon' };
mars.planet.userData = { name: 'Mars' };
ceres.planet.userData = { name: 'Ceres' };
jupiter.planet.userData = { name: 'Jupiter' };
saturn.planet.userData = { name: 'Saturn' };
uranus.planet.userData = { name: 'Uranus' };
neptune.planet.userData = { name: 'Neptune' };
pluto.planet.userData = { name: 'Pluto' };
haumea.planet.userData = { name: 'Haumea' };
makemake.planet.userData = { name: 'Makemake' };
eris.planet.userData = { name: 'Eris' };

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});