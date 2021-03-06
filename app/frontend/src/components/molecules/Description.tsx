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
        <li>
          実験を開始する前にページを一回リロードしてください（URLの末尾と実験手順の目的の擬音語が一致していれば問題ないです。）
        </li>
        <ul>
          <li>例:URLの末尾が[pi]のときは【ピッ】</li>
          <li>例:URLの末尾が[bu-]のときは【ブー】</li>
        </ul>
        <li>ボタンを押すと音が再生されます。</li>
        <li className="font-size--md">
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
        <li>
          目的の擬音語に近いと感じる(適応度が高い)ほど<strong>高い数字</strong>
          を選んでください（候補は1から5）
        </li>
        <li>
          10個の入力欄に入力が完了したら、「回答を送信」ボタンを押してください。
        </li>
        <li>実験終了の通知があるまで上記の操作を繰り返してください。</li>
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
        <li>
          初めのうちは目的の擬音語に近い音は出にくいです。少しでも近いと思ったらほかの音より高い点数をつけてください。
        </li>
      </ul>
    </div>
  );
}
