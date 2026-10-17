// 新西兰南岛线路数据（价格单位：新西兰元 NZD，2026 旺季参考价，以实际预订为准）
// stay = 每人每晚住宿价格区间 [常规, 高端]（按两人一间均摊；常规 = 3–4 星酒店/汽车旅馆，高端 = 当地高端酒店/精品度假屋）
// 活动 p = 每人价格（0 = 免费；[低, 高] = 按档位的价格区间），d = 游玩时长，u = 官方网站，age = 年龄/身高/体重限制，hot = 强烈推荐

const PLACES = {
  chc: { name: '基督城', en: 'Christchurch', lat: -43.5321, lng: 172.6362, stay: [80, 300],
    intro: '南岛门户城市，"花园之城"，大多数游客在此落地取车。',
    acts: [
      { n: '雅芳河撑篙游船 Punting', p: 40, d: '30 分钟', t: '休闲', u: 'https://www.christchurchattractions.nz/punting/' },
      { n: '国际南极中心 Antarctic Centre', p: 69, d: '2–3 小时', t: '亲子', u: 'https://www.iceberg.co.nz' },
      { n: '植物园 + 哈格利公园漫步', p: 0, d: '1.5 小时', t: '自然' },
      { n: '复古电车环城游 Tram', p: 35, d: '1 小时', t: '城市', u: 'https://www.christchurchattractions.nz/christchurch-tram/' },
    ] },
  tek: { name: '蒂卡波湖', en: 'Lake Tekapo', lat: -44.0047, lng: 170.4772, stay: [100, 350],
    intro: '牛奶蓝湖水 + 好牧羊人教堂 + 世界级暗夜星空保护区，11–12 月鲁冰花盛开。',
    acts: [
      { n: '好牧羊人教堂 Church of the Good Shepherd', p: 0, d: '30 分钟', t: '打卡' },
      { n: '暗夜星空观星 Dark Sky Project', p: 165, d: '1.5 小时', t: '星空', u: 'https://www.darkskyproject.co.nz' },
      { n: '约翰山天文台徒步 Mt John', p: 0, d: '2 小时', t: '徒步' },
      { n: '蒂卡波温泉 Tekapo Springs', p: 40, d: '2 小时', t: '休闲', u: 'https://www.tekaposprings.co.nz' },
    ] },
  mtc: { name: '库克山', en: 'Aoraki / Mt Cook', lat: -43.7342, lng: 170.0960, stay: [150, 450],
    intro: '新西兰最高峰 3724 米，冰川、冰湖与高山步道。',
    acts: [
      { n: '胡克谷步道 Hooker Valley Track', p: 0, d: '3 小时', t: '徒步' },
      { n: '塔斯曼冰川湖游船 Glacier Explorers', p: [99, 219], d: '2.5 小时', t: '冰川', u: 'https://www.hermitage.co.nz/experience/glacier-explorer', age: '4 岁以上，4–9 岁须成人 1:1 陪同；需步行约 1.5 公里往返湖边' },
      { n: '直升机雪地降落观光', p: [220, 600], d: '20–55 分钟', t: '刺激', u: 'https://www.helicopter.co.nz', age: '不限年龄：0–3 岁婴儿坐成人腿上（15 公斤以下），4–14 岁儿童票；儿童须成人同行', hot: true },
      { n: '塔斯曼冰川直升机徒步 Tasman Glacier Heli Hike', p: [695, 945], d: '3.5 小时', t: '冰川', u: 'https://alpineguides.co.nz/trips/tasman-glacier-heli-hike', age: '10 岁以上，体重 120 公斤以下（含装备），每团至少 4 人', hot: true },
    ] },
  twz: { name: '特威泽尔', en: 'Twizel', lat: -44.2580, lng: 170.0990, stay: [80, 250],
    intro: '麦肯齐盆地暗夜保护区里的宁静小镇，紧邻普卡基湖，是住宿、看星空的理想据点。',
    acts: [
      { n: '普卡基湖彼得观景点 Peter’s Lookout（远眺库克山）', p: 0, d: '30 分钟', t: '打卡' },
      { n: '库克山高山三文鱼 Mt Cook Alpine Salmon', p: 30, d: '45 分钟', t: '美食', u: 'https://www.alpinesalmon.co.nz' },
      { n: '鲁阿塔尼瓦湖畔散步 Lake Ruataniwha', p: 0, d: '1 小时', t: '休闲' },
    ] },
  wan: { name: '瓦纳卡', en: 'Wanaka', lat: -44.7032, lng: 169.1321, stay: [100, 450],
    intro: '比皇后镇更安静的湖畔小镇，"孤独的树"所在地。',
    acts: [
      { n: '孤独的树 That Wanaka Tree', p: 0, d: '30 分钟', t: '打卡' },
      { n: '罗伊峰徒步 Roys Peak', p: 0, d: '5–6 小时', t: '徒步' },
      { n: '迷惑世界 Puzzling World', p: 25, d: '1.5 小时', t: '亲子', u: 'https://www.puzzlingworld.co.nz' },
      { n: '亲手驾驶飞机体验 U-Fly Wanaka（同行 1 人免费）', p: 408, d: '1 小时', t: '刺激', u: 'https://www.u-flywanaka.co.nz/trial-flight/lake-wanaka-trial-flight', age: '10 岁以上', hot: true },
      { n: '真枪射击体验 Real Guns NZ（卡德罗纳山谷）', p: 170, d: '2 小时', t: '刺激', age: '7 岁以上，7–14 岁须家长陪同', hot: true },
      { n: '瓦纳卡湖皮划艇', p: 70, d: '2 小时', t: '休闲', u: 'https://www.paddlewanaka.co.nz' },
    ] },
  zqn: { name: '皇后镇', en: 'Queenstown', lat: -45.0312, lng: 168.6626, stay: [110, 550],
    intro: '世界冒险之都，蹦极、喷射快艇发源地，湖光山色。',
    // p 可以是 [低, 高]：有多个档位（如跳伞高度、蹦极地点、蒸汽船套餐）的活动按区间计入总价
    acts: [
      { n: '天空缆车 + 斜坡滑车 Skyline Gondola & Luge', p: 95, d: '2 小时', t: '观景', u: 'https://www.skyline.co.nz/queenstown/' },
      { n: '沙特佛峡谷喷射快艇 Shotover Jet', p: 169, d: '1 小时', t: '刺激', u: 'https://www.shotoverjet.com' },
      { n: '蹦极 AJ Hackett Bungy', p: [245, 365], d: '1.5–3 小时', t: '刺激', u: 'https://www.bungy.co.nz', age: '10 岁以上（内维斯蹦极 13 岁以上），未满 15 岁须家长签字' },
      { n: '峡谷秋千 Swing', p: [219, 299], d: '1.5–3 小时', t: '刺激', u: 'https://www.bungy.co.nz', age: '10 岁以上，未满 15 岁须家长签字' },
      { n: '高空跳伞 NZONE Skydive', p: [319, 515], d: '3–4 小时', t: '刺激', u: 'https://www.nzoneskydive.co.nz', age: '6 岁以上，未满 18 岁须家长签字', hot: true },
      { n: '室内跳伞 iFLY Queenstown', p: [86, 160], d: '1 小时', t: '刺激', u: 'https://iflyqueenstown.co.nz', age: '3 岁以上' },
      { n: '双人滑翔伞 Tandem Paragliding', p: [268, 349], d: '1.5 小时', t: '刺激', age: '体重 20–100 公斤' },
      { n: '鲨鱼快艇 Hydro Attack', p: [155, 179], d: '30 分钟', t: '刺激', u: 'https://watersports.nz/hydro-attack', age: '6 岁以上，身高 190 厘米、体重 105 公斤以下' },
      { n: '激流漂流 Shotover River Rafting', p: [219, 289], d: '4–5 小时', t: '探险', u: 'https://www.realnz.com', age: '13 岁以上' },
      { n: '山地车 Skyline 缆车山地车公园', p: [65, 130], d: '半天', t: '运动', u: 'https://www.skyline.co.nz/queenstown/mountain-biking/' },
      { n: '皇后镇高尔夫 Queenstown Golf Club', p: [120, 175], d: '4–5 小时', t: '运动', u: 'https://www.queenstowngolf.co.nz' },
      { n: '厄恩斯劳号蒸汽船 TSS Earnslaw', p: [85, 179], d: '1.5–4 小时', t: '休闲', u: 'https://www.realnz.com/en/experiences/day-cruises/tss-earnslaw-lake-cruises/' },
      { n: 'Onsen 温泉 Onsen Hot Pools', p: [65, 110], d: '1 小时', t: '休闲', u: 'https://www.onsen.co.nz', age: '5 岁以下不可入场；5–11 岁仅限白天；晚间 12 岁以上' },
      { n: '米其林级高端餐厅（Amisfield 等）', p: [150, 320], d: '2–3 小时', t: '美食', u: 'https://amisfield.co.nz' },
      { n: '格林诺奇半日游（包车前往）Glenorchy', p: 0, d: '半天', t: '观景' },
      { n: '箭镇淘金小镇 Arrowtown', p: 0, d: '2 小时', t: '文化' },
    ] },
  tea: { name: '蒂阿瑙', en: 'Te Anau', lat: -45.4144, lng: 167.7180, stay: [80, 250],
    intro: '峡湾国家公园门户，前往米尔福德峡湾的最佳过夜点。',
    acts: [
      { n: '萤火虫洞 Te Anau Glowworm Caves', p: 119, d: '2.5 小时', t: '自然', u: 'https://www.realnz.com' },
      { n: '蒂阿瑙湖畔步道', p: 0, d: '1 小时', t: '休闲' },
    ] },
  mil: { name: '米尔福德峡湾', en: 'Milford Sound', lat: -44.6414, lng: 167.8974, stay: [0, 0],
    intro: '"世界第八大奇迹"，峡湾瀑布与海豹海豚，一日往返。',
    acts: [
      { n: '峡湾游船 Milford Sound Cruise', p: 119, d: '2 小时', t: '自然', u: 'https://www.realnz.com' },
      { n: '镜湖 Mirror Lakes（沿途）', p: 0, d: '20 分钟', t: '打卡' },
      { n: '峡湾皮划艇', p: 199, d: '4 小时', t: '探险', u: 'https://www.roscosmilfordkayaks.com' },
      { n: '峡湾观光飞机（回程飞皇后镇）', p: 599, d: '1.5 小时', t: '刺激', u: 'https://www.milfordflights.co.nz' },
    ] },
  kai: { name: '凯库拉', en: 'Kaikōura', lat: -42.4008, lng: 173.6814, stay: [80, 300],
    intro: '雪山直插大海，全年可观抹香鲸、海豚、海豹，龙虾闻名。',
    acts: [
      { n: '出海观鲸 Whale Watch', p: 175, d: '3.5 小时', t: '野生动物', u: 'https://www.whalewatch.co.nz' },
      { n: '与野生海豚共游 Dolphin Encounter', p: 240, d: '3 小时', t: '野生动物', u: 'https://www.dolphinencounter.co.nz', age: '下水 8 岁以上，未满 14 岁须成人同行' },
      { n: '海豹栖息地 Point Kean', p: 0, d: '1 小时', t: '野生动物' },
      { n: '海边龙虾餐', p: 70, d: '1 小时', t: '美食' },
    ] },
  aka: { name: '阿卡罗阿', en: 'Akaroa', lat: -43.8037, lng: 172.9680, stay: [90, 300],
    intro: '火山口海湾里的法式小镇，可出海看世界最小、最稀有的赫氏海豚。',
    acts: [
      { n: '黑猫号海湾游船（看赫氏海豚）Black Cat Cruise', p: 95, d: '2 小时', t: '野生动物', u: 'https://www.blackcat.co.nz' },
      { n: '与赫氏海豚共游 Swimming with Dolphins', p: 185, d: '2.5 小时', t: '野生动物', u: 'https://www.swimmingwithdolphins.co.nz' },
      { n: '法式小镇漫步 + 灯塔', p: 0, d: '1.5 小时', t: '城市' },
      { n: '鲑鱼 / 生蚝海鲜午餐', p: 50, d: '1 小时', t: '美食' },
    ] },
  oam: { name: '奥马鲁', en: 'Oamaru', lat: -45.0975, lng: 170.9704, stay: [70, 200],
    intro: '维多利亚式白石建筑小镇，蒸汽朋克之都，小蓝企鹅归巢。',
    acts: [
      { n: '小蓝企鹅归巢 Blue Penguin Colony', p: 45, d: '1.5 小时', t: '野生动物', u: 'https://www.penguins.co.nz' },
      { n: '蒸汽朋克总部 Steampunk HQ', p: 15, d: '1 小时', t: '文化', u: 'https://www.steampunkoamaru.co.nz' },
      { n: '维多利亚老城区漫步', p: 0, d: '1 小时', t: '城市' },
    ] },
  moe: { name: '摩拉基大圆石', en: 'Moeraki Boulders', lat: -45.3450, lng: 170.8260, stay: [0, 0],
    intro: '海滩上散落的巨大球形岩石，退潮时拍摄最佳。',
    acts: [
      { n: '摩拉基大圆石海滩', p: 0, d: '1 小时', t: '打卡' },
    ] },
  dun: { name: '但尼丁', en: 'Dunedin', lat: -45.8788, lng: 170.5028, stay: [70, 250],
    intro: '"南半球的爱丁堡"，苏格兰风情大学城，百年火车站与八角广场漫步即可游览。',
    acts: [
      { n: '八角广场 The Octagon（市中心）', p: 0, d: '30 分钟', t: '城市' },
      { n: '鲍德温斜坡 Baldwin Street（世界最陡街道）', p: 0, d: '30 分钟', t: '打卡' },
      { n: '但尼丁火车站 Dunedin Railway Station', p: 0, d: '30 分钟', t: '文化' },
      { n: '隧道海滩 Tunnel Beach', p: 0, d: '1.5 小时', t: '徒步' },
    ] },
  cat: { name: '卡特林斯', en: 'The Catlins', lat: -46.4500, lng: 169.6600, stay: [70, 200],
    intro: '原始海岸雨林，灯塔、瀑布、海狮与黄眼企鹅。',
    acts: [
      { n: '金块角灯塔 Nugget Point', p: 0, d: '1 小时', t: '打卡' },
      { n: '珀拉考努伊瀑布 Purakaunui Falls', p: 0, d: '30 分钟', t: '自然' },
      { n: '库里奥湾石化森林 Curio Bay', p: 0, d: '1 小时', t: '自然' },
    ] },
  ivc: { name: '因弗卡吉尔', en: 'Invercargill', lat: -46.4132, lng: 168.3538, stay: [60, 180],
    intro: '新西兰最南端城市，布拉夫生蚝产地，可远眺斯图尔特岛。',
    acts: [
      { n: '布拉夫斯特灵角路标 Stirling Point', p: 0, d: '30 分钟', t: '打卡' },
      { n: '布拉夫生蚝（3–8 月当季）', p: 40, d: '1 小时', t: '美食' },
      { n: 'E Hayes 五金店 / 世界最快的印第安摩托', p: 0, d: '45 分钟', t: '文化' },
    ] },
  art: { name: '亚瑟隘口', en: "Arthur's Pass", lat: -42.9420, lng: 171.5620, stay: [0, 0],
    intro: '穿越南阿尔卑斯山的高山隘口，可见啄羊鹦鹉 Kea。',
    acts: [
      { n: '魔鬼酒杯瀑布 Devil’s Punchbowl', p: 0, d: '1 小时', t: '徒步' },
      { n: '城堡山巨石阵 Castle Hill（途经）', p: 0, d: '45 分钟', t: '打卡' },
      { n: '高山观景火车 TranzAlpine（可替代该段驾车）', p: 189, d: '4.5 小时', t: '观景', u: 'https://www.greatjourneysnz.com/routes/tranzalpine/' },
    ] },
  gry: { name: '格雷茅斯', en: 'Greymouth', lat: -42.4499, lng: 171.2077, stay: [70, 200],
    intro: '西海岸最大城镇，淘金历史。',
    acts: [
      { n: '淘金镇 Shantytown', p: 39, d: '2 小时', t: '文化', u: 'https://www.shantytown.co.nz' },
      { n: '门泰斯啤酒厂 Monteith’s', p: 35, d: '1 小时', t: '美食', u: 'https://www.monteiths.co.nz', age: '品酒须年满 18 岁' },
    ] },
  pun: { name: '普纳凯基', en: 'Punakaiki', lat: -42.1080, lng: 171.3360, stay: [90, 300],
    intro: '千层饼岩与海水喷水洞，涨潮时最壮观。',
    acts: [
      { n: '千层饼岩 Pancake Rocks & Blowholes', p: 0, d: '1 小时', t: '自然' },
      { n: '普拉利特河步道 Pororari River Track', p: 0, d: '1.5 小时', t: '徒步' },
    ] },
  hok: { name: '霍基蒂卡', en: 'Hokitika', lat: -42.7167, lng: 170.9667, stay: [70, 220],
    intro: '新西兰绿玉之乡，蓝绿色峡谷与夕阳海滩。',
    acts: [
      { n: '霍基蒂卡峡谷 Hokitika Gorge', p: 0, d: '1 小时', t: '自然' },
      { n: '西海岸树顶步道 Treetop Walk', p: 45, d: '1 小时', t: '观景', u: 'https://www.treetopsnz.com' },
      { n: '亲手雕刻绿玉工作坊', p: 150, d: '4 小时', t: '文化', u: 'https://www.bonz-n-stonz.co.nz' },
      { n: '萤火虫谷 Glowworm Dell（夜间）', p: 0, d: '20 分钟', t: '自然' },
    ] },
  fra: { name: '弗朗茨约瑟夫冰川', en: 'Franz Josef', lat: -43.3890, lng: 170.1830, stay: [90, 300],
    intro: '冰川一直延伸到温带雨林，直升机冰川徒步首选地。',
    acts: [
      { n: '直升机冰川徒步 Heli Hike', p: 549, d: '3–4 小时', t: '刺激', u: 'https://www.franzjosefglacier.com', age: '9–10 岁以上（各公司规定不同），体重 35 公斤、身高 137 厘米以上', hot: true },
      { n: '冰川谷步道 Glacier Valley Walk', p: 0, d: '1.5 小时', t: '徒步' },
      { n: '雨林温泉 Glacier Hot Pools', p: 35, d: '1.5 小时', t: '休闲' },
      { n: '西海岸野生动物中心（看几维鸟）', p: 45, d: '1 小时', t: '野生动物', u: 'https://www.wildkiwi.co.nz' },
    ] },
  fox: { name: '福克斯冰川', en: 'Fox Glacier', lat: -43.4640, lng: 170.0170, stay: [80, 250],
    intro: '马瑟森湖倒映库克山与塔斯曼山的"镜湖"。',
    acts: [
      { n: '马瑟森湖环湖 Lake Matheson', p: 0, d: '1.5 小时', t: '打卡' },
      { n: '直升机雪地降落观光', p: 345, d: '30 分钟', t: '刺激', u: 'https://www.helicopter.co.nz', hot: true },
    ] },
  haa: { name: '哈斯特', en: 'Haast', lat: -43.8810, lng: 169.0420, stay: [0, 0],
    intro: '哈斯特山口，原始雨林与蓝色冰川池。',
    acts: [
      { n: '蓝池 Blue Pools', p: 0, d: '1 小时', t: '自然' },
      { n: '雷霆溪瀑布 Thunder Creek Falls', p: 0, d: '15 分钟', t: '打卡' },
      { n: '哈斯特河喷射快艇 Waiatoto River Safari', p: 229, d: '2 小时', t: '探险', u: 'https://www.riversafaris.co.nz' },
    ] },

  // ---------- 北岛 ----------
  akl: { island: 'N', name: '奥克兰', en: 'Auckland', lat: -36.8485, lng: 174.7633, stay: [100, 450],
    intro: '新西兰最大城市，"千帆之都"，北岛行程起点。',
    acts: [
      { n: '天空塔观景台 Sky Tower', p: 37, d: '1 小时', t: '观景', u: 'https://www.skycityauckland.co.nz/sky-tower/' },
      { n: '伊甸山火山口 Mt Eden', p: 0, d: '1 小时', t: '打卡' },
      { n: '海港大桥攀爬 Harbour Bridge Climb', p: 165, d: '1.5 小时', t: '刺激', u: 'https://www.bungy.co.nz/auckland/', age: '7 岁以上，14 岁及以下须成人陪同' },
      { n: '激流岛酒庄一日游 Waiheke Island（含渡轮）', p: 60, d: '5–6 小时', t: '美食', u: 'https://www.fullers.co.nz', age: '品酒须年满 18 岁' },
    ] },
  hob: { island: 'N', name: '霍比特村', en: 'Hobbiton (Matamata)', lat: -37.8722, lng: 175.6830, stay: [0, 0],
    intro: '《指环王》《霍比特人》电影拍摄地，44 个霍比特人洞屋与绿龙酒馆。',
    acts: [
      { n: '霍比特村电影拍摄地导览 Hobbiton Movie Set Tour', p: 120, d: '2 小时', t: '电影', u: 'https://www.hobbitontours.com' },
      { n: '霍比特村晚宴之旅 Evening Banquet Tour', p: 255, d: '4.5 小时', t: '美食', u: 'https://www.hobbitontours.com' },
    ] },
  rot: { island: 'N', name: '罗托鲁阿', en: 'Rotorua', lat: -38.1368, lng: 176.2497, stay: [80, 400],
    intro: '地热之城，间歇泉、泥浆池与毛利文化中心。',
    acts: [
      { n: '蒂普亚地热谷 + 毛利文化 Te Puia', p: 90, d: '2 小时', t: '文化', u: 'https://www.tepuia.com' },
      { n: '怀奥塔普地热公园 Wai-O-Tapu', p: 45, d: '1.5 小时', t: '自然', u: 'https://www.waiotapu.co.nz' },
      { n: '波利尼西亚温泉 Polynesian Spa', p: 45, d: '1.5 小时', t: '休闲', u: 'https://www.polynesianspa.co.nz' },
      { n: '天空缆车 + 滑车 Skyline Rotorua', p: 70, d: '2 小时', t: '观景', u: 'https://www.skyline.co.nz/rotorua/' },
      { n: '红木森林树顶步道 Redwoods Treewalk', p: 40, d: '1 小时', t: '自然', u: 'https://www.treewalk.co.nz' },
      { n: '塔玛基毛利村晚宴 Tamaki Māori Village', p: 255, d: '3.5 小时', t: '文化', u: 'https://te-pa-tu.com' },
    ] },
  tau: { island: 'N', name: '陶波', en: 'Taupō', lat: -38.6857, lng: 176.0702, stay: [80, 400],
    intro: '新西兰最大湖泊陶波湖，胡卡瀑布与汤加里罗火山国家公园门户。',
    acts: [
      { n: '胡卡瀑布 Huka Falls', p: 0, d: '30 分钟', t: '打卡' },
      { n: '胡卡瀑布喷射快艇 Huka Falls Jet', p: 159, d: '1 小时', t: '刺激', u: 'https://www.hukafallsjet.com' },
      { n: '陶波高空跳伞 Taupō Tandem Skydive', p: 399, d: '3 小时', t: '刺激', u: 'https://www.skydivetaupo.co.nz', age: '8 岁以上（更高高度 14 岁以上），未满 18 岁须家长签字' },
      { n: '毛利石刻游船 Māori Rock Carvings Cruise', p: 65, d: '2 小时', t: '文化', u: 'https://www.chrisjolly.co.nz' },
      { n: '汤加里罗高山徒步 Tongariro Alpine Crossing', p: 0, d: '7–8 小时', t: '徒步' },
    ] },
  wtm: { island: 'N', name: '怀托摩', en: 'Waitomo', lat: -38.2610, lng: 175.1040, stay: [80, 250],
    intro: '地下溶洞王国，乘小船穿过满天"星河"般的萤火虫洞。',
    acts: [
      { n: '怀托摩萤火虫洞参观 Waitomo Glowworm Caves', p: 75, d: '45 分钟', t: '自然', u: 'https://www.waitomo.com' },
      { n: '鲁阿库里溶洞 Ruakuri Cave', p: 105, d: '1.5 小时', t: '自然', u: 'https://www.waitomo.com' },
    ] },
};

