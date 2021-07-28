// ==UserScript==
// @version       4.1.1
// @icon          https://www.youtube.com/favicon.ico
// @author        necros & dislido
// @match         *://www.youtube.com/*
// @match         *://accounts.google.com/*
// @match         *://twitter.com/*
// @grant         unsafeWindow
// @grant         GM_xmlhttpRequest
// @grant         GM_log
// @grant         window.close
// @grant         GM_notification
// @grant         GM_setValue
// @grant         GM_getValue
// @connect       localhost
// @namespace     https://greasyfork.org/zh-CN/users/692472-necrosn
// @description   youtube 独轮车
// @name          Youtube独轮车-Auto Youtube Chat Sender
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	
/******/ 	var __webpack_modules__ = ({

/***/ 182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vc": () => (/* binding */ config),
/* harmony export */   "Dc": () => (/* binding */ colorConfig),
/* harmony export */   "$": () => (/* binding */ setAndSave),
/* harmony export */   "ME": () => (/* binding */ loadConfig)
/* harmony export */ });
const config = {
  o: GM_info.script.name === "舰载型Youtube泥头车",
  configName: GM_info.script.name === "舰载型Youtube泥头车"? "carrierBasedDuluncheCfg": "duluncheCfg",
  // 创建频道拟态的名字列表
  accountNames: ["巫女萌え", "松山チハル", "桐生会直系龍心会", "水没", "白滝", "空下峠", "錦山彰"],
  autoDownVote: false, // 自动点踩模式
  fireImmediately: true, // 立刻开火
  minDownVoteMin: 300, // 最短点踩挂机时间
  maxDownVoteMin: 360, // 最长点踩挂机时间
  minChangeChannel: 20, // 换频道前最短挂机时间
  maxChangeChannel: 30, // 换频道前最长挂机时间
  autoAttack: false, // 换号等待期间是否自动开火
  cycleCheck: true, // 点完一圈后是否循环补踩
  gatlingAutoStop: false, // 自动关闭标签页
  autoSCCheck: false, // 是否开启自动sc检测
  channelsAll: [], // 所有频道
  channelsIndexCurr: 0, //  index
  channelsIndexStart: 0, //  当前
  // 屏蔽词分析相关参数
  tokenLenMin: 1,
  tokenLenMax: 5,
  tokenDelayTime: 1000,
  tokenRefine: true, // 测试前开启弹药精炼
  tokenPruning: true, // 屏蔽词剪枝，加速测试速度

  url: "", // 目标url
  autoSetupURL: true, // 自动设置直播间地址为当前直播间
  changeChannelCount: 0,
  changeChannelTimerstamp: 0, //切换频道的时间戳

  control: true, // 开启泥头登陆舰远程控制模式
  controlPort: 5000, // 登陆舰控制端口

  fireMode: 0, // 开火模式  常规/穿甲弹
  ammoPiecingTimes: 10, // 穿甲次数
  textAmmoPiecing: "", // 穿甲弹弹药

  splitMode: 2, // 断句方式
  minCycleSec: 6, // 最小发送间隔（秒）
  maxCycleSec: 12, // 最大发送间隔（秒）
  randomDanmaku: false, // 是否随机发送
  text: "", // 发送消息列表
  maxDanmakuLength: 200, // 最大弹幕字数限制
  minDanmakuLength: 20, // 最小弹幕长度
  startTime: "2020-10-24 00:07:00",
  stopTime: "2020-10-24 00:07:00",
  splitChar: "，；：。！？…,.!?,", // 断句符
  remoteDanmakuBase: "",
  noValidate: false,
  modList: [],
  extension: "",
  lowConsume: true,
  lowConsumeChat: true,
  lowConsumeOthers: true,
  autoStop: true,
  infoUrl: "", // api地址
  startWaitingTime: 100, // 开播等待时间
  fullAutomation: false,
  lastLiveUrl: "", // 上次直播地址
  recallMsg: false, // 自动撤回消息
  ammoRefine_Disturb: true, // 弹幕扰动
  ammoRefine_ToLower: true, // 转换为小写
  ammoRefine_Cloud: false, // 云弹幕精制
  ammoRefine_Local: true, // 本地弹幕精制
  ammoRefine_SplitWord: false, // 插入随机日文字符
  ammoRefine_BanedWordMode: 0, // 屏蔽词处理机制 0 -> 删除， 1 -> 随机改变其中的一个字母
  ammoToLatin: false,
  ammoRefineStategy: "https://raw.githubusercontent.com/aserwarsdfd/logs/main/carrier-based.json",

  ammoRefine_prefix: false, // 弹药前缀
  ammoRefine_suffix: false, // 弹药后缀

  
  nTags: 3, // 可选tags带的数量
  twitter: {
    tags: {
      primary: {
        "桐生ココ": true,
        "ココここ": true,
        "みかじ絵": true,
      }, 
      secondary: {
        "たつのこ": true,
        "指示クラ": true, 
      }
    },
    bibles: {
      "很难不支持": {"content": "很 难 不 支 持", "format": false},
    },
  },
};
const colorConfig = config.o? {
  // 舰载机配色
  suspension: "#9999CC", //外面那个呼叫控制台的颜色
  backgroundToast: "#CCCCFF", // 左上角公告板背景颜色
  backgroundCmd:"#FFCCCC", // 控制台背景颜色

  titlebar: "#FF9999", //头顶的颜色
  border: "#FFCCCC", //折叠菜单的颜色

  btn: "#996699", //按钮背景颜色
  btnBorder: "#CCCCFF", // 按钮border颜色
  btnColor: "#FFFFFF", // 按钮字体颜色
  closeBtnColor: "#FFFFFF", // 按钮字体颜色

  textareaBackground: "#ffe5f2", // 文本框背景颜色
  textareaColor: "#4C3333", // 文本框字体颜色

  fontColor: "#4C3333", // 字体颜色（包括控制台和公告板
  announcementHeader: "#5e4263", //公告板标题颜色

  helpIconBackground: "#FFFFFF", // 圆圈问号背景
  helpIconColor: "#000000", // 圆圈问号颜色
  collapseBackground1: "#ead6ea", // 折叠菜单头头的颜色
  collapseBackground2: "#CCCCFF", // 折叠菜单展开后背景的颜色
  collapseBorder: "#cc99b3", // 折叠菜单边框的颜色
}: {
  // 独轮车机配色
  suspension: "#1A59B7", //外面那个呼叫控制台的颜色
  backgroundToast: "lightgrey", // 左上角公告板背景颜色
  backgroundCmd:"lightgrey", // 控制台背景颜色

  titlebar: "#fb5", //头顶的颜色
  border: "#ff921a", //折叠菜单的颜色

  btn: "#f70", //按钮背景颜色
  btnBorder: "gray", // 按钮border颜色
  btnColor: "#FFFFFF", // 按钮字体颜色
  closeBtnColor: "#FFFFFF", // 按钮字体颜色

  textareaBackground: "#white", // 文本框背景颜色
  textareaColor: "#000000", // 文本框字体颜色

  fontColor: "#000000", // 字体颜色（包括控制台和公告板
  announcementHeader: "#5e4263", //公告板标题颜色

  helpIconBackground: "#FFFFFF", // 圆圈问号背景
  helpIconColor: "#000000", // 圆圈问号颜色
  collapseBackground1: "#ff921a", // 折叠菜单头头的颜色
  collapseBackground2: "#FFE08B", // 折叠菜单展开后背景的颜色
  collapseBorder: "#703b17", // 折叠菜单边框的颜色
};


// 保存配置
const setAndSave = (prop, target, itemName=config.configName) => {
  config[prop] = target;
  localStorage.setItem(itemName, JSON.stringify(config));
};
// 加载保存的设置
const loadConfig = (itemName=config.configName)=>{
  config.configName = GM_info.script.name === "舰载型Youtube泥头车"? "carrierBasedDuluncheCfg": "duluncheCfg";

  try {
    const savedCfg = JSON.parse(localStorage.getItem(itemName));
    Object.assign(config, savedCfg);
  } catch (e) {
    // noop
  }
  // 如果activate没定义就自动为true (新旧版mod兼容问题)
  config.o = GM_info.script.name === "舰载型Youtube泥头车";
  config.configName = GM_info.script.name === "舰载型Youtube泥头车"? "carrierBasedDuluncheCfg": "duluncheCfg";
  if (!config.o){
    config.control = false;
  }
  config.modList.forEach((mod) => {
    if (typeof mod.activate === "undefined") {
      mod.activate = true;
      localStorage.setItem(itemName, JSON.stringify(config));
    }
  });
};



/***/ }),

/***/ 368:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ accountInformation),
/* harmony export */   "L": () => (/* binding */ setupAccountInfo)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(555);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(182);
/* harmony import */ var _modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(274);
/* harmony import */ var _modules_client_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(750);
/* harmony import */ var _modules_gatling_downvote_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(659);







const accountInformation = {
  inited: false,
  email: null,
  currChannel: null,
  currChannelID: "",
  nextChannel: null,
  channels: {},
  channelState: "?",
  addAccountButton: null,
  get: (newConnection=true)=>{
    if (accountInformation.inited){
      const tempDict = {};
      tempDict["email"] = accountInformation.email;
      tempDict["banned"] = accountInformation.channelState;
      if (tempDict["banned"] == "?") {
        tempDict["banned"] = "U";
      }
      tempDict["currChannel"] = accountInformation.currChannel;
      tempDict["currChannelID"] = accountInformation.currChannelID;
      tempDict["channels"] = Object.keys(accountInformation.channels);
      tempDict["timestamp"] = new Date().getTime();
      tempDict["url"] = window.location.href;
      tempDict["newConnection"] = newConnection;
      return tempDict;
    } else {
      return false;
    }
  },
};

let accountInfoTimer;
// 设置个人信息
const setupAccountInfo = (runAutoDownVote = true, setupCurrAccount = false, next = ()=>{}) => {
  const { control, autoDownVote, url } = _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc;
  if (!control && !autoDownVote) return;
  if (window.location.href === "https://www.youtube.com/"
    && url.match(/.*:\/\/www\.youtube\.com\/watch.*/)
    && _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.changeChannelCount */ .vc.changeChannelCount > 0) {
    // 避免乱跳
    // window.alert(config.changeChannelCount);
    _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.changeChannelCount */ .vc.changeChannelCount = 0;
    localStorage.setItem(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.configName */ .vc.configName, JSON.stringify(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc));
    window.location.href = url;
    return;
  }

  // 确认车在直播间, 且不处于遥控模式

  if (!(window.location.href.match(/.*:\/\/www\.youtube\.com\/watch.*/) 
        || window.location.href.match(/.*:\/\/www\.youtube\.com\/?$/)
        || window.location.href.match(/.*:\/\/www\.youtube\.com\/\?/))) {
    return;
  }
  // 锁死在开火直播间
  if (!control) {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .urlEqual */ .jr)(window.location.href, url)){
      (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)(`目标直播间地址是${url}, 当前直播间地址是${window.location.href},不一致。不进行点踩操作`);
      return;
    }
  }
  let setuped = false;
  let accounts = document.getElementsByTagName("ytd-account-item-renderer");
  if (accounts.length > 0) {
    setuped = true;
    if (setupCurrAccount){
      console.log("setup curr account");
      _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsAll */ .vc.channelsAll = [];
      accountInformation.channels = {};
    }
    // New frontend
    account_renders = document.getElementsByTagName("ytd-account-section-list-renderer");
    for (let j = 0; j < account_renders.length; j++){
        let accounts = Array.prototype.slice.call(account_renders[j].getElementsByTagName("ytd-account-item-renderer"));
        // 新版界面
        for (let i = 0; i < accounts.length; i++){
          let channelBtn = accounts[i];
          let channelName = channelBtn.children[0].children[1].children[0].innerText;
          
          let accountEmail;
          if (j == 0)
            accountEmail = accounts[0].parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[1].children[1].innerText.replace(/[\r\n]/g, "");
          else
            accountEmail = account_renders[j].children[1].children[0].children[0].innerText;
          let key;
          key = accountEmail.substr(0, accountEmail.indexOf("@") + 1) + channelName;
          if (!(key in accountInformation.channels)){
            accountInformation.channels[key] = channelBtn;
            // 初始化频道列表
            if (setupCurrAccount){
              _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsAll.push */ .vc.channelsAll.push(key);
            }
          }
          // 当前登录的频道信息
          if (!accountInformation.inited && !channelBtn.children[0].children[2].hidden){
            accountInformation.inited = true;
            accountInformation.currChannel = key;
            accountInformation.email = accountEmail;
            accountInformation.addAccountButton = channelBtn.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[1].children[0].children[0];
          }
        }
    }
    console.log(accountInformation.currChannel);
    console.log(accountInformation.email);
    console.log(accountInformation.channels);
    console.log(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsAll */ .vc.channelsAll);
    // 显示email地址
    let dom = (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__.h)(
        "div",
        {
          id: "account_email",
          style: `
            background: ${_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.suspension */ .Dc.suspension};
            color:${_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.btnColor */ .Dc.btnColor};
            z-index: 800;
            position: fixed;
            padding: 5px;
            text-align:center;
            border-radius: 5px;
            right: 10px;
            top: 24%;
          `,
        },
        accountInformation.email,
    );
    document.body.appendChild(dom);
  
    if (setupCurrAccount){
      _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsIndexStart */ .vc.channelsIndexStart = _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsAll.findIndex */ .vc.channelsAll.findIndex((x)=>x === accountInformation.currChannel);
      _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsIndexCurr */ .vc.channelsIndexCurr = _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsIndexStart */ .vc.channelsIndexStart;
    }
    // 加特林（下一个频道）
    console.log(`autoDownVote: ${autoDownVote}`);
    if (autoDownVote && _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsAll.length */ .vc.channelsAll.length > 0) {
      let nextKey = _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsAll */ .vc.channelsAll[(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsIndexCurr */ .vc.channelsIndexCurr + 1) % _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsAll.length */ .vc.channelsAll.length];
      console.log(`nextkey: ${nextKey}`);
      accountInformation.nextChannel =  accountInformation.channels[nextKey];
      console.log( accountInformation.nextChannel);
    }
    // Setup the server
    if (control) {
      (0,_modules_client_js__WEBPACK_IMPORTED_MODULE_3__/* .setupCVServer */ .N)();
    }
    if (autoDownVote && runAutoDownVote) {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .urlEqual */ .jr)(window.location.href, url)){
        (0,_modules_gatling_downvote_js__WEBPACK_IMPORTED_MODULE_4__/* .delayDownVote */ .w7)();
      } else {
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)(`目标直播间地址是${url}, 当前直播间地址是${window.location.href},不一致。不进行点踩操作`);
      }
    }
    next();
    // 关闭账号信息页面
    try {
      document.getElementsByTagName("iron-dropdown")[0].style.display = "none";
    } catch(e){
    }
    // 后续操作
  } else {
    const change_account = document.getElementsByClassName("yt-simple-endpoint style-scope ytd-compact-link-renderer")[3];
    if (change_account != undefined) {
      const channelURLSplit = document.getElementsByClassName("yt-simple-endpoint style-scope ytd-compact-link-renderer")[0].href.split("/");
      // setup id
      accountInformation.currChannelID = channelURLSplit[channelURLSplit.length-1];
      change_account.click();
    } else {
      const personal_information = document.getElementById("avatar-btn");
      if (personal_information != undefined) {
        if (!(document.getElementsByTagName("iron-dropdown").length != 0
            && !(document.getElementsByTagName("iron-dropdown")[0].getAttribute("aria-hidden")))){
          personal_information.click();
        }
      }
    }
  }
  if (!setuped) {
    accountInfoTimer = setTimeout(()=>{
      setupAccountInfo(runAutoDownVote, setupCurrAccount, next);
    }, 2000);
  }
};
accountInfoTimer = setTimeout(setupAccountInfo, 2000);



/***/ }),

/***/ 750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ setupCVServer),
/* harmony export */   "S": () => (/* binding */ handleServerCommand)
/* harmony export */ });
/* harmony import */ var _refs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(803);


// 单兵车: 这个部分什么都不做
const handleServerCommand = () => "test";
const setupCVServer = () => "test";
_refs_js__WEBPACK_IMPORTED_MODULE_0__/* .refs.handleServerCommand */ .x.handleServerCommand = handleServerCommand;


/***/ }),

/***/ 601:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mi": () => (/* binding */ createChannel),
/* harmony export */   "pj": () => (/* binding */ channelSwither),
/* harmony export */   "rC": () => (/* binding */ createChannelPage)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(555);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(182);
/* harmony import */ var _modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(274);
/* harmony import */ var _modules_dlc_information__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(126);





// 创建账号
const sendString = (focusElement, finish, string) => {
  focusElement.value = string;
  finish();
};

const getQueryVariable = (variable) => {
  let query = decodeURI(window.location.href);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if(pair[0] == variable){
      return pair[1];
    }
  }
  return false;
};

/*
创建主账号频道
流程：
1. 点右上角头像框
2. 点【创建频道】
3. 点下一步
4. 点左边的按钮（用默认账户名字创建频道）
5. 创建成功后，检测到页面跳转就关闭窗口。



*/
const createChannelMain = (w, newUI=false) => {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
    ()=>w.document.getElementById("avatar-btn"),
    (infoBtn)=>{
      // 1.点右上角头像框
      infoBtn.click();
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
        ()=>newUI? w.document.getElementsByClassName("style-scope iron-dropdown")[0].getElementsByTagName("a")[1]
                 : w.document.getElementsByClassName("yt-simple-endpoint style-scope ytd-compact-link-renderer")[0],
        (createChannelBtn)=>{
          // 2. 点创建频道
          createChannelBtn.click();
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
            ()=>w.document.getElementById("next-button").children[0].children[0].children[0],
            (nextBtn)=>{
              // 3. 点下一步
              nextBtn.click();
              (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
                ()=>w.document.getElementById("personal-account-tile-select-button").children[0].children[0].children[0],
                (selectBtn)=>{
                  // 4. 点左边的按钮（用默认账户名字创建频道）
                  selectBtn.click();
                  // 5. 创建成功后，检测到页面跳转就关闭窗口。
                  const checkJumpDomain = ()=>{
                    try{
                      let t = w.location.href;
                      setTimeout(checkJumpDomain, 3000);
                    } catch(e) {
                      w.close();
                      window.close();
                    }
                  };
                  checkJumpDomain();
                }
              );
            }
          );
        }
      );
    },
  );
}
// 创建副频道的函数  会打开一个新窗口创建副频道
// 之后路由调用createChannelPage在窗口中完成副频道创建
const createExtraChannels = (name) => {
  GM_setValue("createExtraChannels", name);
  return window.open("https://www.youtube.com/create_channel?action_create_new_channel_redirect=true");
};
// 创建副频道页面
var cdTimer;
const createChannelPage = ()=>{
  console.log("创建频道页面");
  let currName;
  const getCreateChannelPanel = (currName, finish = ()=>{}, countdown = 5) => {
    let doms = [
      ["h1", {style: `color: red`}, `即将创建频道: ${currName}`],
      ["h1", {id: "countdown", style: `color: red`}, `倒计时: ${countdown}`],
      (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                clearTimeout(cdTimer);
                GM_setValue("createExtraChannels", "");
                document.getElementById("countdown").innerText = `已取消创建新频道。`;
              }
            },
            "取消倒计时",
          ],
        ]),
    ];
    let i = countdown;
    const cd = ()=>{
      return setTimeout(()=>{
        i--;
        document.getElementById("countdown").innerText = `倒计时: ${i}`;
        if (i == 0){
          // Create channel
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
            ()=>document.getElementById("PlusPageName"),
            (nameInput)=>{
              sendString(
                nameInput,
                ()=>{
                    // 检查是否是新版页面 - 新版页面多了一个需要打钩的选框
                    const checkMark = document.getElementsByClassName("consent-checkmark");
                    if (checkMark.length > 0){
                      // checkMark[0].click();
                      console.log("Found")
                      // checkMark[0].dispatchEvent(new Event("mouseenter"))
                      // checkMark[0].dispatchEvent(new Event("click"))
                      checkMark[0].focus();
                      checkMark[0].click();
                      // checkMark[0].dispatchEvent(new Event("mouseout"))
                    }
                  let submitBtn = document.getElementById("submitbutton");
                  submitBtn.focus();
                  submitBtn.click();
                  GM_setValue("createExtraChannels", "");
                  setTimeout(()=>{finish();}, 2000);
                },
                currName,
              );
            },
          );
        } else {
          cdTimer = cd();
        }
      }, 1000);
    }
    cdTimer = cd();
    return (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__.h)(
        "div",
        {"style": `color: ${_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.fontColor */ .Dc.fontColor}`},
        doms,
      );
  };

  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
    ()=>unsafeWindow.dulunche,
    // (dlc)=>{
    ()=>{
      let channelMain=getQueryVariable("channelMain");
      let channelExtra=getQueryVariable("channelExtra");
      if (channelMain && channelExtra){
        // 开完频道后开主账号频道
        // 现在估计不能用用了（谷歌改了页面
        currName = channelMain;
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)(getCreateChannelPanel(currName, ()=>{
          // setTimeout(()=>createExtraChannels(channelExtra), 2000);
          setTimeout(()=>{
            window.open("https://www.youtube.com/channel_switcher?next=%2Faccount&feature=settings");
          }, 2000);
        }));
      } else {
        // Default state
        currName = GM_getValue("createExtraChannels", "");
        if (currName){
          // 开频道
          GM_setValue("createExtraChannels", "");
          (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)(getCreateChannelPanel(currName));
        }
      }
    },
  );
}

/*
频道页面的路由
来这个页面的目的一般是创建主频道（或者把品牌账号转换为频道，但是想转换只需要点一下鼠标就可以了。没必要做多余的自动化）
*/
  

