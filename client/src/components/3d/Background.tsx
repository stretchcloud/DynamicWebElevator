import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const particlesMeshRef = useRef<THREE.Points>();
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup with enhanced FOV for better depth perception
    const camera = new THREE.PerspectiveCamera(
      85,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup with improved settings
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
      
      // Velocity
      velocityArray[i] = (Math.random() - 0.5) * 0.02;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.02;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: '#5B8FB9',
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesMeshRef.current = particlesMesh;
    scene.add(particlesMesh);

    // Mouse movement handler
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationRef.current.x = mouseRef.current.y * 0.5;
      targetRotationRef.current.y = mouseRef.current.x * 0.5;
    };

    // Zoom handler
    const onScroll = (event: WheelEvent) => {
      const newZ = camera.position.z + event.deltaY * 0.005;
      camera.position.z = THREE.MathUtils.clamp(newZ, 3, 10);
    };

    // Interactive animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (particlesMeshRef.current && cameraRef.current) {
        // Smooth camera rotation
        particlesMeshRef.current.rotation.x += (targetRotationRef.current.x - particlesMeshRef.current.rotation.x) * 0.05;
        particlesMeshRef.current.rotation.y += (targetRotationRef.current.y - particlesMeshRef.current.rotation.y) * 0.05;

        // Update particle positions
        const positions = particlesMeshRef.current.geometry.attributes.position;
        const velocities = particlesMeshRef.current.geometry.attributes.velocity;

        for (let i = 0; i < positions.count * 3; i += 3) {
          positions.array[i] += (velocities.array[i] as number);
          positions.array[i + 1] += (velocities.array[i + 1] as number);
          positions.array[i + 2] += (velocities.array[i + 2] as number);

          // Boundary check
          if (Math.abs(positions.array[i]) > 7.5) velocities.array[i] *= -1;
          if (Math.abs(positions.array[i + 1]) > 7.5) velocities.array[i + 1] *= -1;
          if (Math.abs(positions.array[i + 2]) > 7.5) velocities.array[i + 2] *= -1;
        }

        positions.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onScroll);

    // Handle window resize
    const onResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onScroll);
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
      className="fixed inset-0 -z-10"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    />
  );
};
