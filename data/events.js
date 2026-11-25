// =============================================================
//  イベントデータ
//  新しいイベントはこの配列に1件ずつ追加してください。
//
//  id        : 重複しない英数字
//  title     : イベント名
//  start/end : 開催期間（YYYY-MM-DD）。1日だけなら同じ日付
//  dateText  : 日付をそのまま表示したい場合（「例年1月中旬」など）。省略可
//  status    : "confirmed"（日程発表済み） / "tentative"（予定・例年の情報）
//  area      : "北部" | "中部" | "南部" | "那覇" | "離島" | "県内各地"
//  city      : 市町村
//  venue     : 会場
//  lat/lng   : 会場の緯度・経度（地図のピン）。わからなければ書かない（地図に出ないだけで一覧には出る）
//              国土地理院の住所検索 https://msearch.gsi.go.jp/address-search/AddressSearch?q=住所 などで調べる
//  price     : "無料" | "有料" | "一部有料" | "要確認"
//  age       : 対象年齢のメモ（省略可）
//  tags      : 祭り / イルミネーション / 体験 / 花 / 伝統文化 / 動物 / 花火 / スポーツ / 国際交流
//  summary   : 1〜2行の紹介
//  url       : 情報元・公式サイト
// =============================================================
window.EVENTS = [
  {
    id: "kodomonokuni-aki-2026",
    lat: 26.32698, lng: 127.8026,
    title: "沖縄こどもの国 秋の感謝祭 2026",
    start: "2026-11-01", end: "2026-11-30",
    status: "confirmed",
    area: "中部", city: "沖縄市", venue: "沖縄こどもの国",
    price: "要確認",
    tags: ["動物", "体験"],
    summary: "クイズラリーやナイトズーなど、1か月間いろいろな企画がある秋のイベント。",
    url: "https://www.walkerplus.com/event/ar1047e621760/"
  },
  {
    id: "koza-sports-2026",
    title: "コザスポーツフェス2026",
    start: "2026-11-07", end: "2026-11-07",
    status: "confirmed",
    area: "中部", city: "沖縄市", venue: "沖縄市内（詳細は公式で確認）",
    price: "要確認",
    tags: ["スポーツ", "体験"],
    summary: "親子でスポーツ体験ができ、キングスの試合観戦もあるイベント。",
    url: "https://iko-yo.net/events?prefecture_ids%5B%5D=47"
  },
  {
    id: "chimugukuru-nanjo-2026",
    title: "親子ちむぐくるふれあいフェス2026 in 南城市",
    start: "2026-11-08", end: "2026-11-08",
    status: "confirmed",
    area: "南部", city: "南城市", venue: "南城市内（詳細は公式で確認）",
    price: "無料",
    tags: ["祭り", "体験"],
    summary: "入場無料の親子向けふれあいイベント。",
    url: "https://iko-yo.net/events?prefecture_ids%5B%5D=47"
  },
  {
    id: "jica-festival-2026",
    title: "おきなわ国際協力・交流フェスティバル2026",
    start: "2026-11-15", end: "2026-11-15",
    status: "confirmed",
    area: "中部", city: "浦添市", venue: "JICA沖縄",
    price: "無料",
    tags: ["国際交流", "祭り"],
    summary: "パレードや展示で世界の文化にふれられるお祭り。子どもの社会科見学にもぴったり。",
    url: "https://www.walkerplus.com/event/ar1047e619422/"
  },
  {
    id: "inochi-omatsuri-2026",
    lat: 26.32698, lng: 127.8026,
    title: "まるっとつながる〜いのちのおまつり",
    start: "2026-11-15", end: "2026-11-15",
    status: "confirmed",
    area: "中部", city: "沖縄市", venue: "沖縄こどもの国 水とみどりの広場",
    price: "要確認",
    tags: ["祭り", "体験"],
    summary: "沖縄こどもの国の広場で開かれる、いのちをテーマにしたお祭り。",
    url: "https://iko-yo.net/events?prefecture_ids%5B%5D=47"
  },
  {
    id: "bios-ran-aki-2026",
    lat: 26.42143, lng: 127.79575,
    title: "らんの花祭り・秋",
    start: "2026-09-12", end: "2026-11-30",
    status: "confirmed",
    area: "中部", city: "うるま市", venue: "ビオスの丘",
    price: "有料",
    tags: ["花"],
    summary: "約1万輪のらんが咲く秋の花まつり。園内はボートや動物とのふれあいも楽しめる。",
    url: "https://www.walkerplus.com/event/ar1047e611347/"
  },
  {
    id: "ashibinaa-winter-2026",
    lat: 26.15812, lng: 127.65518,
    title: "Winter Elegance 2026-2027",
    start: "2026-11-01", end: "2027-02-14",
    status: "confirmed",
    area: "南部", city: "豊見城市", venue: "沖縄アウトレットモール あしびなー",
    price: "無料",
    tags: ["イルミネーション"],
    summary: "青と白を基調にしたイルミネーション。お買い物ついでに気軽に見られる。",
    url: "https://www.walkerplus.com/event/ar1047e124203/"
  },
  {
    id: "renaissance-christmas-2026",
    title: "Blue Lagoon Christmas 2026",
    start: "2026-11-01", end: "2027-02-28",
    status: "confirmed",
    area: "北部", city: "恩納村", venue: "ルネッサンス リゾート オキナワ",
    price: "無料",
    tags: ["イルミネーション"],
    summary: "リゾートホテルのクリスマスイルミネーション。見学は入場無料。",
    url: "https://www.walkerplus.com/event/ar1047e208815/"
  },
  {
    id: "southeast-botanical-illumi-2026",
    lat: 26.37602, lng: 127.80677,
    title: "東南植物楽園 イルミネーション",
    start: "2026-10-23", end: "2027-05-23",
    status: "tentative",
    area: "中部", city: "沖縄市", venue: "東南植物楽園",
    price: "有料",
    tags: ["イルミネーション", "花"],
    summary: "南国の植物を彩る県内最大級のイルミネーション。新エリアでは巨大ジンベエザメと記念撮影も。会期は公式で要確認。",
    url: "https://www.his-j.com/okinawa/op/activity/detail/?opid=1354"
  },
  {
    id: "urasoe-xmas-tree-2026",
    lat: 26.24935, lng: 127.72033,
    title: "ワークショップ「クリスマスツリーを作ろう！」",
    start: "2026-12-12", end: "2026-12-12",
    status: "confirmed",
    area: "中部", city: "浦添市", venue: "浦添市美術館 実習室2",
    price: "要確認",
    age: "10歳以下は保護者同伴",
    tags: ["体験"],
    summary: "工作キットを使ってクリスマスツリーを作る親子向けワークショップ。",
    url: "https://www.walkerplus.com/event/ar1047e621267/"
  },
  {
    id: "kodomonokuni-xmas-2026",
    lat: 26.32698, lng: 127.8026,
    title: "沖縄こどもの国 クリスマスファンタジー",
    start: "2026-12-19", end: "2026-12-31",
    dateText: "例年12月下旬（2025年は12/20〜31）",
    status: "tentative",
    area: "中部", city: "沖縄市", venue: "沖縄こどもの国",
    price: "一部有料",
    age: "前回は15歳以下入場無料",
    tags: ["イルミネーション", "動物", "祭り"],
    summary: "夜の動物園がイルミネーションで彩られる冬の恒例イベント。2026年の日程は公式発表を確認。",
    url: "https://rurubu.jp/andmore/spot/20005846"
  },
  {
    id: "shurijo-shinshun-2027",
    lat: 26.21755, lng: 127.71705,
    title: "首里城公園 新春の宴",
    start: "2027-01-01", end: "2027-01-03",
    dateText: "例年1月1日〜3日",
    status: "tentative",
    area: "那覇", city: "那覇市", venue: "首里城公園",
    price: "一部有料",
    tags: ["伝統文化", "祭り"],
    summary: "琉球王国の正月儀式の再現や琉球芸能が見られるお正月行事。2027年の開催は公式で確認。",
    url: "https://visitokinawajapan.com/discover/events/shurijo-castle-new-year-celebration"
  },
  {
    id: "yaedake-sakura-2027",
    title: "第49回 もとぶ八重岳桜まつり",
    start: "2027-01-16", end: "2027-02-07",
    dateText: "1月中旬〜2月上旬（予定）",
    status: "tentative",
    area: "北部", city: "本部町", venue: "八重岳桜の森公園",
    price: "無料",
    tags: ["花", "祭り"],
    summary: "日本一早い桜まつりのひとつ。約7,000本の寒緋桜が山道を彩る。",
    url: "https://go-go-okinawa.com/3367/"
  },
  {
    id: "ran-expo-2027",
    lat: 26.69378, lng: 127.87837,
    title: "第39回 沖縄国際洋蘭博覧会",
    start: "2027-01-23", end: "2027-01-31",
    dateText: "1月23日〜31日（予定）",
    status: "tentative",
    area: "北部", city: "本部町", venue: "海洋博公園",
    price: "有料",
    tags: ["花"],
    summary: "世界のらんが集まる博覧会。美ら海水族館とあわせて1日遊べる。",
    url: "https://go-go-okinawa.com/3367/"
  },
  {
    id: "hana-shoku-2027",
    lat: 26.20296, lng: 127.67518,
    title: "おきなわ花と食のフェスティバル2027",
    start: "2027-01-23", end: "2027-01-31",
    dateText: "1月下旬（予定）",
    status: "tentative",
    area: "那覇", city: "那覇市", venue: "奥武山公園",
    price: "無料",
    tags: ["花", "祭り"],
    summary: "県産の花と食が集まるお祭り。広い公園で子どもも遊びやすい。",
    url: "https://go-go-okinawa.com/3367/"
  },
  {
    id: "nakijin-sakura-2027",
    lat: 26.69105, lng: 127.93018,
    title: "今帰仁グスク桜まつり",
    start: "2027-01-30", end: "2027-02-07",
    status: "confirmed",
    area: "北部", city: "今帰仁村", venue: "今帰仁城跡（世界遺産）",
    price: "有料",
    tags: ["花", "伝統文化", "祭り"],
    summary: "世界遺産のグスクに咲く寒緋桜。夜はライトアップも。",
    url: "https://www.nakijinson.jp/calendar.php"
  },
  {
    id: "nago-sakura-2027",
    lat: 26.58949, lng: 127.99658,
    title: "名護さくら祭り",
    start: "2027-01-30", end: "2027-01-31",
    dateText: "1月30日・31日（予定）",
    status: "tentative",
    area: "北部", city: "名護市", venue: "名護中央公園",
    price: "無料",
    tags: ["花", "祭り"],
    summary: "桜の下でステージや出店が楽しめる名護の恒例まつり。",
    url: "https://go-go-okinawa.com/3367/"
  },
  {
    id: "kaiensai-2027",
    lat: 26.28132, lng: 127.73509,
    title: "第24回 琉球海炎祭2027",
    start: "2027-04-10", end: "2027-04-10",
    dateText: "4月の土曜日（予定）",
    status: "tentative",
    area: "中部", city: "宜野湾市", venue: "ぎのわん海浜公園 トロピカルビーチ",
    price: "有料",
    age: "大きな音が苦手な子はイヤーマフがあると安心",
    tags: ["花火"],
    summary: "日本一早い夏の花火大会。音楽とシンクロした花火は迫力満点。",
    url: "https://go-go-okinawa.com/3367/"
  },
  {
    id: "shima-zenbu-2027",
    title: "島ぜんぶでお〜きな祭 沖縄国際文化祭2027",
    start: "2027-04-24", end: "2027-04-25",
    status: "tentative",
    area: "県内各地", city: "県内各所", venue: "県内各所",
    price: "一部有料",
    tags: ["祭り"],
    summary: "お笑い・映画・音楽のステージやパレードがある、県内最大級の文化祭。",
    url: "https://go-go-okinawa.com/3367/"
  },
  {
    id: "naha-hari-2027",
    title: "第53回 那覇ハーリー",
    start: "2027-05-03", end: "2027-05-05",
    dateText: "5月3日〜5日（予定）",
    status: "tentative",
    area: "那覇", city: "那覇市", venue: "那覇市内（会場変更を検討中）",
    price: "無料",
    tags: ["伝統文化", "祭り"],
    summary: "爬竜船（ハーリー）レースと出店でにぎわう、ゴールデンウィーク恒例のお祭り。",
    url: "https://go-go-okinawa.com/3367/"
  }
];