const channelSwither = () => {
  // 通过检查右上角头像按钮判断是新版还是老版UI
  ;(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
    ()=>document.getElementById("avatar-btn"),
    //(infoBtn)=>{
    () => {
      console.log("New UI");
      createChannelMain(window, true);
    },
  );
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
    ()=>document.getElementsByClassName("page-info-text text-line")[0].parentElement.parentElement.parentElement.parentElement,
    (pannel)=>{
      console.log("OldUI");
      for (let i = 0; i < document.getElementsByClassName("page-info-text text-line").length; i++){
        let text = document.getElementsByClassName("page-info-text text-line")[i].innerText;
        pannel = document.getElementsByClassName("page-info-text text-line")[i].parentElement.parentElement.parentElement.parentElement
        if (text.match(/.*@.*/)){
          // 从主账号创建新频道
          let w = window.open(pannel.href);
          createChannelMain(w, false);
        } else {
          // TODO: 模拟点击品牌账号pannel。 直接onclick/dispatch mouse over没用
          // 目前监测机制似乎无法正确区分开品牌账号和其他频道 还需要改进判定
          /*
          checkThenDo(
            ()=>{return document.getElementsByClassName("add-secondary-channel")[0]},
            (secondaryChannel)=>{
              console.log("pass");
              secondaryChannel.focus();
              secondaryChannel.click();
              checkThenDo(
                ()=>{return document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-primary confirm-submit-button")[0]},
                (confirmBtn)=>{
                  confirmBtn.click();
                }
              );
            }
          );
          */
        }
      }

    },
  );
}
const createChannel = (accountName)=>{
  if (!accountName){
    // choose random name
    alert("accountName is empty!");
  }
  let winC = window.open("https://www.youtube.com/create_channel");
  window.focus();
  let tmpLoopFunction = ()=>setTimeout(()=>{
  // 谷歌修改了创建主副频道的页面 - 现在主频道在ytb首页创建了
    // if (winC.location.href != "https://www.youtube.com/create_channel"){
    console.log(winC.location.href);
    if (winC.location.href == "about:blank" || winC.location.href.substr(0, 47) == "https://www.youtube.com/?channel_creation_token"){
      // 页面尚未加载完毕，等待。

      tmpLoopFunction();
      return;
    }
    if (winC.location.href != "https://www.youtube.com/"){  
      // 有频道的账号在这个页面会跳转走
      (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)(`创建1个副频道，频道名为${accountName}`);
      winC.close();
      createExtraChannels(accountName);
    } else {
      // 开一个副频道+开主频道
      (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)(`创建主频道+1个副频道\n副频道名字为${accountName}`);
      const winExtraChannel = createExtraChannels(accountName);
      // 考虑到有5s的延迟时间+页面加载时间，设置更长的延时
      console.log(winExtraChannel);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .checkThenDo */ .Xi)(
        // createExtraChannel会跳转到account.google.com, 而
        // 频道创建结束后，跳转到https://www.youtube.com/channel/<channel_ID>
        ()=>winExtraChannel.location.href.substr(0, 32) == "https://www.youtube.com/channel/", 
        ()=>{
          winExtraChannel.close();
          // 完成副频道创建 开始创建主频道
          (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)("副频道创建完成 开始创建主频道"); 
          try {
            // 尝试填入账号名字 （新版界面）
            const inputField = winC.document.getElementsByClassName("style-scope tp-yt-paper-input")[3];
            let accountNameList = _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.accountNames */ .vc.accountNames;
            if ("accountNames" in _modules_dlc_information__WEBPACK_IMPORTED_MODULE_3__/* .dlcInformation */ .w){
              accountNameList = _modules_dlc_information__WEBPACK_IMPORTED_MODULE_3__/* .dlcInformation.accountNames */ .w.accountNames;
            }
            const channelName = accountNameList[0, randomInt(0, accountNameList.length-1)];
            (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)(`新版界面 - 填入账号名字: ${channelName}`);
            inputField.value = channelName;
            inputField.dispatchEvent(new Event('input', {"bubbles": true, "cancelable": true}));
            inputField.dispatchEvent(new Event('change', {"bubbles": true, "cancelable": true}));
          } catch (_){}
          // 创建主频道  (两款新界面按钮元素相同)
          winC.document.getElementById("create-channel-button").click();
          // 点击按钮后过5s关闭页面
          setTimeout(winC.close, 5000);
          
        }, 
        10000,
      )
      /*
      checkThenDo(
        //()=>winC.document.getElementById("create-channel-first-name"),
        ()=>winC.document.getElementsByClassName("create-channel-plus-page-link")[0],
        //(firstNameInput)=>{
        (link)=>{
          link.href = link.href + `&channelMain=${accountName}&channelExtra=${accountName}&channelState=main`;
          link.click();
        }
      );
      */ 
    }
  }, 2000);
  
  tmpLoopFunction();
  return winC;
};


/***/ }),

/***/ 126:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ dlcInformation),
/* harmony export */   "s": () => (/* binding */ bwTrieTree)
/* harmony export */ });
/* harmony import */ var _modules_sendMsg_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(451);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);


// 挂在git上的独轮车相关信息（包括版本更新logs，屏蔽词列表等。

const versionToNumber = (versionString) => parseInt(versionString.replace(/\./g, ""));
const getJSON = () => {
    // 单兵车："https://raw.githubusercontent.com/aserwarsdfd/logs/main/replace.json"
    // let ammoRefineStategy = "https://raw.githubusercontent.com/aserwarsdfd/logs/main/carrier-based.json";
    let announcement = "https://raw.githubusercontent.com/aserwarsdfd/logs/main/a.json";
    let refineStrategy = "https://raw.githubusercontent.com/aserwarsdfd/logs/main/b.json";
    let logs = "https://raw.githubusercontent.com/aserwarsdfd/logs/main/l.json";
    let names = "https://raw.githubusercontent.com/aserwarsdfd/logs/main/name.txt";
    let json = {
      "version": `4.0.0`,
      "logs": "4.0.0: 加载logs失败!",
      "announcement": "独轮车版本信息，云屏蔽词加载失败\n可能是春节期间github被墙的关系\n开启全局代理后刷新网页，应该就能正确拖取了。",
      "regexs": [],
      "block_words": [],
      "prefixes": [], 
      "suffixes": [],
      "ytb_block_words": [],
      "replace_words": {},
      "phantom_tank": false
    };
    try {
      let http = new XMLHttpRequest();
      let t;
      http.open("GET", announcement, false);
      http.send();
      t = JSON.parse(http.responseText);
      json["version"] = t["version"];
      json["announcement"] = t["announcement"];
      http = new XMLHttpRequest();
      http.open("GET", refineStrategy, false);
      http.send();
      t = JSON.parse(http.responseText);
      json["regexs"] = t["regexs"];
      json["replace_words"] = t["replace_words"];
      json["ytb_block_words"] = t["ytb_block_words"];
      json["prefixes"] = t["prefixes"];
      json["suffixes"] = t["suffixes"];
      if (versionToNumber(GM_info.script.version) < versionToNumber(json["version"])) {
        http = new XMLHttpRequest();
        http.open("GET", logs, false);
        http.send();
        t = JSON.parse(http.responseText);
        json["logs"] = t["logs"];
      }
      // 拼接超长名字弹药
      http = new XMLHttpRequest();
      http.open("GET", names, false);
      http.send();
      t = http.responseText.split("\n").map((str)=>str.substr(0, str.length > 50? 50: str.length)).filter((str)=>str.length > 10);
      // console.log(t);
      if (t.length > 0)
        json["accountNames"] = t;
    } catch (e) {
      console.log(e);
    }
    return json;
  };


// 从屏蔽词列表建立屏蔽词前缀树用于弹药精制
const setupBannedWordsTrieTree = (wordList) =>{
  if (!wordList)
    return {};
  let banedWordDict = {};
  wordList.forEach((word)=>{
    let splitedWord = (0,_modules_sendMsg_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .participleCJKE */ .v)(word);
    let currDict = banedWordDict;
    for (let i = 0; i < splitedWord.length; i++){
      if (!currDict){
        // Shorter prefix exist
        break;
      } else {
        if (i == splitedWord.length - 1){
          currDict[splitedWord[i]] = false;
        } else {
          if (!(splitedWord[i] in currDict)){
            currDict[splitedWord[i]] = {};
          }
          currDict = currDict[splitedWord[i]];
        }
      }
    }
  });
  return banedWordDict;
};

const dlcInformation = getJSON();
const bwTrieTree = setupBannedWordsTrieTree(dlcInformation.ytb_block_words.concat(dlcInformation.block_words));



/***/ }),

/***/ 996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Y": () => (/* binding */ eventBus),
  "T": () => (/* binding */ initEventBus)
});

// EXTERNAL MODULE: ./src/refs.js
var refs = __webpack_require__(803);
// EXTERNAL MODULE: ./src/config.js
var config = __webpack_require__(182);
// EXTERNAL MODULE: ./src/modules/sendMsg/ammo-refine.js
var ammo_refine = __webpack_require__(144);
// EXTERNAL MODULE: ./src/utils.js
var utils = __webpack_require__(555);
;// CONCATENATED MODULE: ./src/modules/sendMsg/recall.js



// 撤回消息
const recallMsg = (text) => {
  if (!config/* config.recallMsg */.vc.recallMsg)
    return;
  // delay 10s
  console.log("Auto recall");
  setTimeout(
    ()=>{
      const messagesList = unsafeWindow.frames.chatframe.contentDocument.getElementsByTagName("yt-live-chat-text-message-renderer");
      for (let i = messagesList.length - 1; i >= 0; i--) {
        const currMsg = messagesList[i];
        const msgContent = currMsg.children[1].children[2].innerText;
        if (text.trim() === msgContent) {
          // 点击三个点
          currMsg.children[2].children[0].click();
          // 点击撤回按钮
          (0,utils/* checkThenDo */.Xi)(
            ()=>{
              let list = unsafeWindow.frames.chatframe.contentDocument.getElementsByTagName("ytd-menu-popup-renderer")[0].children[0].children;
              return list;
            }, 
            (list)=>{
              if (list.length == 1){
                list[0].click();
              }
            },
            500
          );
          break;
        }
      }
    }, 
    10000,
  );
};
// var channelName = "";
// const uidMap = {};
// var recallMsgList = [];
// const recallObserver = new MutationObserver((mutationsList, observer) => {
//   if (config.recallMsg){
//     for (let mutation of mutationsList){
//       if (mutation.type === "childList"){
//         for (let node of mutation.addedNodes){
//           // 判断是自己的消息
//           //console.log(channelName);
//           //console.log(node.children[1].children[1].innerText);
//           if (node.children[1].children[1].innerText === channelName){
//             //console.log("Add msg: " + node.id);
//             recallMsgList.push({"dom": node});
//           }
//         }
//       }
//     }
//   }
// });
// const recallStart = () => {
//   try {
//     let items = unsafeWindow.frames.chatframe.contentDocument.getElementsByTagName("yt-live-chat-banner-manager")[0].parentElement.children[2].children[0];
//     let config = { attributes: false, childList: true, subtree: false };
//     recallObserver.observe(items,  config);
//     // console.log("recall start");
//   } catch (_){
//     setTimeout(recallStart, 5000);
//   }
// };
// const recallStop = () => {
//   recallObserver.disconnect();
// };
// const clickBtn = (btn) => {
//   btn.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, cancelable: true }));
//   btn.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true }));
//   btn.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true }));
//   btn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
// };
// const recallLoop = ()=>{
//   setTimeout(()=>{
//     if (!config.recallMsg){
//       return;
//     }
//     let list = recallMsgList;
//     // console.log("recall msg list");
//     // console.log(list);
//     // console.log("uidMap");
//     // console.log(uidMap);
//     recallMsgList = [];
//     for (let o of list){
//       if (o.dom.id in uidMap){
//         //console.log(`delete: ${o.dom.id} `);
//         // 点击三个点
//         clickBtn(o.dom.children[2].children[0]);
//         // 点击撤回按钮
//         checkThenDo(
//           ()=>{
//             let list = unsafeWindow.frames.chatframe.contentDocument.getElementsByTagName("ytd-menu-popup-renderer")[0].children[0].children;
//             return list;
//           }, 
//           (list)=>{
//             if (list.length == 1){
//               clickBtn(list[0]);
//             }
//           },
//           500,
//         );
//         delete uidMap[o.dom.id];
//       }
//     }
//     recallLoop();
//   }, 30000);
// }
// // recallLoop();
// const sendMessagePath = "/send_message";
// function patchResponse(response, handler) {
//   const jsonNative = response.json;
//   response.json = async function (...args) {
//       const json = await jsonNative.apply(this, args);
//       try {
//           const result = handler(json);
//           if (result !== undefined) {
//               return result;
//           }
//       }
//       catch (error) {
//           console.error(error);
//       }
//       return json;
//   };
//   const textNative = response.text;
//   response.text = async function (...args) {
//       const text = await textNative.apply(this, args);
//       try {
//           const json = JSON.parse(text);
//           const result = handler(json);
//           if (result !== undefined) {
//               return JSON.stringify(result, undefined, 2);
//           }
//       }
//       catch (error) {
//           console.error(error);
//       }
//       return text;
//   };
// }
// const initalizeMsgCollection = ()=>{
//   // 发送消息后记录发送了的消息的id
//   // bug : getElement by id is null
//   try {
//     channelName = unsafeWindow.frames.chatframe.contentDocument.getElementsByTagName("yt-live-chat-message-input-renderer")[0].querySelector("#author-name").innerText;
//     let fetchNative = document.getElementById("chatframe").contentWindow.fetch;
//     const fetch = async (...args)=>{
//       const response = await fetchNative.apply(this, args);
//       try {
//         const url = new URL(typeof args[0] === "string" ? args[0] : args[0].url);
//         requestPathname = url.pathname;
//       } catch (error) {
//         requestPathname = "";
//       }
//       if (requestPathname.endsWith(sendMessagePath)){
//         patchResponse(response, (json)=>{
//           let render = json.actions[0].addChatItemAction.item.liveChatTextMessageRenderer
//           uidMap[render.id] = json.actions[0].addChatItemAction.item.liveChatTextMessageRenderer.timestamp;
//         });
//       }
//       return response;
//     };
//     document.getElementById("chatframe").contentWindow.fetch = fetch;
//   } catch (e){
//     setTimeout(initalizeMsgCollection, 5000);
//   }
// }

// EXTERNAL MODULE: ./src/modules/ui/utils.js
var ui_utils = __webpack_require__(274);
;// CONCATENATED MODULE: ./src/modules/sendMsg/send.js




// 发送单条精炼了的消息
refs/* refs.sendMsg */.x.sendMsg = (text) => {
    refs/* refs.chatTxtInput.textContent */.x.chatTxtInput.textContent = text;
    refs/* refs.chatTxtInput.dispatchEvent */.x.chatTxtInput.dispatchEvent(new InputEvent("input"));
    refs/* refs.sendBtn.click */.x.sendBtn.click();
};
// 评论区
refs/* refs.sendMsgVideo */.x.sendMsgVideo = (text) => {
  document.getElementById("placeholder-area").click();
  let sendBtn = document.getElementsByClassName("style-scope ytd-button-renderer style-primary size-default")[0];
  let textInput = document.getElementById("contenteditable-root");
  textInput.textContent = text;
  textInput.dispatchEvent(new Event('input', {"bubbles": true, "cancelable": true}));
  textInput.dispatchEvent(new Event('change', {"bubbles": true, "cancelable": true}));
  sendBtn.click();
}
const sendMsg = (text, doRefine) => {
  let refinedText = doRefine? (0,ammo_refine/* refine */.l)(text): text;
  refs/* refs.sendMsg */.x.sendMsg(refinedText);
  recallMsg(refinedText);
  return refinedText;
};
const sendMsgVideo = (text) => {
  refs/* refs.sendMsgVideo */.x.sendMsgVideo(text);
  return text;
};


// EXTERNAL MODULE: ./src/modules/client.js
var client = __webpack_require__(750);
// EXTERNAL MODULE: ./src/modules/create-account.js
var create_account = __webpack_require__(601);
// EXTERNAL MODULE: ./src/modules/live.js
var live = __webpack_require__(125);
// EXTERNAL MODULE: ./src/modules/account-information.js
var account_information = __webpack_require__(368);
// EXTERNAL MODULE: ./src/modules/gatling/downvote.js
var downvote = __webpack_require__(659);
;// CONCATENATED MODULE: ./src/modules/gatling/gatling.js








const gatlingrun = () => {
  const { autoSetupURL } = config/* config */.vc;
  if (autoSetupURL){
    config/* config.url */.vc.url = window.location.href;
  }
  // 处理短连接和带&的房间号
  config/* config.url */.vc.url = (0,utils/* makeURL */.$t)(config/* config.url.split */.vc.url.split("&")[0]);
  if (!config/* config.url.match */.vc.url.match(/.*:\/\/www\.youtube\.com\/watch.*/)) {
    (0,ui_utils/* Toast */.FN)("请在油管直播间使用这个功能！");
    return;
  } else {
    config/* config.autoDownVote */.vc.autoDownVote = true;
    config/* config.changeChannelCount */.vc.changeChannelCount = 0;
    config/* config.changeChannelTimerstamp */.vc.changeChannelTimerstamp = Date.now();
    refs/* refs.autoDownVoteBtn.innerText */.x.autoDownVoteBtn.innerText = "加特林停火";
    console.log("加特林启动")
    ;(0,account_information/* setupAccountInfo */.L)(false, true, downvote/* delayDownVote */.w7);
  }
};

const gatlingstop = () => {
  config/* config.autoDownVote */.vc.autoDownVote = false;
  config/* config.changeChannelCount */.vc.changeChannelCount = 0;
  refs/* refs.autoDownVoteBtn.innerText */.x.autoDownVoteBtn.innerText = "加特林开火";
  eventBus.emit("dlc.stop");
  if (typeof downvote/* changeChannelTimer */.MB !== "undefined") {
    clearTimeout(downvote/* changeChannelTimer */.MB);
  }
  if (typeof downvote/* delayDownVoteTimer */.RB !== "undefined") {
    clearTimeout(downvote/* delayDownVoteTimer */.RB);
  }
};


;// CONCATENATED MODULE: ./src/modules/sendMsg/ap-ammo.js


// 穿甲弹相关设置
const apStart = () => {
  const { fireMode } = config/* config */.vc;
  const sendMessagePath = "/send_message";
  // 避免函数被重复调用
  if (refs/* refs.fetchNative */.x.fetchNative){
    return;
  }
  refs/* refs.fetchNative */.x.fetchNative = document.getElementById("chatframe").contentWindow.fetch;
  document.getElementById("chatframe").contentWindow.fetch = async function (...args) {
    let response;
    const requestUrl = typeof args[0] === "string" ? args[0] : args[0].url;
    let requestPathname;
    try {
      const url = new URL(requestUrl);
      requestPathname = url.pathname;
    } catch (error) {
      requestPathname = "";
    }
    if (requestPathname.endsWith(sendMessagePath)
            && fireMode == 1) {
      if (refs/* refs.armorPiercingTimeoutId */.x.armorPiercingTimeoutId) {
        clearTimeout(refs/* refs.armorPiercingTimeoutId */.x.armorPiercingTimeoutId);
        refs/* refs.armorPiercingTimeoutId */.x.armorPiercingTimeoutId = undefined;
      }
      refs/* refs.armorPiercingTimeoutId */.x.armorPiercingTimeoutId = setTimeout(() => {
        refs/* refs.armorPiercingResolve */.x.armorPiercingResolve === null || refs/* refs.armorPiercingResolve */.x.armorPiercingResolve === void 0 ? void 0 : refs/* refs.armorPiercingResolve */.x.armorPiercingResolve();
        refs/* refs.armorPiercingTimeoutId */.x.armorPiercingTimeoutId = undefined;
        refs/* refs.armorPiercingPromise */.x.armorPiercingPromise = undefined;
        refs/* refs.armorPiercingResolve */.x.armorPiercingResolve = undefined;
      }, 233);
      if (!refs/* refs.armorPiercingPromise */.x.armorPiercingPromise) {
        refs/* refs.armorPiercingPromise */.x.armorPiercingPromise = new Promise((resolve) => {
          refs/* refs.armorPiercingResolve */.x.armorPiercingResolve = resolve;
        });
      }
      response = await refs/* refs.armorPiercingPromise.then */.x.armorPiercingPromise.then(() => refs/* refs.fetchNative.apply */.x.fetchNative.apply(this, args));
    } else {
      response = await refs/* refs.fetchNative.apply */.x.fetchNative.apply(this, args);
    }
    return response;
  };
};
const apStop = () => {
  if (refs/* refs.fetchNative */.x.fetchNative) {
    document.getElementById("chatframe").contentWindow.fetch = refs/* refs.fetchNative */.x.fetchNative;
  }
  refs/* refs.fetchNative */.x.fetchNative = undefined;
};

;// CONCATENATED MODULE: ./src/modules/sendMsg/fire.js








// 独轮车出动/刹车相关

let timer; // 定时器
const splitter = {
  // 单句模式
  0: (text) => [text.substr(0, config/* config.maxDanmakuLength */.vc.maxDanmakuLength)],
  // 多句转轮
  2: (text) => text
    .split("\n")
    .map((it) => it.trim().substr(0, config/* config.maxDanmakuLength */.vc.maxDanmakuLength))
    .filter(Boolean),
  // 说书模式
  1: (text) => {
    const { maxDanmakuLength, minDanmakuLength, splitChar } = config/* config */.vc;
    const list = [];
    text
      .trim()
      .replace(/\s+/g, " ")
      .split(new RegExp(`(?<=[${splitChar.replace(/(\\|])/g, "\\$1")}])`))
      .reduce((buf, curr, currIndex, arr) => {
        buf += curr;
        while (buf.length > maxDanmakuLength) {
          list.push(buf.substr(0, maxDanmakuLength));
          buf = buf.substr(maxDanmakuLength);
        }
        if (currIndex === arr.length - 1) {
          list.push(buf);
          return "";
        }
        if (buf.length < minDanmakuLength) return buf;
        list.push(buf);
        return "";
      }, "");
    return list;
  },
};

