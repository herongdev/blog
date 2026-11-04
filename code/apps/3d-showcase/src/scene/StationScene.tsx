import { useEffect, useRef, useState } from 'react';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { CreateCylinder } from '@babylonjs/core/Meshes/Builders/cylinderBuilder';
import '@babylonjs/core/Rendering/edgesRenderer';

export default function StationScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!canvas.current) return;
    let engine: Engine | undefined;
    let observer: ResizeObserver | undefined;
    try {
      engine = new Engine(canvas.current, true, { stencil: true });
      const scene = new Scene(engine);
      scene.clearColor = new Color4(.055, .085, .12, 1);
      const camera = new ArcRotateCamera('overview', -Math.PI / 2.8, Math.PI / 3, 24, new Vector3(0, 1, 0), scene);
      camera.lowerRadiusLimit = 12;
      camera.upperRadiusLimit = 38;
      camera.upperBetaLimit = Math.PI / 2.1;
      camera.wheelPrecision = 25;
      camera.attachControl(canvas.current, true);
      new HemisphericLight('sky', new Vector3(.3, 1, -.3), scene).intensity = 1.25;
      const material = (name: string, hex: string) => {
        const result = new StandardMaterial(name, scene);
        result.diffuseColor = Color3.FromHexString(hex);
        result.specularColor = new Color3(.1, .1, .1);
        return result;
      };
      const asphalt = material('asphalt', '#263543');
      const steel = material('steel', '#5b7e93');
      const accent = material('accent', '#51b8a7');
      const truck = material('truck', '#cba65e');
      const coal = material('coal', '#1a232d');
      const box = (name: string, size: [number, number, number], position: [number, number, number], mat: StandardMaterial) => {
        const mesh = CreateBox(name, { width: size[0], height: size[1], depth: size[2] }, scene);
        mesh.position = new Vector3(...position);
        mesh.material = mat;
        mesh.enableEdgesRendering();
        mesh.edgesWidth = 1;
        mesh.edgesColor = new Color4(.35, .6, .7, .25);
        return mesh;
      };
      box('site', [19, .2, 12], [0, -.2, 0], asphalt);
      box('road', [17, .04, 4.5], [0, -.05, 0], coal);
      for (const x of [-3.7, 3.7]) for (const z of [-2.7, 2.7]) box('column', [.3, 5.5, .3], [x, 2.7, z], steel);
      for (const z of [-2.7, 2.7]) box('rail', [8, .35, .4], [0, 5.5, z], accent);
      box('gantry', [.65, .5, 6], [.5, 5.85, 0], steel);
      box('trolley', [1.2, .6, 1.2], [.5, 5.9, .25], accent);
      box('probe', [.15, 2.7, .15], [.5, 4.3, .25], steel);
      box('truck-body', [5.8, 1.4, 2.15], [-.7, 1.2, 0], truck);
      box('truck-load', [5.4, .2, 1.85], [-.7, 1.95, 0], coal);
      box('cab', [1.6, 2, 2.1], [3.1, 1.45, 0], accent);
      for (const x of [-2.8, -1.8, 3.1]) for (const z of [-1.1, 1.1]) {
        const wheel = CreateCylinder('wheel', { diameter: .9, height: .25, tessellation: 16 }, scene);
        wheel.rotation.x = Math.PI / 2;
        wheel.position = new Vector3(x, .45, z);
        wheel.material = coal;
      }
      for (const x of [-7, 7]) {
        box('gate-base', [.4, 1.1, .4], [x, .5, 2.3], steel);
        box('gate-arm', [.12, .12, 3.8], [x, 1.05, .4], accent);
      }
      engine.runRenderLoop(() => scene.render());
      observer = new ResizeObserver(() => engine?.resize());
      observer.observe(canvas.current);
    } catch {
      observer?.disconnect();
      engine?.dispose();
      engine = undefined;
      setFailed(true);
    }
    return () => { observer?.disconnect(); engine?.dispose(); };
  }, []);
  return failed ? <div className="scene-unavailable">当前环境无法显示三维场景，站点信息仍可正常查看。</div> : <canvas ref={canvas} className="scene-canvas" aria-label="汽车采样站三维简化模型" />;
}
