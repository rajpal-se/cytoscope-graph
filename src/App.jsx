import { useEffect, useRef, useState } from 'react';
import graphData from './assets/data.json';
import cytoscape from 'cytoscape';
import style from './assets/style';
import klay from 'cytoscape-klay';

cytoscape.use(klay);

var obj = {};
obj.includeNodes = false;
obj.includeEdges = false;
obj.includeLabels = false;
obj.includeMainLabels = false;
obj.includeSourceLabels = false;
obj.includeTargetLabels = false;
obj.includeOverlays = false;
obj.includeUnderlays = false;

function App() {
  const [data] = useState(graphData);
  const cy = useRef(null);
  const graph = useRef(null);

  const layout = {
    name: 'klay',
    nodeDimensionsIncludeLabels: true,
    klay: {
      direction: 'RIGHT',
      borderSpacing: 100,
      spacing: 10,
    },
  };
  useEffect(() => {
    // const cyto = cytoscape({ elements: graphData, container: graph.current });
    const cyto = cytoscape({
      elements: graphData,
      container: graph.current,
      // layout,
    });

    const els = cyto.elements();
    cyto.remove(els);

    (() => {
      graphData.nodes.forEach((node) => {
        cyto.add(node);
      });
      graphData.edges.forEach((edge) => {
        cyto.add(edge);
      });
    })();

    cyto.layout(layout).run();

    // cyto.forceRender();
    console.log(88);
    cy.current = cyto;
    cyto.autounselectify(true);
    // cyto.boxSelectionEnabled(true);
    console.log(cyto);
    cyto.style(style.style);
    cyto.elements().panify();
    cyto.nodes().ungrabify();
    cyto.autoungrabify(true);
    // cyto.panningEnabled(true);
    // cyto.selectionType('additive');
    console.log(cyto);
    console.log(cyto.elements());
    cyto.fit();
    // cyto.elements().map((a) => {
    //   // console.log((a._private.backgrounding = ));
    //   a.activate(function (node) {
    //     // If the node is active, deactivate it.
    //     if (node.isActivated()) {
    //       node.deactivate();
    //     }
    //   });
    // });

    // cyto._private.elements.boundingBox(obj);
    // cyto._private.elements.boundingBox(obj);
    // cyto._private.elements.boundingBox({
    //   includeOverlays: false,
    //   includeUnderlays: false,
    // });

    // cyto.on('render', function () {
    //   console.log(99);
    //   // Disable the renderedBoundingBox property.
    //   cyto.nodes().boundingBox(obj);
    //   cyto.edges().boundingBox(obj);
    // });
    cyto.on(
      'activate add beforeActivate beforeDeactivate beforeRemove click collapse cython deactivate destroy expand hover layout mousedown mouseenter mouseleave mouseout mouseup pan reset select selection tap zoom',
      function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        console.log(e);
        e.target._private.active = false;
      },
    );
    // setTimeout(() => {
    //   console.log('4 sec');
    //   // cyto.autounselectify(false);
    //   // cyto._private.elements.unselect();
    //   cyto.nodes().ungrabify();
    //   // cyto.
    // }, 4000);
    // cyto.fit();
  }, []);
  console.log(data);
  return (
    <div>
      <h1>Graph</h1>

      <div
        ref={graph}
        style={{
          height: '600px',
          width: '600px',
          border: '2px solid red',
          margin: 'auto',
          position: 'relative',
          padding: '20px',
        }}
      ></div>
    </div>
  );
}

export default App;
