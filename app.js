const LIFF_ID = "2011248919-qSr0JfnE";

const STORAGE_KEY =
  "nanyo_soccer_quiz_official_final_20260825_2131";

const GACHA_KEY =
  "nanyo_soccer_quiz_gacha_v3";

const TOTAL_GACHA = 1000;


const questions = [
  {
    question:
`守備側Aが、意図的に足で味方のゴールキーパーへボールを蹴った。
ゴールキーパーは自陣ペナルティーエリア内で、そのボールを手でキャッチした。
正しい判定は？`,

    choices:[
      "A. そのままプレーを続ける",
      "B. 相手チームのペナルティーキック",
      "C. 相手チームの間接フリーキック",
      "D. 相手チームのコーナーキック"
    ],

    correct:2,

    answer:
      "正解：C　相手チームの間接フリーキック",

    explanation:
`味方競技者が意図的に足でゴールキーパーへ蹴ったボールを、
ゴールキーパーが自陣ペナルティーエリア内で手や腕で扱うと反則になります。

相手チームに間接フリーキックが与えられます。`
  },

  {
    question:
`ゴールキーパーが自陣ペナルティーエリア内で、
手や腕でボールを8秒を超えてコントロールした場合、
正しい判定は？`,

    choices:[
      "A. 相手チームの間接フリーキック",
      "B. 相手チームのコーナーキック",
      "C. 相手チームのペナルティキック",
      "D. ドロップボール"
    ],

    correct:1,

    answer:
      "正解：B　相手チームのコーナーキック",

    explanation:
`ゴールキーパーが手や腕でボールを8秒を超えてコントロールした場合、
相手チームにコーナーキックが与えられます。`
  },

  {
    question:
`次のうち、オフサイドポジションにいる攻撃側競技者が
味方から直接ボールを受けた場合、
オフサイドの反則になる可能性があるものはどれ？`,

    choices:[
      "A. ゴールキック",
      "B. コーナーキック",
      "C. スローイン",
      "D. 間接フリーキック"
    ],

    correct:3,

    answer:
      "正解：D　間接フリーキック",

    explanation:
`ゴールキック・コーナーキック・スローインから直接ボールを受けた場合は、
オフサイドになりません。

間接フリーキックにはオフサイドの適用があります。`
  },

  {
    question:
`攻撃側Aが前方へパスを出した瞬間、
攻撃側Bはオフサイドポジションにいた。

守備側Cは時間と距離に余裕がある状態で
自らボールを蹴ってクリアしようとした。

しかしキックをミスし、
ボールは攻撃側Bのところへ渡った。

攻撃側Bはそのままシュートして得点した。

正しい判定は？`,

    choices:[
      "A. オフサイド判定、守備側の間接フリーキック",
      "B. ゴールを認める",
      "C. ドロップボールで再開",
      "D. オフサイド判定、守備側の直接フリーキック"
    ],

    correct:1,

    answer:
      "正解：B　ゴールを認める",

    explanation:
`守備側Cは意図的にボールをプレーしているため、
結果的にミスキックでも「意図的なプレー」と判断できます。

そのため攻撃側Bはオフサイドの反則になりません。`
  },

  {
    question:
`守備側Aが自陣ペナルティーエリア内で、
相手のクロスボールをクリアしようと足を出した。

ボールは守備側A自身の足に当たった直後、
自然な位置にあった腕に触れた。

腕をボールの方向へ動かしておらず、
身体を不自然に大きくしていなかった。

正しい判定は？`,

    choices:[
      "A. ハンドの反則、攻撃側のペナルティーキック",
      "B. ハンドの反則、攻撃側の間接フリーキック",
      "C. 反則ではない。プレーを続ける",
      "D. ドロップボールで再開する"
    ],

    correct:2,

    answer:
      "正解：C　反則ではない。プレーを続ける",

    explanation:
`ボールが手や腕に触れたという事実だけで、
すべてハンドの反則になるわけではありません。

このケースでは反則とはならず、プレー続行です。`
  }
];


const prizes = [
  { rank:"🎊 特賞", name:"スペシャル賞", count:5 },
  { rank:"🥇 1等", name:"1等賞", count:20 },
  { rank:"🥈 2等", name:"2等賞", count:75 },
  { rank:"🥉 3等", name:"3等賞", count:200 },
  { rank:"⚽ 参加賞", name:"参加賞", count:700 }
];


const app =
  document.getElementById("app");


let cleared = [];


try{
  const saved =
    JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

  if(Array.isArray(saved)){
    cleared = saved.filter(
      n => Number.isInteger(n) && n >= 1 && n <= 5
    );
  }

}catch(e){
  cleared = [];
}


