/**
 * scene.js
 * Manages all Three.js setup, objects, and the animation loop.
 */

const CONFIG = {
  colors: { treeGreen: 0x1a4d2e, lightGold: 0xffd700 },
  pixelRatio: Math.min(window.devicePixelRatio, 2),
  snowParticleCount: 500
};

let scene, camera, renderer, treeGroup, snowGeometry, speeds, starLight, treeStar;
let collectedToys = []; // Keep track of 3D toy meshes

// --- Core Setup ---
function initScene(container) {
  // Prevent duplicate initialization
  if (renderer && renderer.domElement && renderer.domElement.parentElement) {
    console.warn('Scene already initialized, returning existing scene functions');
    return { renderer, camera, treeGroup, isPointerOnTree, add3DToyToTree, removeToyMeshesFromScene, clearAllToysFromScene };
  }

  scene = new THREE.Scene();
  const FOG_COLOR = new THREE.Color(0xe0e0e0);
  scene.fog = new THREE.Fog(FOG_COLOR, 12, 28);

  const { clientWidth: width, clientHeight: height } = container;
  
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 1.8, 9);
  camera.lookAt(0, 1, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(width, height);
  renderer.setPixelRatio(CONFIG.pixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(FOG_COLOR, 1);
  container.appendChild(renderer.domElement);

  addLights();
  addSky();
  addGround();
  addTree();
  addSnow();
  
  // Start the animation loop
  animate();

  // Handle resizing
  window.addEventListener('resize', () => onWindowResize(container));

  return { renderer, camera, treeGroup, isPointerOnTree, add3DToyToTree, removeToyMeshesFromScene, clearAllToysFromScene };
}

// --- Scene Objects ---
function addLights() {
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const keyLight = new THREE.DirectionalLight(0xfff5e1, 0.8);
  keyLight.position.set(5, 10, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  scene.add(keyLight);
  scene.add(new THREE.DirectionalLight(0xd1e8ff, 0.4));
}

function addSky() {
    const skyGeo = new THREE.SphereGeometry(100, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x87CEEB) },
        bottomColor: { value: new THREE.Color(0xe0e0e0) },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), 0.7), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(skyGeo, skyMat));
}

function addGround() {
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(15, 32),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0.1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.position.y = -1.7;
  scene.add(ground);
}

function addTree() {
  treeGroup = new THREE.Group();
  treeGroup.position.y = -1.7;
  const treeMaterial = new THREE.MeshStandardMaterial({ color: CONFIG.colors.treeGreen, roughness: 0.7 });

  for (let i = 0; i < 5; i++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.5 - i * 0.25, 1.2, 8), treeMaterial);
    cone.position.y = i * 0.7;
    cone.castShadow = true;
    cone.receiveShadow = true;
    treeGroup.add(cone);
  }

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0x734a2f }));
  trunk.position.y = -0.4;
  trunk.castShadow = true;
  treeGroup.add(trunk);
  
  addTreeStar();
  addTreeLights(50);

  scene.add(treeGroup);
}

function createStarShape(points = 5, innerRadius = 0.1, outerRadius = 0.2) {
  const shape = new THREE.Shape();
  const step = Math.PI / points;
  for (let i = 0; i < 2 * points; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(i * step) * radius;
    const y = Math.sin(i * step) * radius;
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
}

function addTreeStar() {
    const starShape = createStarShape();
    const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01 };
    const starGeo = new THREE.ExtrudeGeometry(starShape, extrudeSettings);

    const starMat = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 1.2,
      metalness: 0.6,
      roughness: 0.3
    });

    treeStar = new THREE.Mesh(starGeo, starMat);
    treeStar.position.set(0, 3.5, 0);
    treeStar.scale.set(2, 2, 1);
    treeGroup.add(treeStar);

    starLight = new THREE.PointLight(0xFFD700, 1.5, 6);
    starLight.position.set(0, 3.5, 0);
    treeGroup.add(starLight);

    gsap.to(treeStar.rotation, { y: Math.PI * 2, duration: 5, repeat: -1, ease: "none" });
}

function addTreeLights(count) {
    const colors = [0xff0000, 0xffff00, 0x0000ff];
    for (let i = 0; i < count; i++) {
        const color = colors[i % colors.length];
        const bulbGeo = new THREE.SphereGeometry(0.03, 8, 8);
        const bulbMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.5 });
        const bulb = new THREE.Mesh(bulbGeo, bulbMat);
        const light = new THREE.PointLight(color, 0.6, 2);
        bulb.add(light);
        
        const angle = Math.random() * Math.PI * 2;
        const yPos = Math.random() * 2.5 + 0.5;
        const radius = 1.2 - yPos * 0.35;
        bulb.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
        treeGroup.add(bulb);
    }
}

