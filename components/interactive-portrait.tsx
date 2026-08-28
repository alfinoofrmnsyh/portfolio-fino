"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const clientList = Array.from({ length: 8 }, (_, i) => `/images/icon/${i + 27}.png`)
const techList = Array.from({ length: 20 }, (_, i) => `/images/icon/${i + 7}.png`)

const waterSimVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const waterSimFragmentShader = `
  uniform sampler2D textureA;
  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform float time;
  uniform int frame;
  varying vec2 vUv;

  const float delta = 1.4;

  void main() {
    vec2 uv = vUv;
    if (frame == 0) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec4 data = texture2D(textureA, uv);
    float pressure = data.x;
    float pVel = data.y;

    vec2 texelSize = 1.0 / resolution;
    float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
    float p_left  = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
    float p_up    = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
    float p_down  = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;

    if (uv.x <= texelSize.x) p_left = p_right;
    if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
    if (uv.y <= texelSize.y) p_down = p_up;
    if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
    pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;

    pressure += delta * pVel;

    pVel -= 0.005 * delta * pressure;
    pVel *= 1.0 - 0.002 * delta;
    pressure *= 0.985;

    vec2 mouseUV = mouse / resolution;
    if (mouse.x > 0.0) {
      float dist = distance(uv, mouseUV);
      if (dist <= 0.025) {
        pressure += 0.8 * (1.0 - dist / 0.025);
      }
    }

    gl_FragColor = vec4(
      pressure,
      pVel,
      (p_right - p_left) / 2.0,
      (p_up - p_down) / 2.0
    );
  }
`

class WaterSimulation {
  private simScene = new THREE.Scene()
  private simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private material: THREE.ShaderMaterial
  private rtA: THREE.WebGLRenderTarget
  private rtB: THREE.WebGLRenderTarget
  private frame = 0
  mouse = new THREE.Vector2(-1, -1)

  constructor(width: number, height: number) {
    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    }
    this.rtA = new THREE.WebGLRenderTarget(width, height, options)
    this.rtB = new THREE.WebGLRenderTarget(width, height, options)

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: this.mouse },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: waterSimVertexShader,
      fragmentShader: waterSimFragmentShader,
    })

    this.simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material))
  }

  setSize(width: number, height: number) {
    this.rtA.setSize(width, height)
    this.rtB.setSize(width, height)
    this.material.uniforms.resolution.value.set(width, height)
  }

  step(renderer: THREE.WebGLRenderer, dt: number) {
    this.material.uniforms.frame.value = this.frame++
    this.material.uniforms.time.value += dt
    this.material.uniforms.textureA.value = this.rtA.texture

    renderer.setRenderTarget(this.rtB)
    renderer.render(this.simScene, this.simCamera)
    renderer.setRenderTarget(null)

    const tmp = this.rtA
    this.rtA = this.rtB
    this.rtB = tmp
  }

  get texture() {
    return this.rtA.texture
  }

  dispose() {
    this.rtA.dispose()
    this.rtB.dispose()
    this.material.dispose()
  }
}

