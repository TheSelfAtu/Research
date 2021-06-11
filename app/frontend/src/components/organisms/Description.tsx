import React, { useState, useEffect } from "react";
import { beepSound } from "../../Common/beepSound";

export function Description() {
  return (
    <div>
      <p>
        <strong>実験手引き</strong>
        <ul>
          <li>実験の問題では2つのボタンが表示されます</li>
          <li>
            ボタンにマウスを重ねると音が鳴ります(実験はPCで行ってください)
          </li>
          <li>
            音を聞いてより危険な操作が行われると感じるボタンをクリックしてください
          </li>
        </ul>
      </p>
      <p>
        <strong>実験準備</strong>
        <ul>
          <li>音量はうるさくないと感じる程度にあげてください。</li>
        </ul>
        <button onClick={() => beepSound("sawtooth", 440, 0.5)}>
          クリックすると0.5秒間音が なります。音量に注意してください。
        </button>
      </p>
      <p>
        <strong>注意事項</strong>
        <ul>
          <li>推奨ブラウザは「Google Chrome」です</li>
          <li>
            マウスを何度も重ねると音が鳴らなくなる場合があります。
            その時はしばらく時間をおいてからマウスを重ねると再び音が鳴ります。
          </li>
          <li>
            ボタンをクリックすると次の問題に進みます。連続でクリックすると次の問題に
            進んでしまうので注意してください。
          </li>
          <li>
            音は何度聞いても大丈夫です。しかし、次の問題に進むと前の問題に戻ることはできないので注意してください。
          </li>
        </ul>
      </p>
    </div>
  );
}
