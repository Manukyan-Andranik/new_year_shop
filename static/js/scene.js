/**
 * scene.js - Optimized for Low-End Devices with Beautiful Visuals
 * Manages all Three.js setup, objects, and the animation loop.
 */

// Detect device performance level
function detectPerformanceLevel() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 4;
  
  if (cores <= 2 || memory <= 2) return 'low';
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

const PERFORMANCE_LEVEL = detectPerformanceLevel();

const CONFIG = {
  colors: { 
    treeGreen: 0x1a4d2e,
    treeGreenDark: 0x0d2617,
    lightGold: 0xffd700,
    skyTop: 0x87CEEB,
    skyBottom: 0xe0e0e0,
    groundSnow: 0xffffff
  },
  pixelRatio: PERFORMANCE_LEVEL === 'low' ? 1 : Math.min(window.devicePixelRatio, 2),
  snowParticleCount: PERFORMANCE_LEVEL === 'low' ? 150 : PERFORMANCE_LEVEL === 'medium' ? 250 : 500,
  treeLightCount: PERFORMANCE_LEVEL === 'low' ? 25 : PERFORMANCE_LEVEL === 'medium' ? 30 : 50,
  enableShadows: PERFORMANCE_LEVEL === 'high',
  enableFog: PERFORMANCE_LEVEL !== 'low',
  geometryDetail: PERFORMANCE_LEVEL === 'low' ? 8 : 8,
  animationInterval: PERFORMANCE_LEVEL === 'low' ? 2 : 1,
};

let scene, camera, renderer, treeGroup, snowGeometry, speeds, starLight, treeStar;
let collectedToys = [];
let frameCount = 0;

// --- Core Setup ---
function initScene(container) {
  if (renderer && renderer.domElement && renderer.domElement.parentElement) {
    console.warn('Scene already initialized, returning existing scene functions');
    return { renderer, camera, treeGroup, isPointerOnTree, add3DToyToTree, removeToyMeshesFromScene, clearAllToysFromScene };
  }

  scene = new THREE.Scene();
  const FOG_COLOR = new THREE.Color(0xe0e0e0);
  
  if (CONFIG.enableFog) {
    scene.fog = new THREE.Fog(FOG_COLOR, 12, 28);
  }

  const { clientWidth: width, clientHeight: height } = container;
  
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 1.8, 9);
  camera.lookAt(0, 1, 0);

  renderer = new THREE.WebGLRenderer({ 
    antialias: PERFORMANCE_LEVEL !== 'low',
    alpha: false,
    powerPreference: PERFORMANCE_LEVEL === 'low' ? 'low-power' : 'default'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(CONFIG.pixelRatio);
  
  if (CONFIG.enableShadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  
  renderer.setClearColor(FOG_COLOR, 1);
  container.appendChild(renderer.domElement);

  addLights();
  addSky();
  addGround();
  addTree();
  addSnow();
  
  animate();

  window.addEventListener('resize', () => onWindowResize(container));

  return { renderer, camera, treeGroup, isPointerOnTree, add3DToyToTree, removeToyMeshesFromScene, clearAllToysFromScene };
}

// --- Scene Objects ---
function addLights() {
  // Enhanced lighting for all devices
  if (PERFORMANCE_LEVEL === 'low') {
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    // Soft directional light without shadows for better depth
    const softLight = new THREE.DirectionalLight(0xfff5e1, 0.5);
    softLight.position.set(3, 8, 5);
    scene.add(softLight);
    // Subtle rim light
    const rimLight = new THREE.DirectionalLight(0xd1e8ff, 0.2);
    rimLight.position.set(-2, 3, -5);
    scene.add(rimLight);
  } else {
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xfff5e1, 0.8);
    keyLight.position.set(5, 10, 6);
    
    if (CONFIG.enableShadows) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
    }
    
    scene.add(keyLight);
    scene.add(new THREE.DirectionalLight(0xd1e8ff, 0.4));
  }
}

function addSky() {
  // Beautiful gradient sky for all devices
  const skyGeo = new THREE.SphereGeometry(100, 16, PERFORMANCE_LEVEL === 'low' ? 12 : 8);
  const skyMat = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(CONFIG.colors.skyTop) },
      bottomColor: { value: new THREE.Color(CONFIG.colors.skyBottom) },
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

function addStars() {
  const starGeo = new THREE.BufferGeometry();
  const starCount = 200;
  const positions = new Float32Array(starCount * 3);
  
  for (let i = 0; i < starCount; i++) {
    const radius = 50 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 0.7 + 0.3); // Upper hemisphere bias
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.15,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  
  scene.add(new THREE.Points(starGeo, starMat));
}

function addGround() {
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(15, 32),
    new THREE.MeshStandardMaterial({ 
      color: CONFIG.colors.groundSnow,
      roughness: 0.8,
      metalness: 0.1
    })
  );
  ground.rotation.x = -Math.PI / 2;
  
  if (CONFIG.enableShadows) {
    ground.receiveShadow = true;
  }
  
  ground.position.y = -1.7;
  scene.add(ground);
}