cleared = [...new Set(cleared)];


function saveCleared(){
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(cleared)
  );
}


function logoHTML(){
  return `
    <img
      src="./nanyo.png"
      class="logo"
      id="secretLogo"
      alt="南陽FC"
    >
  `;
}


function stampHTML(){

  let html =
    '<div class="balls">';

  for(let i=1; i<=5; i++){

    if(cleared.includes(i)){
      html += '<span class="ball done">⚽</span>';
    }else{
      html += '<span class="ball">⚽</span>';
    }

  }

  html += '</div>';

  return html;
}


function getGachaResult(){

  try{

    const data =
      localStorage.getItem(GACHA_KEY);

    return data
      ? JSON.parse(data)
      : null;

  }catch(e){

    return null;

  }

}


function drawPrize(){

  const random =
    Math.floor(
      Math.random() * TOTAL_GACHA
    ) + 1;

  let total = 0;

  for(const prize of prizes){

    total += prize.count;

    if(random <= total){
      return prize;
    }

  }

  return prizes[prizes.length - 1];
}


function createConfetti(){

  const icons =
    ["🎉","✨","⭐","⚽","🎊"];

  for(let i=0; i<30; i++){

    const item =
      document.createElement("div");

    item.className =
      "confetti";

    item.textContent =
      icons[
        Math.floor(
          Math.random() * icons.length
        )
      ];

    item.style.left =
      Math.random() * 100 + "vw";

    item.style.fontSize =
      14 + Math.random() * 16 + "px";

    item.style.animationDuration =
      2 + Math.random() * 2 + "s";

    document.body.appendChild(item);

    setTimeout(
      () => item.remove(),
      4500
    );
  }
}


function gachaHTML(){

  if(cleared.length !== 5){
    return "";
  }

  const result =
    getGachaResult();

  if(result){

    return `
      <div class="gacha-area">

        <div class="gacha-title">
          🎁 ガチャ結果
        </div>

        <div class="prize">

          <div class="prize-rank">
            ${result.rank}
          </div>

          <div class="prize-name">
            ${result.name}
          </div>

        </div>

        <div class="used-message">
          ガチャは抽選済みです。
        </div>

      </div>
    `;
  }


  return `
    <div class="gacha-area">

      <div class="gacha-title">
        🎉 全問クリアガチャ
      </div>

      <div class="gacha-sub">
        全問正解おめでとう！<br>
        1回だけガチャに挑戦できます。
      </div>

      <div
        class="gacha-machine"
        id="gachaMachine"
      >
        🎰
      </div>

      <button
        class="gacha-button"
        id="gachaButton"
        onclick="playGacha()"
      >
        ガチャを回す！
      </button>

      <div
        class="gacha-result"
        id="gachaResult"
      ></div>

    </div>
  `;
}


window.playGacha =
function(){

  if(cleared.length !== 5){
    return;
  }

  if(getGachaResult()){
    alert("ガチャはすでに抽選済みです。");
    return;
  }

  const machine =
    document.getElementById("gachaMachine");

  const button =
    document.getElementById("gachaButton");

  const resultBox =
    document.getElementById("gachaResult");


  if(!machine || !button || !resultBox){
    return;
  }


  machine.classList.add("spinning");

  button.disabled = true;

  button.textContent =
    "ガチャガチャ中…";


  setTimeout(
    function(){

      machine.classList.remove("spinning");

      const prize =
        drawPrize();

      const result = {
        rank:prize.rank,
        name:prize.name
      };


      localStorage.setItem(
        GACHA_KEY,
        JSON.stringify(result)
      );


      resultBox.innerHTML =
        `
        <div class="prize">

          <div class="prize-rank">
            ${prize.rank}
          </div>

          <div class="prize-name">
            ${prize.name}
          </div>

          <p>
            この画面をスタッフにお見せください。
          </p>

        </div>
        `;


      button.style.display =
        "none";

      createConfetti();

    },
    1800
  );
};


function setupSecretReset(){

  const logo =
    document.getElementById("secretLogo");

  if(!logo){
    return;
  }

  let taps = 0;
  let timer = null;


  logo.addEventListener(
    "click",
    function(){

      taps++;

      clearTimeout(timer);

      timer =
        setTimeout(
          () => taps = 0,
          3000
        );


      if(taps >= 7){

        taps = 0;

        const ok =
          confirm(
            "【テスト用】ガチャ履歴をリセットしますか？"
          );


        if(ok){

          localStorage.removeItem(
            GACHA_KEY
          );

          alert(
            "ガチャ履歴をリセットしました。"
          );

          showTop();
        }
      }
    }
  );
}