const run = () => {
  const {
    autoDownVote,
    maxCycleSec,
    minCycleSec,
    minDownVoteMin,
    maxDownVoteMin,
    minChangeChannel,
    text,
    splitMode,
    randomDanmaku,
    fireMode,
    textAmmoPiecing,
    fireImmediately,
  } = config/* config */.vc;
  if (!autoDownVote) {
    if (unsafeWindow.waitForDownvote && !downvote/* delayDownVoteTimer */.RB){
      let downVoteDelay = (0,utils/* randomInt */.Iy)(minDownVoteMin * 1000, Math.max(minDownVoteMin, maxDownVoteMin) * 1000);
      (0,ui_utils/* Toast */.FN)(`舰载机挂踩插件运行中 - 过${downVoteDelay / 1000}s点踩。为了保证挂踩时间，涉及到切换频道的操作均会被推迟。`);
      downvote/* delayDownVoteTimer */.RB = setTimeout(() => {
          (0,utils/* pressDownVote */.Ux)(false);
      }, downVoteDelay);
      refs/* refs.dlcDownvoteEndTime */.x.dlcDownvoteEndTime = new Date().getTime() + downVoteDelay + minChangeChannel * 1000;
    } else {
      (0,utils/* pressDownVote */.Ux)();
    }
  }

  // 检查设置项
  if (!config/* config.noValidate */.vc.noValidate) {
    try {
      refs/* refs.configValidators.forEach */.x.configValidators.forEach((vali) => vali());
    } catch (err) {
      (0,ui_utils/* Toast */.FN)(err);
    }
  }

  localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));

  let danmakuList;
  if (fireMode == 0) {
    const localDanmakuList = splitter[splitMode](text);
    danmakuList = refs/* refs.remoteDanmakuConfig.filter */.x.remoteDanmakuConfig.filter(Boolean)
      .reduce((list, data) => list.concat(data.list), localDanmakuList);
  } else {
    // check value
    if (config/* config.ammoPiecingTimes */.vc.ammoPiecingTimes > 10){
      (0,ui_utils/* Toast */.FN)("穿甲弹同时开火次数不要大于10，会被风控射不出来, 已经帮你改小了");
      config/* config.ammoPiecingTimes */.vc.ammoPiecingTimes = 10;
    }
    danmakuList = splitter[splitMode](textAmmoPiecing).map((ammo) => (0,ammo_refine/* refine */.l)(ammo));
  }
  if (!danmakuList.length) {
    (0,ui_utils/* Toast */.FN)("当前弹幕列表为空！");
    return;
  }
  try {
    apStart();
  } catch (_){
    
  }

  refs/* refs.runBtn.innerText */.x.runBtn.innerText = "中止";

  const minCycleTime = parseInt(minCycleSec * 1000, 10);
  const maxCycleTime = parseInt(maxCycleSec * 1000, 10);

  refs/* refs.danmakuGener */.x.danmakuGener = (function* gen() {
    if (+splitMode === 2 && randomDanmaku) {
      while (true) yield danmakuList[(0,utils/* randomInt */.Iy)(0, danmakuList.length - 1)];
    } else {
      while (true) yield* danmakuList;
    }
  }());
  let fireCount = fireMode == 0? 1: config/* config.ammoPiecingTimes */.vc.ammoPiecingTimes;
  let nextTimer = (beg=false) => {
    let min = minCycleTime, max = maxCycleTime;
    if (beg && fireImmediately){
      min = 1000;
      max = 1000;
    }
    timer = setTimeout(async () => {
      try{
        let comments = document.getElementById("comments");
       if ((comments && comments.hidden) || refs/* refs.sendBtn */.x.sendBtn) {
          if (!refs/* refs.chatTxtInput */.x.chatTxtInput){
            console.log("似乎是会限，尝试加载发送框");
            setTimeout(async ()=>{
              const result = await refs/* refs.init */.x.init();
              if (result){
                console.log(result);
                (0,ui_utils/* Toast */.FN)(`蝗虫出洞！往死里打  出洞时间: ${new Date()}`);
              } else {
                console.log("尚未出洞");
              }
            }, 500);
          } else {
            // Normal
            for (let i = 0; i < fireCount; i++) {
              eventBus.emit("dlc.sendMsg", (await refs/* refs.danmakuGener.next */.x.danmakuGener.next()).value);
            }
          }
        } else {
          // Send msg to video
          eventBus.emit("dlc.sendMsgVideo", (await refs/* refs.danmakuGener.next */.x.danmakuGener.next()).value);
        }
      } catch (_){
      }
      if (timer) nextTimer();
    }, (0,utils/* randomInt */.Iy)(min, max));
  };
  nextTimer(beg=true);
};

const stop = () => {
  refs/* refs.runBtn.innerText */.x.runBtn.innerText = "出动";
  refs/* refs.ambushBtn.innerText */.x.ambushBtn.innerText = "伏击";
  apStop();
  clearTimeout(timer);
  timer = null;
}




;// CONCATENATED MODULE: ./src/modules/sendMsg/ambush.js






let lastMsgID = "";
// 开始伏击
const ambush = () => {
  (0,utils/* pressDownVote */.Ux)();
  (0,ui_utils/* Toast */.FN)("准备伏击 越共探头.jpg");
  refs/* refs.ambushBtn.innerText */.x.ambushBtn.innerText = "撤退";
  // Ignore previous messages
  const messagesList = unsafeWindow.frames.chatframe.contentDocument.getElementsByTagName("yt-live-chat-text-message-renderer");
  if (messagesList && messagesList.length > 0) {
    lastMsgID = messagesList[messagesList.length - 1].id;
  }
  const nextTimer = () => {
    timer = setTimeout(() => {
      let attack = false;
      const autoAttackTarget = "Coco Ch. 桐生ココ";
      const messagesList = unsafeWindow.frames.chatframe.contentDocument.getElementsByTagName("yt-live-chat-text-message-renderer");
      for (let i = messagesList.length - 1; i >= 0; i--) {
        const message = messagesList[i];
        if (message.id == lastMsgID) {
          break;
        }
        const authorName = message.getElementsByTagName("yt-live-chat-author-chip")[0].children["author-name"].innerText;
        // console.log("authorName: "+authorName);
        if (autoAttackTarget === authorName) {
          if (refs/* refs.runBtn.innerText */.x.runBtn.innerText === "出动") {
            const s = message.textContent || message.innerText;
            (0,ui_utils/* Toast */.FN)(`${String(new Date())}发现目标！开火！${s}`);
            attack = true;
            refs/* refs.runBtn.click */.x.runBtn.click();
          }
        }
      }
      if (messagesList && messagesList.length > 0) {
        lastMsgID = messagesList[messagesList.length - 1].id;
      }
      if (!attack) {
        nextTimer();
      }
    }, 2000);
  };
  nextTimer();
}

const retreat = () => {
  refs/* refs.ambushBtn.innerText */.x.ambushBtn.innerText = "伏击";
  eventBus.emit("dlc.stop");
};



;// CONCATENATED MODULE: ./src/modules/events/event-bus.js



// import { recallStart, recallStop } from '@/modules/sendMsg/recall.js';








const eventBus = {
  ee: new EventTarget(),
  on(type, fn, opt, fnKey = Symbol("dlc.event.type.anonymous")) {
    this.fnMap.set(fnKey, fn);
    this.ee.addEventListener(type, fn, opt);
    return fnKey;
  },
  off(type, fn, opt) {
    this.ee.removeEventListener(type, fn, opt);
  },
  emit(type, detail) {
    const event = new CustomEvent(type, { detail });
    this.ee.dispatchEvent(event);
  },
  fnMap: new Map(),
};

const initEventBus = ()=>{
  // 关闭自动播放
  eventBus.on("dlc.ready", () => {
    if (refs/* refs.autoPlayBtn */.x.autoPlayBtn && refs/* refs.autoPlayBtn.active */.x.autoPlayBtn.active) refs/* refs.autoPlayBtn.click */.x.autoPlayBtn.click();
  });
  // 远程弹幕库设置
  eventBus.on("setRef.remoteDanmakuConfig", ({ detail }) => {
    refs/* refs.remoteDanmakuConfig */.x.remoteDanmakuConfig = detail;
  });
  // 发送消息
  eventBus.on(
    "dlc.sendMsg",
    ({ detail: text }) => {
      const { recallMsg, fireMode } = config/* config */.vc;
      // 穿甲弹不精制弹药
      let doRefine = fireMode == 0;
      let refinedText = sendMsg(text, doRefine);
      // 撤回消息
      if (recallMsg) {
        setTimeout(() => {
          
          eventBus.emit("dlc.recallMsg", refinedText);
        }, 20000);
      }
    },
    {},
    "dlc.sendMsg.default",
  );
  eventBus.on(
    "dlc.sendMsgVideo",
    ({ detail: text }) => {
      sendMsgVideo(text);
    },
    {},
    "dlc.sendMsg.default",
  );
  // eventBus.on(
  //   "dlc.recallModeOnchange",
  //   () => {
  //     if (!config.recallMsg){
  //       // 启动撤回
  //       recallStart();
  //     } else {
  //       recallStop();
  //     }
  //   },
  //   {},
  //   "dlc.recallModeOnchange.default",
  // );
  eventBus.on(
    "dlc.handleServerCommand",
    ({ detail: json }) => {
      (0,client/* handleServerCommand */.S)(json);
    },
    {},
    "dlc.handleServerCommand.default",
  );
  eventBus.on(
    "dlc.createChannel",
    ({ detail: accountName }) => {
      return (0,create_account/* createChannel */.mi)(accountName);
    },
    {},
    "dlc.createChannel.default",
  );
  // 检测直播间状态
  eventBus.on("dlc.ready", live/* monitorLiveStatus */.k$);
  // 舰载机状态改变的时候读取账号信息
  eventBus.on(
    "dlc.controlOnchange",
    () => {
      config/* config.control */.vc.control = !config/* config.control */.vc.control;
      localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
      if (config/* config.control */.vc.control && !account_information/* accountInformation.inited */.K.inited){
        (0,account_information/* setupAccountInfo */.L)();
      }
    },
    {},
    "dlc.controlOnchange.default",
  );
  // 独轮车出动
  eventBus.on(
    "dlc.run",
    run,
    {},
    "dlc.run.default",
  );
  // 结束发射
  eventBus.on(
    "dlc.stop",
    stop,
    {},
    "dlc.stop.default",
  );
  //加特林模式
  eventBus.on(
    "dlc.gatlingrun",
    gatlingrun,
    {},
    "dlc.gatlingrun.default",
  );
  eventBus.on(
    "dlc.gatlingstop",
    gatlingstop,
    {},
    "dlc.gatlingstop.default",
  );
  // 伏击模式
  eventBus.on(
    "dlc.ambush",
    ambush,
    {},
    "dlc.ambush.default",
  );
  // 停止伏击
  eventBus.on(
    "dlc.retreat",
    retreat,
    {},
    "dlc.retreat.default",
  );
};


/***/ }),

/***/ 659:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RB": () => (/* binding */ delayDownVoteTimer),
/* harmony export */   "MB": () => (/* binding */ changeChannelTimer),
/* harmony export */   "w7": () => (/* binding */ delayDownVote)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(555);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(182);
/* harmony import */ var _refs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(803);
/* harmony import */ var _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(996);
/* harmony import */ var _modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(274);
/* harmony import */ var _modules_account_information_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(368);









let delayDownVoteTimer;
let changeChannelTimer;

// 加特林换频道 (只在delayDownVote中用到)
const changeCurrChannel = (target, delay) => {
  const {
    autoDownVote,
    cycleCheck,
    gatlingAutoStop,
  } = _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc;
  (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .Toast */ .FN)(`此频道点踩完毕，过${ delay / 1000 }s换号`);
  _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsIndexCurr */ .vc.channelsIndexCurr = (_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsIndexCurr */ .vc.channelsIndexCurr + 1) % _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsAll.length */ .vc.channelsAll.length;
  if (!cycleCheck) {
    if (_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsIndexCurr */ .vc.channelsIndexCurr == _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.channelsIndexStart */ .vc.channelsIndexStart){
      // 点踩完毕
      _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_3__/* .eventBus.emit */ .Y.emit("dlc.gatlingstop");
      localStorage.setItem(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.configName */ .vc.configName, JSON.stringify(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc));
      if (gatlingAutoStop){
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .Toast */ .FN)("成功点踩完一圈。停手，并在10s后关闭窗口。");
        setTimeout(()=>{window.close();}, 10000);
      } else {
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .Toast */ .FN)("成功点踩完一圈。停手");
      }
      return;
    }
  }
  if (autoDownVote) {
    if (delay > 0) {
      changeChannelTimer = setTimeout(() => {
        if (autoDownVote && target) {
          _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.changeChannelCount */ .vc.changeChannelCount = 1;
          localStorage.setItem(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.configName */ .vc.configName, JSON.stringify(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc));
          target.click();
        }
      }, delay);
    } else if (target) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.changeChannelCount */ .vc.changeChannelCount = 1;
      localStorage.setItem(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.configName */ .vc.configName, JSON.stringify(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc));
      target.click();
    }
    if (!target){
      console.log("账号相关信息");
      console.log(_modules_account_information_js__WEBPACK_IMPORTED_MODULE_5__/* .accountInformation */ .K);
      console.log("参数");
      console.log(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc);
      alert("出bug了: 加特林找不到下一个频道，无法继续点踩!\n你可以按f12，并点开控制台【账号相关信息】和【参数】，将内容截图给科技组相关人员 \n注意 其中包括个人邮箱信息！请不要公开发布\n敌特就在身边，泄密就在嘴边");
    }
  }
};
// 加特林模式延迟点踩
const delayDownVote = () => {
  const {
    autoDownVote,
    minDownVoteMin,
    maxDownVoteMin,
    minChangeChannel,
    maxChangeChannel,
    autoAttack,
  } = _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc;
  let timestampDiffMin = parseInt((Date.now() - _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.changeChannelTimerstamp */ .vc.changeChannelTimerstamp) / 60000);
  if (timestampDiffMin > 15){
    (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .Toast */ .FN)(`上次延迟点踩在${parseInt(timestampDiffMin / 60)}小时${parseInt(timestampDiffMin % 60)}分钟前，加特林可能忘记停火了。因此帮您自动停火`);
    _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_3__/* .eventBus.emit */ .Y.emit("dlc.gatlingstop");
    localStorage.setItem(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.configName */ .vc.configName, JSON.stringify(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config */ .vc));
    return;
  } else {
    _config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.changeChannelTimerstamp */ .vc.changeChannelTimerstamp = Date.now();
  }
  if (autoAttack && _refs_js__WEBPACK_IMPORTED_MODULE_2__/* .refs.runBtn.innerText */ .x.runBtn.innerText === "出动") {
    _refs_js__WEBPACK_IMPORTED_MODULE_2__/* .refs.runBtn.click */ .x.runBtn.click();
  }
  // In some cases, the dislike button may not be loaded yet. In this case, we reeload the page.
  try {
    const downVoteBtn = document.getElementsByClassName("style-scope ytd-menu-renderer force-icon-button")[1];
    if (downVoteBtn.classList.contains("style-text")) {
      // 还没点
      let downVoteDelay = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .randomInt */ .Iy)(minDownVoteMin * 1000, Math.max(minDownVoteMin, maxDownVoteMin) * 1000);
      (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .Toast */ .FN)(`加特林正在转动，过${downVoteDelay / 1000}s点踩`);
      delayDownVoteTimer = setTimeout(() => {
        if (autoDownVote) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .pressDownVote */ .Ux)(false);
          changeCurrChannel(
            _modules_account_information_js__WEBPACK_IMPORTED_MODULE_5__/* .accountInformation.nextChannel */ .K.nextChannel,
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .randomInt */ .Iy)(minChangeChannel * 1000, Math.max(minChangeChannel, maxChangeChannel) * 1000));
        }
      }, downVoteDelay);
    } else {
      // 点过了
      console.log("这个频道点过踩了");
      changeCurrChannel(
        _modules_account_information_js__WEBPACK_IMPORTED_MODULE_5__/* .accountInformation.nextChannel */ .K.nextChannel,
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .randomInt */ .Iy)(minChangeChannel * 1000, Math.max(minChangeChannel, maxChangeChannel) * 1000),
      );
    }
  
  } catch (e) {
    document.location.reload();
  }
};



/***/ }),

/***/ 125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k$": () => (/* binding */ monitorLiveStatus),
/* harmony export */   "$0": () => (/* binding */ loadLiveInfo),
/* harmony export */   "Bg": () => (/* binding */ initLive)
/* harmony export */ });
/* unused harmony export bindStop */
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);
/* harmony import */ var _refs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(803);
/* harmony import */ var _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(996);
/* harmony import */ var _modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(274);





// 检测直播间状态
const monitorLiveStatus = () => {
  setTimeout(() => {
    _refs_js__WEBPACK_IMPORTED_MODULE_1__/* .refs.offlineStateDiv */ .x.offlineStateDiv = document.querySelector(
      ".ytp-offline-slate-main-text",
    );
    if (!_refs_js__WEBPACK_IMPORTED_MODULE_1__/* .refs.offlineStateDiv.innerText */ .x.offlineStateDiv.innerText) {
      if (_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.autoStop */ .vc.autoStop) {
        _refs_js__WEBPACK_IMPORTED_MODULE_1__/* .refs.offlineStateDiv.addEventListener */ .x.offlineStateDiv.addEventListener("DOMNodeInserted", bindStop);
      }
      _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_2__/* .eventBus.emit */ .Y.emit("live.start");
      console.log("Live start");
    } else {
      // console.log("waiting for stream start...");
      monitorLiveStatus();
    }
  }, 10000);
};

// 直播间加载api
const loadLiveInfo = (url, target, ignoreError = false, started = false) => {
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      if (!data || !data.currentLives) {
        target.checked = false;
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Toast */ .FN)(
          (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_3__.h)("monitor", { style: { color: "red" } }, [
            "数据格式有误， 请使用正确的api",
          ]),
        );
        return;
      }
      if (started) {
        if (!data.currentLives[0]) window.location = "https://www.youtube.com/";
        return;
      }
      if (!data.currentLives[0]) {
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Toast */ .FN)("监控中");
        return;
      }
      const { link } = data.currentLives[0];
      if (link === _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.lastLiveUrl */ .vc.lastLiveUrl) {
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Toast */ .FN)("刚冲过了, 休息中, 等待监控API刷新");
        return;
      }
      (0,_config_js__WEBPACK_IMPORTED_MODULE_0__/* .setAndSave */ .$)("lastLiveUrl", link);
      window.location = link;
    })
    .catch((err) => {
      console.error(err);
      if (!ignoreError) {
        target.checked = false;
        (0,_config_js__WEBPACK_IMPORTED_MODULE_0__/* .setAndSave */ .$)("fullAutomation", false);
      }
      (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .Toast */ .FN)(
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_3__.h)("monitor", { style: { color: "red" } }, [`${"加载错误 "}${err}`]),
      );
    });
};

// 自动停止
const bindStop = (eve) => {
  if (eve.target.data === "感谢收看") {
    // eventBus.emit("dlc.stop");
    // dlc.stop在下面这个事件中触发
    _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_2__/* .eventBus.emit */ .Y.emit("dlc.gatlingstop");
    _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_2__/* .eventBus.emit */ .Y.emit("live.stop");
    window.location = "https://www.youtube.com";
  }
};

const initLive = ()=>{
  // 窗口宽度变化会导致聊天栏重新加载
  setInterval(() => {
    try {
      const chatFrameCtx = document.getElementById("chatframe").contentWindow;
      const sendBtn = chatFrameCtx.document.querySelector(
        "#send-button button",
      ); // 发送按钮
      const chatTxtInput = chatFrameCtx.document.querySelector(
        "#input.yt-live-chat-text-input-field-renderer",
      ); // 输入框
      if (sendBtn) _refs_js__WEBPACK_IMPORTED_MODULE_1__/* .refs.sendBtn */ .x.sendBtn = sendBtn;
      if (chatTxtInput) _refs_js__WEBPACK_IMPORTED_MODULE_1__/* .refs.chatTxtInput */ .x.chatTxtInput = chatTxtInput;
    } catch (_) {
      // noop
    }
  }, 60000);
};


/***/ }),

/***/ 264:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ modEdit),
/* harmony export */   "x": () => (/* binding */ modEditor)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);
/* harmony import */ var _modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(274);
/* harmony import */ var _modules_mod_mod_manager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(358);





// 添加/编辑mod
const addMod = (modName, mod, index = null) => {
  const { modList } = _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc;
  if (!mod) {
    (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .Toast */ .FN)("无效mod");
    return;
  }
  if (index === null) {
    modList.push({
      modName: modName || "未命名MOD",
      mod,
      activate: true,
    });
  } else {
    modList[index] = {
      modName: modName || "未命名MOD",
      mod,
      activate: true,
    };
  }
  localStorage.setItem(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.configName */ .vc.configName, JSON.stringify(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc));
  (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .Toast */ .FN)("保存MOD成功,请刷新页面以使用");
  (0,_modules_mod_mod_manager_js__WEBPACK_IMPORTED_MODULE_2__/* .modManager */ .W)();
};

// mod编辑页面
const modEdit = (_mod = { modName: "", mod: "" }, index = 0) => {
  const { modName, mod } = _mod;
  const edit = Boolean(modName); // 编辑模式还是添加模式
  return (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__.h)(
    "form",
    {
      style: { "max-width": "500px" },
      id: "add-mod",
      $submit: (ev) => {
        ev.preventDefault();
        if (edit) { addMod(ev.target.modName.value, ev.target.mod.value, index); } else {
          addMod(ev.target.modName.value, ev.target.mod.value);
        }
      },
    },
    [
      ["input", {
        value: modName,
        type: "text",
        name: "modName",
        placeholder: "MOD名称",
      }],
      ["button", { type: "submit", class: "dlc-btn" }, "保存"],
      [
        "textarea", {
          value: mod,
          name: "mod",
          class: "dlc-textarea",
          placeholder: "扩展脚本，这里的代码会在独轮车初始化前eval执行",
          style: {
            width: "100%",
            height: "300px",
            overflow: "scroll",
            whiteSpace: "pre",
          },
          form: "add-mod",
        }, mod,
      ],
    ],
  );
};

