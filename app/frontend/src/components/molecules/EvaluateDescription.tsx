import React from "react";

interface DescriptionProps {
  gion: string;
}

export function Description(props: DescriptionProps) {
  return (
    <div className="mt--md">
      <h1>実験概要</h1>
      <h2>実験手順</h2>
      <ul>
        <li>ボタンを押すと音が再生されます。</li>
        <li>
          再生された音が「{props.gion}
          」という擬音語にどれだけ近いと感じたか選択欄から選択してください。
        </li>
        <li>
          擬音語への近さは「音の長さ」、「音色」の観点から評価してください。
          <ul>
            <li>例:「ピッ」、「ピー」、「ピーン」は区別する</li>
            <li>例:「ブッ」、「ブー」、「ブーン」は区別する</li>
            <li>例:「ピッ」と「ビッ」、「プッ」と「ブッ」は区別する</li>
          </ul>
        </li>
        <li>入力が完了したら、「回答を送信」ボタンを押してください。</li>
      </ul>
      <h2>注意</h2>
      <ul>
        <li>実験前に下記の名前、年齢、性別入力欄に入力をしてください</li>
        <li>名前は英小文字、英大文字での記入としてください</li>
        <li>
          名前は本名でなくても構いませんが、
          <strong>すべての実験で同じ名前を使用してください。</strong>
        </li>
        <li>
          ボタンをクリックすると音が再生されます。音量に注意してください。
        </li>
        <li>周りに雑音がない環境で実験を開始してください</li>
      </ul>
    </div>
  );
}