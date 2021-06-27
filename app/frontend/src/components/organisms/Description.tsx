import React, { useState, useEffect } from "react";
import { beepSound } from "../../Common/beepSound";

export function Description() {
  return (
    <div>
      <strong>実験手引き</strong>
      <ul>
        <li>実験の問題では2つのボタンが表示されます</li>
        <li>ボタンにマウスを重ねると音が鳴ります(実験はPCで行ってください)</li>
        <li>それぞれの問題に対して点数をつけてください</li>
      </ul>
      <strong>点数のつけ方</strong>
      <ul>
        <li>
          左のボタンで行われる操作が
          右のボタンで行われる操作に比べ危険だと感じれば 2 点{" "}
        </li>
        <li>
          左のボタンで行われる操作の方がどちらかと言えば、危険だと感じれば 1 点
        </li>
        <li>危険さの違いを感じなければ 0点</li>
        <li>
          右のボタンで行われる操作の方がどちらかと言えば、危険だと感じれば -1 点
        </li>
        <li>
          {" "}
          右のボタンで行われる操作が
          左のボタンで行われる操作に比べ危険だと感じれば -2 点{" "}
        </li>
      </ul>
      <strong>実験準備</strong>
      <ul>
        <li>音量はうるさくないと感じる程度にあげてください。</li>
      </ul>
      <audio src="static/sounds/sawtooth880Hz.wav" id="test"></audio>
      <button
        onClick={() => {
          let audioElement;
          audioElement = document.getElementById("test") as HTMLAudioElement;
          audioElement.currentTime = 0;
          audioElement.play();
        }}
      >
        音量チェック。音量に注意してください。
      </button>
      <br></br>
      <strong>注意事項</strong>
      <ul>
        <li>推奨ブラウザは「Google Chrome」です</li>
        <li>
          マウスを何度も重ねると音が鳴らなくなる場合があります。
          その時はしばらく時間をおいてからマウスを重ねると再び音が鳴ります。
        </li>
        <li>
          すべての質問に答えたら「結果を送信する]ボタンを押してください(ページの最後にあります)
        </li>
        <li>音は何度聞いても大丈夫です。</li>
      </ul>
    </div>
  );
}
