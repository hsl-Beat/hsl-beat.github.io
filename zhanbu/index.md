<!DOCTYPE html>
<html>
<head>
    <title>运势占卜</title>
    <meta charset="utf-8">
    <style>
        /* 基础样式 */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }

        /* 按钮样式 */
        #fortune-button {
            padding: 15px 30px;
            font-size: 18px;
            color: white;
            background-color: #6c5ce7;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        #fortune-button:hover {
            background-color: #5a4fcf;
            transform: translateY(-2px);
        }

        #fortune-button:active {
            transform: translateY(0);
        }

        /* 运势卡片容器 */
        .fortune-container {
            display: none; /* 初始隐藏 */
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 100%;
            text-align: center;
        }

        /* 主要运势 */
        .main-fortune {
            font-size: 32px;
            font-weight: bold;
            color: #6c5ce7;
            margin-bottom: 30px;
        }

        /* 宜和忌的容器 */
        .fortune-details {
            display: flex;
            justify-content: space-between;
            gap: 20px;
        }

        /* 宜和忌的样式 */
        .fortune-item {
            flex: 1;
            padding: 20px;
            border-radius: 15px;
            background: #f8f9fa;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .fortune-item h3 {
            font-size: 20px;
            margin-bottom: 15px;
            color: #6c5ce7;
        }

        .fortune-item p {
            font-size: 16px;
            color: #555;
            margin: 0 0 10px 0;
        }

        /* 宜的特殊样式 */
        .yi {
            border-left: 5px solid #00b894;
        }

        /* 忌的特殊样式 */
        .ji {
            border-left: 5px solid #ff7675;
        }
    </style>
