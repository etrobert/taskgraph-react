import React from 'react';
import { hot } from 'react-hot-loader';

import { Dependency } from '@/data';
import {
  Box,
  getBoxCenter,
  getExpandedBox,
  intersectLineBox,
} from '@/geometry';
import './GraphArrows.css';

function GraphArrows(props: {
  dependencies: Dependency[];
  taskBoxes: Map<number, Box>;
}) {
  const renderDependency = (dep: Dependency) => {
    const predecessorBox = props.taskBoxes.get(dep.predecessor);
    const successorBox = props.taskBoxes.get(dep.successor);
    if (!predecessorBox || !successorBox) return null;
    const predecessorCenter = getBoxCenter(predecessorBox);
    const successorCenter = getBoxCenter(successorBox);

    const offset = 10;
    const expandedPredecessorBox = getExpandedBox(predecessorBox, offset);
    const expandedSuccessorBox = getExpandedBox(successorBox, offset);

    const pathPointPredecessor = intersectLineBox(
      predecessorCenter,
      successorCenter,
      expandedPredecessorBox
    );
    const pathPointSuccessor = intersectLineBox(
      predecessorCenter,
      successorCenter,
      expandedSuccessorBox
    );
    if (!pathPointPredecessor || !pathPointSuccessor) return null;
    return (
      <path
        key={dep.predecessor + '->' + dep.successor}
        d={`M${pathPointPredecessor.x},${pathPointPredecessor.y}
            L${pathPointSuccessor.x},${pathPointSuccessor.y}`}
      />
    );
  };
  return (
    <svg className="GraphArrows">
      <defs>
        <marker
          id="GraphArrows__triangle"
          viewBox="0 0 5 5"
          refX="2"
          refY="2.5"
          markerWidth="2"
          markerHeight="2"
          orient="auto"
        >
          <path d="M 0 0 L 5 2.5 L 0 5 z" />
        </marker>
      </defs>
      {props.dependencies.map(renderDependency)}
    </svg>
  );
}

export default hot(module)(GraphArrows);
