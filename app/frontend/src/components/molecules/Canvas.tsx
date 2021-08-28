import React, { useState, useEffect } from "react";
import { beepSound } from "../../Common/beepSound";

interface CanvasProps {
  geneNumber: string;
}
export function Canvas(props: CanvasProps) {
  return (
    <div>
      <canvas id={props.geneNumber} width="255" height="255"></canvas>
    </div>
  );
}
