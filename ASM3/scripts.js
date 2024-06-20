let scene, camera, renderer, wheelGroup, font;
const names = [];
const addNameButton = document.getElementById('add-name');
const spinWheelButton = document.getElementById('spin-wheel');
const nameInput = document.getElementById('name-input');
const resultDiv = document.getElementById('result');

init();
animate();

addNameButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        nameInput.value = '';
        createWheel();
    }
});

spinWheelButton.addEventListener('click', spinWheel);

function init() {
    const container = document.getElementById('three-container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    wheelGroup = new THREE.Group();
    scene.add(wheelGroup);

    // Load font
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(loadedFont) {
        font = loadedFont;
    });
}

function createWheel() {
    if (!font) {
        alert("Font not loaded yet. Please try again in a moment.");
        return;
    }
    
    if (wheelGroup.children.length > 0) {
        wheelGroup.remove(...wheelGroup.children);
    }
    
    const numSegments = names.length;
    const segmentAngle = (2 * Math.PI) / numSegments;
    const radius = 3;
    
    // Create wheel segments
    for (let i = 0; i < numSegments; i++) {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.arc(0, 0, radius, i * segmentAngle, (i + 1) * segmentAngle, false);
        shape.lineTo(0, 0);
        
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${(i * 360) / numSegments}, 100%, 50%)`), side: THREE.DoubleSide });
        const segment = new THREE.Mesh(geometry, material);
        segment.rotation.x = -Math.PI / 2;
        wheelGroup.add(segment);
    }
    
    // Create text labels
    for (let i = 0; i < numSegments; i++) {
        const labelGeometry = new THREE.TextGeometry(names[i], {
            font: font,
            size: 0.3,
            height: 0.05,
        });
        const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
        
        const angle = i * segmentAngle + segmentAngle / 2;
        labelMesh.position.set(radius * Math.cos(angle) * 0.7, 0.1, radius * Math.sin(angle) * 0.7);
        labelMesh.rotation.x = -Math.PI / 2;
        labelMesh.rotation.z = -angle;
        wheelGroup.add(labelMesh);
    }
}

function spinWheel() {
    if (names.length === 0) return;

    // Play spinning sound
    const spinSound = document.getElementById('spin-sound');
    spinSound.play();

    const spinTime = 5000;
    const startTime = Date.now();
    const randomRotation = Math.random() * 2 * Math.PI;
    
    function animateSpin() {
        const elapsed = Date.now() - startTime;
        const angle = (elapsed / spinTime) * 10 * Math.PI + randomRotation;
        
        wheelGroup.rotation.y = angle;
        
        if (elapsed < spinTime) {
            requestAnimationFrame(animateSpin);
        } else {
            const winningSegmentIndex = Math.floor(((angle + Math.PI / 2) % (2 * Math.PI)) / ((2 * Math.PI) / names.length));
            const winningSegment = names[winningSegmentIndex];
            resultDiv.textContent = `Winner: ${winningSegment}`;
            
            // Highlight the winning segment
            const segments = wheelGroup.children.filter(child => child.isMesh && child.geometry.type === 'ShapeGeometry');
            segments[winningSegmentIndex].material.color.set(0xffff00); // Change color to yellow
        }
    }
    
    animateSpin();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