// 单个mod管理
const modEditor = (mod, index) => {
  const input = ["input", {
    type: "checkbox",
    $click: ({ target }) => {
      _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.modList */ .vc.modList[index].activate = target.checked;
      localStorage.setItem(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.configName */ .vc.configName, JSON.stringify(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc));
    },
  }];
  if (mod.activate) { input[1].checked = "checked"; }

  return [
    "div", {
      style: {
        display: "flex",
        "justify-content": "flex-end",
      },
    }, [
      ["span", { style: { "font-size": "15px", flex: 1 } }, mod.modName],
      input,
      ["button", {
        $click: () => {
          (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .Toast */ .FN)(modEdit(mod, index));
        },
      }, "编辑"],
      ["button", {
        $click: () => {
          if (index === 0) {
            _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.modList.shift */ .vc.modList.shift();
          } else {
            _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.modList.splice */ .vc.modList.splice(index, index);
          }
          localStorage.setItem(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.configName */ .vc.configName, JSON.stringify(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc));
          (0,_modules_mod_mod_manager_js__WEBPACK_IMPORTED_MODULE_2__/* .modManager */ .W)();
        },
      }, "删除"],

    ],
  ];
};



/***/ }),

/***/ 358:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ modManager),
/* harmony export */   "l": () => (/* binding */ runMods)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);
/* harmony import */ var _modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(274);
/* harmony import */ var _modules_mod_mod_edit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(264);



// mod 管理界面
const modManager = (singletonId = "singletonDom") => {
  const { modList } = _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc;
  if (modManager[singletonId]) modManager[singletonId].remove();
  const dom = (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__.h)(
    "div",
    {
      class: "dlc-mod-mgr",
    },
    [
      [
        "button",
        {
          class: "dlc-btn",
          $click: () => {
            dom.remove();
          },
        },
        "关闭",
      ],
      ["button", {
        class: "dlc-button",
        $click: () => {
          (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .Toast */ .FN)((0,_modules_mod_mod_edit_js__WEBPACK_IMPORTED_MODULE_2__/* .modEdit */ .y)());
        },
      }, "添加mod"],
      ...modList.map(_modules_mod_mod_edit_js__WEBPACK_IMPORTED_MODULE_2__/* .modEditor */ .x),
    ],
  );
  modManager[singletonId] = dom;
  document.body.appendChild(dom);
};

const runMods = () => {
  // 运行mods
  if (_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.modList */ .vc.modList) {
    try {
      _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.modList.forEach */ .vc.modList.forEach((_mod) => {
        if (_mod.activate) {
          eval(_mod.mod);
        }
      });
    } catch (e) {
      console.error(e);
      (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .Toast */ .FN)("扩展脚本运行失败，错误信息已输出到控制台");
    }
  }
};


/***/ }),

/***/ 144:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ refine)
/* harmony export */ });
/* unused harmony export doRefine */
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(451);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(555);
/* harmony import */ var _modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(126);





const editBanedWord = (wordList, ammoRefine_BanedWordMode) => {
  // 移除非英文屏蔽词
  wordList = wordList.filter((word)=>{
    return !/[\u2E80-\u9FFF]/.test(word);
  });
  let newWordList = [];
  for (let i = 0; i < wordList.length; i++){
    let word = wordList[i];
    if (/[A-Za-z]/.test(word)){
      switch (+ammoRefine_BanedWordMode){
        case 0:
          // 删除这个词
          break;
        case 1:
          // 词中间插入一个随机字母
          const index = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .randomInt */ .Iy)(0, word.length - 1);
          let code = word.codePointAt(index);
          if (code === 90) {
            // "Z"
            code = 65;
          } else if (code === 122) {
            // "z"
            code = 97;
          } else {
            code += 1;
          }
          let newWord = word.slice(0, index) + String.fromCodePoint(code) + word.slice(index + 1, word.length);
          try{
            if (!(_modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__/* .dlcInformation.block_words.indexOf */ .w.block_words.indexOf(newWord.toLowerCase()) > -1)) {
              newWordList.push(newWord);
            }
          } catch (e){
            newWordList.push(newWord);
          }
          break;
        default:
          console.log(`屏蔽词：${word} 模式: ${ammoRefine_BanedWordMode} 尚未编写`);
      };
    } else {
      newWordList.push(word);
    }
  }
  return newWordList;
};
const localRefine = (wordList, banedWordDict, ammoRefine_BanedWordMode) => {
  let newWordList = [];
  let i = 0;
  let startIndex = 0;
  // 是否正在查找屏蔽词
  let handleBanedWord = false;
  // 是否正在处理英文屏蔽词 (此时无视标点符号)
  let currEn = false;
  let currBanedWordDict = banedWordDict;
  for (i = 0; i < wordList.length; i++){
    if (handleBanedWord){
      // 正在处理被ban词语
      if (!currBanedWordDict){
        // 这个词是目标词
        newWordList.push(editBanedWord(wordList.slice(startIndex, i), ammoRefine_BanedWordMode));
        handleBanedWord = false;
        currBanedWordDict = banedWordDict;
        i = i - 1;
      } else {
        // 如果上一个单词是英文且当前单词是符号，则跳过这个单词继续匹配
        if(currEn && !/[A-Za-z]/.test(wordList[i]) && !/[\u2E80-\u9FFF]/.test(wordList[i])){
          continue;
        } else {
          if (wordList[i].toLowerCase() in currBanedWordDict){
            // 能匹配的到，继续匹配
            currBanedWordDict = currBanedWordDict[wordList[i].toLowerCase()];
          } else {
            // 匹配中断
            handleBanedWord = false;
            currBanedWordDict = banedWordDict;
            for (; startIndex < i; startIndex++){
              newWordList.push([wordList[startIndex]]);
            }
            i--;
          }
        }
      }
    } else {
      if (wordList[i].toLowerCase() in currBanedWordDict){
        // 进入搜索屏蔽词模式
        startIndex = i;
        handleBanedWord = true;
        currBanedWordDict = currBanedWordDict[wordList[i].toLowerCase()];
      } else {
        // 这个词不是屏蔽词
        newWordList.push([wordList[i]]);
      }
    }
    // 是英文
    if (/[A-Za-z]/.test(wordList[i])){
      currEn = true;
    }
    // 是CJK
    if (/[\u2E80-\u9FFF]/.test(wordList[i])){
      currEn = false;
    }
  }
  if (handleBanedWord){
    if (!currBanedWordDict){
      newWordList.push(editBanedWord(wordList.slice(startIndex, i), ammoRefine_BanedWordMode));
    } else {
      for (; startIndex < i; startIndex++){
        newWordList.push([wordList[startIndex]]);
      }
    }
  }
  return newWordList.reduce((cum, curr)=>cum.concat(curr), []);
};

  // 全角转换为半角
const toCDB = (str) => {
  str = str.replace(/’|‘/g, "'").replace(/“|”/g, "\"");
  str = str.replace(/【/g, "[").replace(/】/g, "]").replace(/｛/g, "{").replace(/｝/g, "}");
  str = str.replace(/，、/g, ",").replace(/：/g, ":");
  str = str.replace(/。/g, ".").replace(/：/g, ":");
  let tmp = "";
  for (let i = 0; i < str.length; i++) {
    if (str.codePointAt(i) === 12288) {
      tmp += String.fromCharCode(str.codePointAt(i) - 12256);
      continue;
    }
    if (str.codePointAt(i) > 65280 && str.codePointAt(i) < 65375) {
      tmp += String.fromCharCode(str.codePointAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.codePointAt(i));
    }
  }
  return tmp;
};

const ammoDisterb = (text) => {
  // 随机删除一个字符 避免弹药重复上不了tc
  // 根据反馈，很多人会手动在屏蔽词中间加空格
  // 现在不会删除空格了
  const words = text.trim().split(/\s{1,}/);
  if (words.length > 0) {
    const wordIndex = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .randomInt */ .Iy)(0, words.length - 1);
    const charSplited = [...words[wordIndex]];
    charSplited.splice((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .randomInt */ .Iy)(0, charSplited.length - 1), 1);
    words[wordIndex] = charSplited.join("");
  }
  text = words.join(" ");
  return text;
};
const jpChar = "いうえおうをかきくけこうさしすせそうなにぬねのはへほうみむめももうやゆよようらりるれろろうがぎぐげごうじだでどうばびぶべぼういてからことしてしたする";
const doRefine = (
    text, 
    ammoRefine_Cloud=false, 
    ammoRefine_Local=false,
    ammoRefine_Disturb=false,
    ammoRefine_ToLower=false,
    ammoRefine_BanedWordMode=false,
    ammoRefine_SplitWord=false,
    ammoRefine_prefix=false,
    ammoRefine_suffix=false,
  ) => {
  // 拆分会员表情和文字
  let emojiList = [];
  let textList = [];
  let matchResult = text.match(/:[a-zA-Z_]+:/);
  if (matchResult){
    do {
      textList.push(text.substr(0, matchResult.index));
      emojiList.push(matchResult[0]);
      text = text.substr(matchResult.index + matchResult[0].length);
      matchResult = text.match(/:[a-zA-Z_]+:/);
    } while (matchResult);
    textList.push(text);
  } else {
    textList.push(text);
  }
  // 对每个切片都进行一次操作
  textList = textList.map((text)=>{
    // 全角标点符号转半角
    if (ammoRefine_Local) {
      text = toCDB(text);
    }
    // 大写字母转小写
    if (ammoRefine_ToLower) {
      text = text.toLowerCase();
      text = text.replace(/[[\]?.!-;,:',，。、“”！？"]+/g, " ");
    }
    // 正则替换
    if (ammoRefine_Local) {
      for (let key in _modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__/* .dlcInformation.regexs */ .w.regexs) {
        text = text.replace(new RegExp(key), _modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__/* .dlcInformation.regexs */ .w.regexs[key]);
      }
    }
    // 分词
    let wordList = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .participleCJKE */ .v)(text);
    if (ammoRefine_Local) {
      wordList = localRefine(wordList, _modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__/* .bwTrieTree */ .s, ammoRefine_BanedWordMode);
    }
    if (ammoRefine_SplitWord){
      wordList = wordList.map((str)=>str+jpChar[(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .randomInt */ .Iy)(0, jpChar.length)]);
    }
    text = wordList.join("");
    return text;
  });
  // 弹药扰动提高上TC概率
  if (ammoRefine_Disturb){
    let index = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .randomInt */ .Iy)(0, textList.length-1);
    textList[index] =  ammoDisterb(textList[index]);
  }
  // 拼接表情和文字
  text = textList[0];
  for (let i = 0; i < emojiList.length; i++){
    text = text + emojiList[i] + textList[i+1];
  }
  // 添加前缀
  if (ammoRefine_prefix){
    text = _modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__/* .dlcInformation.prefixes */ .w.prefixes[(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .randomInt */ .Iy)(0, _modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__/* .dlcInformation.prefixes.length */ .w.prefixes.length-1)] + text;
  }
  if (ammoRefine_suffix){
    const suffix =  _modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__/* .dlcInformation.suffixes */ .w.suffixes[(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .randomInt */ .Iy)(0, _modules_dlc_information_js__WEBPACK_IMPORTED_MODULE_2__/* .dlcInformation.suffixes.length */ .w.suffixes.length-1)]
    if (text.length + suffix.length > 200){
      text = text.substr(0, 200 - suffix.length) + suffix;
    } else {
      text = text + suffix;
    }
  } else if (text.length > 200){
    text = text.substr(0, 200);
  }
  return text;
};
const refine = (text) => {
  const {
    ammoRefine_Cloud, 
    ammoRefine_Local, 
    ammoRefine_Disturb, 
    ammoRefine_ToLower, 
    ammoRefine_BanedWordMode,
    ammoRefine_SplitWord,
    ammoRefine_prefix,
    ammoRefine_suffix,
  } = _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc;
  return doRefine(
    text, 
    ammoRefine_Cloud, 
    ammoRefine_Local, 
    ammoRefine_Disturb, 
    ammoRefine_ToLower, 
    ammoRefine_BanedWordMode,
    ammoRefine_SplitWord,
    ammoRefine_prefix,
    ammoRefine_suffix,
  );
}


/***/ }),

/***/ 451:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ participleCJKE)
/* harmony export */ });
const regEn = /([^A-Za-z0-9\u2E80-\u9FFF])/;
const regCJK = /([\u2E80-\u9FFF])/;
// 中日韩英分词
const participleCJKE = (str) =>{
  if (str)
    return str.split(regEn).reduce((cum, curr)=>cum.concat(curr.split(regCJK).filter((x)=>x)), []);
  else
    return [];
};



/***/ }),

/***/ 484:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ getAnoncementDom)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(274);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(182);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(555);





// 左上角版本更新，广播塔公告提示模块

// 版本更新检测
const getAnoncementDom = (oldVersion, newVersion, logs, announcement="") => {
  let needUpdate = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .versionToNumber */ .Uo)(oldVersion) < (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .versionToNumber */ .Uo)(newVersion);
  let doms = [];
  if (announcement){
    doms = doms.concat([
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getSplitLine */ .$g)(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.border */ .Dc.border, "2px"),
      ["h1", {"style": `color: ${_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.announcementHeader */ .Dc.announcementHeader}`}, "车载地下电台"],
    ]).concat(
      announcement.split("\n").map((line)=>
        ["div", {}, line]
      )
    );
  }
  doms = doms.concat([
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getSplitLine */ .$g)(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.border */ .Dc.border, "2px"),
      ["h1", {style: `color: red`}, needUpdate? "更新提示: ": ""],
      ["div", {}, needUpdate? `您的版本为: ${oldVersion}, 最新版为: ${newVersion}, 建议更新最新版`: "您的独轮车是最新版，不需要更新"],
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                window.location.href = `https://script.cocosuki.xyz/${_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.o */ .vc.o? "jianzaiji": "cheche"}.user.js`;
              }
            },
            needUpdate? "更新版本(源1)": "重新安装(源1)",
          ],
        ]),
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                window.location.href = `	https://github.com/aserwarsdfd/logs/raw/main/${_config_js__WEBPACK_IMPORTED_MODULE_1__/* .config.o */ .vc.o? "舰载": "Youtube"}独轮车.release.user.js`;
              }
            },
            needUpdate? "更新版本(备用源)": "重新安装(备用源)",
          ],
        ]),
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                window.open("https://bbs.nga.cn/read.php?tid=25560549");
              }
            },
            "冲蝗指南",
          ],
        ]),
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                window.location.href = "https://bbs.nga.cn/read.php?tid=25006545";
              }
            },
            "问题反馈",
          ],
        ]),
    ]);
  if (needUpdate) {
    logs = logs.filter((log)=>(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .versionToNumber */ .Uo)(log.split(":")[0]) > (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .versionToNumber */ .Uo)(oldVersion));
    doms = doms.concat([
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getSplitLine */ .$g)(_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.border */ .Dc.border, "2px"),
      ["h2", {"style": `color: ${_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.announcementHeader */ .Dc.announcementHeader}`}, `更新日志: `],
      [
        "div",
        {},
        logs.map((log) =>
          [
            "div",
            {},
            [
              ["h3", {}, log.split(":")[0]],
              ["div", {}, log.split(":")[1].split("\n").map((line)=>
                ["div", {}, line],
                )],
              (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getSplitLine */ .$g)("#808080", "1px"),
            ]
          ]
        ),
      ],
    ]);
  }
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.h)(
    "div",
    {"style": `color: ${_config_js__WEBPACK_IMPORTED_MODULE_1__/* .colorConfig.fontColor */ .Dc.fontColor}`},
    doms,
  );
}



/***/ }),

/***/ 274:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ h),
/* harmony export */   "FN": () => (/* binding */ Toast),
/* harmony export */   "$g": () => (/* binding */ getSplitLine),
/* harmony export */   "bE": () => (/* binding */ ConfigField),
/* harmony export */   "y7": () => (/* binding */ CollapseField),
/* harmony export */   "JJ": () => (/* binding */ BibleField)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);
/* harmony import */ var _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(996);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(555);



// 迷你版渲染器
const h = (tagname, attributes = {}, children = [], option = {}) => {
  if (tagname instanceof Node) return tagname;
  if (tagname instanceof Array) {
    const frag = document.createDocumentFragment();
    tagname.forEach((it) => {
      if (it instanceof Node) {
        frag.appendChild(it);
      } else if (Array.isArray(it)) {
        frag.appendChild(h(it[0], it[1], it[2], it[3]));
      } else if (["string", "number"].includes(typeof it) || it) {
        frag.appendChild(new Text(it));
      }
    });
    return frag;
  }
  const el = document.createElement(tagname);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "style" && typeof value === "object") {
      Object.assign(el.style, value);
    } else if (key.startsWith("$")) {
      if (typeof value === "function") {
        el.addEventListener(key.slice(1), value);
      } else {
        el.addEventListener(key.slice(1), value.handleEvent, value);
      }
    } else el.setAttribute(key, value);
  });
  if (["string", "number"].includes(typeof children)) {
    el.textContent = children;
  } else if (children) {
    el.appendChild(h(children));
  }
  if (typeof option === "function") {
    option(el);
  } else if (option.cb) {
    option.cb(el);
  }
  return el;
};

/** toast提示组件，msg可以是渲染器children类型 */
const Toast = (msg, toastClass = "dlc-toast", singletonId = "singletonDom", onClose = ()=>{}) => {
  if (Toast[singletonId]) Toast[singletonId].remove();
  const dom = h(
    "div",
    {
      class: toastClass,
      style: {
        zIndex: ++Toast.currZIndex,
      },
    },
    [
      [
        "button",
        {
          class: "dlc-btn",
          $click: () => {
            dom.remove();
            Toast[singletonId] = null;
            onClose();
          },
        },
        "关闭",
      ],
      ["div", {style: "font-size: 120%;"}, msg],
    ],
  );
  if (toastClass === "dlc-alert") setTimeout(() => dom.remove(), 10000);
  Toast[singletonId] = dom;
  document.body.appendChild(dom);
};
Toast.currZIndex = 10000;

const getSplitLine = (color, width) => ["div", {style: `height: 1px;border-top: ${width} solid ${color}; text-align: center;`}, ""];
const ConfigField = (
  {
    label,
    type,
    name,
    props = {},
    children = [],
    valueProp = "value",
    helpDesc,
  },
  option,
) => [
  "div",
  {},
  [
    helpDesc && [
      "span",
      {
        class: "help-icon",
        $click: (ev) => {
          ev.stopPropagation();
          Toast(helpDesc);
        },
      },
    ],
    [
      "label",
      {},
      [
        label,
        [
          type,
          {
            ...props,
            $change: (ev) => {
              _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_1__/* .eventBus.emit */ .Y.emit(`setConfig.${name}`, ev.target[valueProp]);
              if (props.$change) props.$change(ev);
            },
          },
          children,
          (el) => {
            el[valueProp] = _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc[name];
            _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_1__/* .eventBus.on */ .Y.on(
              `setConfig.${name}`,
              ({ detail }) => {
                _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc[name] = detail;
                el[valueProp] = detail;
              },
              {},
              `dlc.setConfig.${name}.default`,
            );
          },
        ],
      ],
    ],
  ],
  option,
];
const CollapseField = (
  summary,
  children,
  helpDesc = "",
) => {
  children[0][1].style = `border-top:1px solid;border-top-left-radius: 5px;border-top-right-radius: 5px;${children[0][1].style}`;
  children[children.length - 1][1].style = `border-bottom:1px solid;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;${children[children.length - 1][1].style}`;
  return [
    "div",
    {},
    [
      helpDesc && [
        "span",
        {
          class: "help-icon",
          $click: (ev) => {
            ev.stopPropagation();
            Toast(helpDesc);
          },
        },
      ],
      ["label",
        {},
        [
          [
            "details",
            {},
            [
              ["summary", { style: `background-color: ${_config_js__WEBPACK_IMPORTED_MODULE_0__/* .colorConfig.collapseBackground1 */ .Dc.collapseBackground1};border:1px solid;border-radius:5px;border-color: ${_config_js__WEBPACK_IMPORTED_MODULE_0__/* .colorConfig.collapseBorder */ .Dc.collapseBorder};` }, summary],
            ].concat(
              children.map((e) => {
                e[1].style = `background-color: ${_config_js__WEBPACK_IMPORTED_MODULE_0__/* .colorConfig.collapseBackground2 */ .Dc.collapseBackground2};border-right:1px solid; border-left:1px solid;border-color: ${_config_js__WEBPACK_IMPORTED_MODULE_0__/* .colorConfig.collapseBorder */ .Dc.collapseBorder};${e[1].style}`;
                return e;
              }),
            ),
          ],
        ],
      ],
    ],
  ];
};
const BibleField = (name, content="测试用定型文", formatting=false)=>{
  return [
    "div", 
    {}, 
    [
      [
        h([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .copyToClip */ .qb)(content, "", false);
              },
            },
            "复制",
          ],
          [
            "label",
            {},
            [
              name
            ],
          ]
        ]),
      ]
    ]
  ];

};


/***/ }),

/***/ 803:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ refs),
/* harmony export */   "d": () => (/* binding */ initRefs)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);
/* harmony import */ var _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(996);
/* harmony import */ var _modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(274);