</head>
<body>
    <!-- 初始按钮 -->
    <button id="fortune-button">占卜运势</button>

    <!-- 运势卡片 -->
    <div class="fortune-container" id="fortune-container">
        <div class="main-fortune" id="main-fortune"></div>
        <div class="fortune-details">
            <!-- 宜的内容 -->
            <div class="fortune-item yi">
                <h3>宜</h3>
                <p id="yi-content-1"></p>
                <p id="yi-shi-content-1"></p>
                <p id="yi-content-2"></p>
                <p id="yi-shi-content-2"></p>
            </div>
            <!-- 忌的内容 -->
            <div class="fortune-item ji">
                <h3>忌</h3>
                <p id="ji-content-1"></p>
                <p id="ji-shi-content-1"></p>
                <p id="ji-content-2"></p>
                <p id="ji-shi-content-2"></p>
            </div>
        </div>
    </div>

    <script>
        // 数据
        const w_list = [2, 4, 15, 15, 16, 16, 25, 7, 5];
        const names = ["超级凶", "大凶", "中平", "小平", "小凶", "中吉", "小吉", "超级吉", "中凶"];
        
        const yi_list = [
            ["宜:诸事不宜","宜:诸事不宜","宜:诸事不宜","宜:诸事不宜"],
            ["宜:装弱","宜:窝在家里","宜:刷题","宜:吃饭"],
            ["宜:玩Phigros","宜:开电脑","宜:写作业","宜:睡觉"],
            ["宜:写博客","宜:出去玩","宜:洗澡","宜:吃饭"],
            ["宜:学习","宜:研究Linux","宜:研究c++","宜:玩逃生"],
            ["宜:膜拜大神","宜:扶老奶奶过马路","宜:摸鱼","宜:参加比赛"],
            ["宜:抽卡","宜:玩原神","宜:打开洛谷","宜:出行"],
            ["宜:写程序","宜:刷题","宜:上课","宜:看B站"],
            ["宜:扶老奶奶过马路","宜:上课","宜:写作业","宜:写程序"]
        ];

        const yi_shi_list = [
            ["","","",""],
            ["谦虚最好了","不出门没有危险","直接AC","吃的饱饱的再学习"],
            ["Rks++","微信和QQ饶了你一命","拿捏","做个好梦"],
            ["阅读量100+","真开心","洗香香","吃饱了"],
            ["都会","有了新发现","发现新大陆","成功贴贴"],
            ["接受神之沐浴","增加RP","真开心","RP++"],
            ["一发入魂","单发出满命up角色","发现AC的题变多了","路途顺畅"],
            ["不会报错","直接TLE","100%消化","放松身心"],
            ["增加RP","听懂了","都会","没有Bug"]
        ];

        const ji_list = [
            ["忌:诸事不宜","忌:诸事不宜","忌:诸事不宜","忌:诸事不宜"],
            ["忌:玩Phigros","忌:出行","忌:开电脑","忌:上厕所"],
            ["忌:关电脑","忌:摸鱼","忌:纳财","忌:考试"],
            ["忌:膜拜大神","忌:评论","忌:玩原神","忌:吃方便面"],
            ["忌:发朋友圈","忌:打开洛谷","忌:研究C++","忌:出行"],
            ["忌:玩黑暗欺骗","忌:发视频","忌:发博客","忌:给别人点赞"],
            ["忌:写程序","忌:过度思考","忌:装弱","忌:上CSDN"],
            ["忌:使用社交软件","忌:刷题","忌:玩原神","忌:和别人分享你的程序"],
            ["忌:纳财","忌:学习","忌:思考","忌:检测Bug"]
        ];

        const ji_shi_list = [
            ["","","",""],
            ["Rks--","路途也许坎坷","自动更新，系统文件更没了","没纸"],
            ["关了半天关不了","被发现了","你没有财运","没及格"],
            ["被人嘲笑","被喷","被剧情刀到崩溃","只有一包调味料"],
            ["被人当成买面膜的","成功获得大凶","崩溃了","路途坎坷"],
            ["被吓尿","被人喷","阅读量1","被人嘲笑"],
            ["RE但是找不到原因","emo了","被人看穿","发现都是垃圾"],
            ["被别人陷害","WA自动机","歪了","别人发现了Bug"],
            ["没有财运","无法集中注意力","无法集中注意力","503个Bug"]
        ];

        // 随机函数
        function rd(a, b) {
            return Math.floor(Math.random() * (b - a + 1)) + a;
        }

        // 占卜逻辑
        function getFortune() {
            let w_sum = w_list.reduce((a, b) => a + b, 0);
            let randVal = Math.floor(Math.random() * w_sum);
            let rward = 0;
            
            for(let i = 0; i < w_list.length; i++) {
                if(randVal <= w_list[i]) {
                    rward = i;
                    break;
                }
                randVal -= w_list[i];
            }

            // 随机选择 2 个宜和 2 个忌
            const yiIndex1 = rd(0, 3);
            const yiIndex2 = (yiIndex1 + rd(1, 3)) % 4; // 确保不重复
            const jiIndex1 = rd(0, 3);
            const jiIndex2 = (jiIndex1 + rd(1, 3)) % 4; // 确保不重复

            return {
                name: names[rward],
                yi1: yi_list[rward][yiIndex1],
                yiShi1: yi_shi_list[rward][yiIndex1],
                yi2: yi_list[rward][yiIndex2],
                yiShi2: yi_shi_list[rward][yiIndex2],
                ji1: ji_list[rward][jiIndex1],
                jiShi1: ji_shi_list[rward][jiIndex1],
                ji2: ji_list[rward][jiIndex2],
                jiShi2: ji_shi_list[rward][jiIndex2]
            };
        }

        // 绑定按钮点击事件
        document.getElementById("fortune-button").addEventListener("click", () => {
            const fortune = getFortune();

            // 更新内容
            document.getElementById("main-fortune").textContent = fortune.name;
            document.getElementById("yi-content-1").textContent = fortune.yi1;
            document.getElementById("yi-shi-content-1").textContent = fortune.yiShi1;
            document.getElementById("yi-content-2").textContent = fortune.yi2;
            document.getElementById("yi-shi-content-2").textContent = fortune.yiShi2;
            document.getElementById("ji-content-1").textContent = fortune.ji1;
            document.getElementById("ji-shi-content-1").textContent = fortune.jiShi1;
            document.getElementById("ji-content-2").textContent = fortune.ji2;
            document.getElementById("ji-shi-content-2").textContent = fortune.jiShi2;

            // 显示运势卡片
            document.getElementById("fortune-container").style.display = "block";
            document.getElementById("fortune-button").style.display = "none";
        });
    </script>
</body>
</html>