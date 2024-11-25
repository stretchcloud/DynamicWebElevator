import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const gridRef = useRef<THREE.Group>();
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    camera.position.y = 5;
    camera.rotation.x = -0.3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Grid setup
    const gridGroup = new THREE.Group();
    gridRef.current = gridGroup;

    // Create horizontal grid lines
    const gridSize = 40;
    const gridDivisions = 20;
    const gridStep = gridSize / gridDivisions;

    // Material for grid lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#5B8FB9'),
      transparent: true,
      opacity: 0.5,
    });

    // Create horizontal lines
    for (let i = -gridSize/2; i <= gridSize/2; i += gridStep) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize/2, 0, i),
        new THREE.Vector3(gridSize/2, 0, i),
      ]);
      const line = new THREE.Line(geometry, lineMaterial);
      gridGroup.add(line);
    }

    // Create vertical lines
    for (let i = -gridSize/2; i <= gridSize/2; i += gridStep) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, 0, -gridSize/2),
        new THREE.Vector3(i, 0, gridSize/2),
      ]);
      const line = new THREE.Line(geometry, lineMaterial);
      gridGroup.add(line);
    }

    scene.add(gridGroup);

    // Mouse movement handler
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (gridRef.current) {
        // Subtle floating animation
        gridRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.2;
        // Subtle rotation based on mouse position
        gridRef.current.rotation.x = mouseRef.current.y * 0.1;
        gridRef.current.rotation.y = mouseRef.current.x * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const onResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-10 bg-gradient-to-b from-background/50 to-background"
    />
  );
};