const refs = {
    sendBtn: null,
    autoDownVoteBtn: null,
    chatTxtInput: null,
    autoPlayBtn: null,
    runBtn: null,
    runAmmoTestBtn: null,
    runAmmoAnalysisBtn: null,
    offlineStateDiv: null,
    remoteDanmakuConfig: [],
    dlcAutomation: null,
    duluncheWnd: null,
    CVServer: false,
    dlcDownvoteEndTime: 0,
    fetchNative: undefined,
    armorPiercingTimeoutId: undefined,
    armorPiercingPromise: undefined,
    armorPiercingResolve: undefined,
    configValidators: [
      () => Number(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.minCycleSec */ .vc.minCycleSec) < 1
              && _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_1__/* .eventBus.emit */ .Y.emit("setConfig.minCycleSec", 1),
      () => Number(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.minDanmakuLength */ .vc.minDanmakuLength) < 1
              && _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_1__/* .eventBus.emit */ .Y.emit("setConfig.minDanmakuLength", 1),
      () => Number(_config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.maxDanmakuLength */ .vc.maxDanmakuLength) < _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.minDanmakuLength */ .vc.minDanmakuLength
              && _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_1__/* .eventBus.emit */ .Y.emit("setConfig.maxDanmakuLength", _config_js__WEBPACK_IMPORTED_MODULE_0__/* .config.minDanmakuLength */ .vc.minDanmakuLength),
    ],
    danmakuGener: null,
    configFieldContainer: null,
    helpContent: null,
    init: async () => {
      try {
        const chatFrameCtx = document.getElementById("chatframe").contentWindow;
        refs.sendBtn = chatFrameCtx.document.querySelector(
          "#send-button button",
        ); // 发送按钮
        refs.chatTxtInput = chatFrameCtx.document.querySelector(
          "#input.yt-live-chat-text-input-field-renderer",
        ); // 输入框
        refs.offlineStateDiv = document.querySelector(
          ".ytp-offline-slate-main-text",
        ); // 直播状态
        refs.autoPlayBtn = document.querySelector("paper-toggle-button");
        if (!refs.sendBtn || !refs.chatTxtInput) return false;
        return true;
      } catch (_) {
        return false;
      }
    },
  };
refs.helpContent = [
  [
    "button",
    {
      class: "dlc-btn",
      $click: () => {
        (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .FN)("老版独轮车扩展脚本已经迁移到MOD管理, 并且会在未来版本中删除");
      },
    },
    "编辑扩展脚本",
  ],
  [
    "pre",
    {},
    `
  API开发指南，在window.dulunche获取引用，TS定义如下
  /**
  * 独轮车配置，这是一个Proxy对象，你可以直接获取和设置配置，通过这个对象设置配置项时，也会向eventBus提交一个emit(\`setConfig.\${配置项名称}\`, value)事件
  * config对象在每次启动时会保存到localStorage的duluncheCfg中
  */
  interface ConfigType {
  /** 断句方式0: 单句模式 1: 说书模式 2: 多句转轮 */
  splitMode: number;
  /** 最小发送间隔（秒） */
  minCycleSec: number;
  /** 最大发送间隔（秒） */
  maxCycleSec: number;
  /** 是否随机发送 */
  randomDanmaku: boolean;
  /** 发送消息列表 */
  text: string;
  /** 最大弹幕字数限制 */
  maxDanmakuLength: number;
  /** 最小弹幕长度 */
  minDanmakuLength: number;
  /** 断句符 */
  splitChar: string;
  /** 远程弹幕库 */
  remoteDanmakuBase: string;
  /** 不校验配置，即不运行configValidators, 设为true是，所有配置项都不会限制输入范围 */
  noValidate: boolean;
  /** 扩展脚本，独轮车初始化前会eval执行这个脚本 */
  extension: string;

  [key: string]: any;
  }

  /**
  * 独轮车事件总线，可以在这里监听和触发各种事件
  */
  interface DuluncheEventBus {
  /** 用来绑定事件的EventTarget对象，通常不需要直接操作这个对象 */
  ee: EventTarget;
  /** 监听事件，addEventListener, 会返回一个key用于从fnMap获取监听器引用，这个key可以手动指定，默认是一个Symbol */
  on<T = any>(
  type: string,
  fn: (detail: CustomEvent<T>) => void,
  opt?: boolean | AddEventListenerOptions, fnKey?: string | Symbol
  ): string | Symbol;
  /** 取消监听事件，removeEventListener */
  off<T = any>(type: string, fn: (detail: CustomEvent<T>) => void, opt?: boolean | AddEventListenerOptions): any;
  /** 触发事件，dispatchEvent */
  emit<T = any>(type: string, detail: T): void;
  /** 已经注册的事件监听器map，可以通过key拿到事件监听器的引用 */
  fnMap: Map<string | Symbol, (detail: CustomEvent) => void>;
  }

  /** 独轮车内部一些引用，修改它们可以改变独轮车原本的一些行为 */
  interface DuluncheRefs {
  /** 配置项校验器，独轮车会在dlc.run开始时依次执行数组中的每个函数 */
  configValidators: Array<() => void>
  /** 独轮车控制台窗口dom引用 */
  duluncheWnd: HTMLDivElement;
  /** 独轮车配置列表dom引用 */
  configFieldContainer: HTMLDivElement;
  /** 弹幕生成器，独轮车通过调用danmakuGener.next().value来获取下一条要发送的弹幕，弹幕生成器只能在独轮车启动状态下被替换，最早是dlc.run的下一次事件循环 */
  danmakuGener: GeneratorFunction;
  /** 独轮车帮助信息内容 */
  helpContent: any;
  /** 初始化函数，若没有返回true则会等待1秒后重新执行，初始化成功会触发dlc.ready事件，默认行为是获取油管直播页聊天输入框和发送按钮引用，可以是异步函数 */
  init: () => boolean | Promise<boolean>;

  [key: string]: any;
  }

  interface Window {
  dulunche: {
  config: ConfigType;
  eventBus: DuluncheEventBus,
  refs: DuluncheRefs,

  /** 组件和渲染器，建议看过源码后使用 */
  components: {
  Toast: (children: string | Node, singletonId?: string) => void;
  ConfigField: (...args: any) => HTMLDivElement;
  h: (...args: any) => Node;
  }
  };
  }

  /**
  eventBus 默认的事件列表, 你可以通过emit主动触发事件，或通过on监听事件
  事件名 | 事件 | detail参数类型 | detail参数说明
  dlc.run | 启动独轮车 | void | -
  dlc.stop | 停止独轮车 | void | -
  dlc.sendMsg | 发送消息 | string | 发送的内容
  dlc.ready | 初始化成功 | void | -
  setConfig.\${configKey} | 修改配置 | any | 修改的配置值
  live.start| 监控到直播已经开始 | void
  live.stop | 监控到直播已经结束 | void
  */
  `,
  ],
];
const initRefs = async () => {
  let result;
  try {
    result = await refs.init();
  } catch (_) {
    // noop
  }
  if (result !== true) {
    setTimeout(() => initRefs(), 1000);
  } else {
    _modules_events_event_bus_js__WEBPACK_IMPORTED_MODULE_1__/* .eventBus.emit */ .Y.emit("dlc.ready");
  }
};


/***/ }),

/***/ 555:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Iy": () => (/* binding */ randomInt),
/* harmony export */   "jr": () => (/* binding */ urlEqual),
/* harmony export */   "qb": () => (/* binding */ copyToClip),
/* harmony export */   "Uo": () => (/* binding */ versionToNumber),
/* harmony export */   "Ye": () => (/* binding */ checkVersion),
/* harmony export */   "Xi": () => (/* binding */ checkThenDo),
/* harmony export */   "$t": () => (/* binding */ makeURL),
/* harmony export */   "Ux": () => (/* binding */ pressDownVote),
/* harmony export */   "mr": () => (/* binding */ formatTime)
/* harmony export */ });
/* harmony import */ var _modules_dlc_information__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(126);
/* harmony import */ var _modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(274);
/* harmony import */ var _modules_ui_anoncement_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(484);




