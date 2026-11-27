import * as THREE from "three"

/**
 * A printed book as a real object, drawn with three.js: front cover, spine, back
 * cover and the block of pages. Drag to turn it; a click turns it to the other side.
 * Modelled on the Book3D scene of chblacksmith-site.
 *
 * The same file runs in the cover workshop (Dropbox, "type & play/print"), where
 * the faces are canvases cut from the cover being designed.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {object} options
 * @param {{ front: string | HTMLCanvasElement, spine: string | HTMLCanvasElement, back: string | HTMLCanvasElement }} options.faces
 *   Image URLs or canvases. The spine is as wide as the book is thick.
 * @param {{ width: number, height: number, thickness: number }} options.size The finished book, in mm.
 * @param {string} [options.ground] "soft" for a blurred shadow, or a colour for a flat one.
 * @returns {Promise<{ turn: (toBack?: boolean) => void, dispose: () => void }>}
 */
export async function mountBook(canvas, { faces, size, ground = "soft" }) {
  // Scene units: the book is 2 tall; width and thickness follow the real proportions.
  const HEIGHT = 2
  const width = (HEIGHT * size.width) / size.height
  const depth = (HEIGHT * size.thickness) / size.height
  const REST_TURN = 0.42
  const FIT = { width: 2.1, height: HEIGHT + 1.1 }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100)
  // White light only, so the cover keeps its printed colours.
  scene.add(new THREE.AmbientLight(0xffffff, 1.5))
  const key = new THREE.DirectionalLight(0xffffff, 1.3)
  key.position.set(2, 3, 6)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.6)
  fill.position.set(-4, 1, 2)
  scene.add(fill)

  const anisotropy = renderer.capabilities.getMaxAnisotropy()
  const load = async source => {
    const texture =
      typeof source === "string" ? await new THREE.TextureLoader().loadAsync(source) : new THREE.CanvasTexture(source)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = anisotropy
    return texture
  }
  const [front, spine, back] = await Promise.all([faces.front, faces.spine, faces.back].map(load))

  const cover = map => new THREE.MeshStandardMaterial({ map, roughness: 0.48, metalness: 0 })
  const pages = map => new THREE.MeshStandardMaterial({ map, color: "#f1eadb", roughness: 0.95 })
  const side = pagesTexture(false)
  const top = pagesTexture(true)
  // Box faces: right (fore edge), left (spine), top, bottom, front, back.
  const materials = [pages(side), cover(spine), pages(top), pages(top), cover(front), cover(back)]
  const geometry = new THREE.BoxGeometry(width, HEIGHT, depth)
  const book = new THREE.Mesh(geometry, materials)
  book.rotation.set(0.06, REST_TURN, 0)
  scene.add(book)

  // The shadow on the floor follows the book; it gets lighter as the book floats up.
  const shadowMap = ground === "soft" ? softShadow() : flatShadow(ground)
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false })
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(width * 1.7, depth * 2 + 1.1), shadowMaterial)
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -HEIGHT / 2 - 0.3
  shadow.renderOrder = -1
  scene.add(shadow)

  const state = { turned: false, offset: 0, drag: null, hover: false, pointer: { x: 0, y: 0 }, lastTurn: 0 }

  // Moves the camera back until the book fits the canvas, on any screen shape.
  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    camera.position.set(0, -0.18, Math.max(FIT.height / (2 * tan), FIT.width / (2 * tan * camera.aspect)) + 0.2)
    camera.lookAt(0, -0.18, 0)
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  resize()

  // Drag to turn; a click without dragging turns the book over.
  canvas.style.cursor = "grab"
  const onDown = event => {
    canvas.setPointerCapture?.(event.pointerId)
    state.drag = { x: event.clientX, moved: false }
    canvas.style.cursor = "grabbing"
  }
  const onMove = event => {
    if (!state.drag) return
    const dx = event.clientX - state.drag.x
    if (Math.abs(dx) > 6) state.drag.moved = true
    state.offset = dx * 0.012
  }
  const onUp = event => {
    if (!state.drag) return
    canvas.releasePointerCapture?.(event.pointerId)
    const { moved } = state.drag
    state.drag = null
    canvas.style.cursor = "grab"
    if (!moved) {
      // A double click would turn the book twice and land it where it was.
      if (event.timeStamp - state.lastTurn < 400) return
      state.lastTurn = event.timeStamp
      state.turned = !state.turned
      return
    }
    // Let go: the book settles on whichever side is closer to the reader.
    const halfTurns = Math.round(((state.turned ? Math.PI : 0) + state.offset) / Math.PI)
    state.turned = Math.abs(halfTurns) % 2 === 1
    state.offset = 0
  }
  const onCancel = () => {
    state.drag = null
    state.offset = 0
    canvas.style.cursor = "grab"
  }
  const onEnter = () => (state.hover = true)
  const onLeave = () => (state.hover = false)
  // The mouse anywhere on the page leans the book a little, from -1 to 1 around it.
  const onLean = event => {
    const box = canvas.getBoundingClientRect()
    const clamp = value => Math.max(-1, Math.min(1, value))
    state.pointer = {
      x: clamp(((event.clientX - box.left) / box.width) * 2 - 1),
      y: clamp(((event.clientY - box.top) / box.height) * 2 - 1)
    }
  }
  canvas.addEventListener("pointerdown", onDown)
  canvas.addEventListener("pointermove", onMove)
  canvas.addEventListener("pointerup", onUp)
  canvas.addEventListener("pointercancel", onCancel)
  canvas.addEventListener("pointerenter", onEnter)
  canvas.addEventListener("pointerleave", onLeave)
  window.addEventListener("pointermove", onLean, { passive: true })

  const clock = new THREE.Clock()
  let frame = 0
  const tick = () => {
    frame = requestAnimationFrame(tick)
    const delta = Math.min(clock.getDelta(), 0.1)
    const t = clock.elapsedTime
    const lean = reduce ? 0 : 1
    const targetY = REST_TURN + (state.turned ? Math.PI : 0) + state.offset + state.pointer.x * 0.32 * lean
    const targetX = 0.06 - state.pointer.y * 0.14 * lean
    book.rotation.y = THREE.MathUtils.damp(book.rotation.y, targetY, state.drag ? 18 : 4, delta)
    book.rotation.x = THREE.MathUtils.damp(book.rotation.x, targetX, 4, delta)
    const float = reduce ? 0 : Math.sin(t * 0.7) * 0.05
    const lift = state.hover ? 0.08 : 0
    book.position.y = THREE.MathUtils.damp(book.position.y, float + lift, 5, delta)
    shadow.rotation.z = book.rotation.y
    shadow.scale.setScalar(1 + book.position.y * 0.8)
    shadowMaterial.opacity = 0.6 - book.position.y * 1.2
    renderer.render(scene, camera)
  }
  const start = () => {
    if (frame) return
    clock.getDelta()
    frame = requestAnimationFrame(tick)
  }
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }
  // Only animate while the book is on screen.
  const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
  visibility.observe(canvas)
  start()

  return {
    turn: toBack => {
      state.turned = toBack ?? !state.turned
    },
    dispose: () => {
      stop()
      visibility.disconnect()
      resizeObserver.disconnect()
      canvas.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerup", onUp)
      canvas.removeEventListener("pointercancel", onCancel)
      canvas.removeEventListener("pointerenter", onEnter)
      canvas.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("pointermove", onLean)
      for (const material of [...materials, shadowMaterial]) {
        material.map?.dispose()
        material.dispose()
      }
      geometry.dispose()
      renderer.dispose()
    }
  }
}

/** A blurred oval, darkest in the middle. */
function softShadow() {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 128
  const context = canvas.getContext("2d")
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, "rgba(0,0,0,0.85)")
  gradient.addColorStop(0.45, "rgba(0,0,0,0.45)")
  gradient.addColorStop(1, "rgba(0,0,0,0)")
  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

/** A solid oval in one colour, for flat pages that use no gradients. */
function flatShadow(color) {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 128
  const context = canvas.getContext("2d")
  context.fillStyle = color
  context.beginPath()
  context.ellipse(64, 64, 46, 40, 0, 0, Math.PI * 2)
  context.fill()
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** Paper edges: thin lines, one per few pages. */
function pagesTexture(horizontal) {
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 256
  const context = canvas.getContext("2d")
  context.fillStyle = "#f3ecdc"
  context.fillRect(0, 0, canvas.width, canvas.height)
  for (let x = 0; x < canvas.width; x += 2) {
    context.fillStyle = `rgba(120, 100, 70, ${0.08 + Math.random() * 0.12})`
    context.fillRect(x, 0, 1, canvas.height)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  if (horizontal) {
    texture.center.set(0.5, 0.5)
    texture.rotation = Math.PI / 2
  }
  return texture
}