function createSnowDataURL(size = 64) {
  const c = document.createElement('canvas'); 
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)'); 
  g.addColorStop(0.2, 'rgba(255,255,255,0.8)'); 
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; 
  ctx.fillRect(0, 0, size, size);
  return c.toDataURL();
}

function addSnow() {
  snowGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(CONFIG.snowParticleCount * 3);
  speeds = new Float32Array(CONFIG.snowParticleCount);

  for (let i = 0; i < CONFIG.snowParticleCount; i++) {
    positions[3 * i] = (Math.random() - 0.5) * 25;
    positions[3 * i + 1] = Math.random() * 15;
    positions[3 * i + 2] = (Math.random() - 0.5) * 25;
    speeds[i] = Math.random() * 0.03 + 0.01;
  }
  snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const snowMaterial = new THREE.PointsMaterial({
    size: 0.25, 
    map: new THREE.TextureLoader().load(createSnowDataURL()), 
    transparent: true, 
    opacity: 0.9, 
    depthWrite: false, 
    blending: THREE.AdditiveBlending
  });
  scene.add(new THREE.Points(snowGeometry, snowMaterial));
}

// --- Interaction & Animation ---

function animateSnow() {
  const p = snowGeometry.attributes.position.array;
  for (let i = 0; i < CONFIG.snowParticleCount; i++) {
    const y = 3 * i + 1;
    p[y] -= speeds[i];
    if (p[y] < -2) {
      p[y] = 15;
      p[3 * i + 0] = (Math.random() - 0.5) * 25;
      p[3 * i + 2] = (Math.random() - 0.5) * 25;
    }
  }
  snowGeometry.attributes.position.needsUpdate = true;
}

let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.016;

  // Update objects
  animateSnow();
  treeGroup.rotation.y += 0.001;
  
  const shimmer = Math.sin(t * 3) * 0.5 + 0.8;
  starLight.intensity = shimmer;
  treeStar.scale.set(shimmer, shimmer, shimmer);
  
  collectedToys.forEach((entry, i) => {
    entry.mesh.rotation.x = Math.sin(t * 1.5 + i) * 0.1;
    entry.mesh.rotation.z = Math.cos(t * 1.5 + i) * 0.1;
  });

  renderer.render(scene, camera);
}

function onWindowResize(container) {
  const { clientWidth: width, clientHeight: height } = container;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Raycasting to detect clicks on the tree
function isPointerOnTree(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    const pointerVec = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -(((clientY - rect.top) / rect.height) * 2 - 1)
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointerVec, camera);
    return raycaster.intersectObjects(treeGroup.children, true).length > 0;
}


function createToyFromPNG(product) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(product.images_url_list[0]);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.01, 0.01, 0.5);
  return sprite;
}

// --- Public Functions ---
function add3DToyToTree(product) {
  const toyMesh = createToyFromPNG(product);
  const angle = Math.random() * Math.PI * 2;
  const yPos = Math.random() * 2.5 + 0.5;
  const radius = 1.3 - (yPos * 0.3);
  toyMesh.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
  toyMesh.rotation.y = Math.random() * Math.PI * 2;
  toyMesh.castShadow = true;
  treeGroup.add(toyMesh);
  collectedToys.push({ mesh: toyMesh, productId: product.id });

  // Start small
  toyMesh.scale.set(0.001, 0.001, 0.001);

  // Animate to half the original size
  gsap.to(toyMesh.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 0.6, ease: 'elastic.out(1, 0.5)' });

  return toyMesh;
}

function removeToyMeshesFromScene(productId, count) {
    for (let i = collectedToys.length - 1; i >= 0 && count > 0; i--) {
        if (collectedToys[i].productId === productId) {
            const entry = collectedToys.splice(i, 1)[0];
            gsap.to(entry.mesh.scale, { 
                x: 0.01, y: 0.01, z: 0.01, 
                duration: 0.35, 
                ease: 'power1.in', 
                onComplete: () => treeGroup.remove(entry.mesh) 
            });
            count--;
        }
    }
}

function clearAllToysFromScene() {
    collectedToys.forEach(t => gsap.to(t.mesh.scale, { 
        x: 0, y: 0, z: 0, 
        duration: 0.5, 
        ease: 'power2.in', 
        onComplete: () => treeGroup.remove(t.mesh) 
    }));
    collectedToys.length = 0;
}