const randomInt = (min, max) => {
  if (max < min) return min;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const urlEqual = (url1, url2) => {
  return url1.split("&")[0] === url2.split("&")[0];
};

const copyToClip = (content, message, display=true) => {
  var aux = document.createElement("textarea");
  //aux.setAttribute("value", content);
  aux.value = content;
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  if (display){
    if (message == null) {
        alert("复制成功");
    } else{
        alert(message);
    }
  }
}
const versionToNumber = (versionString) => parseInt(versionString.replace(/\./g, ""));
const checkVersion = (version) => {
  if (versionToNumber(version) < versionToNumber(_modules_dlc_information__WEBPACK_IMPORTED_MODULE_0__/* .dlcInformation.version */ .w.version)) {
    (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .Toast */ .FN)(`您的版本为: ${version}, 最新版为: ${_modules_dlc_information__WEBPACK_IMPORTED_MODULE_0__/* .dlcInformation.version */ .w.version}, 建议更新最新版本。\n更新日志: \n    ${_modules_dlc_information__WEBPACK_IMPORTED_MODULE_0__/* .dlcInformation.logs */ .w.logs}`);
    (0,_modules_ui_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .Toast */ .FN)((0,_modules_ui_anoncement_dom_js__WEBPACK_IMPORTED_MODULE_2__/* .getAnoncementDom */ .n)(
      oldVersion=version,
      newVersion=_modules_dlc_information__WEBPACK_IMPORTED_MODULE_0__/* .dlcInformation.version */ .w.version,
      logs=_modules_dlc_information__WEBPACK_IMPORTED_MODULE_0__/* .dlcInformation.logs.split */ .w.logs.split(';'),
    ));
  }
};
const checkThenDo = (element, action, delay=3000) =>{
  let e;
  try{
    e = element();
    if (!e){
      setTimeout(()=>checkThenDo(element, action, delay), delay);
      return
    }
  } catch (e){
    setTimeout(()=>checkThenDo(element, action, delay), delay);
    return;
  }
  action(e);
};
const makeURL = (url) => {
  if (url.match(/.*:\/\/youtu\.be\/.*/)){
    let urlSplit = url.split("/");
    return `${urlSplit[0]}//www.youtube.com/watch?v=${urlSplit[urlSplit.length-1]}`;
  }
  return url;
};

const pressButton = (button) => {
  if (button.getElementsByTagName("button")[0].getAttribute("aria-pressed") === "false") {
    // Not pressed
    button.click();
  }
};

const pressDownVote = (checkTSKK = true) => {
  const channelName = document.getElementById("channel-name").getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")[0].text;
  if (!checkTSKK || channelName === "Coco Ch. 桐生ココ" || channelName === "kson ONAIR") {
    pressButton(document.getElementsByClassName("style-scope ytd-menu-renderer force-icon-button")[1]);
  }
};

// 格式化时间
const formatTime = (time) => {
  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time / 60) % 60);
  const second = Math.floor(time % 60);
  return `${hour}:${minute}:${second}`;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {

// EXTERNAL MODULE: ./src/utils.js
var utils = __webpack_require__(555);
// EXTERNAL MODULE: ./src/config.js
var config = __webpack_require__(182);
// EXTERNAL MODULE: ./src/refs.js
var refs = __webpack_require__(803);
// EXTERNAL MODULE: ./src/modules/events/event-bus.js + 6 modules
var event_bus = __webpack_require__(996);
// EXTERNAL MODULE: ./src/modules/ui/utils.js
var ui_utils = __webpack_require__(274);
;// CONCATENATED MODULE: ./src/modules/ui/fullScreen.js
const initFullScreenChange = (suspension, cmd) => {
  document.onfullscreenchange = ()=>{
    if (document.fullscreenElement){
      suspension.style.setProperty("display", "none");
      cmd.style.setProperty("display", "none");
      let email = document.getElementById("account_email");
      if (email){
        email.style.setProperty("display", "none");
      }
    } else {
      suspension.style.setProperty("display", "block");
      // cmd.style.setProperty("display", displaycmd);
      let email = document.getElementById("account_email");
      if (email){
        email.style.setProperty("display", "block");
      }
    }
  };
};


;// CONCATENATED MODULE: ./src/modules/ui/edit-config.js





// 同步复制进来的参数
const editConfig = (_config = { newConfig: "" }) => {
  const { newConfig } = _config;
  return (0,ui_utils.h)(
    "form",
    {
      style: { "max-width": "500px" },
      id: "edit-config",
      $submit: (ev) => {
        ev.preventDefault();
        let parsedConfig;
        try{
          parsedConfig = JSON.parse(ev.target.newConfig.value);
        } catch (e) {
          alert("无法解析输入的参数字符串！建议检查下复制的对不对");
          return;
        }
        Object.assign(config/* config */.vc, parsedConfig);
        document.body.removeChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
        refs/* refs.duluncheWnd */.x.duluncheWnd =getDLCWnd();
        document.body.appendChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
        refs/* refs.duluncheWnd.style.setProperty */.x.duluncheWnd.style.setProperty("display", "block");
        localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
        (0,ui_utils/* Toast */.FN)("设置已保存");
      },
    },
    [
      ["button", { type: "submit", class: "dlc-btn" }, "保存"],
      [
        "textarea",
        {
          value: newConfig,
          name: "newConfig",
          class: "dlc-textarea",
          placeholder: "请把复制出的参数粘贴在这儿",
          style: {
            width: "100%",
            height: "50px",
            overflow: "scroll",
            whiteSpace: "pre",
          },
          form: "edit-config",
        },
        newConfig,
      ],
    ],
  );
};


;// CONCATENATED MODULE: ./src/modules/saving-mode.js



// 省流开关
const savingMode = (display = true, init=false) => {
  // console.log(`省流模式切换: ${display}`);
  try{
    const video = document.querySelectorAll("video")[0];
    if (display) {
        video.pause();
    } else {
      if (!init){
        video.play();
      }
    }
    const style = document.querySelector("#player.style-scope").style;
    if (display) {
      style.display = "none";
    } else {
      style.display = "block";
    }

  } catch (e){
    console.log("省流模式出现错误")
    console.log(e);
  }
};
// 首次使用省流模式 - 等待播放器加载完毕后再启动，否则会失效
const initSavingMode = (display = true) => {
  const videos = document.querySelectorAll("video");
  if (videos.length == 0){
    (0,ui_utils/* Toast */.FN)("找不到播放器! 注意耳朵");
  } else {
    videos[0].addEventListener("canplaythrough", ()=>{
      savingMode(display, init=true);
    });
    
  }
}
// 关闭聊天滚动
const savingModeChat = (display = true) => {
  try{
    let styles = [];
    styles.push(document.getElementById("chatframe").contentDocument.getElementById("ticker").style);
    styles.push(document.getElementById("chatframe").contentDocument.getElementById("separator").style);
    styles.push(document.getElementById("chatframe").contentDocument.getElementById("chat").style);
    styles.push(document.getElementById("chatframe").contentDocument.getElementById("toast-container").style);
    styles.forEach((style) =>{
      if (display) {
        style.display = "none";
      } else {
        style.display = "";
      }
    });
  } catch (_){
  }
};
// 隐藏其他不必要网页元素
const savingModeDescription = (display = true) => {
  try{
    let styles = [];
    styles.push(document.getElementById("meta").style);
    styles.push(document.getElementsByTagName("ytd-watch-next-secondary-results-renderer")[0].style);
    styles.forEach((style) =>{
      if (display) {
        style.display = "none";
      } else {
        style.display = "";
      }
    });
  } catch (_){
  }
};




// EXTERNAL MODULE: ./src/modules/mod/mod-manager.js
var mod_manager = __webpack_require__(358);
// EXTERNAL MODULE: ./src/modules/sendMsg/ammo-refine.js
var ammo_refine = __webpack_require__(144);
// EXTERNAL MODULE: ./src/modules/account-information.js
var account_information = __webpack_require__(368);
;// CONCATENATED MODULE: ./src/modules/sc-check.js



// SC检测屏蔽词相关函数，包括自动SC检测被ban状态，cv-6状态报告和sc弹药检测

let scCheckTimer;

// SC information: Unknown
const successCallback = (result) => {
  let newState = "?";
  // if (result.error === "无法发送消息") {
  //   newState = "F";
  // }
  // if (result.error === "消息未发送。请修改后重试。") {
  //   // 弹药或名字有屏蔽词
  //   newState = "F";
  // }
  if (result.error === "用户未登录或SuperChat不可用") {
    newState = "U";
  } else {
    if (result.error == null) {
      newState = "T";
    } else {
      newState = "F";
    }
  }
  return newState;
}

const checkSC = (text="", next=(text, state)=>{}) => {
  try {
    if (document.getElementById("chatframe").contentWindow.document.getElementById("action-buttons").querySelectorAll("button").length == 2){
      document.getElementById("chatframe").contentWindow.checkSuperChat(text).then(
        (result) => {
          next(text, successCallback(result));
        },
        ()=>{},
      );
    }
  } catch (e) {
  }
};


const checkSCInfo = () => {
  const { control, autoSCCheck } = config/* config */.vc;
  if (control || autoSCCheck) {
    if (!(account_information/* accountInformation.channelState */.K.channelState == "T"
    || account_information/* accountInformation.channelState */.K.channelState == "?")) {
      return;
    }
    checkSC(
      "",
      (text, state)=>{
        if (state != account_information/* accountInformation.channelState */.K.channelState){
          account_information/* accountInformation.channelState */.K.channelState = state;
          const msg = account_information/* accountInformation.get */.K.get(false);
          if (msg && refs/* refs.CVServer */.x.CVServer) {
            refs/* refs.CVServer.send */.x.CVServer.send(JSON.stringify(msg));
          }
        }
      },
    )
  }
  if (account_information/* accountInformation.channelState */.K.channelState == "T"
  || account_information/* accountInformation.channelState */.K.channelState == "?") {
    scCheckTimer = setTimeout(checkSCInfo, 60000);
  }
};
scCheckTimer = setTimeout(checkSCInfo, 30000);


// EXTERNAL MODULE: ./src/modules/sendMsg/utils.js
var sendMsg_utils = __webpack_require__(451);
;// CONCATENATED MODULE: ./src/modules/ui/ammo-sc-check.js









let ammoSCCheckTimer;
let bannedWord = new Set();
const isWord = (t) => t.match(/([A-Za-z0-9])/) || t.match(/([\u2E80-\u9FFF])/);
const ammoSCCheck = ()=>{
  const bgColorRed = "#F583B4";
  const bgColorGreen = "#9BC768";
  const bgColorGray = "#C6C09C";
  const getAmmoDoms = ()=> {
    let ammoDoms = [];
    let textDoms = document.getElementById("dlc-ammotest-text").children;
    let textAPDoms = document.getElementById("dlc-ammotest-textAP").children;
    for (let i = 0; i < textDoms.length; i++){
      ammoDoms.push(textDoms[i]);
    }
    for (let i = 0; i < textAPDoms.length; i++){
      ammoDoms.push(textAPDoms[i]);
    }
    return ammoDoms;
  };
  let textList = ["div", {id: "dlc-ammotest-text"}, config/* config.text.split */.vc.text.split("\n").filter((line)=>line.trim()).map((line)=>["div", {"style": `background-color:${bgColorGray};`}, line])];
  let textAPList = ["div", {id: "dlc-ammotest-textAP"}, config/* config.textAmmoPiecing.split */.vc.textAmmoPiecing.split("\n").filter((line)=>line.trim()).map((line)=>["div", {"style": `background-color:${bgColorGray};`}, line])];
  let analysisList = ["div", {id: "dlc-ammoAnalysis"}, []];
  return (0,ui_utils.h)(
    "div",
    {
      style: { "max-width": "500px" },
    },
    [
      [
        "button",
        {
          class: "dlc-btn",
          $click: () => {
            // chean SC timer
            if (ammoSCCheckTimer){
              clearTimeout(ammoSCCheckTimer);
              ammoSCCheckTimer = undefined;
              refs/* refs.runAmmoTestBtn.innerText */.x.runAmmoTestBtn.innerText = "开始测试";
              refs/* refs.runAmmoAnalysisBtn.innerText */.x.runAmmoAnalysisBtn.innerText = "屏蔽词分析";
              // Finish testing
              if (config/* config.connect */.vc.connect || config/* config.autoSCCheck */.vc.autoSCCheck){
                setTimeout(checkSCInfo, 60000);
              }
              return;
            }
            refs/* refs.runAmmoTestBtn.innerText */.x.runAmmoTestBtn.innerText = "测试中";
            clearTimeout(scCheckTimer);
            checkSC("", (text, state)=> {
              if (state != "T"){
                setTimeout(checkSCInfo, 60000);
                refs/* refs.runAmmoTestBtn.innerText */.x.runAmmoTestBtn.innerText = "开始测试";
                alert("无法打SC, 可能的原因有 直播间未开启SC/频道被封/频道名有屏蔽词");
              } else {
                let ammoDoms = getAmmoDoms();
                if (ammoDoms.length == 0){
                  return;
                }
                if (config/* config.tokenRefine */.vc.tokenRefine){
                  ammoDoms.forEach((dom)=>{
                    dom.textContent = (0,ammo_refine/* refine */.l)(dom.textContent);
                  });
                }
                let index = 0;
                let next = (text, state)=>{
                  ammoDoms[index].valid = state == "T";
                  let color = ammoDoms[index].valid? bgColorGreen: bgColorRed;
                  ammoDoms[index++].style = `background-color: ${color};`;
                  if (index < ammoDoms.length && refs/* refs.runAmmoTestBtn.innerText */.x.runAmmoTestBtn.innerText === "测试中"){
                    if (config/* config.tokenDelayTime */.vc.tokenDelayTime > 0){
                      ammoSCCheckTimer = setTimeout(()=>{
                        checkSC(ammoDoms[index].innerText, next)
                      }, config/* config.tokenDelayTime */.vc.tokenDelayTime);
                    } else {
                      checkSC(ammoDoms[index].innerText, next);
                    }
                  } else {
                    // Finish testing
                    if (config/* config.connect */.vc.connect || config/* config.autoSCCheck */.vc.autoSCCheck){
                      setTimeout(checkSCInfo, 60000);
                    }
                    refs/* refs.runAmmoTestBtn.innerText */.x.runAmmoTestBtn.innerText = "开始测试";
                    ammoSCCheckTimer = undefined;
                  }
                };
                checkSC(ammoDoms[index].innerText, next);
              }
            });
          },
        },
        "开始测试",
        (el) => {
          refs/* refs.runAmmoTestBtn */.x.runAmmoTestBtn = el;
        },
      ],
      [
        "button",
        {
          class: "dlc-btn",
          $click: () => {
            const getAmmo = (doms) =>{
              let ammoList = [];
              for (let i = 0; i < doms.length; i++){
                if (doms[i].valid){
                  ammoList.push(doms[i].innerText);
                }
              }
              return ammoList.join("\n");
            };
            let textDoms = document.getElementById("dlc-ammotest-text").children;
            let textAPDoms = document.getElementById("dlc-ammotest-textAP").children;
            config/* config.text */.vc.text = getAmmo(textDoms);
            config/* config.textAmmoPiecing */.vc.textAmmoPiecing = getAmmo(textAPDoms);
            // Reload cmd
            document.body.removeChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
            refs/* refs.duluncheWnd */.x.duluncheWnd =getDLCWnd();
            document.body.appendChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
            refs/* refs.duluncheWnd.style.setProperty */.x.duluncheWnd.style.setProperty("display", "block");
          },
        },
        "装填可用弹药",
      ],
      [
        "button",
        {
          class: "dlc-btn",
          $click: () => {
            let ammoDoms = getAmmoDoms();
            let ammo = ammoDoms.filter((textDom)=>textDom.valid != undefined).map((textDom)=>{
                return {
                  text: textDom.innerText,
                  valid: textDom.valid,
                }
            });
            let output = {
              "timestamp": new Date().getTime(),
              "ammos": ammo,
            };
            (0,utils/* copyToClip */.qb)(JSON.stringify(output));
            alert("已将SC测试的结果复制到剪贴板。您可以在NGA屏蔽词总结贴中分享您测试的结果。");
          }
        },
        "导出结果",
      ],
      (0,ui_utils/* getSplitLine */.$g)(config/* colorConfig.border */.Dc.border, "2px"),
      (0,ui_utils/* CollapseField */.y7)(
        "高级",
        [
          (0,ui_utils/* ConfigField */.bE)({
            label: "最短屏蔽词长度",
            name: "tokenLenMin",
            type: "input",
            props: {
              type: "number",
              min: 1,
              style: { width: "48px", margin: "1px" },
            },
            helpDesc: "检查的最短屏蔽词长度",
          }),
          (0,ui_utils/* ConfigField */.bE)({
            label: "最长屏蔽词长度",
            name: "tokenLenMax",
            type: "input",
            props: {
              type: "number",
              min: 1,
              style: { width: "48px", margin: "1px" },
            },
            helpDesc: "检查的最长屏蔽词长度。更长的就不检查了",
          }),
          (0,ui_utils/* ConfigField */.bE)({
            label: "SC检测间隔时间(ms)",
            name: "tokenDelayTime",
            type: "input",
            props: {
              type: "number",
              min: 0,
              style: { width: "48px", margin: "1px" },
            },
            helpDesc: "每次SC检测之间的间隔时间",
          }),
          (0,ui_utils/* ConfigField */.bE)(
            {
              label: "检测精炼后弹药",
              name: "tokenRefine",
              type: "input",
              props: { type: "checkbox" },
              valueProp: "checked",
              helpDesc: "打SC前先根据当前精炼设置，将弹药精炼。建议开启。",
            },
          ),
          /*
          // TODO: 实装剪枝相关算法
          ConfigField(
            {
              label: "屏蔽词剪枝",
              name: "tokenPruning",
              type: "input",
              props: { type: "checkbox" },
              valueProp: "checked",
              helpDesc: "不考虑白名单词以加速屏蔽词检测的速度",
            },
          ),
          */
          [
            "button",
            {
              class: "dlc-btn",
              style: `background-color:  ${config/* colorConfig.btn */.Dc.btn};`,
              $click: () => {
                if (ammoSCCheckTimer){
                  clearTimeout(ammoSCCheckTimer);
                  refs/* refs.runAmmoTestBtn.innerText */.x.runAmmoTestBtn.innerText = "开始测试";
                  refs/* refs.runAmmoAnalysisBtn.innerText */.x.runAmmoAnalysisBtn.innerText = "屏蔽词分析";
                  ammoSCCheckTimer = undefined;
                  // Finish testing
                  if (config/* config.connect */.vc.connect || config/* config.autoSCCheck */.vc.autoSCCheck){
                    setTimeout(checkSCInfo, 60000);
                  }
                  return;
                }
                let invalidAmmoDoms = getAmmoDoms().filter((textDom)=>textDom.valid != undefined && !textDom.valid);
                if (invalidAmmoDoms.length == 0) {
                  return;
                }

                refs/* refs.runAmmoAnalysisBtn.innerText */.x.runAmmoAnalysisBtn.innerText = "分析中...";
                clearTimeout(scCheckTimer);
                bannedWord.clear();
                let containerDom = document.getElementById("dlc-ammoAnalysis");
                let child = containerDom.lastElementChild;
                while (child) {
                    containerDom.removeChild(child);
                    child = containerDom.lastElementChild;
                }
                let newDomList = [];
                let objMap = {};
                let objMapIndex = 0;
                invalidAmmoDoms.forEach((textDom)=>{
                  let tokens = (0,sendMsg_utils/* participleCJKE */.v)(textDom.innerText);
                  let testStr = [];
                  let l = config/* config.tokenLenMax */.vc.tokenLenMax + 1;
                  if (tokens.length < l){
                    l = tokens.length;
                  }
                  let tokenMap = [];
                  for (let len = parseInt(config/* config.tokenLenMin */.vc.tokenLenMin); len < l; len++){
                    let l = [];
                    for (let start = 0; start < tokens.length; start++){
                      if (!isWord(tokens[start])){
                        continue;
                      }
                      for (let end = start + len; end < tokens.length + 1; end++){
                        if (isWord(tokens[end-1])){
                          let t = tokens.slice(start, end).join('');
                          testStr.push(t);
                          l.push({
                            text: t, 
                            start: start, 
                            end: end,
                            index: objMapIndex++,
                            parents: [],
                          });
                          break;
                        }
                      }
                    }
                    tokenMap.push(l);
                  }
                  
                  // makeDoms
                  let testStrDoms = testStr.map((text)=>{
                    return ["dt", {"style": `background-color:${bgColorGray};`}, text]
                  });
                  // map index to obj
                  for (let level = 0; level < tokenMap.length - 1; level++){
                    let currLevel = tokenMap[level];
                    let nextLevel = tokenMap[level+1];
                    for (let i = 0; i < currLevel.length; i++){
                      let currObj = currLevel[i];
                      objMap[currObj.index] = currObj;
                      for (let j = 0; j < nextLevel.length; j++){
                        let nextObj = nextLevel[j];
                        if (currObj.start >= nextObj.start 
                          && currObj.end <= nextObj.end){
                          currObj.parents.push(nextObj);
                        }
                      }
                    }
                  }
                  testStrDoms = [["summary", {"style": `background-color:${bgColorRed};`}, textDom.innerText]].concat(testStrDoms);
                  let collapsedDom = (0,ui_utils.h)("details", {}, testStrDoms)
                  containerDom.appendChild(collapsedDom);
                  for (let i = 1; i < collapsedDom.children.length; i++){
                    newDomList.push(collapsedDom.children[i]);
                  }
                });
                let index = 0;
                let next = (text, state)=>{
                  newDomList[index].valid = state == "T";
                  if (newDomList[index].valid){
                    newDomList[index].style = `background-color: ${bgColorGreen};`;
                  } else {
                    bannedWord.add(newDomList[index].innerText.trim());
                    let stack = [index];
                    while (stack.length > 0){
                      let i = stack.pop();
                      newDomList[i].valid = false;
                      newDomList[i].style = `background-color: ${bgColorRed};`;
                      if (i in objMap){
                        for (let j = 0; j < objMap[i].parents.length; j++){
                          stack.push(objMap[i].parents[j].index);
                        }
                      }
                    }
                  }
                  index = index + 1;
                  while (index < newDomList.length){
                    if (newDomList[index].valid == false){
                      index = index + 1;
                    } else {
                      break;
                    }
                  }
                  if (index < newDomList.length){
                    if (config/* config.tokenDelayTime */.vc.tokenDelayTime > 0 && refs/* refs.runAmmoAnalysisBtn.innerText */.x.runAmmoAnalysisBtn.innerText === "分析中..."){
                      ammoSCCheckTimer = setTimeout(()=>{
                        checkSC(newDomList[index].innerText, next)
                      }, config/* config.tokenDelayTime */.vc.tokenDelayTime);
                    } else {
                      checkSC(newDomList[index].innerText, next);
                    }
                  } else {
                    // Finish testing
                    if (config/* config.connect */.vc.connect || config/* config.autoSCCheck */.vc.autoSCCheck){
                      setTimeout(checkSCInfo, 60000);
                    }
                    clearTimeout(ammoSCCheckTimer);
                    ammoSCCheckTimer = undefined;
                    refs/* refs.runAmmoAnalysisBtn.innerText */.x.runAmmoAnalysisBtn.innerText = "屏蔽词分析";
                  }
                };
                checkSC(newDomList[index].innerText, next);
              },
            },
            "屏蔽词分析",
            (el) => {
              refs/* refs.runAmmoAnalysisBtn */.x.runAmmoAnalysisBtn = el;
            },
          ],
          [
            "button",
            {
              class: "dlc-btn",
              style: `background-color:  ${config/* colorConfig.btn */.Dc.btn};`,
              $click: () => {
                if (bannedWord.size == 0){
                  alert("列表为空。请先运行屏蔽词分析！")
                } else {
                  (0,utils/* copyToClip */.qb)(JSON.stringify([...bannedWord]));
                  alert("已将SC测试的结果复制到剪贴板。您可以在NGA屏蔽词总结贴中分享您测试的结果。");
                }
              }
            },
            "屏蔽词导出",
          ],
        ],
      ),
      (0,ui_utils/* getSplitLine */.$g)(config/* colorConfig.border */.Dc.border, "2px"),
      [
        "div",
        {},
        [
          ["div", {}, "您可以将弹药检测的结果分享到"],
          ["a", {href: "https://ngabbs.com/read.php?tid=25288041"}, "https://ngabbs.com/read.php?tid=25288041"],
          ["div", {}, "这样科技组可以从中分析屏蔽词"],
          ["div", {}, "屏蔽词分析词语长度最短为2个字符，最长为5个字符。更短/更长的屏蔽词请手动测试"],
          ["div", {}, "另外虫直播间除了屏蔽词以外还有白名单词。在测试屏蔽词的时候请多加注意。"],
        ]
      ],
      (0,ui_utils/* getSplitLine */.$g)(config/* colorConfig.border */.Dc.border, "2px"),
      [
        "div",
        {},
        [
          textList,
          (0,ui_utils/* getSplitLine */.$g)(config/* colorConfig.border */.Dc.border, "2px"),
          textAPList,
          (0,ui_utils/* getSplitLine */.$g)(config/* colorConfig.border */.Dc.border, "2px"),
          analysisList,
        ]
      ]
    ],
  );
};


// EXTERNAL MODULE: ./src/modules/live.js
var live = __webpack_require__(125);
// EXTERNAL MODULE: ./src/modules/dlc-information.js
var dlc_information = __webpack_require__(126);
;// CONCATENATED MODULE: ./src/modules/ui/dlcWnd.js











let apiTimer;
const getDLCWnd = (version=GM_info.script.version) => (0,ui_utils.h)("div", { class: "dlc-cmd" }, [
  [
    "div",
    {
      class: "dlc-titlebar",
      $mousedown(ev) {
        if (ev.target !== this) return;
        const mask = (0,ui_utils.h)("div", {
          style: {
            position: "fixed",
            left: "0",
            top: "0",
            width: "100vw",
            height: "100vh",
          },
        });
        this.style.cursor = "all-scroll";
        document.body.appendChild(mask);
        const { layerX, layerY } = ev;
        const move = (e) => {
          refs/* refs.duluncheWnd.style.left */.x.duluncheWnd.style.left = `${e.clientX - layerX}px`;
          refs/* refs.duluncheWnd.style.top */.x.duluncheWnd.style.top = `${e.clientY - layerY}px`;
        };
        document.addEventListener("mousemove", move);
        document.addEventListener(
          "mouseup",
          () => {
            document.removeEventListener("mousemove", move);
            this.style.cursor = "";
            mask.remove();
          },
          { once: true },
        );
      },
    },
    [
      [
        "button",
        {
          class: "dlc-btn",
          $click: (ev) => {
            ev.stopPropagation();
            if (refs/* refs.runBtn.innerText */.x.runBtn.innerText === "出动") event_bus/* eventBus.emit */.Y.emit("dlc.run");
            else event_bus/* eventBus.emit */.Y.emit("dlc.stop");
          },
        },
        "出动",
        (el) => {
          refs/* refs.runBtn */.x.runBtn = el;
        },
      ],
      [
        "span",
        {
          class: "help-icon",
          $click: (ev) => {
            ev.stopPropagation();
            (0,ui_utils/* Toast */.FN)(refs/* refs.helpContent */.x.helpContent);
          },
        },
      ],
      [
        "span",
        {
          class: "import-export-icon",
          title: "复制独轮车参数到剪贴板",
          $click: (ev) => {
            ev.stopPropagation();
            (0,utils/* copyToClip */.qb)(JSON.stringify(config/* config */.vc));
          },
        },
        "",
        (el) => {
          el.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="display: block;margin: 20%;"><!-- Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>')
        }
      ],
      [
        "span",
        {
          class: "import-export-icon",
          title: "导入独轮车参数",
          $click: (ev) => {
            ev.stopPropagation();
            (0,ui_utils/* Toast */.FN)(editConfig());
          },
        },
        "",
        el => {
          el.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="margin: 20%;display: block;"><!-- Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>')
        }
      ],
      `v${version}`,
      [
        "div",
        config/* config.o */.vc.o?{}:{hidden: true,},
        [
          [
            "label",
            {
              "title": "开启/关闭舰载机模式", 
            },
            [
              (0,ui_utils/* ConfigField */.bE)({
                  name: "control",
                  type: "input",
                  props: {
                    class: "mui-switch",
                    type: "checkbox",
                    onchange: `window.dulunche.eventBus.emit("dlc.controlOnchange");`,
                  },
                  valueProp: "checked",
                },
              ),
            ],
          ]
        ],
      ],
      [
        "div",
        {
          class: "dlc-close-btn",
          style: "position: absolute; right: 0;",
          $click: (ev) => {
            ev.stopPropagation();
            refs/* refs.duluncheWnd.style.setProperty */.x.duluncheWnd.style.setProperty("display", "none");
          },
        },
        "X",
      ],
    ],
  ],
  [
    "div",
    { class: "dlc-cmd-list" },
    [
      [
        "div", 
        {
          style: "width: 263px;",
        }, 
        [
          (0,ui_utils/* ConfigField */.bE)({
            label: "",
            name: "text",
            type: "textarea",
            props: {
              class: "dlc-textarea",
              placeholder: "输入常规模式需要发射的内容到这里",
              style: {
                height: "100px",
                overflow: "scroll",
                whiteSpace: "pre",
              },
            },
          }),
          (0,ui_utils/* ConfigField */.bE)({
            label: "",
            name: "textAmmoPiecing",
            type: "textarea",
            props: {
              class: "dlc-textarea",
              placeholder: "输入穿甲弹发射的内容到这里",
              style: {
                height: "50px",
                overflow: "scroll",
                whiteSpace: "pre",
              },
            },
          }),
          [
            "div",
            {},
            [
              [
                "button",
                {
                  class: "dlc-btn",
                  $click: (ev) => {
                    ev.stopPropagation();
                    if (refs/* refs.ambushBtn.innerText */.x.ambushBtn.innerText === "伏击") event_bus/* eventBus.emit */.Y.emit("dlc.ambush");
                    else event_bus/* eventBus.emit */.Y.emit("dlc.retreat");
                  },
                },
                "伏击",
                (el) => {
                  refs/* refs.ambushBtn */.x.ambushBtn = el;
                },
              ],
              [
                "button",
                {
                  class: "dlc-btn",
                  $click: (ev) => {
                    if (config/* config.control */.vc.control){
                      (0,ui_utils/* Toast */.FN)("请先关闭舰载机模式");
                      return;
                    }
                    if (!config/* config.autoDownVote */.vc.autoDownVote) {
                      event_bus/* eventBus.emit */.Y.emit("dlc.gatlingrun");
                    } else {
                      event_bus/* eventBus.emit */.Y.emit("dlc.gatlingstop");
                    }
                    localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
                  },
                },
                "加特林开火",
                (el) => {
                  refs/* refs.autoDownVoteBtn */.x.autoDownVoteBtn = el;
                  if (config/* config.autoDownVote */.vc.autoDownVote) {
                    refs/* refs.autoDownVoteBtn.innerText */.x.autoDownVoteBtn.innerText = "加特林停火";
                  } else {
                    event_bus/* eventBus.emit */.Y.emit("dlc.gatlingstop");
                    localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
                  }
                },
              ],
              [
                "button",
                {
                  class: "dlc-btn",
                  $click: () => {
                    localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
                    // Toast(ammoSCCheck(), singletonId = "ammoSCCheck");
                    if (ammoSCCheckTimer){
                      clearTimeout(ammoSCCheckTimer);
                      ammoSCCheckTimer = undefined;
                    }
                    (0,ui_utils/* Toast */.FN)(
                      ammoSCCheck(), 
                      toastClass = "dlc-toast", 
                      singletonId = "ammoSCCheck", 
                      onClose = ()=>{
                        if (ammoSCCheckTimer){
                          clearTimeout(ammoSCCheckTimer);
                          ammoSCCheckTimer = undefined;
                        }
                    });
                  },
                },
                "弹药检测",
              ],
            ],
          ],
          (0,ui_utils/* ConfigField */.bE)({
            label: "开火模式:",
            name: "fireMode",
            type: "select",
            children: [
              { value: "0", text: "常规模式" },
              { value: "1", text: "穿甲模式" },
            ].map(({ text, value }) => ["option", { value }, text]),
            helpDesc:
              "常规模式:正常开火；穿甲模式: 连续开火，击穿慢速护甲",
          }),
          (0,ui_utils/* ConfigField */.bE)({
            label: "穿甲弹开火次数:",
            name: "ammoPiecingTimes",
            type: "input",
            props: {
              type: "number",
              min: 1,
              max: 10,
              placeholder: 1,
              style: { width: "48px", margin: "1px" },
            },
            helpDesc:
              "穿甲弹同时开火的次数，越多穿甲效果越明显，但是也会增加被google风控的概率",
          },
          (el) => {
            if (+config/* config.fireMode */.vc.fireMode !== 1) el.classList.add("hide");
            event_bus/* eventBus.on */.Y.on(
              "setConfig.fireMode",
              ({ detail: value }) => {
                if (value !== "1") el.classList.add("hide");
                else el.classList.remove("hide");
              },
              {},
              "dlc.setConfig.fireMode.ammoPiecingTimesField",
            );
          }),
          (0,ui_utils/* ConfigField */.bE)({
            label: "最小间隔时间(s):",
            name: "minCycleSec",
            type: "input",
            props: {
              type: "number",
              min: 3,
              placeholder: 3,
              style: { width: "48px", margin: "1px" },
            },
            helpDesc:
                        "如果最大间隔时间设置小于最小间隔时间，则相当于不随机间隔，以最小间隔时间发送弹幕",
          }),
          (0,ui_utils/* ConfigField */.bE)({
            label: "最大间隔时间(s):",
            name: "maxCycleSec",
            type: "input",
            props: {
              type: "number",
              min: 3,
              placeholder: 3,
              style: { width: "48px", margin: "1px" },
            },
            helpDesc:
                        "如果最大间隔时间设置小于最小间隔时间，则相当于不随机间隔，以最小间隔时间发送弹幕",
          }),
          (0,ui_utils/* ConfigField */.bE)(
            {
              label: "自动停车",
              name: "autoStop",
              type: "input",
              props: { type: "checkbox" },
              valueProp: "checked",
              helpDesc: "自动刹车，可能有bug",
            },
            () => {
              // const { autoStop } = config;
              event_bus/* eventBus.on */.Y.on("setConfig.autoStop", ({ detail: value }) => {
                if (value) {
                  refs/* refs.offlineStateDiv.addEventListener */.x.offlineStateDiv.addEventListener(
                    "DOMNodeInserted",
                    bindStop,
                  );
                } else {
                  try {
                    refs/* refs.offlineStateDiv.removeEventListener */.x.offlineStateDiv.removeEventListener(
                      "DOMNodeInserted",
                      bindStop,
                    );
                  } catch (c) {
                    // noop
                  }
                }
              });
            },
          ),
          (0,ui_utils/* ConfigField */.bE)(
            {
              label: "自动SC检测",
              name: "autoSCCheck",
              type: "input",
              props: { type: "checkbox" },
              valueProp: "checked",
              helpDesc: "勾选后此独轮车每分钟会自动进行sc检测",
            },
          ),
          (0,ui_utils/* ConfigField */.bE)({
            label: "关闭配置项校验:",
            name: "noValidate",
            type: "input",
            props: { type: "checkbox" },
            valueProp: "checked",
            helpDesc:
                        "不对输入的配置项进行校验，这意味着你可以进行将间隔时间设置为0这样的危险操作",
          }),
          (0,ui_utils/* CollapseField */.y7)(
            "开火设置: 和开火有关的各个设置",
            [
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "立刻开火",
                  name: "fireImmediately",
                  type: "input",
                  props: { 
                    type: "checkbox",
                  },
                  valueProp: "checked",
                  helpDesc: "建议勾选。勾选后点击出动会在一秒后立刻开火，否则则会等待一轮间隔时间后再开火",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "自动撤回",
                  name: "recallMsg",
                  type: "input",
                  props: { 
                    type: "checkbox",
                    onchange: `window.dulunche.eventBus.emit("dlc.recallModeOnchange");`,
                  },
                  valueProp: "checked",
                  helpDesc: "自动撤回发出的弹药迷惑扳手，注意！请设置较长的开火时间间隔（最短5s以上），此功能能否生效受电脑卡顿因素影响，不要依赖这个开火",
                },
                (el) => {
                  event_bus/* eventBus.emit */.Y.emit("dlc.recallModeOnchange");
                },
              ),
              (0,ui_utils/* ConfigField */.bE)({
                label: "断句方式:",
                name: "splitMode",
                type: "select",
                children: [
                  { value: "2", text: "多句转轮" },
                  { value: "0", text: "单句模式" },
                  { value: "1", text: "说书模式" },
                ].map(({ text, value }) => ["option", { value }, text]),
                helpDesc:
                            "多句转轮:每条弹幕一行；单句模式:不断行；说书模式:按表单符号与说书长度下限断行",
              }),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "随机弹幕:",
                  name: "randomDanmaku",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc:
                                "随机弹幕: 是否随机从弹幕列表选取弹幕发送，仅用于多句转轮模式；在说书模式启用会导致内容混乱",
                },
                (el) => {
                  if (+config/* config.splitMode */.vc.splitMode !== 2) el.classList.add("hide");
                  event_bus/* eventBus.on */.Y.on(
                    "setConfig.splitMode",
                    ({ detail: value }) => {
                      if (value !== "2") el.classList.add("hide");
                      else el.classList.remove("hide");
                    },
                    {},
                    "dlc.setConfig.splitMode.randomDanmakuField",
                  );
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "说书长度下限:",
                  name: "minDanmakuLength",
                  type: "input",
                  props: {
                    type: "number",
                    min: 1,
                    style: { width: "48px", margin: "1px" },
                  },
                  helpDesc:
                                "说书长度下限: 仅说书模式生效，断句时会尽量控制弹幕长度在此之上",
                },
                (el) => {
                  if (+config/* config.splitMode */.vc.splitMode !== 1) el.classList.add("hide");
                  event_bus/* eventBus.on */.Y.on(
                    "setConfig.splitMode",
                    ({ detail: value }) => {
                      if (value !== "1") el.classList.add("hide");
                      else el.classList.remove("hide");
                    },
                    {},
                    "dlc.setConfig.splitMode.minDanmakuLengthField",
                  );
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "说书断句符:",
                  name: "splitChar",
                  type: "input",
                  props: {
                    type: "text",
                    min: 1,
                    style: { width: "48px", margin: "1px" },
                  },
                  helpDesc:
                    "说书断句符: 说书模式下以配置的符号分割文章为多条弹幕后，再合并到说书长度下限以上的弹幕长度，为空时固定按说书长度下限断句",
                },
                (el) => {
                  if (+config/* config.splitMode */.vc.splitMode !== 1) el.classList.add("hide");
                  event_bus/* eventBus.on */.Y.on(
                    "setConfig.splitMode",
                    ({ detail: value }) => {
                      if (value !== "1") el.classList.add("hide");
                      else el.classList.remove("hide");
                    },
                    {},
                    "dlc.setConfig.splitMode.splitCharField",
                  );
                },
              ),
            ]
          ),
          (0,ui_utils/* CollapseField */.y7)(
            "省流模式: 隐藏无用内容，降低资源占用",
            [
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "省流模式",
                  name: "lowConsume",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "只看聊天框，节省流量",
                },
                () => {
                  const { lowConsume } = config/* config */.vc;
                  if (lowConsume) {
                    event_bus/* eventBus.on */.Y.on("dlc.ready", savingMode);
                  }
                  event_bus/* eventBus.on */.Y.on("setConfig.lowConsume", ({ detail: value }) => {
                    savingMode(value);
                    localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
                  });
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "关闭聊天框滚动",
                  name: "lowConsumeChat",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "关闭聊天框滚动显示，降低多开时系统显示占用",
                },
                () => {
                  const { lowConsumeChat } = config/* config */.vc;
                  if (lowConsumeChat) {
                    event_bus/* eventBus.on */.Y.on("dlc.ready", savingModeChat);
                  }
                  event_bus/* eventBus.on */.Y.on("setConfig.lowConsumeChat", ({ detail: value }) => {
                    savingModeChat(value);
                    localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
                  });
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "隐藏其他不必要元素",
                  name: "lowConsumeOthers",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "关闭聊天框滚动显示，降低多开时系统显示占用",
                },
                () => {
                  const { lowConsumeChat } = config/* config */.vc;
                  if (lowConsumeChat) {
                    event_bus/* eventBus.on */.Y.on("dlc.ready", savingModeDescription);
                  }
                  event_bus/* eventBus.on */.Y.on("setConfig.lowConsumeOthers", ({ detail: value }) => {
                    savingModeDescription(value);
                    localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
                  });
                },
              ),
            ],
          ),
          (0,ui_utils/* CollapseField */.y7)(
            "弹药精炼: 调整弹药内容，降低被杀几率",
            [
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "弹药扰动",
                  name: "ammoRefine_Disturb",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "随机去除弹药中的一个字符，提高上top chat概率",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "添加前缀",
                  name: "ammoRefine_prefix",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "为打出的弹药添加用于穿透蝗粉白名单的前缀",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "添加后缀",
                  name: "ammoRefine_suffix",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "为打出的弹药添加用于穿透蝗粉白名单的后缀",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "删除大写,标点符号",
                  name: "ammoRefine_ToLower",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "所有大写字母转换为小写，删除一切标点符号 - 对Nightbot策略",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "弹药精制 (本地)",
                  name: "ammoRefine_Local",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "将弹药内容精制（如去除屏蔽词，改中文标点符号等， 正则替换等，以提高弹药通过Night bot的几率",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "每个字符后面随机插入日文助词",
                  name: "ammoRefine_SplitWord",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "每个字符后面随机插入日文助词用来避免被nightbot杀",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "弹药精制策略:",
                  name: "ammoRefineStategy",
                  type: "input",
                  props: {
                    type: "text",
                    style: { width: "150px", margin: "1px" },
                  },
                }
              ),
              // ConfigField({
              //   label: "云精制网址:",
              //   name: "ammoRefineUrl",
              //   type: "input",
              //   props: {
              //     type: "text",
              //     style: { width: "150px", margin: "1px" },
              //   },
              // }),
              (0,ui_utils/* ConfigField */.bE)({
                label: "屏蔽词处理方式:",
                name: "ammoRefine_BanedWordMode",
                type: "select",
                children: [
                  { value: "0", text: "删除屏蔽词" },
                  { value: "1", text: "扰动屏蔽词" },
                  { value: "2", text: "伪装屏蔽词 (测试)" },
                ].map(({ text, value }) => ["option", { value }, text]),
                helpDesc:
                      "删除屏蔽词: 把屏蔽词直接删除; 扰动屏蔽词: 随机改动屏蔽词中的一个字母; 伪装屏蔽词: 启动屏蔽词伪装, 在特殊战役时期允许解放使用",
              },
              (el) => {
                if (config/* config.ammoRefine_Local */.vc.ammoRefine_Local !== true) el.classList.add("hide");
                event_bus/* eventBus.on */.Y.on(
                  "setConfig.ammoRefine_Local",
                  ({ detail: value }) => {
                    if (value !== true) el.classList.add("hide");
                    else el.classList.remove("hide");
                  },
                  {},
                  "dlc.setConfig.ammoRefine_Local.banedWordField",
                );
              }),
            ],
          ),
          (0,ui_utils/* CollapseField */.y7)(
            "智能发车: 定时或通过监控api来发车",
            [
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: (0,ui_utils.h)([
                    "全自动发车:",
    
                    [
                      "input",
                      {
                        type: "checkbox",
                        $click: ({ target }) => {
                          const { infoUrl } = config/* config */.vc;
                          if (!target.checked) {
                            clearInterval(apiTimer);
                            (0,config/* setAndSave */.$)("fullAutomation", false);
                            return;
                          }
                          (0,config/* setAndSave */.$)("fullAutomation", true);
    
                          if (window.location.href !== "https://www.youtube.com/") {
                            (0,ui_utils/* Toast */.FN)("只能在油管首页开启监控, 回到首页刷新即可");
                            return;
                          }
                          (0,ui_utils/* Toast */.FN)("监控中...");
                          (0,live/* loadLiveInfo */.$0)(infoUrl, target);
                          apiTimer = setInterval(
                            () => (0,live/* loadLiveInfo */.$0)(infoUrl, target, true),
                            60000,
                          );
                        },
                      },
                    ],
                  ]),
                  name: "infoUrl",
                  type: "textarea",
                  props: {
                    class: "dlc-textarea",
                    placeholder: "开播监控地址",
                    style: {
                      width: "245px",
                      height: "50px",
                      whiteSpace: "pre",
                    },
                  },
                  helpDesc: "填监控API地址，如果不知道是什么，去NGA翻独轮车发布贴",
                },
                (el) => {
                  const { fullAutomation, infoUrl, lastLiveUrl } = config/* config */.vc;
                  const target = el.querySelector("input");
                  if (window.location.href === lastLiveUrl) {
                    setInterval(
                      () => (0,live/* loadLiveInfo */.$0)(
                        infoUrl,
                        target,
                        true,
                        true,
                      ),
                      60000,
                    );
                  }
    
                  if (fullAutomation) {
                    target.checked = true;
                  }
                  if (
                    fullAutomation
                              && infoUrl !== ""
                              && window.location.href === "https://www.youtube.com/"
                  ) {
                    target.checked = true;
                    (0,ui_utils/* Toast */.FN)("监控中...");
                    (0,live/* loadLiveInfo */.$0)(infoUrl, target);
                    apiTimer = setInterval(
                      () => (0,live/* loadLiveInfo */.$0)(infoUrl, target, true),
                      60000,
                    );
                  }
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "开播等待时间(s)",
                  name: "startWaitingTime",
                  type: "input",
                  props: {
                    type: "number",
                    min: 5,
                    placeholder: config/* config.startWaitingTime */.vc.startWaitingTime,
                    style: { width: "48px", margin: "1px" },
                  },
                },
                () => {
                  const { fullAutomation } = config/* config */.vc;
                  const waitingForRun = () => {
                    const { startWaitingTime } = config/* config */.vc;
                    (0,ui_utils/* Toast */.FN)(
                      `独轮车将于${startWaitingTime}秒后启动，如果这不是你的本意，请关闭全自动发车`,
                      "dlc-alert",
                    );
                    setTimeout(() => {
                      event_bus/* eventBus.emit */.Y.emit("dlc.run");
                    }, startWaitingTime * 1000);
                  };
    
                  if (fullAutomation) {
                    event_bus/* eventBus.on */.Y.on("live.start", waitingForRun);
                  }
                },
              ),
    
              (0,ui_utils/* ConfigField */.bE)({
                label: (0,ui_utils.h)([
                  [
                    "button",
                    {
                      class: "dlc-btn",
                      $click: ({ target }) => {
                        if (target.innerText !== "定时启动") return;
                        const { startTime } = config/* config */.vc;
                        const timeStamp = Date.parse(new Date(startTime));
                        let timeRemain = timeStamp - new Date().getTime();
                        target.innerText = (0,utils/* formatTime */.mr)(parseInt(timeRemain / 1000));
                        const startTimer = () => {
                          setTimeout(() => {
                            if (timeRemain > 0) {
                              timeRemain = timeStamp - new Date().getTime();
                              target.innerText = (0,utils/* formatTime */.mr)(
                                parseInt(timeRemain / 1000),
                              );
                              startTimer();
                            } else {
                              event_bus/* eventBus.emit */.Y.emit("dlc.run");
                              target.innerText = "定时启动";
                            }
                          }, 1000);
                        };
                        startTimer();
                      },
                    },
                    "定时启动",
                  ],
                ]),
                name: "startTime",
                type: "input",
                props: {
                  type: "text",
                  min: 1,
                  style: { width: "150px", margin: "1px" },
                },
                // helpDesc: '输入时间定时启动，格式举例：2020-10-21 17:31:00',
              }),
              (0,ui_utils/* ConfigField */.bE)({
                label: (0,ui_utils.h)([
                  [
                    "button",
                    {
                      class: "dlc-btn",
                      $click: ({ target }) => {
                        if (target.innerText !== "定时结束") return;
                        const { stopTime } = config/* config */.vc;
                        const timeStamp = Date.parse(new Date(stopTime));
                        let timeRemain = timeStamp - new Date().getTime();
                        target.innerText = (0,utils/* formatTime */.mr)(parseInt(timeRemain / 1000));
                        const stopTimer = () => {
                          setTimeout(() => {
                            if (timeRemain > 0) {
                              timeRemain = timeStamp - new Date().getTime();
                              target.innerText = (0,utils/* formatTime */.mr)(
                                parseInt(timeRemain / 1000),
                              );
                              stopTimer();
                            } else {
                              event_bus/* eventBus.emit */.Y.emit("dlc.stop");
                              target.innerText = "定时结束";
                            }
                          }, 1000);
                        };
                        stopTimer();
                      },
                    },
                    "定时结束",
                  ],
                ]),
                name: "stopTime",
                type: "input",
                props: {
                  type: "text",
                  min: 1,
                  style: { width: "150px", margin: "1px" },
                },
                // helpDesc: '输入时间定时结束，格式举例：2020-10-21 17:31:00',
              }),
            ],
          ),
          (0,ui_utils/* CollapseField */.y7)(
            "远程弹幕库",
            [
              (0,ui_utils/* ConfigField */.bE)({
                label: (0,ui_utils.h)([
                  "加载远程弹幕库:",
                  [
                    "button",
                    {
                      class: "dlc-btn",
                      $click: ({ target }) => {
                        if (target.innerText !== "更新") return;
                        target.innerText = "更新中...";
                        const { remoteDanmakuBase } = config/* config */.vc;
                        const urlList = remoteDanmakuBase
                          .split("\n")
                          .map((it) => it.trim())
                          .filter(Boolean);
                        const queued = new Set();
                        const allRemoteUrl = new Set();
                        const loaded = [];
                        const loadFinish = () => {
                          event_bus/* eventBus.emit */.Y.emit("setRef.remoteDanmakuConfig", loaded);
                          target.innerText = "更新";
                          (0,ui_utils/* Toast */.FN)(
                            (0,ui_utils.h)(
                              "pre",
                              { style: { color: "blue" } },
                              refs/* refs.remoteDanmakuConfig.map */.x.remoteDanmakuConfig.map((data) => data.error || `${data.name || "匿名弹幕库"}: ${data.list.length}条`)
                                .join("\n"),
                            ),
                          );
                        };
                        const loadRemoteDanmaku = (url) => {
                          if (allRemoteUrl.has(url)) return;
                          queued.add(url);
                          allRemoteUrl.add(url);
                          fetch(url)
                            .then((data) => data.json())
                            .then((data) => {
                              if (!data) {
                                loaded.push({ error: `[获取失败]${url}` });
                                return;
                              }
                              if (Array.isArray(data.extends)) {
                                data.extends.forEach((extUrl) => loadRemoteDanmaku(extUrl));
                              }
                              if (Array.isArray(data.list)) loaded.push(data);
                            })
                            .catch((err) => {
                              console.error(err);
                              loaded.push({ error: `[获取失败]${url}` });
                            })
                            .finally(() => {
                              queued.delete(url);
                              if (queued.size === 0) loadFinish();
                            });
                        };
                        urlList.forEach((url) => loadRemoteDanmaku(url));
                      },
                    },
                    "更新",
                  ],
                  [
                    "span",
                    {},
                    "(未加载弹幕库)",
                    (el) => {
                      event_bus/* eventBus.on */.Y.on("setRef.remoteDanmakuConfig", ({ detail }) => {
                        const totalLength = detail.reduce(
                          (total, data) => total + ((data && data.list.length) || 0),
                          0,
                        );
                        el.innerText = `(已加载${totalLength}条)`;
                      });
                    },
                  ],
                ]),
                name: "remoteDanmakuBase",
                type: "textarea",
                props: {
                  class: "dlc-textarea",
                  placeholder: "支持多个网址，每个一行",
                  style: {
                    width: "265px",
                    height: "70px",
                    overflow: "scroll",
                    whiteSpace: "pre",
                  },
                },
                helpDesc: "从指定地址加载弹幕列表，支持添加多个地址，每个一行；远程弹幕列表会添加到本地弹幕列表后；更新的弹幕会在下次出动时生效",
              }),
            ],
          ),
          config/* config.o */.vc.o?
          (0,ui_utils/* CollapseField */.y7)(
            "舰载机配置: cv-6相关配置",
            [
              (0,ui_utils/* ConfigField */.bE)({
                label: "cv-6指挥端口:",
                name: "controlPort",
                type: "input",
                props: {
                  type: "number",
                  min: 0,
                  placeholder: 3,
                  style: { width: "48px", margin: "1px" },
                },
                helpDesc: "cv-6服务器端口，一般保持默认即可",
              }),
            ],
          ): ["div", {}, []],
          (0,ui_utils/* CollapseField */.y7)(
            "加特林模式: 切频道点踩开火相关配置",
            [
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "自动开火",
                  name: "autoAttack",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "如果不勾选就只切频道+挂踩",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "无限循环",
                  name: "cycleCheck",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "如果不勾选则循环一轮后便停火，不再切频道开火/点踩",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "自动关闭网页",
                  name: "gatlingAutoStop",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "未勾选无限循环的情况下，所有号踩完一圈之后自动关闭标签页",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)({
                label: "目标直播间",
                name: "url",
                type: "input",
                props: {
                  type: "text",
                  style: { width: "150px", margin: "1px" },
                },
                helpDesc: "开火的直播间地址",
              }),
              (0,ui_utils/* ConfigField */.bE)(
                {
                  label: "自动设置直播间地址",
                  name: "autoSetupURL",
                  type: "input",
                  props: { type: "checkbox" },
                  valueProp: "checked",
                  helpDesc: "是否在加特林开火时候自动用当前直播间地址开火",
                },
              ),
              (0,ui_utils/* ConfigField */.bE)({
                label: "点踩最小间隔时间(s):",
                name: "minDownVoteMin",
                type: "input",
                props: {
                  type: "number",
                  min: 1,
                  style: { width: "48px", margin: "1px" },
                },
                helpDesc: "挂满这么长时间后再点踩",
              }),
              (0,ui_utils/* ConfigField */.bE)({
                label: "点踩最大间隔时间(s):",
                name: "maxDownVoteMin",
                type: "input",
                props: {
                  type: "number",
                  min: 1,
                  style: { width: "48px", margin: "1px" },
                },
              }),
              (0,ui_utils/* ConfigField */.bE)({
                label: "换号最小间隔时间(s):",
                name: "minChangeChannel",
                type: "input",
                props: {
                  type: "number",
                  min: 1,
                  style: { width: "48px", margin: "1px" },
                },
                helpDesc: "（点过踩以后）继续挂满这么长时间后再换号",
              }),
              (0,ui_utils/* ConfigField */.bE)({
                label: "换号最大间隔时间(s):",
                name: "maxChangeChannel",
                type: "input",
                props: {
                  type: "number",
                  min: 1,
                  style: { width: "48px", margin: "1px" },
                },
              }),
            ],
          ),
          (0,ui_utils.h)([
            [
              "button",
              {
                class: "dlc-btn",
                $click: () => {
                  localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
                  (0,ui_utils/* Toast */.FN)("保存成功");
                },
              },
              "保存配置",
            ],
          ]),
          (0,ui_utils.h)([
            [
              "button",
              {
                class: "dlc-btn",
                $click: () => {
                  (0,mod_manager/* modManager */.W)();
                },
              },
              "MOD管理",
            ],
          ]),
          (0,ui_utils.h)([
            [
              "button",
              {
                class: "dlc-btn",
                $click: () => {
                    let accountNameList = config/* config.accountNames */.vc.accountNames;
                    if ("accountNames" in dlc_information/* dlcInformation */.w){
                      accountNameList = dlc_information/* dlcInformation.accountNames */.w.accountNames;
                    }
                    event_bus/* eventBus.emit */.Y.emit("dlc.createChannel", accountNameList[0, (0,utils/* randomInt */.Iy)(0, accountNameList.length-1)]);
                },
              },
              "新号开频道",
            ],
          ]),
        ],
        (el) => {
          refs/* refs.configFieldContainer */.x.configFieldContainer = el;
        },
      ]
    ],
  ],
]);