function addTree() {
  treeGroup = new THREE.Group();
  treeGroup.position.y = -1.7;
  
  const treeMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.colors.treeGreen,
    roughness: 0.7
  });

  for (let i = 0; i < 5; i++) {
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(1.5 - i * 0.25, 1.2, CONFIG.geometryDetail),
      treeMaterial
    );
    cone.position.y = i * 0.7;
    
    if (CONFIG.enableShadows) {
      cone.castShadow = true;
      cone.receiveShadow = true;
    }
    
    treeGroup.add(cone);
  }

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, 0.8, CONFIG.geometryDetail),
    new THREE.MeshStandardMaterial({ 
      color: 0x734a2f,
      roughness: 0.9
    })
  );
  trunk.position.y = -0.4;
  
  if (CONFIG.enableShadows) {
    trunk.castShadow = true;
  }
  
  treeGroup.add(trunk);
  
  addTreeStar();
  addTreeLights(CONFIG.treeLightCount);

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
  const extrudeSettings = { 
    depth: 0.05, 
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01
  };
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

  if (PERFORMANCE_LEVEL !== 'low') {
    starLight = new THREE.PointLight(0xFFD700, 1.5, 6);
    starLight.position.set(0, 3.5, 0);
    treeGroup.add(starLight);
  }

  // Rotation animation
  if (typeof gsap !== 'undefined') {
    gsap.to(treeStar.rotation, { 
      y: Math.PI * 2, 
      duration: 5,
      repeat: -1,
      ease: "none"
    });
  }
}

function addTreeLights(count) {
  const colors = [0xff0000, 0xffff00, 0x0000ff];
  
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length];
    const bulbGeo = new THREE.SphereGeometry(0.03, 6, 6);
    const bulbMat = new THREE.MeshStandardMaterial({ 
      color, 
      emissive: color,
      emissiveIntensity: 1.5
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    
    if (PERFORMANCE_LEVEL !== 'low') {
      const light = new THREE.PointLight(color, 0.6, 2);
      bulb.add(light);
    }
    
    const angle = Math.random() * Math.PI * 2;
    const yPos = Math.random() * 2.5 + 0.5;
    const radius = 1.2 - yPos * 0.35;
    bulb.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
    treeGroup.add(bulb);
  }
}

function createSnowDataURL(size = 32) {
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
  frameCount++;
  
  // Skip frames on low-end devices
  if (frameCount % CONFIG.animationInterval !== 0) {
    renderer.render(scene, camera);
    return;
  }
  
  t += 0.016 * CONFIG.animationInterval;

  animateSnow();
  
  // Slower tree rotation on low-end
  treeGroup.rotation.y += PERFORMANCE_LEVEL === 'low' ? 0.005 : 0.01;
  
  // Star animation
  if (starLight && PERFORMANCE_LEVEL !== 'low') {
    const shimmer = Math.sin(t * 3) * 0.5 + 0.8;
    starLight.intensity = shimmer;
    treeStar.scale.set(shimmer, shimmer, shimmer);
  }
  
  // Toy animation - only on medium/high performance
  if (PERFORMANCE_LEVEL !== 'low') {
    collectedToys.forEach((entry, i) => {
      entry.mesh.rotation.x = Math.sin(t * 1.5 + i) * 0.1;
      entry.mesh.rotation.z = Math.cos(t * 1.5 + i) * 0.1;
    });
  }

  renderer.render(scene, camera);
}

function onWindowResize(container) {
  const { clientWidth: width, clientHeight: height } = container;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

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
  const texture = textureLoader.load(product.images_url_list[1]);
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
  
  if (CONFIG.enableShadows) {
    toyMesh.castShadow = true;
  }
  
  treeGroup.add(toyMesh);
  collectedToys.push({ mesh: toyMesh, productId: product.id });

  toyMesh.scale.set(0.001, 0.001, 0.001);

  if (typeof gsap !== 'undefined') {
    gsap.to(toyMesh.scale, { 
      x: 0.5, y: 0.5, z: 0.5,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)'
    });
  } else {
    toyMesh.scale.set(0.5, 0.5, 0.5);
  }

  return toyMesh;
}

function removeToyMeshesFromScene(productId, count) {
  for (let i = collectedToys.length - 1; i >= 0 && count > 0; i--) {
    if (collectedToys[i].productId === productId) {
      const entry = collectedToys.splice(i, 1)[0];
      
      if (typeof gsap !== 'undefined') {
        gsap.to(entry.mesh.scale, { 
          x: 0.01, y: 0.01, z: 0.01,
          duration: 0.35,
          ease: 'power1.in',
          onComplete: () => treeGroup.remove(entry.mesh)
        });
      } else {
        treeGroup.remove(entry.mesh);
      }
      
      count--;
    }
  }
}

function clearAllToysFromScene() {
  if (typeof gsap !== 'undefined') {
    collectedToys.forEach(t => gsap.to(t.mesh.scale, { 
      x: 0, y: 0, z: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => treeGroup.remove(t.mesh)
    }));
  } else {
    collectedToys.forEach(t => treeGroup.remove(t.mesh));
  }
  collectedToys.length = 0;
}