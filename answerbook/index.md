<script>

  window.$ = function (selector) {
    return document.querySelector(selector);
  }
  
  let 答案 = ["勇敢去做",
  "会有好结果的","抓紧机会","放心，会有好结果的","做好当下","乐观的对待这件事情","停止忧虑，不会出差错的","跟随直觉","首先，满足自己","不妨问问专家的意见","不要犹豫","毫不保留的去做","你可以的","会付出你的时间","当然","对","和太阳东升西落一样，是必然的","不妨再生成一次答案？","肯定是对的啊","不然呢","不要担心了，会好起来的","事情会按照你想的发展的，所以要乐观"
  ]
  
  function 随便取一句(列表){
      let 坐标 = Math.floor( Math.random() * 列表.length );
      return 列表[坐标];
  }
  
  function 生成答案(){
    let 结果 = []
    let 随便取 = 随便取一句(答案);
    结果.push(随便取);
      let 排版 = "<div>" + 结果.join("</div><div>") + "</div>";
      $("#结果").innerHTML = 排版;
  }
  </script>
  <style>
    html{
      font-size: 1.3vw;
      color: #333333;
    }
    body{
      margin: 0;
    }
    #主体{
      border: 2px solid #333333;
      margin: 20px;
      padding: 20px;
      background: #ffffff;
    }
    #标题{
      font-size: 1.9rem;
      line-height: 1.9rem;
      text-align: center;
    }
    #主题{
      text-align: center;
      margin-top: 20px;
      font-size: 0px;
    }
    #主题 p{
      font-size: 1rem;
      vertical-align: baseline;
      margin-left: 20px;
      margin-right: 20px;
    }
    #主题 button{
      border: 0;
      height: 50px;
      width: 120px;
      margin: 0;
      font-size: 1rem;
      background: #454545;
      color: #efefef;
    }
    #结果 div{
      margin-top: 20px;
      text-align: center;
      font-size: 1.5em;
      color: red;
    }
  </style>
  <div id="主体">
    <div id="标题">答案之书</div>
    <div id="主题">
    <p>先心里默想一个问题10秒，然后点击按钮，我会告诉你真理（仅供娱乐）</p>
    <button onclick="生成答案()">答案</button>
    </div>
    <div id="结果"></div>
  </div>