// 每条线路：stops 为途经顺序（以基督城出发书写），nights 为每站住宿晚数（0 = 途经不住），
// legs[i] 为 stops[i] → stops[i+1] 的驾车时长（分钟）。
// type: 'main' 主线路（可切换基督城 / 皇后镇出发，自动反向或换起点）；'side' 单独行程（fixed = 固定出发城市）
// 免费星空 / 极光拍摄服务：只在南岛中线、东线、中线+东线的最终报价里显示
const STAR_SERVICE = {
  title: '免费星空 / 极光拍摄服务',
  text: '星空主要在特卡波和特威泽尔拍摄；极光除这两地外，还可能在奥马鲁、但尼丁、皇后镇和瓦纳卡拍摄。具体地点按当天天气和月相灵活安排，不是每地都拍。星空和极光受天气及极光指数影响，无法保证拍到。',
};

// 可住宿地点及可选晚数 [最少, 最多]；线路里 nights 为默认晚数，客人可在范围内调整
// 自由组合时，没有列在这里的地点默认可选 0–2 晚
const NIGHT_RANGE = {
  chc: [0, 3], tek: [1, 2], twz: [0, 2], wan: [0, 2], zqn: [1, 5],   // 0 = 可选不住
  dun: [0, 2], oam: [0, 2], fox: [1, 2], gry: [1, 2], kai: [0, 2], aka: [0, 2],
  akl: [0, 3], rot: [1, 3], tau: [0, 2],
  tea: [0, 1],   // 0 = 不住，米尔福德当天往返皇后镇
};