;// CONCATENATED MODULE: ./src/modules/ui/tags-manager.js


const makeTagSelect = (dict, tag, id) => {
  let input = [
    "input", 
    {
      type: "checkbox", 
      $click: ({ target }) => {
        dict[tag] = target.checked;
        localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
      }
    },
  ]
  if (dict[tag]){
    input[1].checked = "checked";
  }
  let deleteBtn = [
    "span",
    {
      class: "delete-icon",
      $click: (ev) => {
        delete dict[tag];
        document.getElementById(`${id}-${tag}`).style.display = "none";
        localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
      },
    },
  ]
  return [
    "div", 
    {
      id: `${id}-${tag}`,
    }, 
    [
      input,
      deleteBtn,
      [
        "label",
        {},
        tag
      ], 
    ]
  ];
};
const makeDomList = (dict, id) =>{
  let doms = [];
  let addField = (0,ui_utils.h)([
    [
      "button", 
      {
        $click: () => {
          let newTag = document.getElementById(`${id}-input`).value;
          if (newTag && newTag[0] == "#"){
            newTag = newTag.substr(1);
          }
          if (newTag in dict){
            (0,ui_utils/* Toast */.FN)("Tag已经加入了！");
          } else {
            dict[newTag] = true;
            let newDom = (0,ui_utils.h)([makeTagSelect(dict, newTag, id)]);
            document.getElementById(id).appendChild(newDom);
            localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
          }
        }
      }, 
      "添加"
    ], 
    [
      "input", 
      {
        id: `${id}-input`, 
      }, 
      ""
    ]
  ]);

  for (let tag in dict){
    doms.push(makeTagSelect(dict, tag, id));
  }
  
  return [
    "div", 
    {}, 
    [
      [
        "div", 
        {
          id: id
        }, 
        doms,
      ],
      addField
    ]
  ];
};
const tagsManager = (singletonId = "singletonDom") => {
  if (tagsManager[singletonId]) tagsManager[singletonId].remove();

  let tagListPrimary = config/* config.twitter.tags.primary */.vc.twitter.tags.primary;
  let tagListSecondary = config/* config.twitter.tags.secondary */.vc.twitter.tags.secondary;
  let domListPrimary = makeDomList(tagListPrimary, "tags-primary");
  let domListSecondary = makeDomList(tagListSecondary, "tags-secondary");
  const dom = (0,ui_utils.h)(
    "div",
    {
      class: "dlc-mod-mgr",
    },
    [
      [
        "button",
        {
          class: "dlc-btn",
          $click: () => {
            dom.remove();
          },
        },
        "关闭",
      ],
      [
        "div", 
        {}, 
        "必带的tags"
      ],
      domListPrimary,
      (0,ui_utils/* getSplitLine */.$g)(), 
      [
        "div", 
        {}, 
        "可选的tags (每次随机选几个复制)"
      ],
      domListSecondary,
    ],
  );
  tagsManager[singletonId] = dom;
  document.body.appendChild(dom);
};


