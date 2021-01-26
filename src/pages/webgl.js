import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import * as React from 'react';
import {
  AmbientLight,
  Fog,
  GridHelper,
  PerspectiveCamera,
  PointLight,
  Scene,
  Group,
  SpotLight,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';

export default function WebglScreen() {
  let timeout;

  React.useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const sceneColor = 0x000000;

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        renderer.setSize(width , height);
        renderer.setClearColor(sceneColor);

        const scene = new Scene();
        //标线
        // scene.fog = new Fog(sceneColor, 1, 10000);
        // scene.add(new GridHelper(10, 100));

        let group;
        group = new Group();

        const camera = new PerspectiveCamera(50, width / height, 0.5, 1000);
        camera.position.set(30, 5, 5);

        let ambi = new AmbientLight(0x686868); //环境光
        scene.add(ambi);
        
        let spotLight = new SpotLight(0xffffff);  //点光源
        spotLight.position.set(550, 100, 650);  
        spotLight.intensity = 0.6;
        scene.add(spotLight);

        const ambientLight = new AmbientLight(0x101010);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        let loader = new TextureLoader();
        let planetTexture = require("../images/Earth.png");

        loader.load( planetTexture, function ( texture ) {
          let geometry = new SphereGeometry(5, 32, 32);
        	let material = new MeshBasicMaterial( { map: texture } );
        	let mesh = new Mesh( geometry, material );
        	group.add( mesh );
        });

        scene.add(group);

        camera.lookAt(group.position);

        function update() {
          group.rotation.y -= 0.005;
        }

        // Setup an animation loop
        const render = () => {
          timeout = requestAnimationFrame(render);
          update();
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        render();
      }}
    />
  );
}