const ROUTES = [
  { id: 'central', type: 'main', starService: true, name: '中线', sub: '湖光雪山 · 经典首选', color: '#2f6fde',
    desc: '穿越麦肯齐盆地的蓝色湖泊，抵达库克山脚，再经瓦纳卡到皇后镇。南岛雪山湖泊精华最集中的一条线。',
    stops:  ['chc', 'tek', 'mtc', 'twz', 'wan', 'zqn'],
    nights: [1, 1, 0, 1, 1, 2],
    legs:   [180, 75, 50, 110, 60],
    legNotes: ['', '', '白天游览库克山，晚上回特威泽尔住宿看星空', '途经林迪斯山口 Lindis Pass', '经皇冠山公路 Crown Range'] },
  { id: 'east', type: 'main', starService: true, name: '东线', sub: '海岸野生动物 · 慢节奏', color: '#e2780e',
    desc: '沿太平洋海岸南下：奥马鲁企鹅、但尼丁苏格兰风情老城，再穿过中奥塔哥直达皇后镇。',
    stops:  ['chc', 'oam', 'dun', 'zqn'],
    nights: [1, 1, 1, 1],
    legs:   [210, 100, 225],
    legNotes: ['', '', '穿越中奥塔哥 Central Otago'] },
  { id: 'west', type: 'main', name: '西线', sub: '冰川雨林 · 越野风光', color: '#1a9c6b',
    desc: '翻越亚瑟隘口到塔斯曼海岸，一路南下：千层饼岩、绿玉之乡、两大冰川、哈斯特山口，抵达瓦纳卡与皇后镇。',
    stops:  ['chc', 'art', 'gry', 'pun', 'hok', 'fra', 'fox', 'haa', 'wan', 'zqn'],
    nights: [1, 0, 1, 0, 0, 0, 1, 0, 1, 2],
    legs:   [120, 90, 45, 75, 120, 30, 120, 135, 60],
    legNotes: ['途经城堡山', '', '', '', '', '', '', '哈斯特山口，沿途蓝池', '经皇冠山公路'] },
  { id: 'loop', type: 'main', starService: true, loop: true, name: '中线+东线', sub: '南岛环线 · 一次看全', color: '#7c3aed',
    desc: '中线与东线连成一个环：内陆走雪山湖泊，海岸看野生动物，起点终点同一城市，免去单程还车 / 回程机票的麻烦。',
    stops:  ['chc', 'tek', 'mtc', 'twz', 'wan', 'zqn', 'dun', 'oam', 'chc'],
    nights: [1, 1, 0, 1, 1, 2, 1, 1, 0],
    legs:   [180, 75, 50, 110, 60, 225, 100, 210],
    legNotes: ['', '', '白天游览库克山，晚上回特威泽尔住宿看星空', '途经林迪斯山口 Lindis Pass', '经皇冠山公路 Crown Range', '穿越中奥塔哥 Central Otago', '', ''] },
  // 北岛：三个固定套餐（晚数固定，不可调整）；去程途经霍比特村，回程途经怀托摩萤火虫洞（optionalStops：客人可选择不去）
  { id: 'north-rot-2d', type: 'north', fixed: 'akl', fixedNights: true, optionalStops: ['hob', 'wtm'], tab: '罗托鲁阿', name: '北岛 · 奥克兰-罗托鲁阿', sub: '2天1晚', color: '#c2410c',
    desc: '奥克兰出发，途经霍比特村电影拍摄地，晚上住罗托鲁阿；第二天看地热与毛利文化，回程参观怀托摩萤火虫洞后返回奥克兰。',
    stops:  ['akl', 'hob', 'rot', 'wtm', 'akl'],
    nights: [0, 0, 1, 0, 0],
    legs:   [140, 70, 120, 155],
    legNotes: ['途经马塔马塔 Matamata', '', '', ''] },
  { id: 'north-rot-3d', type: 'north', fixed: 'akl', fixedNights: true, optionalStops: ['hob', 'wtm'], tab: '罗托鲁阿', name: '北岛 · 奥克兰-罗托鲁阿', sub: '3天2晚', color: '#b45309',
    desc: '奥克兰出发，途经霍比特村电影拍摄地，在罗托鲁阿住两晚，从容游览地热公园、毛利文化村、红木森林和温泉，回程参观怀托摩萤火虫洞。',
    stops:  ['akl', 'hob', 'rot', 'wtm', 'akl'],
    nights: [0, 0, 2, 0, 0],
    legs:   [140, 70, 120, 155],
    legNotes: ['途经马塔马塔 Matamata', '', '', ''] },
  { id: 'north-tau-3d', type: 'north', fixed: 'akl', fixedNights: true, optionalStops: ['hob', 'wtm'], tab: '罗托鲁阿+陶波', name: '北岛 · 奥克兰-罗托鲁阿-陶波', sub: '3天2晚', color: '#9a3412',
    desc: '奥克兰出发，途经霍比特村，住罗托鲁阿一晚看地热与毛利文化；再到陶波湖住一晚，看胡卡瀑布；回程参观怀托摩萤火虫洞后返回奥克兰。',
    stops:  ['akl', 'hob', 'rot', 'tau', 'wtm', 'akl'],
    nights: [0, 0, 1, 1, 0, 0],
    legs:   [140, 70, 70, 125, 155],
    legNotes: ['途经马塔马塔 Matamata', '', '', '途经奥托罗昂加 Ōtorohanga', ''] },
];

