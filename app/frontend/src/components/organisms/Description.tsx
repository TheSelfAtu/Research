import React, { useState, useEffect } from "react";

export function Description(){
    return (
        <div>
            <p>
            実験ではボタンにマウスを重ねた際に音がなります。
            その音を聞きどちらのボタンを押すと危険な操作が行われるかを
            考え、危険だと思われるボタンをクリックしてください。
            </p>
            <p><strong>マウスを何度も重ねると音が鳴らなくなる場合があります。
                その時はしばらく時間をおいてからマウスを重ねると再び音が鳴ります。</strong></p>
        </div>
    )
}