import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ASSETS } from '../config/assets';
import { soundManager } from '../utils/audioSynth';
import { 
  Play, 
  Square, 
  Lightbulb, 
  LightbulbOff, 
  MapPin, 
  Sparkles, 
  Wind, 
  Gauge, 
  Box, 
  Upload, 
  Info, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Maximize2,
  X,
  RotateCcw
} from 'lucide-react';

interface HeroFerrari3DProps {
  onExploreWork: () => void;
  onOpenConsultation: () => void;
}

export const HeroFerrari3D: React.FC<HeroFerrari3DProps> = ({
  onExploreWork,
  onOpenConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Slide state: 1 (Ferrari 458 Itali) | 2 (Ferrari 488 Pista)
  const [activeSlide, setActiveSlide] = useState<1 | 2>(1);

  // Headlights state (Ánh đèn chiếu từ 2 đèn xe - có nút bật tắt)
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);

  // Zen mode: Ẩn chữ để không đè lên xe
  const [zenMode, setZenMode] = useState<boolean>(false);

  // 3D Model Modal / Guide
  const [is3DGuideOpen, setIs3DGuideOpen] = useState<boolean>(false);

  // 3D Loading Status
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const [modelLoadingError, setModelLoadingError] = useState<string | null>(null);
  const [modelSource, setModelSource] = useState<string>('default');

  // Audio 5s playing state: null | 1 | 2
  const [playingTrack, setPlayingTrack] = useState<null | 1 | 2>(null);
  const [trackCountdown, setTrackCountdown] = useState<number>(5);

  // Parallax tracking for 2D slide
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const [carTranslate, setCarTranslate] = useState({ x: 0, y: 0, scale: 1.02 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Three.js References for Slide 2 Real 3D Experience
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    carModelGroup: THREE.Group;
    keyLight: THREE.DirectionalLight;
    headlightLeft: THREE.SpotLight;
    headlightRight: THREE.SpotLight;
    headlightLeftTarget: THREE.Object3D;
    headlightRightTarget: THREE.Object3D;
    floor: THREE.Mesh;
    animFrameId: number;
  } | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax lerp for background layers
  useEffect(() => {
    if (isMobile) return;
    let animId: number;

    const tick = () => {
      const factor = 0.04;
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * factor;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * factor;

      const mx = mouseCurrent.current.x;
      const my = mouseCurrent.current.y;

      setCarTranslate({
        x: -mx * 12,
        y: -my * 8,
        scale: 1.02,
      });

      // Subtle camera nudging in 3D scene if Slide 2 is active
      if (threeRef.current && activeSlide === 2) {
        const { camera } = threeRef.current;
        const targetX = 4.5 + mx * 0.8;
        const targetY = 1.6 - my * 0.5;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY - camera.position.y) * 0.03;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isMobile, activeSlide]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseTarget.current = { x, y };
  }, [isMobile]);

  // Headlights toggle with audio feedback
  const toggleHeadlights = () => {
    const nextState = !headlightsOn;
    setHeadlightsOn(nextState);
    soundManager.playHeadlightsClick(nextState);

    // Update Three.js headlights if present
    if (threeRef.current) {
      const { headlightLeft, headlightRight } = threeRef.current;
      headlightLeft.intensity = nextState ? 18 : 0;
      headlightRight.intensity = nextState ? 18 : 0;
    }
  };

  // Play Track 1 (5s): Ferrari V8 Launch & Acceleration
  const handlePlayTrack1 = () => {
    if (playingTrack === 1) {
      soundManager.stop5sTrack();
      setPlayingTrack(null);
      return;
    }

    setPlayingTrack(1);
    setTrackCountdown(5);

    const interval = setInterval(() => {
      setTrackCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    soundManager.playTrack1Launch5s(() => {
      clearInterval(interval);
      setPlayingTrack(null);
    });
  };

  // Play Track 2 (5s): High-RPM Flyby / Động cơ gầm
  const handlePlayTrack2 = () => {
    if (playingTrack === 2) {
      soundManager.stop5sTrack();
      setPlayingTrack(null);
      return;
    }

    setPlayingTrack(2);
    setTrackCountdown(5);

    const interval = setInterval(() => {
      setTrackCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    soundManager.playTrack2Flyby5s(() => {
      clearInterval(interval);
      setPlayingTrack(null);
    });
  };

  // Switch Slide
  const switchSlide = (slide: 1 | 2) => {
    if (slide === activeSlide) return;
    soundManager.playClick(600, 0.05, 0.08);
    setActiveSlide(slide);
  };

  // Function to load GLTF / GLB model into the 3D scene
  const loadCarModel = useCallback((urlOrBuffer: string | ArrayBuffer) => {
    if (!threeRef.current) return;
    const { scene, carModelGroup } = threeRef.current;

    setModelLoadingError(null);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);

    const onLoad = (gltf: any) => {
      // Clear previous models in the group
      while (carModelGroup.children.length > 0) {
        carModelGroup.remove(carModelGroup.children[0]);
      }

      const model = gltf.scene || gltf.scenes[0];

      // Auto-center and normalize scale
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Re-center model
      model.position.x = -center.x;
      model.position.y = -box.min.y;
      model.position.z = -center.z;

      // Scale to approx 4.6m length (car scale)
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetScale = 4.8 / maxDim;
      carModelGroup.scale.setScalar(targetScale);

      // Configure materials for luxury PBR car paint
      model.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.envMapIntensity = 1.4;
            // If body paint material, enhance metalness & clearcoat
            if (
              child.material.name?.toLowerCase().includes('paint') ||
              child.material.name?.toLowerCase().includes('body') ||
              child.material.name?.toLowerCase().includes('car')
            ) {
              child.material.metalness = Math.max(0.65, child.material.metalness || 0.7);
              child.material.roughness = Math.min(0.2, child.material.roughness || 0.15);
            }
          }
        }
      });

      // Default presentation angle: 3/4 front view
      carModelGroup.rotation.y = -Math.PI / 6;
      carModelGroup.add(model);
      setModelLoaded(true);
      dracoLoader.dispose();
    };

    const onError = (error: any) => {
      console.warn('Could not load 3D GLB model from:', urlOrBuffer, error);
      setModelLoaded(false);
      setModelLoadingError(
        'Chưa tìm thấy file model thực tế tại public/models/ferrari-488-pista.glb. Bạn có thể kéo thả trực tiếp file .glb tải từ Sketchfab vào đây.'
      );
    };

    if (typeof urlOrBuffer === 'string') {
      loader.load(urlOrBuffer, onLoad, undefined, onError);
    } else {
      loader.parse(urlOrBuffer, '', onLoad, onError);
    }
  }, []);

  // Handle direct file drag & drop or file selection of .glb
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundManager.playClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      if (buffer) {
        setModelSource(file.name);
        loadCarModel(buffer);
        setIs3DGuideOpen(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Initialize Three.js Studio Scene for 3D View (Slide 2)
  useEffect(() => {
    if (!canvasRef.current || isMobile) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    // Studio Environment map for realistic PBR metal and gloss reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Camera: 3/4 front perspective, slightly low angle
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(4.5, 1.6, 5.8);

    // OrbitControls with bounded rotation so the car is always in a gorgeous composition
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.8;
    controls.maxDistance = 11.0;
    // Limit polar angle: prevent going underground or directly overhead
    controls.minPolarAngle = Math.PI / 4; // 45 deg
    controls.maxPolarAngle = Math.PI / 2.05; // 88 deg (never go below ground)
    controls.target.set(0, 0.6, 0);
    controls.update();

    // Group to hold the loaded car model
    const carModelGroup = new THREE.Group();
    scene.add(carModelGroup);

    // Studio Lighting Rig
    // 1. Key Light with soft shadows
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // 2. Fill Light (soft warm tone)
    const fillLight = new THREE.DirectionalLight(0xffeedd, 1.1);
    fillLight.position.set(-6, 4, 3);
    scene.add(fillLight);

    // 3. Rim / Back Light (accentuating aerodynamic sculpted contours)
    const rimLight = new THREE.DirectionalLight(0xdc2626, 2.8);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // 4. Two Projector Headlights (Spotlights shining forward from car front)
    const headlightLeftTarget = new THREE.Object3D();
    headlightLeftTarget.position.set(2, 0, 7);
    scene.add(headlightLeftTarget);

    const headlightLeft = new THREE.SpotLight(0xfff5e6, headlightsOn ? 18 : 0, 15, Math.PI / 5, 0.5, 1.2);
    headlightLeft.position.set(0.7, 0.7, 2.1);
    headlightLeft.target = headlightLeftTarget;
    headlightLeft.castShadow = true;
    scene.add(headlightLeft);

    const headlightRightTarget = new THREE.Object3D();
    headlightRightTarget.position.set(-2, 0, 7);
    scene.add(headlightRightTarget);

    const headlightRight = new THREE.SpotLight(0xfff5e6, headlightsOn ? 18 : 0, 15, Math.PI / 5, 0.5, 1.2);
    headlightRight.position.set(-0.7, 0.7, 2.1);
    headlightRight.target = headlightRightTarget;
    headlightRight.castShadow = true;
    scene.add(headlightRight);

    // 5. Polished Dark Studio Floor with mirror reflections
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      roughness: 0.18,
      metalness: 0.85,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      carModelGroup,
      keyLight,
      headlightLeft,
      headlightRight,
      headlightLeftTarget,
      headlightRightTarget,
      floor,
      animFrameId: 0,
    };

    // Attempt to load the expected model file: public/models/ferrari-488-pista.glb
    loadCarModel(ASSETS.FERRARI_488_PISTA_GLB);

    // Animation Loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      threeRef.current!.animFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.animFrameId);
        controls.dispose();
        floorGeo.dispose();
        floorMat.dispose();
        renderer.dispose();
        threeRef.current = null;
      }
    };
  }, [isMobile, loadCarModel, headlightsOn]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#030305] overflow-hidden select-none flex flex-col justify-between pt-20 pb-8"
      style={{ fontFamily: '"Times New Roman", Times, "Tinos", serif' }}
      aria-label="Tiến Đạt 3D Hero Stage"
    >
      {/* =========================================================================
          BACKGROUND LAYER: 3D WEBGL STAGE (SLIDE 2) & CINEMATIC 2D (SLIDE 1)
          ========================================================================= */}
      <div className="absolute inset-0 bg-[#030305] z-0" />

      {/* 3D Canvas for Ferrari 488 Pista (Slide 2) */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-700 ${
          activeSlide === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Fallback image layer if model is not yet loaded into memory */}
        {!modelLoaded && (
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={ASSETS.FERRARI_488_PISTA_IMG}
              alt="Ferrari 488 Pista"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-100 contrast-110 saturate-[1.05]"
            />
          </div>
        )}
      </div>

      {/* Slide 1 Image: Ferrari 458 Itali (Requested name: Ferrari 458 Itali) */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-700 will-change-transform ${
          activeSlide === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: `translate3d(${carTranslate.x}px, ${carTranslate.y}px, 0) scale(${carTranslate.scale})`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <img
          src={ASSETS.FERRARI_HERO_BG}
          alt="Ferrari 458 Itali"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-100 contrast-110 saturate-[1.05]"
        />

        {/* =====================================================================
            ĐÈN XE (SLIDE 1: FERRARI 458 ITALI):
            1. Đèn trước: Chiếu tự nhiên như ban đầu nhưng sáng hơn
            2. Đèn sau: Ở đèn hậu và phản chiếu ra phía sau đít xe
            ===================================================================== */}
        {headlightsOn && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-100 z-15">
            {/* ĐÈN SAU ĐÍT XE: Chỉ chiếu ở khoảng không và sàn PHÍA SAU ĐUÔI XE (hoàn toàn không chạm vào bánh xe) */}
            {/* Ánh sáng đỏ hắt từ mép cản sau ra khoảng không phía sau */}
            <div className="absolute top-[42%] left-[88%] w-[16vw] h-[30vh] taillight-rear-cast z-10 pointer-events-none" />
            {/* Vệt đỏ phản chiếu nhẹ nhàng trên sàn phía sau cản đuôi xe */}
            <div className="absolute bottom-[16%] left-[88%] w-[16vw] h-[15vh] taillight-floor-rear z-10 pointer-events-none" />

            {/* ĐÈN TRƯỚC XE: Nhỏ gọn, tinh tế và chân thật như ban đầu */}
            {/* Left Headlight */}
            <div className="absolute top-[48%] left-[17%] w-[18vw] h-[26vh] headlight-cone-subtle-left mix-blend-screen opacity-70" />
            <div className="absolute top-[48%] left-[17.5%] w-4 h-3 rounded-full bg-white blur-[1px] opacity-90 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

            {/* Right Headlight */}
            <div className="absolute top-[52%] left-[41%] w-[22vw] h-[28vh] headlight-cone-subtle-right mix-blend-screen opacity-75" />
            <div className="absolute top-[52%] left-[42%] w-5 h-3.5 rounded-full bg-white blur-[1.5px] opacity-90 shadow-[0_0_14px_rgba(255,255,255,0.8)]" />

            {/* Subtle Ground Light Pool */}
            <div className="absolute bottom-[3%] left-[20%] w-[32vw] h-[12vh] rounded-[100%] bg-gradient-to-r from-white/12 via-white/20 to-transparent blur-[14px] mix-blend-screen" />
          </div>
        )}

        {/* Polished Floor Vignette */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(3, 3, 5, 0.85) 0%, rgba(3, 3, 5, 0.35) 45%, transparent 100%)',
          }}
        />
      </div>

      {/* =========================================================================
          KHÓI MỜ MỜ (VOLUMETRIC SOFT DRIFTING FOG / MIST)
          - Giữ khói mờ tinh tế, không làm mờ xe
          ========================================================================= */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div 
          className="absolute -inset-10 animate-smoke-slow mix-blend-screen opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.08) 0%, rgba(220, 38, 38, 0.03) 35%, transparent 65%),
              radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.06) 0%, rgba(220, 38, 38, 0.02) 40%, transparent 70%)
            `,
            filter: 'blur(30px)',
          }}
        />

        <div 
          className="absolute bottom-0 inset-x-0 h-[35vh] animate-smoke-fast mix-blend-screen opacity-40"
          style={{
            background: `
              radial-gradient(ellipse at 50% 100%, rgba(255, 255, 255, 0.09) 0%, rgba(220, 38, 38, 0.04) 45%, transparent 75%)
            `,
            filter: 'blur(35px)',
          }}
        />

        {/* NỀN BỚT TỐI LẠI 15% (Giảm độ tối để hình nền và xe sáng rõ sắc nét) */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 95% 75% at 50% 50%, rgba(3, 3, 5, 0.28) 0%, rgba(3, 3, 5, 0.48) 65%, rgba(3, 3, 5, 0.82) 100%),
              linear-gradient(to bottom, rgba(3, 3, 5, 0.55) 0%, transparent 35%, rgba(3, 3, 5, 0.65) 85%, rgba(3, 3, 5, 0.84) 100%)
            `,
          }}
        />
      </div>

      {/* =========================================================================
          TOP BAR:
          Left: Slide Selectors (No "Slide 01:" prefix, "Ferrari 458 Itali")
          Right: "Tiến Đạt", "Corporate Finance - Investment", "Quận 9 - TP.HCM"
          ========================================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full flex items-start justify-between">
        {/* Slide Switcher: Clean labels as requested */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => switchSlide(1)}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeSlide === 1 
                ? 'bg-[#dc2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-[#ef4444]' 
                : 'luxury-glass text-neutral-400 hover:text-white border-neutral-800'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Ferrari 458 Itali</span>
          </button>

          <button
            onClick={() => switchSlide(2)}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeSlide === 2 
                ? 'bg-[#dc2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-[#ef4444]' 
                : 'luxury-glass text-neutral-400 hover:text-white border-neutral-800'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Ferrari 488 Pista (3D)</span>
          </button>

          {/* Model 3D Info & Upload Button */}
          {activeSlide === 2 && (
            <button
              onClick={() => setIs3DGuideOpen(true)}
              className="px-2.5 py-1.5 rounded-sm luxury-glass text-neutral-300 hover:text-white border-neutral-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
              title="Quản lý / Tải lên model 3D Ferrari 488 Pista"
            >
              <Upload className="w-3.5 h-3.5 text-[#ef4444]" />
              <span className="hidden sm:inline">Nạp Model 3D (.glb)</span>
            </button>
          )}

          {/* Zen Mode Button (Hide/Show Text to admire car) */}
          <button
            onClick={() => {
              soundManager.playClick();
              setZenMode(!zenMode);
            }}
            className="px-2.5 py-1.5 rounded-sm luxury-glass text-neutral-300 hover:text-white border-neutral-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
            title={zenMode ? 'Hiện lại văn bản' : 'Ẩn chữ để ngắm xe trọn vẹn'}
          >
            {zenMode ? <Eye className="w-3.5 h-3.5 text-amber-300" /> : <EyeOff className="w-3.5 h-3.5 text-neutral-400" />}
            <span className="hidden sm:inline">{zenMode ? 'Hiện' : 'Ẩn'}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT:
          "CÁC CHỮ HẠN CHẾ ĐÈ LÊN XE"
          - Placed in a sleek, non-intrusive upper-left floating card.
          - Center & lower-middle remain 100% CLEAR so the Ferrari is the hero!
          - Includes Brand, Title, Subtitle, and the required Philosophy.
          ========================================================================= */}
      <div 
        className={`relative z-30 max-w-7xl mx-auto px-6 w-full my-auto transition-opacity duration-300 pointer-events-none ${
          zenMode ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="max-w-xl pointer-events-auto p-6 sm:p-7 rounded-sm luxury-glass border-l-4 border-l-[#dc2626] border-neutral-800/80 shadow-2xl space-y-3.5 backdrop-blur-xl">
          {/* Main Title: TIẾN ĐẠT */}
          <div>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#fdfbf7] text-shadow-luxury leading-tight mt-1 font-times"
              style={{
                fontFamily: '"Times New Roman", Times, "Tinos", serif',
                letterSpacing: '0.02em',
              }}
            >
              TIẾN ĐẠT
            </h1>
            <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#cbd5e1] uppercase mt-0.5">
              Corporate Finance - Investment
            </p>
          </div>

          {/* Triết lý bắt buộc theo yêu cầu:
              "Ferrari chinh phục tốc độ bằng sự kết hợp giữa sức mạnh động cơ, khí động học và độ chính xác trong từng chuyển động..." */}
          <div className="pt-2 border-t border-neutral-800/80">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase text-white mb-1.5">
              <Wind className="w-3.5 h-3.5 text-[#ef4444]" />
              <span>Khí Động Học Của Tài Chính Doanh Nghiệp</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Ferrari chinh phục tốc độ bằng sự kết hợp giữa sức mạnh động cơ, khí động học và độ chính xác trong từng chuyển động. Tài chính doanh nghiệp cũng cần tăng trưởng đúng hướng, tối ưu nguồn lực và kiểm soát rủi ro để kiến tạo giá trị vượt trội, bền vững.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM DOCK:
          1. Headlights Toggle Button
          2. Intro Roar Sound
          3. 5-Second Sound Button 1 (V8 Launch)
          4. 5-Second Sound Button 2 (Động Cơ Gầm)
          ========================================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-900/80">
        {/* Sound & Headlights Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Headlights Toggle Button */}
          <button
            onClick={toggleHeadlights}
            className={`px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 border shadow-lg ${
              headlightsOn
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'luxury-glass text-neutral-400 hover:text-white border-neutral-800'
            }`}
            title="Bật hoặc tắt đèn xe Ferrari"
          >
            {headlightsOn ? <Lightbulb className="w-3.5 h-3.5 text-amber-300" /> : <LightbulbOff className="w-3.5 h-3.5 text-neutral-500" />}
            <span>Đèn xe</span>
          </button>

          {/* Cold Start Sound Trigger */}
          <button
            onClick={() => soundManager.playIntroRoar()}
            className="px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white luxury-glass hover:border-neutral-700 transition-all cursor-pointer flex items-center space-x-1.5"
            title="Âm thanh đề máy nổ lạnh Ferrari V8 (Cold Start)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>Cold Start</span>
          </button>

          {/* 5-Second Sound Button 1: Launch */}
          <button
            onClick={handlePlayTrack1}
            className={`px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 border shadow-lg ${
              playingTrack === 1
                ? 'bg-[#dc2626] text-white border-[#ef4444] shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                : 'luxury-glass text-neutral-200 hover:text-white border-neutral-800'
            }`}
            title="Nghe đoạn 5 giây: Ferrari V8 Launch / Tăng tốc"
          >
            {playingTrack === 1 ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>Launch {playingTrack === 1 ? `(${trackCountdown}s)` : ''}</span>
          </button>

          {/* 5-Second Sound Button 2: Flyby */}
          <button
            onClick={handlePlayTrack2}
            className={`px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 border shadow-lg ${
              playingTrack === 2
                ? 'bg-[#dc2626] text-white border-[#ef4444] shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                : 'luxury-glass text-neutral-200 hover:text-white border-neutral-800'
            }`}
            title="Nghe đoạn 5 giây: High-RPM Flyby / Động cơ gầm"
          >
            {playingTrack === 2 ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>Gầm {playingTrack === 2 ? `(${trackCountdown}s)` : ''}</span>
          </button>
        </div>

        {/* Section Jump */}
        <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
          <a href="#about" className="hover:text-white transition-colors">Giới thiệu &darr;</a>
          <span className="text-neutral-700">&bull;</span>
          <a href="#experience" className="hover:text-white transition-colors">Kinh nghiệm &darr;</a>
        </div>
      </div>

      {/* =========================================================================
          3D MODEL MANAGER MODAL & SKETCHFAB DOWNLOAD GUIDE
          - Explains how to download from Sketchfab and place in public/models/
          - Provides real-time drag-and-drop .glb file loader
          ========================================================================= */}
      {is3DGuideOpen && (
        <div className="fixed inset-0 z-50 bg-[#030305]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-sm luxury-glass border-neutral-700 shadow-2xl my-auto space-y-5">
            <button
              onClick={() => setIs3DGuideOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full luxury-glass text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs uppercase font-bold text-[#ef4444]">
              <Box className="w-4 h-4" />
              <span>Hướng Dẫn Nạp Model 3D Ferrari 488 Pista</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Tích Hợp Mô Hình 3D Thực Tế (.GLB / .GLTF)
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Dự án đã được cấu hình sẵn trình nạp 3D chuyên dụng (Three.js GLTFLoader + DRACOLoader) với hệ thống ánh sáng studio và sàn phản chiếu PBR.
            </p>

            {/* Step-by-Step Instructions */}
            <div className="p-4 rounded-sm bg-[#09090d] border border-neutral-800 space-y-3 text-xs">
              <div className="font-bold text-white uppercase text-[11px] tracking-wider text-[#d4af37]">
                Các bước thực hiện tải model từ Sketchfab:
              </div>
              <ol className="list-decimal list-inside space-y-2 text-neutral-300">
                <li>
                  Truy cập trang model Sketchfab được cung cấp:
                  <a
                    href={ASSETS.FERRARI_SKETCHFAB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-[#ef4444] font-semibold underline inline-flex items-center"
                  >
                    <span>2019 Ferrari 488 Pista trên Sketchfab</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </li>
                <li>
                  Nhấn <strong>Download 3D Model</strong> và chọn định dạng <strong>glTF / GLB</strong>.
                </li>
                <li>
                  Đổi tên file tải về thành <code className="bg-neutral-800 px-1 py-0.5 rounded text-amber-300 font-mono">ferrari-488-pista.glb</code> và sao chép vào thư mục:
                  <div className="mt-1 font-mono text-[11px] text-white bg-black/60 p-2 rounded border border-neutral-800">
                    public/models/ferrari-488-pista.glb
                  </div>
                </li>
              </ol>
            </div>

            {/* Direct Instant Drag & Drop Loader */}
            <div className="p-5 rounded-sm border-2 border-dashed border-neutral-700 hover:border-[#dc2626] transition-colors text-center space-y-2">
              <Upload className="w-8 h-8 text-[#ef4444] mx-auto" />
              <div className="text-xs font-bold text-white">
                Hoặc tải lên trực tiếp file .glb tại đây (Hiển thị tức thì)
              </div>
              <p className="text-[11px] text-neutral-400">
                Chọn file <code className="text-amber-300">.glb</code> từ máy tính của bạn để hiển thị ngay trong không gian 3D.
              </p>
              <label className="inline-block mt-2 px-4 py-2 rounded-sm bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider cursor-pointer">
                <span>Chọn File .GLB Từ Máy</span>
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
              <span className="text-neutral-500">Trạng thái: {modelLoaded ? 'Đã nạp model 3D' : 'Đang sử dụng chế độ nền cinematic studio'}</span>
              <button
                onClick={() => setIs3DGuideOpen(false)}
                className="px-4 py-1.5 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