function showTop(){

  const count =
    cleared.length;


  app.innerHTML =
    logoHTML() +

    `
      <h1>
        クイズラリー
      </h1>

      <p>
        会場に設置されたQRコードを読み取って、
        サッカールールクイズに挑戦しよう！
      </p>

      <button
        class="scan-button"
        onclick="scanQR()"
      >
        📷 QRコードを読み取る
      </button>

      <div class="stamp-title">
        現在の取得スタンプ
      </div>

      ${stampHTML()}

      <div class="count">
        ${count} / 5
      </div>

      ${
        count < 5
        ?
        `
          <div class="remaining">
            あと ${5-count} ポイント！
          </div>
        `
        :
        `
          <div class="complete">
            🎉 全問クリア！
          </div>
        `
      }

      ${gachaHTML()}

      <div class="note">
        ※各ポイントのQRコードを読み取って
        クイズに挑戦してください。
      </div>
    `;


  setupSecretReset();
}


function showQuestion(number){

  const q =
    questions[number - 1];


  app.innerHTML =
    logoHTML() +

    `
      <div class="point">
        POINT ${number} / 5
      </div>

      ${stampHTML()}

      <div class="question">
        ${q.question}
      </div>

      <div id="choices"></div>

      <div id="message"></div>

      <button
        class="home-button"
        onclick="backHome()"
      >
        ← トップページに戻る
      </button>
    `;


  setupSecretReset();


  const choices =
    document.getElementById("choices");


  q.choices.forEach(
    function(text,index){

      const button =
        document.createElement("button");

      button.className =
        "choice";

      button.textContent =
        text;


      button.onclick =
        function(){

          const message =
            document.getElementById("message");


          if(index !== q.correct){

            message.innerHTML =
              `
              <p class="wrong">
                ❌ 不正解！
                もう一度挑戦してください。
              </p>
              `;

            return;
          }


          if(!cleared.includes(number)){

            cleared.push(number);

            cleared.sort(
              (a,b) => a-b
            );

            saveCleared();
          }


          choices
            .querySelectorAll("button")
            .forEach(
              btn => btn.disabled = true
            );


          message.innerHTML =
            `
            <p class="correct">
              ⭕ 正解！<br>
              サッカーボールスタンプ獲得 ⚽
            </p>

            ${stampHTML()}

            <div class="explanation">

              <strong>
                ${q.answer}
              </strong>

              <br><br>

              <strong>
                解説
              </strong>

              <br>

              ${q.explanation}

            </div>

            ${
              cleared.length === 5
              ?
              `
                <div class="complete">
                  🎉 全問クリア！<br>
                  トップページでガチャに挑戦しよう！
                </div>
              `
              :
              `
                <p>
                  次のQRポイントを探してください。
                </p>
              `
            }
            `;


          createConfetti();
        };


      choices.appendChild(button);
    }
  );
}


window.backHome =
function(){

  window.location.href =
    window.location.pathname;

};


let liffReady = false;


async function initLiff(){

  try{

    await liff.init({
      liffId:LIFF_ID
    });

    liffReady = true;

  }catch(error){

    console.log(error);
  }
}


window.scanQR =
async function(){

  try{

    if(!liffReady){

      await liff.init({
        liffId:LIFF_ID
      });

      liffReady = true;
    }


    if(!liff.isInClient()){

      alert(
        "QRコードの読み取りはLINEアプリ内からご利用ください。"
      );

      return;
    }


    const result =
      await liff.scanCodeV2();


    if(!result || !result.value){
      return;
    }


    const url =
      new URL(
        result.value.trim()
      );


    const number =
      parseInt(
        url.searchParams.get("q"),
        10
      );


    if(
      url.hostname !== "nanyofc.github.io"
      ||
      !url.pathname.startsWith("/soccer-quiz")
      ||
      !Number.isInteger(number)
      ||
      number < 1
      ||
      number > 5
    ){

      alert(
        "このQRコードはクイズラリー用ではありません。"
      );

      return;
    }


    window.location.href =
      window.location.pathname +
      "?q=" +
      number;


  }catch(error){

    console.log(error);
  }
};


function start(){

  const params =
    new URLSearchParams(
      window.location.search
    );

  const number =
    parseInt(
      params.get("q") || "0",
      10
    );


  if(number >= 1 && number <= 5){

    showQuestion(number);

  }else{

    showTop();
  }


  initLiff();
}


start();