// 加选行程：可以和南岛任意经典线路自由组合，插在线路经过枢纽城市（hub）的地方
const ADDONS = [
  { id: 'milford', hub: 'zqn', name: '米尔福德峡湾', sub: '从皇后镇往返',
    stops:  ['zqn', 'tea', 'mil', 'zqn'],
    nights: [0, 1, 0, 0],
    legs:   [120, 120, 225],
    legNotes: ['', '米尔福德公路，冬季需带防滑链', '可选择观光飞机返回皇后镇'] },
  { id: 'kaikoura', hub: 'chc', name: '凯库拉', sub: '从基督城往返 · 观鲸',
    stops:  ['chc', 'kai', 'chc'],
    nights: [0, 1, 0],
    legs:   [150, 150],
    legNotes: ['沿太平洋海岸公路', '原路返回基督城'] },
  { id: 'akaroa', hub: 'chc', name: '阿卡罗阿', sub: '从基督城往返 · 海豚小镇',
    stops:  ['chc', 'aka', 'chc'],
    nights: [0, 1, 0],
    legs:   [90, 90],
    legNotes: ['途经 Hilltop 观景点', ''] },
];

// 包车车型（每天价格，NZD）
const VEHICLES = [
  { id: 'benz-suv', name: '奔驰 SUV', pax: 2, bags: 2, price: 800, img: '🚙', note: '2 人 + 2 个 28 寸托运行李' },
  { id: 'rav4', name: '丰田 RAV4', pax: 2, bags: 2, price: 700, img: '🚗', note: '2 人 + 2 个 28 寸托运行李' },
  { id: 'v-class', name: '奔驰 V 级商务车', pax: 5, bags: 5, price: 1000, img: '🚐', note: '5 人 + 5 个 28 寸托运行李' },
];

