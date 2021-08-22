import React, { useState, useEffect } from "react";
import { beepSound } from "../../Common/beepSound";

export function Canvas() {
  return (
    <div>
      <canvas id="canvas" width="255" height="255"></canvas>
    </div>
  );
}