export default function InteractivePortrait() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const gu = {
      time: { value: 0 },
      dTime: { value: 0 },
      aspect: { value: width / height },
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const waterSim = new WaterSimulation(width, height)
    const texWaterUniform: { value: THREE.Texture | null } = { value: null }

    // --- MESH & MATERIAL HELPER UNTUK EFEK AIR GLOBAL ---
    const applyWaterDistortion = (shader: THREE.Shader) => {
      shader.uniforms.texWater = texWaterUniform
      let vertexShader = shader.vertexShader

      vertexShader = vertexShader.replace(
        "void main() {",
        "varying vec2 vWaterUv;\nvoid main() {",
      )
      vertexShader = vertexShader.replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvWaterUv = uv;",
      )
      shader.vertexShader = vertexShader

      let fragmentShader = `
        uniform sampler2D texWater;
        varying vec2 vWaterUv;
        ${shader.fragmentShader}
      `

      fragmentShader = fragmentShader.replace(
        `#include <map_fragment>`,
        `
        vec4 waterData = texture2D(texWater, vWaterUv);
        vec2 waterDistortion = 0.015 * waterData.zw;
        vec4 sampledDiffuse = texture2D(map, vWaterUv + waterDistortion);
        diffuseColor *= sampledDiffuse;

        // Kilau air specular
        vec3 waterNormal = normalize(vec3(-waterData.z * 2.0, 0.6, -waterData.w * 2.0));
        vec3 waterLightDir = normalize(vec3(-0.3, 1.0, 0.4));
        float waterSpecular = pow(max(0.0, dot(waterNormal, waterLightDir)), 60.0) * 0.8;
        diffuseColor.rgb += waterSpecular;
        `,
      )

      shader.fragmentShader = fragmentShader
    }

    class Blob {
      renderer: THREE.WebGLRenderer
      fbTexture: { value: THREE.FramebufferTexture }
      rtOutput: THREE.WebGLRenderTarget
      uniforms: {
        pointer: { value: THREE.Vector2 }
        pointerDown: { value: number }
        pointerRadius: { value: number }
        pointerDuration: { value: number }
      }
      rtScene: THREE.Mesh
      rtCamera: THREE.Camera

      constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer
        this.fbTexture = { value: new THREE.FramebufferTexture(width, height) }
        this.rtOutput = new THREE.WebGLRenderTarget(width, height)
        this.uniforms = {
          pointer: { value: new THREE.Vector2().setScalar(10) },
          pointerDown: { value: 1 },
          pointerRadius: { value: 0.35 },
          pointerDuration: { value: 2.5 },
        }

        const handlePointerMove = (clientX: number, clientY: number) => {
          const rect = container.getBoundingClientRect()
          this.uniforms.pointer.value.x = ((clientX - rect.left) / width) * 2 - 1
          this.uniforms.pointer.value.y = -((clientY - rect.top) / height) * 2 + 1

          waterSim.mouse.x = clientX - rect.left
          waterSim.mouse.y = height - (clientY - rect.top)
        }

        const handleMouseMove = (event: MouseEvent) => {
          handlePointerMove(event.clientX, event.clientY)
        }

        const handleMouseLeave = () => {
          this.uniforms.pointer.value.setScalar(10)
          waterSim.mouse.set(-1, -1)
        }

        container.addEventListener("mousemove", handleMouseMove)
        container.addEventListener("mouseleave", handleMouseLeave)

        this.rtScene = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.MeshBasicMaterial({
            color: 0x000000,
            onBeforeCompile: (shader) => {
              shader.uniforms.dTime = gu.dTime
              shader.uniforms.aspect = gu.aspect
              shader.uniforms.pointer = this.uniforms.pointer
              shader.uniforms.pointerDown = this.uniforms.pointerDown
              shader.uniforms.pointerRadius = this.uniforms.pointerRadius
              shader.uniforms.pointerDuration = this.uniforms.pointerDuration
              shader.uniforms.fbTexture = this.fbTexture
              shader.uniforms.time = gu.time
              shader.fragmentShader = `
                uniform float dTime, aspect, pointerDown, pointerRadius, pointerDuration, time;
                uniform vec2 pointer;
                uniform sampler2D fbTexture;
                float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
                float noise(vec2 p) {
                  vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
                  float a = hash(i); float b = hash(i + vec2(1.,0.)); float c = hash(i + vec2(0.,1.)); float d = hash(i + vec2(1.,1.));
                  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
                }
                ${shader.fragmentShader}
              `.replace(
                `#include <color_fragment>`,
                `#include <color_fragment>
                float rVal = texture2D(fbTexture, vUv).r;
                rVal -= clamp(dTime / pointerDuration, 0., 0.05);
                rVal = clamp(rVal, 0., 1.);
                float f = 0.;
                if (pointerDown > 0.5) {
                  vec2 uv = (vUv - 0.5) * 2. * vec2(aspect, 1.);
                  vec2 mouse = pointer * vec2(aspect, 1.);
                  vec2 toMouse = uv - mouse;
                  float angle = atan(toMouse.y, toMouse.x);
                  float dist = length(toMouse);
                  float noiseVal = noise(vec2(angle*3. + time*0.5, dist*5.));
                  float noiseVal2 = noise(vec2(angle*5. - time*0.3, dist*3. + time));
                  float radiusVariation = 0.7 + noiseVal*0.5 + noiseVal2*0.3;
                  float organicRadius = pointerRadius * radiusVariation;
                  f = 1. - smoothstep(organicRadius*0.05, organicRadius*1.2, dist);
                  f *= 0.8 + noiseVal*0.2;
                }
                rVal += f * 0.25;
                rVal = clamp(rVal, 0., 1.);
                diffuseColor.rgb = vec3(rVal);
                `,
              )
            },
          }),
        )
        this.rtScene.material.defines = { USE_UV: "" }
        this.rtCamera = new THREE.Camera()
      }

      render() {
        this.renderer.setRenderTarget(this.rtOutput)
        this.renderer.render(this.rtScene, this.rtCamera)
        this.renderer.copyFramebufferToTexture(this.fbTexture.value)
        this.renderer.setRenderTarget(null)
      }
    }

    const blob = new Blob(renderer)
    const textureLoader = new THREE.TextureLoader()

    // --- SETUP IMAGES HERO ---
    const updatePlaneGeometries = (imgAspect: number, containerW: number, containerH: number) => {
      const containerAspect = containerW / containerH
      let planeWidth, planeHeight

      if (imgAspect > containerAspect) {
        planeHeight = containerH
        planeWidth = containerH * imgAspect
      } else {
        planeWidth = containerW
        planeHeight = containerW / imgAspect
      }

      const scaleFactor = 0.75
      planeWidth *= scaleFactor
      planeHeight *= scaleFactor

      baseImage.geometry.dispose()
      baseImage.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
      helmetImage.geometry.dispose()
      helmetImage.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)

      const yPos = containerW < 768 ? -(containerH - planeHeight) / 2 : 0
      baseImage.position.y = yPos
      helmetImage.position.y = yPos
    }

    const baseTexture = textureLoader.load("/images/hero-off.png", (texture) => {
      if (texture?.image) {
        updatePlaneGeometries(texture.image.width / texture.image.height, width, height)
      }
    })

    const helmetTexture = textureLoader.load("/images/hero-on.png")
    baseTexture.colorSpace = THREE.SRGBColorSpace
    helmetTexture.colorSpace = THREE.SRGBColorSpace

    // Base Image Material (dengan efek air)
    const baseImageMaterial = new THREE.MeshBasicMaterial({
      map: baseTexture,
      transparent: true,
      onBeforeCompile: applyWaterDistortion,
    })
    const baseImage = new THREE.Mesh(new THREE.PlaneGeometry(width, height), baseImageMaterial)
    baseImage.position.z = 0.1
    scene.add(baseImage)

    // Helmet Image Material (dengan efek air + reveal blob)
    const helmetImageMaterial = new THREE.MeshBasicMaterial({ map: helmetTexture, transparent: true })
    helmetImageMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.texBlob = { value: blob.rtOutput.texture }
      shader.uniforms.texWater = texWaterUniform
      let vertexShader = shader.vertexShader

      vertexShader = vertexShader.replace(
        "void main() {",
        "varying vec4 vPosProj;\nvarying vec2 vWaterUv;\nvoid main() {",
      )
      vertexShader = vertexShader.replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvPosProj = gl_Position;\nvWaterUv = uv;",
      )
      shader.vertexShader = vertexShader

      let fragmentShader = `
        uniform sampler2D texBlob; uniform sampler2D texWater;
        varying vec4 vPosProj; varying vec2 vWaterUv;
        ${shader.fragmentShader}
      `

      fragmentShader = fragmentShader.replace(
        `#include <clipping_planes_fragment>`,
        `
        vec2 blobUV=((vPosProj.xy/vPosProj.w)+1.)*0.5;
        vec4 blobData=texture(texBlob,blobUV);
        if(blobData.r<0.02)discard;
        #include <clipping_planes_fragment>
        `,
      )

      fragmentShader = fragmentShader.replace(
        `#include <map_fragment>`,
        `
        vec4 waterData = texture2D(texWater, vWaterUv);
        vec2 waterDistortion = 0.012 * waterData.zw;
        vec4 sampledDiffuse = texture2D(map, vWaterUv + waterDistortion);
        diffuseColor *= sampledDiffuse;

        vec3 waterNormal = normalize(vec3(-waterData.z * 2.0, 0.6, -waterData.w * 2.0));
        vec3 waterLightDir = normalize(vec3(-0.3, 1.0, 0.4));
        float waterSpecular = pow(max(0.0, dot(waterNormal, waterLightDir)), 60.0) * 1.0;
        diffuseColor.rgb += waterSpecular;
        `,
      )

      shader.fragmentShader = fragmentShader
    }

    const helmetImage = new THREE.Mesh(new THREE.PlaneGeometry(width, height), helmetImageMaterial)
    helmetImage.position.z = 0.2
    scene.add(helmetImage)

    // --- ANIMATION LOOP ---
    let lastTime = performance.now()
    let t = 0

    const animate = () => {
      const now = performance.now()
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      t += dt
      gu.time.value = t
      gu.dTime.value = dt

      blob.render()
      waterSim.step(renderer, dt)
      texWaterUniform.value = waterSim.texture

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      camera.left = newWidth / -2
      camera.right = newWidth / 2
      camera.top = newHeight / 2
      camera.bottom = newHeight / -2
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
      gu.aspect.value = newWidth / newHeight
      waterSim.setSize(newWidth, newHeight)
      if (baseTexture.image) {
        updatePlaneGeometries(baseTexture.image.width / baseTexture.image.height, newWidth, newHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      })
      baseTexture.dispose()
      helmetTexture.dispose()
      blob.rtOutput.dispose()
      waterSim.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-[100dvh] min-h-[550px] overflow-hidden select-none">
      {/* --- LAYER 0: MARQUEE RIBBONS --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center z-0">
        <div className="absolute top-[28%] md:top-[32%] left-[-15%] w-[130%] rotate-[-6deg] md:rotate-[-8deg] bg-[#a3e635] py-2 md:py-5 shadow-2xl overflow-hidden border-y border-black">
          <div className="flex whitespace-nowrap animate-marquee items-center">
            {[...clientList, ...clientList, ...clientList].map((src, index) => (
              <div key={index} className="flex items-center mx-4 md:mx-10">
                <img
                  src={src}
                  alt="Client Logo"
                  className="h-7 md:h-16 w-auto object-contain filter contrast-200"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-[55%] md:top-[52%] left-[-15%] w-[130%] rotate-[6deg] md:rotate-[8deg] bg-[#111111] py-2 md:py-5 shadow-2xl overflow-hidden border-y border-[#a3e635]">
          <div className="flex whitespace-nowrap animate-marquee-reverse items-center">
            {[...techList, ...techList, ...techList].map((src, index) => (
              <div key={index} className="flex items-center mx-4 md:mx-10">
                <img
                  src={src}
                  alt="Tech Logo"
                  className="h-7 md:h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- LAYER 1: THREE.JS CANVAS --- */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-pan-y"
      >
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 pointer-events-none">
          <span
            className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-[#282c20]"
            style={{ WebkitTextStroke: "1px white" }}
          >
            Software
          </span>
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-none">
          <span
            className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-[#282c20]"
            style={{ WebkitTextStroke: "1px white" }}
          >
            Engineer
          </span>
        </div>
      </div>
    </div>
  )
}