// 报价咨询表单：客人提交后通过 Web3Forms 发邮件给我们
// accessKey 在 https://web3forms.com 用收件邮箱免费获取（Access Key 本身可公开，不会暴露邮箱地址）
const QUOTE_FORM = {
  accessKey: '71d88f11-8cbf-4f2c-9013-c9970375aecc',
  subject: '新西兰包车报价咨询',
  // 提交失败时的备用邮箱（拆开写，减少被爬虫抓取）
  fallbackEmail: ['goldeneast88', 'gmail.com'],
  // Web3Forms 免费版共用的 hCaptcha sitekey（需在 Web3Forms 后台把该表单的验证码设为 hCaptcha）
  // 备用通道 FormSubmit：激活后可把这里换成 FormSubmit 邮件里给的随机字符串，隐藏邮箱地址（留空则用 fallbackEmail）
  formsubmitId: '',
  hcaptchaSitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
};

// 淡旺季（按出行月份）。旺季：春节、圣诞节、十一黄金周、中国暑假、澳新学校假期
// 住宿价格按旺季填写，淡季按折扣计算；包车按上面的基础价，旺季加价、淡季减价
const SEASON = {
  offStayFactor: 0.8,   // 淡季住宿 8 折
  peakCarAdd: 100,     // 旺季每辆车每天 +$100
  offCarAdd: -50,      // 淡季每辆车每天 −$50
  months: {
    1:  { peak: true,  why: '春节（部分年份）· 圣诞新年 · 澳新暑假' },
    2:  { peak: true,  why: '春节 · 新西兰盛夏' },
    3:  { peak: false, why: '夏末初秋，游客减少' },
    4:  { peak: true,  why: '澳新学校假期 · 复活节' },
    5:  { peak: false, why: '深秋，人少景美' },
    6:  { peak: false, why: '初冬，滑雪季刚开始' },
    7:  { peak: true,  why: '中国暑假 · 澳新学校假期 · 滑雪季' },
    8:  { peak: true,  why: '中国暑假 · 滑雪季' },
    9:  { peak: false, why: '早春（月底起澳新学校假期）' },
    10: { peak: true,  why: '十一黄金周 · 澳新学校假期' },
    11: { peak: false, why: '春末，鲁冰花陆续开放' },
    12: { peak: true,  why: '圣诞节 · 澳新暑假 · 鲁冰花季' },
  },
};

// 空驶费：司导和车辆常驻基督城。行程不在基督城开始（需空驶过去）或不在基督城结束（需空驶回来），
// 每段空驶按每辆车收取 fee
const DEADHEAD = { base: 'chc', fee: 500 };

// 接送机：行程开始当天接机、结束当天送机（仅奥克兰 / 基督城 / 皇后镇）
// 包车满 minDays 天免费；不满按每辆车每趟收费
const AIRPORT = { minDays: 3, fee: { akl: 100, chc: 60, zqn: 60 } };

// 包车费用按区间计入总价（页面不显示单价）：每辆车每天 ± spread
const CHARTER_RANGE = { spread: 100 };
// 页面报价说明
const QUOTE_NOTE = '因受住宿预定，活动选择和其它不确定因素影响，最终报价将以最终方案决定';