;// CONCATENATED MODULE: ./src/modules/ui/bible-manager.js






const bibleEdit = (dict, name = "", format = false) => {
  let saveBtn = [
    "button", 
    {
      $click: ()=>{
        // 保存设置
        let newName = document.getElementById("bible-edit-input-name").value;
        let newContent = document.getElementById('bible-edit-input-content').value
        if (name){
          // 旧
          if (!(name === newName)){
            delete dict[name];
          }
        }
        dict[newName] = {"content": newContent, "format": format};
        document.body.removeChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
        delete refs/* refs.duluncheWnd */.x.duluncheWnd;
        refs/* refs.duluncheWnd */.x.duluncheWnd = getDLCWndTwitter(GM_info.script.version);
        refs/* refs.duluncheWnd.style.setProperty */.x.duluncheWnd.style.setProperty("display", "block");
        document.body.appendChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
        localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
        bibleManager();
        (0,ui_utils/* Toast */.FN)("已保存");
      }
    }, 
    "保存"
  ]
  let formatCheckBox = [
    "input", 
    {
      type: "checkbox",
      $click: ({ target }) => {
        format = target.checked;
      }
    }
  ]
  if (format){
    formatCheckBox[1].checked = "checked";
  }
  let nameField = [
    "input", 
    {
      id: 'bible-edit-input-name',
      value: name
    }, 
  ];
  let contentField = [
    "textarea", 
    {
      id: 'bible-edit-input-content', 
    },
  ]
  return (0,ui_utils.h)([
    [
      "div", 
      {},
      [ 
        saveBtn, 
        [
          "div", 
          {},
          [
            formatCheckBox, 
            [
              "label", 
              {}, 
              "格式化定型文（暂时没意义）"
            ]
          ]
        ], 
        [
          "div", 
          {},
          [
            [
              "div", 
              {}, 
              "定型文名字: "
            ], 
            nameField
          ]
        ], 
        [
          "div", 
          {},
          [
            [
              "div", 
              {}, 
              "定型文内容: "
            ], 
            contentField
          ]
        ], 
        
      ]
    ]
  ]);
};
const makeBibleList = (dict, name, id) => {
  let editBtn = (0,ui_utils.h)([
    [
      "button", 
      {
        $click: ()=>{
          (0,ui_utils/* Toast */.FN)(bibleEdit(dict, name, dict[name].format));
          document.getElementById('bible-edit-input-content').value = dict[name].content;
        }
      }, 
      "编辑"
    ]
  ]);
  let deleteBtn = [
    "span",
    {
      class: "delete-icon",
      $click: (ev) => {
        delete dict[name];
        document.getElementById(`${id}-${name}`).style.display = "none";
        localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
        document.body.removeChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
        delete refs/* refs.duluncheWnd */.x.duluncheWnd;
        refs/* refs.duluncheWnd */.x.duluncheWnd = getDLCWndTwitter(GM_info.script.version);
        refs/* refs.duluncheWnd.style.setProperty */.x.duluncheWnd.style.setProperty("display", "block");
        document.body.appendChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
        localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
      },
    },
  ]
  return [
    "div", 
    {
      id: `${id}-${name}`
    }, 
    [
      editBtn, 
      deleteBtn,
      [
        "label", 
        {}, 
        name,
      ]
    ]
  ]
};

const bible_manager_makeDomList = (dict, id) => {
  let doms = [];
  for (let name in dict){
    doms.push(makeBibleList(dict, name, id));
  }
  let addBtn = [
    "button", 
    {
      $click: ()=>{
        (0,ui_utils/* Toast */.FN)(bibleEdit(dict));
      }
    }, 
    "添加"
  ];
  return [
    "div", 
    {}, 
    [
      [
        "div", 
        {id: id}, 
        doms
      ], 
      addBtn
    ]
  ]
};
const bibleManager = (singletonId = "singletonDom") => {
  if (bibleManager[singletonId]) bibleManager[singletonId].remove();
  let bibleDom = bible_manager_makeDomList(config/* config.twitter.bibles */.vc.twitter.bibles, "bibles");
  const dom = (0,ui_utils.h)(
    "div",
    {
      class: "dlc-mod-mgr",
    },
    [
      [
        "button",
        {
          class: "dlc-btn",
          $click: () => {
            dom.remove();
          },
        },
        "关闭",
      ],
      [
        "div", 
        {}, 
        "定型文列表"
      ],
      bibleDom
    ],
  );
  bibleManager[singletonId] = dom;
  document.body.appendChild(dom);
};




;// CONCATENATED MODULE: ./src/modules/ui/dlcWndTwitter.js













const getDLCWndTwitter = (version) => {
  let bibles = [];
    for (let key in config/* config.twitter.bibles */.vc.twitter.bibles){
      let o = config/* config.twitter.bibles */.vc.twitter.bibles[key];
      bibles.push((0,ui_utils/* BibleField */.JJ)(key, o.content, o.format));
    }
    return (0,ui_utils.h)("div", { class: "dlc-cmd" }, [
    [
      "div",
      {
        class: "dlc-titlebar",
        $mousedown(ev) {
          if (ev.target !== this) return;
          const mask = (0,ui_utils.h)("div", {
            style: {
              position: "fixed",
              left: "0",
              top: "0",
              width: "100vw",
              height: "100vh",
            },
          });
          this.style.cursor = "all-scroll";
          document.body.appendChild(mask);
          const { layerX, layerY } = ev;
          const move = (e) => {
            refs/* refs.duluncheWnd.style.left */.x.duluncheWnd.style.left = `${e.clientX - layerX}px`;
            refs/* refs.duluncheWnd.style.top */.x.duluncheWnd.style.top = `${e.clientY - layerY}px`;
          };
          document.addEventListener("mousemove", move);
          document.addEventListener(
            "mouseup",
            () => {
              document.removeEventListener("mousemove", move);
              this.style.cursor = "";
              mask.remove();
            },
            { once: true },
          );
        },
      },
      [
        `v${version}`,
        [
          "div",
          {
            class: "dlc-close-btn",
            style: "position: absolute; right: 0;",
            $click: (ev) => {
              ev.stopPropagation();
              refs/* refs.duluncheWnd.style.setProperty */.x.duluncheWnd.style.setProperty("display", "none");
            },
          },
          "X",
        ],
      ],
    ],
    [
      "div",
      { style: { margin: "0 auto" } },
      [
        (0,ui_utils.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                let tags = [];
                for (let tag in config/* config.twitter.tags.primary */.vc.twitter.tags.primary){
                  if (config/* config.twitter.tags.primary */.vc.twitter.tags.primary[tag]){
                    tags.push(tag);
                  }
                }
                let tagsTmp = [];
                
                for (let tag in config/* config.twitter.tags.secondary */.vc.twitter.tags.secondary){
                  if (config/* config.twitter.tags.secondary */.vc.twitter.tags.secondary[tag]){
                    tagsTmp.push(tag);
                  }
                }
                if (config/* config.nTags */.vc.nTags < tagsTmp.length){
                  for (let i = 0; i < config/* config.nTags */.vc.nTags; i++){
                    let index = (0,utils/* randomInt */.Iy)(i, tagsTmp.length - 1);
                    tags.push(tagsTmp[index]);
                    tagsTmp[index] = tagsTmp[i];
                  }
                } else {
                  tags = tags.concat(tagsTmp);
                }
                (0,utils/* copyToClip */.qb)(tags.map((tag)=>`#${tag}`).join(" "), "", false);
              },
            },
            "复制Tags",
          ],
        ]),
        (0,ui_utils.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                tagsManager();
              },
            },
            "Tags管理",
          ],
        ]),
        (0,ui_utils.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                bibleManager();
              },
            },
            "定型文管理",
          ],
        ]),
        (0,ui_utils/* ConfigField */.bE)({
          label: "复制的次要Tags数量:",
          name: "nTags",
          type: "input",
          props: {
            type: "number",
            min: 0,
            placeholder: 1,
            style: { width: "48px", margin: "1px" },
          },
          helpDesc:
            "复制的次要tags数量。点击复制tags时，所有主要tags和指定数量的随机次要tags都会被复制。",
        }),
        (0,ui_utils.h)([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                localStorage.setItem(config/* config.configName */.vc.configName, JSON.stringify(config/* config */.vc));
                (0,ui_utils/* Toast */.FN)("保存成功");
              },
            },
            "保存配置",
          ],
        ]),
        [
          "div", 
          {}, 
          "圣 经 咏 唱"
        ],
      ].concat(bibles),
      (el) => {
        refs/* refs.configFieldContainer */.x.configFieldContainer = el;
      },
    ],
  ]);
}


// EXTERNAL MODULE: ./src/modules/ui/anoncement-dom.js
var anoncement_dom = __webpack_require__(484);
;// CONCATENATED MODULE: ./src/modules/ui/suspension.js










// 默认悬浮窗
let tip = false;
const getSuspension = (version) => (0,ui_utils.h)(
  "div",
  {
    class: "dlc-suspension",

    $click: () => {
      refs/* refs.duluncheWnd.style.setProperty */.x.duluncheWnd.style.setProperty("display", "block");
      if (!tip) {
        tip = true;
        (0,ui_utils/* Toast */.FN)((0,anoncement_dom/* getAnoncementDom */.n)(
          oldVersion=version,
          newVersion=dlc_information/* dlcInformation.version */.w.version,
          logs=dlc_information/* dlcInformation.logs.split */.w.logs.split(';'),
          announcement=dlc_information/* dlcInformation.announcement */.w.announcement,
        ));
      }
    },
  },
  "初始化中...",
  (el) => {
    event_bus/* eventBus.on */.Y.on(
      "dlc.ready",
      () => {
        el.textContent = "舰载机控制台";
      },
      { once: true },
      "dlc.ready.default",
    );
  },
);

const getSuspensionTwitter = (version) => (0,ui_utils.h)(
  "div",
  {
    class: "dlc-suspension",

    $click: () => {
      (0,ui_utils/* Toast */.FN)("蓝桐独轮车开发中(功能说明还没写) 欢迎各位提出意见和建议。");
      refs/* refs.duluncheWnd.style.setProperty */.x.duluncheWnd.style.setProperty("display", "block");
    },
  },
  "蓝桐独轮车",
);



;// CONCATENATED MODULE: ./src/modules/ui/css.js



const getCSS = () => (0,ui_utils.h)(
  "style",
  {},
  `
.dlc-cmd {
  color: ${config/* colorConfig.fontColor */.Dc.fontColor};
  background: ${config/* colorConfig.backgroundCmd */.Dc.backgroundCmd};
  width: 265px;
  z-index: 998;
  position: fixed;
  padding: 5px;

  font-size:120%;
  box-sizing: content-box;
  border: 1px solid ${config/* colorConfig.border */.Dc.border};
  border-radius: 5px;
  right: 10px;
  top: 30%;
  display: none;
}
.dlc-cmd-list {
  width: 270px;
  height: 545px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  left: 5px; 
}
.dlc-cmd-list::-webkit-scrollbar{
  width:7px;
  height:7px;
  /**/
}
.dlc-cmd-list::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
.dlc-cmd-list::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
.dlc-cmd-list::-webkit-scrollbar-thumb:hover{
  background: #333;
}
.dlc-titlebar {
  user-select: none;
  background-color: ${config/* colorConfig.titlebar */.Dc.titlebar};
  display: inline-flex;
  align-items: center;
  width: 100%;
}
.dlc-close-btn {
  display: inline-block;
  position: relative;
  text-align: center;
  width: 19px;
  height: 19px;
  color: ${config/* colorConfig.closeBtnColor */.Dc.closeBtnColor};
  cursor: pointer;
  float: right;
  margin-left: 5px;
  margin-right: 5px;
  background-color: black;
  border: ${config/* colorConfig.btnBorder */.Dc.btnBorder} 1px solid;
  line-height: 21px;
}
.dlc-btn {
  display: inline-block;
  background: ${config/* colorConfig.btn */.Dc.btn};
  color: ${config/* colorConfig.btnColor */.Dc.btnColor};
  min-width: 70px;
  height: 24px;
  margin: 2px;
}
.dlc-textarea {
  background: ${config/* colorConfig.textareaBackground */.Dc.textareaBackground};
  color: ${config/* colorConfig.textareaColor */.Dc.textareaColor};
  scrollbar-width: thin;
  width: 260px;
  border-radius: 5px;
}
.dlc-textarea::-webkit-scrollbar{
  width:7px;
  height:7px;
  border-radius: 5px;
  /**/
}
.dlc-textarea::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
.dlc-textarea::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:5px;
}
.dlc-textarea::-webkit-scrollbar-thumb:hover{
  background: #333;
}
.dlc-suspension {
  background: ${config/* colorConfig.suspension */.Dc.suspension};
  color:${config/* colorConfig.btnColor */.Dc.btnColor};
  overflow: hidden;
  z-index: 850;
  position: fixed;
  padding:5px;
  text-align:center;
  width: 85px;
  height: 22px;
  border-radius: 5px;
  right: 10px;
  top: 30%;
}
.dlc-toast {
  top: 10px;
  left: 10px;
  max-height: 90vh;
  max-width: 60vw;
  overflow: auto;
  position: fixed;
  background: ${config/* colorConfig.backgroundToast */.Dc.backgroundToast};
  padding: 16px;
  border: 1px solid ${config/* colorConfig.border */.Dc.border};
  border-radius: 5px;
}
.dlc-alert {
  max-height: 90vh;
  max-width: 60vw;
  overflow: auto;
  background: ${config/* colorConfig.backgroundToast */.Dc.backgroundToast};
  padding: 16px;
  border: ${config/* colorConfig.btnBorder */.Dc.btnBorder} 1px solid;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.dlc-mod-mgr {
  max-height: 140vh;
  max-width: 150vw;
  overflow: auto;
  background: ${config/* colorConfig.backgroundToast */.Dc.backgroundToast};
  padding: 16px;
  border: ${config/* colorConfig.btnBorder */.Dc.btnBorder} 1px solid;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.help-icon::after {
  content: '?';
  margin-left: 4px;
  margin-right: 4px;
  display: inline-block;
  color: ${config/* colorConfig.helpIconColor */.Dc.helpIconColor};
  background-color: ${config/* colorConfig.helpIconBackground */.Dc.helpIconBackground};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border: #999 1px solid;
  font-size: 12px;
}
.delete-icon::after {
  content: '🗑️';
  margin-left: 4px;
  margin-right: 4px;
  display: inline-block;
  color: ${config/* colorConfig.helpIconColor */.Dc.helpIconColor};
  background-color: ${config/* colorConfig.helpIconBackground */.Dc.helpIconBackground};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border: #999 1px solid;
  font-size: 12px;
}
.import-export-icon {
  margin-right: 4px;
  display: inline-block;
  color: ${config/* colorConfig.helpIconColor */.Dc.helpIconColor};
  background-color: ${config/* colorConfig.helpIconBackground */.Dc.helpIconBackground};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border: #999 1px solid;
  font-size: 12px;
}
.hide {
  display: none;
}
.label{
  display:block;
  vertical-align: middle;
}
.label, input, select{
  vertical-align: middle;
}
.mui-switch {
  width: 37px;
  height: 20px;
  position: relative;
  border: 1px solid #dfdfdf;
  background-color: #fdfdfd;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
}
.mui-switch:before {
  content: '✈️';
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  position: absolute;
  top: 0px;
  left: 0;
  border-radius: 9px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.mui-switch:checked {
  border-color: #64bd63;
  box-shadow: #64bd63 0 0 0 16px inset;
  background-color: #64bd63; }
.mui-switch:checked:before {
    left: 16px;
}
.mui-switch.mui-switch-animbg {
  transition: background-color ease 0.4s;
}
.mui-switch.mui-switch-animbg:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-animbg:checked {
  box-shadow: #dfdfdf 0 0 0 0 inset;
  background-color: #64bd63;
  transition: border-color 0.4s, background-color ease 0.4s;
}
.mui-switch.mui-switch-animbg:checked:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-anim {
  transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
}
.mui-switch.mui-switch-anim:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-anim:checked {
  box-shadow: #64bd63 0 0 0 16px inset;
  background-color: #64bd63;
  transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
}
.mui-switch.mui-switch-anim:checked:before {
  transition: left 0.3s;
}
`,
);


// EXTERNAL MODULE: ./src/modules/create-account.js
var create_account = __webpack_require__(601);
;// CONCATENATED MODULE: ./src/modules/router.js

const router = {
  map: [], // {"pattern": //, "method": ()=>{}}
  default: ()=>{
    //console.log("default router");
  },
  finish: ()=>{},
  add: (checker, method) => {
    let obj = {"checker": checker, "method": method};
    router.map.push(obj);
  },
  run: (url) => {
    let matched = false;
    for (let i = 0; i < router.map.length; i++){
      let pair = router.map[i];
      if (pair.checker(url)){ 
        pair.method();
        matched = true;
        break;
      }
    };
    if (!matched){
      router.default();
    }
    router.finish();
  }
};

const initRouter = ()=>{
  // 频道管理页面（用于创建主频道）
  router.add(
    (url)=>{
      return url === "https://www.youtube.com/channel_switcher?next=%2Faccount&feature=settings" 
          || url === "https://www.youtube.com/channel_switcher?next=%2Faccount&feature=settings#";
    }, 
    create_account/* channelSwither */.pj
  );
  // 创建副频道页面
  router.add(
    (url)=>{
      return url.match(/.*:\/\/accounts\.google\.com\/b\/.*/);
    },
    create_account/* createChannelPage */.rC
  );

};


;// CONCATENATED MODULE: ./src/main.js














// import { initalizeMsgCollection } from '@/modules/sendMsg/recall.js';


const main = ()=>{
  if (window.top !== window.self) return;
  if (unsafeWindow.dulunche) {
    alert(`您似乎同时启动了多个不同版本的油管独轮车。请关闭其他独轮车。\n    -- 来自${GM_info.script.name} v${GM_info.script.version}`);
    return;
  }
  const version = GM_info.script.version;
  
  // 加载保存的设置
  (0,config/* loadConfig */.ME)(config/* config.configName */.vc.configName);
  // 载入CSS
  document.body.appendChild(getCSS());
  // 检查独轮车版本信息
  (0,utils/* checkVersion */.Ye)(version);
  // TODO: 整合进路由系统
  if (document.location.href.match(/.*:\/\/twitter\.com.*/)){
    let suspension = getSuspensionTwitter(version);
    refs/* refs.duluncheWnd */.x.duluncheWnd =getDLCWndTwitter(version);
    document.body.appendChild(suspension);
    document.body.appendChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
  } else {
    // 尽早启动省流模式
    // savingMode(config.lowConsume);
    initSavingMode(config/* config.lowConsume */.vc.lowConsume);
    savingModeChat(config/* config.lowConsumeChat */.vc.lowConsumeChat);
    // 在eventBus中注册事件
    (0,event_bus/* initEventBus */.T)();
    // 匹配url
    initRouter();
    router.run(window.location.href);
    // 控制台
    refs/* refs.duluncheWnd */.x.duluncheWnd =getDLCWnd(version);
    // 默认悬浮窗
    let suspension = getSuspension(version);
    unsafeWindow.dulunche = {
      version,
      config: new Proxy(config/* config */.vc, {
        set(_, p, value) {
          event_bus/* eventBus.emit */.Y.emit(`setConfig.${p}`, value);
        },
      }),
      eventBus: event_bus/* eventBus */.Y,
      refs: refs/* refs */.x,
      components: {
        Toast: ui_utils/* Toast */.FN,
        ConfigField: ui_utils/* ConfigField */.bE,
        h: ui_utils.h,
      },
    };
    // 初始化mods  
    (0,mod_manager/* runMods */.l)();
    // 初始化refs
    (0,refs/* initRefs */.d)();
    // 初始化直播相关信息
    (0,live/* initLive */.Bg)();
    // 初始化自动撤回相关
    // initalizeMsgCollection();
    // 初始化进入，退出全屏系统
    initFullScreenChange(suspension, refs/* refs.duluncheWnd */.x.duluncheWnd);
    document.body.appendChild(suspension);
    document.body.appendChild(refs/* refs.duluncheWnd */.x.duluncheWnd);
  }
};

main();
})();

/******/ })()
;