// ==UserScript==
// @icon          https://www.youtube.com/favicon.ico
// @name          Youtube独轮车-Auto Youtube Chat Sender
// @author        necros & dislido
// @description   youtube 独轮车 临时版
// @match         *://www.youtube.com/*
// @version       3.5.5
// @require      https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.global.prod.js
// @grant        unsafeWindow
// @namespace https://greasyfork.org/zh-CN/users/692472-necrosn
// ==/UserScript==

{
  if (!unsafeWindow.Vue) {
      unsafeWindow.Vue = Vue;
  }
  if (window.top !== window.self) throw new Error("非顶层框架");
  const version = "3.5.5";
  const randomInt = (min, max) => {
    if (max < min) return min;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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
  const Toast = (msg, toastClass = "dlc-toast", singletonId = "singletonDom") => {
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
            },
          },
          "关闭",
        ],
        ["div", {}, msg],
      ],
    );
    if (toastClass === "dlc-alert") setTimeout(() => dom.remove(), 10000);
    Toast[singletonId] = dom;
    document.body.appendChild(dom);
  };
  Toast.currZIndex = 10000;

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

  const config = {
    fireMode: 0, // 开火模式  常规/穿甲弹
    ammoPiecingTimes: 10, // 穿甲次数
    textAmmoPiecing: "", // 穿甲弹弹药

    splitMode: 2, // 断句方式
    minCycleSec: 6, // 最小发送间隔（秒）
    maxCycleSec: 0, // 最大发送间隔（秒）
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
    lowConsume: false,
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
    ammoRefine_BanedWordMode: 0, // 屏蔽词处理机制 0 -> 删除， 1 -> 随机改变其中的一个字母
    ammoToLatin: false,
    ammoRefineUrl: "https://52.150.12.1:2434",
    ammoRefineStategy: "https://raw.githubusercontent.com/aserwarsdfd/logs/main/replace.json",
  };

  // 保存配置
  const setAndSave = (prop, target) => {
    config[prop] = target;
    localStorage.setItem("duluncheCfg", JSON.stringify(config));
  };
  const pressButton = (button) => {
    if (button.getElementsByTagName("button")[0].getAttribute("aria-pressed") === "false") {
      // Not pressed
      console.log("Not pressed");
      button.click();
    }
  };
  const pressUpVote = () => {
    pressButton(document.getElementById("top-level-buttons").children[0]);
  };
  const pressDownVote = () => {
    const channelName = document.getElementById("channel-name").getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")[0].text;
    if (channelName === "Coco Ch. 桐生ココ") {
      pressButton(document.getElementById("top-level-buttons").children[1]);
    }
  };
  const getJSON = () => {
    const { ammoRefineStategy } = config;
    // console.log(ammoRefineStategy);
    try {
      const http = new XMLHttpRequest();
      http.open("GET", ammoRefineStategy, false);
      http.send();
      return JSON.parse(http.responseText);
    } catch (e) {
      return {
        version: "3.6.0",
        logs: "3.6.0: 穿甲弹回归; 3.5.0: 修复了无视用户设置进行去半角弹药精制的bug，程序员已拉出去祭天",
        announcement: "未加载云公告",
        // "regexs": [{"expr": "\\.", "replace": "_"}, {"expr": "\\,", "replace": "!"}],
        regexs: [],
        block_words: ["coco", "kondragon", "idol", "yay", "wooooooo", "pm", "sugar", "volare", "italian", "naisu", "clap", "yess", "hi", "adele", "roll", "local", "irons", "introduce", "nightmod", "chan", "suki", "daisuki", "cupboard", "doe", "creatures", "arid", "excellent", "goooooo", "rolling", "rabbit", "hole", "jazz", "claps", "ohhh", "lyrics", "whe", "noses", "nearby", "inhaled", "lungs", "gooooo", "asakaichou", "superchatters", "viewers", "afford", "em", "dying", "wtf", "nom", "please", "crying", "loud", "simp", "asacoco", "omg", "classic", "dragon", "noises", "numb", "peko", "english", "experienced", "broadcasters", "join", "meme", "dami", "bobo", "ai", "gi", "paklabat", "matataag", "normalin", "addicted", "injecting", "poggers", "weebs", "cured", "againkaichou", "hamon", "user", "rarely", "bruh", "wonder", "country", "losing", "nage", "indeed", "revs", "tree", "beautiful", "woah", "stick", "rest", "amazing", "pachi", "un", "evanescence", "allow", "lines", "garage", "nt", "bettuhrr", "send", "gameplay", "understandable", "songs", "funny", "mo", "goooooooo", "ne", "team", "however", "provide", "reduce", "guitar", "lmaooo", "pepo", "abuse", "briefly", "students", "drunk", "ok", "outdoor", "yesss", "w", "spanish", "strange", "la", "thse", "elite", "translates", "herselfi", "wants", "effectively", "sleeping", "dude", "jajaja", "having", "language", "pizza", "g", "sombrero", "despacito", "esto", "nachos", "yessss", "dragoncito", "act", "en", "gods", "couldnt", "six", "faithful", "superchat", "whn", "knew", "culture", "hose", "happne", "queen", "villeneuve", "deseerved", "xdd", "dice", "senior", "invest", "wisely", "simping", "saving", "coof", "split", "yesssss", "attacks", "camera", "behind", "wec", "yaers", "dot", "rolled", "rick", "fascination", "explain", "twitch", "ww", "rickrolled", "creative", "higher", "charming", "fans", "delicious", "faq", "languages", "banned", "plump", "promise", "si", "kun", "moves", "shadow", "ban", "disney", "streams", "britney", "mkae", "praise", "bob", "didney", "ep", "orre", "non", "kaichoo", "cow", "ice", "donkey", "grid", "electromancer", "thrown", "token", "cocohontas", "google", "trick", "bluetooth", "headphones", "laptop", "twitter", "uhh", "video", "atom", "yabai", "toxic", "yas", "taking", "counts", "comments", "anynoe", "p", "isn", "driver", "drivers", "yab", "clock", "boing", "plot", "awaits", "saviour", "prince", "chatroom", "growing", "bye", "radio", "results", "diamond", "est", "cure", "vice", "tutelage", "quickest", "realm", "panik", "pains", "poverty", "freaking", "stayed", "tan", "needed", "breasted", "tv", "chonghuagn", "risks", "maaf", "se", "wouldn", "couple", "visage", "rotten", "rom", "frm", "according", "dialectics", "chats", "till", "greater", "kils", "oen", "delfect", "nearest", "alone", "ghost", "weird", "infiltrate", "idea", "disturbing", "everyy", "erath", "hsa", "burn", "chocolate", "overload", "hepatic", "lights", "choco", "dope", "ntural", "hilarious", "measure", "car", "oil", "corner", "secret", "basement", "doll", "der", "gaat", "twee", "weken", "beginnen", "thinks", "busy", "thinking", "acceptable", "haachamachama", "sweet", "thin", "horror", "et", "ingles", "ahi", "pussy", "eport", "shelter", "yt", "fuckin", "pleasure", "fists", "spamiing", "yubi", "dogs", "hong", "huang", "sha", "ni", "bulb", "rude", "witb", "lie", "pupil", "minute", "tit", "embarrassed", "pills", "helped", "knocked", "askew", "beause", "action", "blows", "politically", "motivated", "third", "ma", "repeats", "bda", "na", "jump", "scare", "argue", "stupidity", "literally", "ew", "struggle", "teacher", "ay", "hound", "titles", "muda", "arm", "wha", "ver", "las", "observation", "frog", "atmosphere", "hay", "een", "didst", "moved", "smash", "martial", "hall", "compounds", "di", "l", "players", "secondary", "compass", "protectour", "harm", "riks", "cov", "ironn", "breath", "legal", "seats", "mixed", "bottle", "modern", "um", "subs", "mental", "nonenglish", "hopes", "illnes", "temporarily", "disposed", "grandma", "weapon", "mosley", "automatically", "saved", "synthetic", "antioxidants", "election", "state", "bi", "bright", "liike", "wose", "banshee", "says", "grass", "tea", "residentsleeper", "prosperity", "dat", "hurting", "trumps", "eelings", "pas", "parle", "counting", "command", "siht", "tomorrow", "dna", "elders", "kings", "rulers", "incompetent", "beings", "value", "sheep", "feelings", "votre", "voix", "cs", "bones", "forest", "morre", "paaper", "watning", "yeet", "sayo", "dragon", "night", "member", "graduate", "shame", "alcohol", "liver", "english", "japan", "america", "aloe", "gura", "fubuki", "debuki", "psycho", "poison", "democracy", "wine", "potion", "trash", "interesting", "politics"],
        // "replace_words": {"kaicho": "kaiicho"}
        replace_words: { re: "are", ay: "any" },
        phantom_tank: false,
      };
    }
  };
  const versionToNumber = (versionString) => parseInt(versionString.replace(/\./g, ""));
  let refineJson = getJSON();
  const latinLower = "ḁ̂b̃č͑d́èf̓g̊ḧìj̱k̦l̂m̀n̓ồp̤ꝗ̃ȓśt͑ũ̊v̇w̄x̣ÿ́z̓";
  const latinUpper = "ÄB̀ČÐĒF̓ĜḦÌJ̱K̦L̂M̀N̓ỒP̤Ꝗ̃ȒŚT͑Ũ̊V̇W̄X̣Ÿ́Z̓";
  const reLower = /^[a-z]+$/;
  const reUpper = /^[A-Z]+$/;

  const toLatin = (c) => {
    if (c.match(reLower) !== null) return latinLower[c.codePointAt() - 97];
    if (c.match(reUpper !== null)) {
      return latinUpper[c.codePointAt() - 65];
    }
    return c;
  };

  // 版本更新检测
  if (versionToNumber(version) < versionToNumber(refineJson.version)) {
    Toast(`您的版本为: ${version}, 最新版为: ${refineJson.version}, 建议在油猴中更新最新版本。\n更新日志: \n    ${refineJson.logs}`);
  }

  const refs = {
    sendBtn: null,
    chatTxtInput: null,
    autoPlayBtn: null,
    runBtn: null,
    offlineStateDiv: null,
    remoteDanmakuConfig: [],
    dlcAutomation: null,
    duluncheWnd: null,

    fetchNative: undefined,
    armorPiercingTimeoutId: undefined,
    armorPiercingPromise: undefined,
    armorPiercingResolve: undefined,
    configValidators: [
      () => Number(config.minCycleSec) < 1
              && eventBus.emit("setConfig.minCycleSec", 1),
      () => Number(config.minDanmakuLength) < 1
              && eventBus.emit("setConfig.minDanmakuLength", 1),
      () => Number(config.maxDanmakuLength) < config.minDanmakuLength
              && eventBus.emit("setConfig.maxDanmakuLength", config.minDanmakuLength),
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

  const patchFetch = () => {
      const { fireMode } = config;
      const sendMessagePath = "/send_message";
      console.log(document.getElementById("chatframe").contentWindow.fetch);
      refs.fetchNative = document.getElementById("chatframe").contentWindow.fetch;
      document.getElementById("chatframe").contentWindow.fetch = async function (...args) {
        console.log("enter unsafeWindow.fetch");
          let response;
          const requestUrl = typeof args[0] === "string" ? args[0] : args[0].url;
          let requestPathname;
          try {
              const url = new URL(requestUrl);
              requestPathname = url.pathname;
          } catch (error) {
              requestPathname = "";
          }
          console.log("requestPathname: " + requestPathname);
          if (requestPathname.endsWith(sendMessagePath) &&
              fireMode == 1) {
              if (refs.armorPiercingTimeoutId) {
                  clearTimeout(refs.armorPiercingTimeoutId);
                  refs.armorPiercingTimeoutId = undefined;
              }
              refs.armorPiercingTimeoutId = setTimeout(() => {
                  refs.armorPiercingResolve === null || refs.armorPiercingResolve === void 0 ? void 0 : refs.armorPiercingResolve();
                  refs.armorPiercingTimeoutId = undefined;
                  refs.armorPiercingPromise = undefined;
                  refs.armorPiercingResolve = undefined;
                  console.log("Delay done");
              }, 233);
              if (!refs.armorPiercingPromise) {
                  refs.armorPiercingPromise = new Promise((resolve) => {
                      refs.armorPiercingResolve = resolve;
                  });
              }
              response = await refs.armorPiercingPromise.then(() => refs.fetchNative.apply(this, args));
          } else {
              response = await refs.fetchNative.apply(this, args);
          }
          return response;
      };
      console.log("finish");
  };
  const unpatchFetch = () => {
      if (refs.fetchNative) {
          document.getElementById("chatframe").contentWindow.fetch = refs.fetchNative;
      }
      refs.fetchNative = undefined;
  };

  const getProb = (length) => {
    if (length <= 20) {
      return 0.3;
    } if (length <= 30) {
      return 0.2;
    } if (length <= 50) {
      return 8.0 / length;
    }
    return 0.1;
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
  // 弹药库云精制
  const cloudRefine = (text) =>
    /*
    const { ammoRefineUrl } = config;
    const json = { text, prob: getProb(text.length) };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", ammoRefineUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);
    */
    text;

  // 本地弹药精制
  const localRefine = (text) => {
    const { ammoToLatin, ammoRefine_BanedWordMode } = config;
    // 正则
    for (let i = 0; i < refineJson.regexs.length; i++) {
      const { expr } = refineJson.regexs[i];
      const { replace } = refineJson.regexs[i];
      text = text.replace(new RegExp(expr), replace);
    }
    // 分字
    const charSplited = text.split(/(?=.)/us);
    // 测试 用拉丁字符替换
    if (ammoToLatin) {
      for (let i = 0; i < charSplited.length; i++) {
        charSplited[i] = toLatin(charSplited[i]);
      }
    }
    text = charSplited.join("");
    // 空格分词
    let count = 0;
    const splitedText = text.split(" ");
    for (let i = 0; i < splitedText.length; i++) {
      let word = splitedText[i].toLowerCase();
      word = word.replace(/[[\]?.!-;,:',，。、“”[\]！？"]+/g, "").toLowerCase();
      word = word.replace(/(^\s*)|(\s*$)/g, "");
      // 如果是替换词则进行替换
      if (refineJson.replace_words.hasOwnProperty(word)) {
        splitedText[i] = refineJson.replace_words[word];
        word = splitedText[i];
      }

      // 随机在屏蔽词中间插入一个英文字
      /**
      if (refine_json['block_words'].indexOf(word) > -1){
          index = randomInt(0, word.length - 1);
          rand_char = String.fromCharCode(Math.floor(Math.random() * 26) + "a".codePointAt(0));
          splitedText[i] = word.substr(0, index) + rand_char + word.substr(index, word.length-1);
      }
      * */
      // 移除屏蔽词
      if (refineJson.block_words.indexOf(word) > -1) {
        switch (+ammoRefine_BanedWordMode) {
          case 0:
            splitedText[i] = "";
            break;
          case 2:
            if (refineJson.phantom_tank) {
              if (count < 3 && word.length >= 2) {
                // 最多添加3个字符，插入更多符号会使得被杀的几率大幅度提升
                const index = randomInt(1, word.length - 2);
                splitedText[i] = `${word.substr(0, index)}\u200b${word.substr(index)}`;
                // console.log("Phantom tank: " + splitedText[i]);
                count++;
                break;
              }
            }
            break;
          case 1: {
            const index = randomInt(0, word.length - 1);
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
            splitedText[i] = word.substr(0, index) + String.fromCodePoint(code) + word.substr(index + 1, word.length - 1);
            // 如果运气不好，改动后还是屏蔽词则删除这个词
            if (refineJson.block_words.indexOf(splitedText[i]) > -1) {
              splitedText[i] = "";
            }
            break;
          }
          default:
            console.log(`屏蔽词：${word} 模式: ${ammoRefine_BanedWordMode} 尚未编写`);
        }
      }
    }
    text = splitedText.join(" ");
    return text;
  };
  const ammoDisterb = (text) => {
    // 随机删除一个字符 避免弹药重复上不了tc
    // 根据反馈，很多人会手动在屏蔽词中间加空格
    // 现在不会删除空格了
    const words = text.trim().split(/\s{1,}/);
    if (words.length > 0) {
      const wordIndex = randomInt(0, words.length - 1);
      const charSplited = [...words[wordIndex]];
      charSplited.splice(randomInt(0, charSplited.length - 1), 1);
      words[wordIndex] = charSplited.join("");
    }
    text = words.join(" ");
    return text;
  };

  const refine = (text) => {
    const {
      ammoRefine_Cloud, ammoRefine_Local, ammoRefine_Disturb, ammoRefine_ToLower,
    } = config;
    // 全角转为半角 (会被秒杀)
    if (ammoRefine_Local) {
      text = toCDB(text);
    }
    if (ammoRefine_ToLower) {
      text = text.toLowerCase();
      text = text.replace(/[[\]?.!-;,:',，。、“”！？"]+/g, " ");
    }
    if (ammoRefine_Local) {
      text = localRefine(text);
    }
    if (ammoRefine_Cloud) {
      text = cloudRefine(text);
    }
    if (ammoRefine_Disturb) {
      text = ammoDisterb(text);
    }
    return text;
  };
  // 关闭自动播放
  eventBus.on("dlc.ready", () => {
    if (refs.autoPlayBtn.active) refs.autoPlayBtn.click();
  });

  eventBus.on(
    "dlc.sendMsg",
    ({ detail: text }) => {
      const { recallMsg, fireMode } = config;
      let refinedText;
      if (fireMode == 0){
        refinedText = refine(text);
      } else {
        refinedText = text;
      }
      refs.chatTxtInput.textContent = refinedText;
      refs.chatTxtInput.dispatchEvent(new InputEvent("input"));
      refs.sendBtn.click();
      if (recallMsg) {
        setTimeout(() => {
          console.log("测试自动撤回");
          const messagesList = window.frames.chatframe.contentDocument.getElementsByTagName("yt-live-chat-text-message-renderer");
          for (let i = messagesList.length - 1; i >= 0; i--) {
            const currMsg = messagesList[i];
            // const msgSender = currMsg.children[1].children[1].innerText;
            const msgContent = currMsg.children[1].children[2].innerText;
            console.log(i);
            console.log(refinedText);
            console.log(msgContent);
            if (refinedText === msgContent) {
              console.log(currMsg);
              currMsg.children[2].children[0].click();
              const f = () => {
                setTimeout(() => {
                  try {
                    console.log(`length: ${window.frames.chatframe.contentDocument.getElementsByTagName("ytd-menu-popup-renderer")[0].children[0].children.length}`);
                    if (window.frames.chatframe.contentDocument.getElementsByTagName("ytd-menu-popup-renderer")[0].children[0].children.length === 1) {
                      window.frames.chatframe.contentDocument.getElementsByTagName("ytd-menu-popup-renderer")[0].children[0].children[0].click();
                    }
                  } catch (e) {
                    f();
                  }
                }, 500);
              };
              f();
              break;
            }
          }
        }, 2000);
      }
    },
    {},
    "dlc.sendMsg.default",
  );
  eventBus.on("setRef.remoteDanmakuConfig", ({ detail }) => {
    refs.remoteDanmakuConfig = detail;
  });

  try {
    const savedCfg = JSON.parse(localStorage.getItem("duluncheCfg"));
    Object.assign(config, savedCfg);
  } catch (_) {
    // noop
  }
  // 如果activate没定义就自动为true
  config.modList.forEach((mod) => {
    if (typeof mod.activate === "undefined") {
      mod.activate = true;
      localStorage.setItem("duluncheCfg", JSON.stringify(config));
    }
  });
  let timer; // 定时器
  let apiTimer;
  // 直播间加载api
  const loadLiveInfo = (url, target, ignoreError = false, started = false) => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        if (!data || !data.currentLives) {
          target.checked = false;
          Toast(
            h("monitor", { style: { color: "red" } }, [
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
          Toast("监控中");
          return;
        }
        const { link } = data.currentLives[0];
        if (link === config.lastLiveUrl) {
          Toast("刚冲过了, 休息中, 等待监控API刷新");
          return;
        }
        setAndSave("lastLiveUrl", link);
        window.location = link;
      })
      .catch((err) => {
        console.error(err);
        if (!ignoreError) {
          target.checked = false;
          setAndSave("fullAutomation", false);
        }
        Toast(
          h("monitor", { style: { color: "red" } }, [`${"加载错误 "}${err}`]),
        );
      });
  };

  // 省流开关
  const savingMode = (display = true) => {
    document.querySelector(".ytp-play-button.ytp-button").click();
    if (display) {
      document.querySelector("#player.style-scope").style.display = "none";
    } else {
      document.querySelector("#player.style-scope").style.display = "block";
    }
  };
  // 格式化时间
  const formatTime = (time) => {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time / 60) % 60);
    const second = Math.floor(time % 60);
    return `${hour}:${minute}:${second}`;
  };

  // 自动停止
  const bindStop = (eve) => {
    if (eve.target.data === "感谢收看") {
      eventBus.emit("dlc.stop");
      eventBus.emit("live.stop");
      window.location = "https://www.youtube.com";
    }
  };
  // 检测直播间状态
  const monitorLiveStatus = () => {
    setTimeout(() => {
      refs.offlineStateDiv = document.querySelector(
        ".ytp-offline-slate-main-text",
      );
      if (!refs.offlineStateDiv.innerText) {
        if (config.autoStop) {
          refs.offlineStateDiv.addEventListener("DOMNodeInserted", bindStop);
        }
        eventBus.emit("live.start");
        console.log("Live start");
      } else {
        // console.log("waiting for stream start...");
        monitorLiveStatus();
      }
    }, 10000);
  };

  eventBus.on("dlc.ready", monitorLiveStatus);
  // 添加/编辑mod
  const addMod = (modName, mod, index = null) => {
    const { modList } = config;
    if (!mod) {
      Toast("无效mod");
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
    localStorage.setItem("duluncheCfg", JSON.stringify(config));
    Toast("保存MOD成功,请刷新页面以使用");
    modManager();
  };

  // mod编辑页面
  const modEdit = (_mod = { modName: "", mod: "" }, index = 0) => {
    const { modName, mod } = _mod;
    const edit = Boolean(modName); // 编辑模式还是添加模式
    return h(
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
        config.modList[index].activate = target.checked;
        localStorage.setItem("duluncheCfg", JSON.stringify(config));
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
            Toast(modEdit(mod, index));
          },
        }, "编辑"],
        ["button", {
          $click: () => {
            if (index === 0) {
              config.modList.shift();
            } else {
              config.modList.splice(index, index);
            }
            localStorage.setItem("duluncheCfg", JSON.stringify(config));
            modManager();
          },
        }, "删除"],

      ],
    ];
  };
    // mod 管理界面
  const modManager = (singletonId = "singletonDom") => {
    const { modList } = config;
    if (modManager[singletonId]) modManager[singletonId].remove();
    const dom = h(
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
            Toast(modEdit());
          },
        }, "添加mod"],
        ...modList.map(modEditor),
      ],
    );
    modManager[singletonId] = dom;
    document.body.appendChild(dom);
  };
  if (config.extension) {
    addMod("老版独轮车扩展", config.extension);
    config.extension = "";
    localStorage.setItem("duluncheCfg", JSON.stringify(config));
    Toast("老版独轮车扩展脚本已经迁移到MOD管理, 并且会在未来版本中删除");
  }
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
                eventBus.emit(`setConfig.${name}`, ev.target[valueProp]);
                if (props.$change) props.$change(ev);
              },
            },
            children,
            (el) => {
              el[valueProp] = config[name];
              eventBus.on(
                `setConfig.${name}`,
                ({ detail }) => {
                  config[name] = detail;
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
  ) =>{
    children[0][1]["style"] = "border-top:1px solid;border-top-left-radius: 5px;border-top-right-radius: 5px;" + children[0][1]["style"];
    children[children.length - 1][1]["style"] = "border-bottom:1px solid;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;" + children[children.length - 1][1]["style"];
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
      [ "label",
       {},
       [
           [
              "details",
              {},
              [
                ["summary", {"style": "background-color: #ff921a;border:1px solid;border-radius:5px;border-color: #703b17;"}, summary]
              ].concat(
                  children.map((e)=>{
                      e[1].style = "background-color: #FFE08B;border-right:1px solid; border-left:1px solid;border-color: #703b17;" + e[1].style;
                      return e;
                    }
                  )
              ),
          ],
       ]
     ],
    ],
  ];
  }
  // 结束发射
  eventBus.on(
    "dlc.stop",
    () => {
      refs.runBtn.innerText = "出动";
      refs.ambushBtn.innerText = "伏击";
      unpatchFetch();
      clearTimeout(timer);
      timer = null;
    },
    {},
    "dlc.stop.default",
  );

  let lastMsgID = "";
  // 开始伏击
  eventBus.on(
    "dlc.ambush",
    () => {
      pressDownVote();
      Toast("准备伏击 越共探头.jpg");
      refs.ambushBtn.innerText = "撤退";
      // Ignore previous messages
      const messagesList = window.frames.chatframe.contentDocument.getElementsByTagName("yt-live-chat-text-message-renderer");
      if (messagesList && messagesList.length > 0) {
        lastMsgID = messagesList[messagesList.length - 1].id;
      }
      const nextTimer = () => {
        timer = setTimeout(() => {
          let attack = false;
          const autoAttackTarget = "Coco Ch. 桐生ココ";
          // const autoAttackTarget = "UltramanAce";
          const messagesList = window.frames.chatframe.contentDocument.getElementsByTagName("yt-live-chat-text-message-renderer");
          for (let i = messagesList.length - 1; i >= 0; i--) {
            const message = messagesList[i];
            if (message.id == lastMsgID) {
              break;
            }
            const authorName = message.getElementsByTagName("yt-live-chat-author-chip")[0].children["author-name"].innerText;
            console.log(`author: ${authorName}`);
            console.log(`autoAttackTarget: ${autoAttackTarget}`);
            if (autoAttackTarget === authorName) {
              if (refs.runBtn.innerText === "出动") {
                const s = message.textContent || message.innerText;
                Toast(`${String(new Date())}发现目标！开火！${s}`);
                attack = true;
                refs.runBtn.click();
              }
            }
          }
          if (messagesList && messagesList.length > 0) {
            lastMsgID = messagesList[messagesList.length - 1].id;
          }
          if (!attack) {
            // console.log("目标还没出现...");
            nextTimer();
          }
        }, 2000);
      };
      nextTimer();
    },
    {},
    "dlc.ambush.default",
  );
  // 停止伏击
  eventBus.on(
    "dlc.retreat",
    () => {
      refs.ambushBtn.innerText = "伏击";
      eventBus.emit("dlc.stop");
    },
    {},
    "dlc.retreat.default",
  );
  const splitter = {
    // 单句模式
    0: (text) => [text.substr(0, config.maxDanmakuLength)],
    // 多句转轮
    2: (text) => text
      .split("\n")
      .map((it) => it.trim().substr(0, config.maxDanmakuLength))
      .filter(Boolean),
    // 说书模式
    1: (text) => {
      const { maxDanmakuLength, minDanmakuLength, splitChar } = config;
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

  // 发射弹幕
  eventBus.on(
    "dlc.run",
    () => {
      const {
        maxCycleSec,
        minCycleSec,
        text,
        splitMode,
        randomDanmaku,
        fireMode,
        ammoPiecingTimes,
        textAmmoPiecing,
      } = config;
      pressDownVote();

      patchFetch();
      // 检查设置项
      if (!config.noValidate) {
        try {
          refs.configValidators.forEach((vali) => vali());
        } catch (err) {
          Toast(err);
        }
      }

      localStorage.setItem("duluncheCfg", JSON.stringify(config));

      let danmakuList;
      if (fireMode == 0){
        const localDanmakuList = splitter[splitMode](text);
        danmakuList = refs.remoteDanmakuConfig
        .filter(Boolean)
        .reduce((list, data) => list.concat(data.list), localDanmakuList);
      } else {
        danmakuList = splitter[splitMode](textAmmoPiecing).map((ammo) => {
          return refine(ammo);
        });
      }

      if (!danmakuList.length) {
        Toast("当前弹幕列表为空！");
        return;
      }

      refs.runBtn.innerText = "中止";

      const minCycleTime = parseInt(minCycleSec * 1000, 10);
      const maxCycleTime = parseInt(maxCycleSec * 1000, 10);

      refs.danmakuGener = (function* gen() {
        if (+splitMode === 2 && randomDanmaku) {
          while (true) yield danmakuList[randomInt(0, danmakuList.length - 1)];
        } else {
          while (true) yield* danmakuList;
        }
      }());
      let nextTimer;
      if (fireMode == 0){
        nextTimer = () => {
          timer = setTimeout(async () => {
            eventBus.emit("dlc.sendMsg", (await refs.danmakuGener.next()).value);
            if (timer) nextTimer();
          }, randomInt(minCycleTime, maxCycleTime));
        };
      } else {
        nextTimer = () => {
          timer = setTimeout(async () => {
            for (let i = 0; i < ammoPiecingTimes; i++){
              eventBus.emit("dlc.sendMsg", (await refs.danmakuGener.next()).value);
            }
            if (timer) nextTimer();
          }, randomInt(minCycleTime, maxCycleTime));
        };
      }
      nextTimer();
    },
    {},
    "dlc.run.default",
  );

  // 控制台
  refs.duluncheWnd = h("div", { class: "dlc-cmd" }, [
    [
      "div",
      {
        class: "dlc-titlebar",
        $mousedown(ev) {
          if (ev.target !== this) return;
          const mask = h("div", {
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
            refs.duluncheWnd.style.left = `${e.clientX - layerX}px`;
            refs.duluncheWnd.style.top = `${e.clientY - layerY}px`;
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
              if (refs.runBtn.innerText === "出动") eventBus.emit("dlc.run");
              else eventBus.emit("dlc.stop");
            },
          },
          "出动",
          (el) => {
            refs.runBtn = el;
          },
        ],
        [
          "button",
          {
            class: "dlc-btn",
            $click: (ev) => {
              ev.stopPropagation();
              if (refs.ambushBtn.innerText === "伏击") eventBus.emit("dlc.ambush");
              else eventBus.emit("dlc.retreat");
            },
          },
          "伏击",
          (el) => {
            refs.ambushBtn = el;
          },
        ],
        version,
        [
          "span",
          {
            class: "help-icon",
            $click: (ev) => {
              ev.stopPropagation();
              Toast(refs.helpContent);
            },
          },
        ],
        [
          "div",
          {
            class: "dlc-close-btn",
            $click: (ev) => {
              ev.stopPropagation();
              refs.duluncheWnd.style.setProperty("display", "none");
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
        ConfigField({
          label: "",
          name: "text",
          type: "textarea",
          props: {
            placeholder: "输入常规模式需要发射的内容到这里",
            style: {
              width: "265px",
              height: "100px",
              overflow: "scroll",
              whiteSpace: "pre",
            },
          },
        }),
        ConfigField({
          label: "",
          name: "textAmmoPiecing",
          type: "textarea",
          props: {
            placeholder: "输入穿甲弹发射的内容到这里",
            style: {
              width: "265px",
              height: "50px",
              overflow: "scroll",
              whiteSpace: "pre",
            },
          },
        }),
        ConfigField({
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
        ConfigField({
          label: "穿甲弹开火次数:",
          name: "ammoPiecingTimes",
          type: "input",
          props: {
            type: "number",
            min: 1,
            placeholder: 1,
            style: { width: "48px", margin: "1px" },
          },
          helpDesc:
            "穿甲弹同时开火的次数，越多穿甲效果越明显，但是也会增加被google风控的概率",
        },
        (el) => {
            if (+config.fireMode !== 1) el.classList.add("hide");
            eventBus.on(
              "setConfig.fireMode",
              ({ detail: value }) => {
                if (value !== "1") el.classList.add("hide");
                else el.classList.remove("hide");
              },
              {},
              "dlc.setConfig.fireMode.ammoPiecingTimesField",
            );
          },
        ),
        ConfigField(
          {
            label: "自动撤回",
            name: "recallMsg",
            type: "input",
            props: { type: "checkbox" },
            valueProp: "checked",
            helpDesc: "自动撤回发出的弹药迷惑扳手，注意！请设置较长的开火时间间隔（最短5s以上），此功能能否生效受电脑卡顿因素影响，不要依赖这个开火",
          },
          (el) => {
            if (+config.fireMode !== 0) el.classList.add("hide");
            eventBus.on(
              "setConfig.fireMode",
              ({ detail: value }) => {
                if (value !== "0") el.classList.add("hide");
                else el.classList.remove("hide");
              },
              {},
              "dlc.setConfig.recallMsg.recallMsgField",
            );
          },
        ),
        ConfigField({
          label: "最小间隔时间(s):",
          name: "minCycleSec",
          type: "input",
          props: {
            type: "number",
            min: 3,
            placeholder: 3,
            style: { width: "48px", margin: "1px" },
          },

        }),
        ConfigField({
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
                      "如果设置小于最小间隔时间，则相当于不随机间隔，以最小间隔时间发送弹幕",
        }),
        ConfigField(
          {
            label: "省流模式",
            name: "lowConsume",
            type: "input",
            props: { type: "checkbox" },
            valueProp: "checked",
            helpDesc: "只看聊天框，节省流量",
          },
          () => {
            const { lowConsume } = config;
            if (lowConsume) {
              eventBus.on("dlc.ready", savingMode);
            }
            eventBus.on("setConfig.lowConsume", ({ detail: value }) => {
              savingMode(value);
            });
          },
        ),
        ConfigField(
          {
            label: "弹药扰动",
            name: "ammoRefine_Disturb",
            type: "input",
            props: { type: "checkbox" },
            valueProp: "checked",
            helpDesc: "随机去除弹药中的一个字符，提高上top chat概率",
          },
        ),
        ConfigField({
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

        ConfigField(
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
            if (+config.splitMode !== 2) el.classList.add("hide");
            eventBus.on(
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
        ConfigField(
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
            if (+config.splitMode !== 1) el.classList.add("hide");
            eventBus.on(
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
        ConfigField(
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
            if (+config.splitMode !== 1) el.classList.add("hide");
            eventBus.on(
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
        ConfigField(
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
                  eventBus.on("setConfig.autoStop", ({ detail: value }) => {
                      if (value) {
                          refs.offlineStateDiv.addEventListener(
                              "DOMNodeInserted",
                              bindStop,
                          );
                      } else {
                          try {
                              refs.offlineStateDiv.removeEventListener(
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
        ConfigField({
          label: "关闭配置项校验:",
          name: "noValidate",
          type: "input",
          props: { type: "checkbox" },
          valueProp: "checked",
          helpDesc:
                      "不对输入的配置项进行校验，这意味着你可以进行将间隔时间设置为0这样的危险操作",
        }),
        CollapseField(
            "弹药精炼: 调整弹药内容，降低被杀几率",
            [
                ConfigField(
                    {
                        label: "弹药去除大写字母标点符号",
                        name: "ammoRefine_ToLower",
                        type: "input",
                        props: { type: "checkbox" },
                        valueProp: "checked",
                        helpDesc: "所有大写字母转换为小写，删除一切标点符号 - 对Nightbot策略",
                    },
                ),
                ConfigField(
                    {
                        label: "弹药精制 (本地)",
                        name: "ammoRefine_Local",
                        type: "input",
                        props: { type: "checkbox" },
                        valueProp: "checked",
                        helpDesc: "将弹药内容精制（如去除屏蔽词，改中文标点符号等， 正则替换等，以提高弹药通过Night bot的几率",
                    },
                ),
                /*
        ConfigField(
          {
            label: "弹药精制 (云) 尚未实装",
            name: "ammoRefine_Cloud",
            type: "input",
            props: { type: "checkbox" },
            valueProp: "checked",
            helpDesc: "尚未实装 - 在服务器上进行弹药精制，避免规则被4v告密",
          },
        ),
        */
                // 不要用！！！会被判断成符号秒杀
                /*
                  ConfigField(
                      {
                          label: "字母转换为拉丁文",
                          name: "ammoToLatin",
                          type: "input",
                          props: { type: "checkbox" },
                          valueProp: "checked",
                          helpDesc: "用拉丁字符替换英文字母 会触发符号判定，被night bot秒杀",
                      },
                  ),
                  */
                ConfigField({
                    label: "弹药精制策略:",
                    name: "ammoRefineStategy",
                    type: "input",
                    props: {
                        type: "text",
                        style: { width: "150px", margin: "1px" },
                    },
                }, () => {
                    const { ammoRefineStategy } = config;
                    console.log(`ammoRefineStategy: ${ammoRefineStategy}`);
                }),
                // ConfigField({
                //   label: "云精制网址:",
                //   name: "ammoRefineUrl",
                //   type: "input",
                //   props: {
                //     type: "text",
                //     style: { width: "150px", margin: "1px" },
                //   },
                // }),
                ConfigField({
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
                    if (config.ammoRefine_Local !== true) el.classList.add("hide");
                    eventBus.on(
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
        CollapseField(
            "智能发车: 定时或通过监控api来发车",
            [
                ConfigField(
                    {
                        label: h([
                            "全自动发车:",

                            [
                                "input",
                                {
                                    type: "checkbox",
                                    $click: ({ target }) => {
                                        const { infoUrl } = config;
                                        if (!target.checked) {
                                            clearInterval(apiTimer);
                                            setAndSave("fullAutomation", false);
                                            return;
                                        }
                                        setAndSave("fullAutomation", true);

                                        if (window.location.href !== "https://www.youtube.com/") {
                                            Toast("只能在油管首页开启监控, 回到首页刷新即可");
                                            return;
                                        }
                                        Toast("监控中...");
                                        loadLiveInfo(infoUrl, target);
                                        apiTimer = setInterval(
                                            () => loadLiveInfo(infoUrl, target, true),
                                            60000,
                                        );
                                    },
                                },
                            ],
                        ]),
                        name: "infoUrl",
                        type: "textarea",
                        props: {
                            placeholder: "开播监控地址",
                            style: {
                                width: "265px",
                                height: "40px",
                                overflow: "scroll",
                                whiteSpace: "pre",
                            },
                        },
                        helpDesc: "填监控API地址，如果不知道是什么，去NGA翻独轮车发布贴",
                    },
                    (el) => {
                        const { fullAutomation, infoUrl, lastLiveUrl } = config;
                        const target = el.querySelector("input");
                        if (window.location.href === lastLiveUrl) {
                            setInterval(
                                () => loadLiveInfo(
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
                            Toast("监控中...");
                            loadLiveInfo(infoUrl, target);
                            apiTimer = setInterval(
                                () => loadLiveInfo(infoUrl, target, true),
                                60000,
                            );
                        }
                    },
                ),
                ConfigField(
                    {
                        label: "开播等待时间(s)",
                        name: "startWaitingTime",
                        type: "input",
                        props: {
                            type: "number",
                            min: 5,
                            placeholder: config.startWaitingTime,
                            style: { width: "48px", margin: "1px" },
                        },
                    },
                    () => {
                        const { fullAutomation } = config;
                        const waitingForRun = () => {
                            const { startWaitingTime } = config;
                            Toast(
                                `独轮车将于${startWaitingTime}秒后启动，如果这不是你的本意，请关闭全自动发车`,
                                "dlc-alert",
                            );
                            setTimeout(() => {
                                eventBus.emit("dlc.run");
                            }, startWaitingTime * 1000);
                        };

                        if (fullAutomation) {
                            eventBus.on("live.start", waitingForRun);
                        }
                    },
                ),

                ConfigField({
                    label: h([
                        [
                            "button",
                            {
                                class: "dlc-btn",
                                $click: ({ target }) => {
                                    if (target.innerText !== "定时启动") return;
                                    const { startTime } = config;
                                    const timeStamp = Date.parse(new Date(startTime));
                                    let timeRemain = timeStamp - new Date().getTime();
                                    target.innerText = formatTime(parseInt(timeRemain / 1000));
                                    const startTimer = () => {
                                        setTimeout(() => {
                                            if (timeRemain > 0) {
                                                timeRemain = timeStamp - new Date().getTime();
                                                target.innerText = formatTime(
                                                    parseInt(timeRemain / 1000),
                                                );
                                                startTimer();
                                            } else {
                                                eventBus.emit("dlc.run");
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
                ConfigField({
                    label: h([
                        [
                            "button",
                            {
                                class: "dlc-btn",
                                $click: ({ target }) => {
                                    if (target.innerText !== "定时结束") return;
                                    const { stopTime } = config;
                                    const timeStamp = Date.parse(new Date(stopTime));
                                    let timeRemain = timeStamp - new Date().getTime();
                                    target.innerText = formatTime(parseInt(timeRemain / 1000));
                                    const stopTimer = () => {
                                        setTimeout(() => {
                                            if (timeRemain > 0) {
                                                timeRemain = timeStamp - new Date().getTime();
                                                target.innerText = formatTime(
                                                    parseInt(timeRemain / 1000),
                                                );
                                                stopTimer();
                                            } else {
                                                eventBus.emit("dlc.stop");
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
        CollapseField(
            "远程弹幕库",
            [
              ConfigField({
          label: h([
            "加载远程弹幕库:",
            [
              "button",
              {
                class: "dlc-btn",
                $click: ({ target }) => {
                  if (target.innerText !== "更新") return;
                  target.innerText = "更新中...";
                  const { remoteDanmakuBase } = config;
                  const urlList = remoteDanmakuBase
                    .split("\n")
                    .map((it) => it.trim())
                    .filter(Boolean);
                  const queued = new Set();
                  const allRemoteUrl = new Set();
                  const loaded = [];
                  const loadFinish = () => {
                    eventBus.emit("setRef.remoteDanmakuConfig", loaded);
                    target.innerText = "更新";
                    Toast(
                      h(
                        "pre",
                        { style: { color: "blue" } },
                        refs.remoteDanmakuConfig
                          .map((data) => data.error || `${data.name || "匿名弹幕库"}: ${data.list.length}条`)
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
                eventBus.on("setRef.remoteDanmakuConfig", ({ detail }) => {
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
        h([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                localStorage.setItem("duluncheCfg", JSON.stringify(config));
                Toast("保存成功");
              },
            },
            "保存配置",
          ],
        ]),
        h([
          [
            "button",
            {
              class: "dlc-btn",
              $click: () => {
                modManager();
              },
            },
            "MOD管理",
          ],
        ]),
      ],
      (el) => {
        refs.configFieldContainer = el;
      },
    ],
  ]);

  // 默认悬浮窗
  let tip = false;
  const suspension = h(
    "div",
    {
      class: "dlc-suspension",

      $click: () => {
        refs.duluncheWnd.style.setProperty("display", "block");
        if (!tip) {
          tip = true;
          refineJson = getJSON();
          Toast(`多句转轮模式每句之间请用回车分隔，为了自己的账号，建议发言间隔调至8000以上;${refineJson.announcement}`);
        }
      },
    },
    "初始化中...",
    (el) => {
      eventBus.on(
        "dlc.ready",
        () => {
          el.textContent = "独轮车控制台";
        },
        { once: true },
        "dlc.ready.default",
      );
    },
  );

  window.dulunche = {
    version,
    config: new Proxy(config, {
      set(_, p, value) {
        eventBus.emit(`setConfig.${p}`, value);
      },
    }),
    eventBus,
    refs,
    components: {
      Toast,
      ConfigField,
      h,
    },
  };

  if (config.modList) {
    try {
      config.modList.forEach((_mod) => {
        if (_mod.activate) {
          eval(_mod.mod);
        }
      });
    } catch (e) {
      console.error(e);
      Toast("扩展脚本运行失败，错误信息已输出到控制台");
    }
  }

  const init = async () => {
    let result;
    try {
      result = await refs.init();
    } catch (_) {
      // noop
    }
    if (result !== true) {
      setTimeout(() => init(), 1000);
    } else {
      eventBus.emit("dlc.ready");
    }
  };
  init();
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
      if (sendBtn) refs.sendBtn = sendBtn;
      if (chatTxtInput) refs.chatTxtInput = chatTxtInput;
    } catch (_) {
      // noop
    }
  }, 60000);

  document.body.appendChild(suspension);
  document.body.appendChild(refs.duluncheWnd);

  document.body.appendChild(
    h(
      "style",
      {},
      `
    .dlc-cmd {
    background: #FFFFFF;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 998;
    position: fixed;
    padding:5px;
    width: 290px;
    height: 510px;
    box-sizing: content-box;
    border: 1px solid #ff921a;
    border-radius: 5px;
    right: 10px;
    top: 30%;
    display: none;
    }

    .dlc-titlebar {
    user-select: none;
    background-color: #fb5;
    }

    .dlc-close-btn {
    display: inline-block;
    margin-top: 3px;
    position: relative;
    text-align: center;
    width: 19px;
    height: 19px;
    color: white;
    cursor: pointer;
    float: right;
    margin-right: 5px;
    background-color: black;
    border: gray 1px solid;
    line-height: 21px;
    }
    .dlc-btn {
    display: inline-block;
    background: #f70;
    color: #FFFFFF;
    min-width: 70px;
    height: 24px;
    margin: 2px;
    }

    .dlc-suspension {
    background: #1A59B7;
    color:#ffffff;
    overflow: hidden;
    z-index: 997;
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
    background: lightgrey;
    padding: 16px;
    border: gray 1px solid;
    }

    .dlc-alert {
    max-height: 90vh;
    max-width: 60vw;
    overflow: auto;
    background: lightgrey;
    padding: 16px;
    border: gray 1px solid;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    }
    .dlc-mod-mgr {
      max-height: 140vh;
      max-width: 150vw;
      overflow: auto;
      background: lightgrey;
      padding: 16px;
      border: gray 1px solid;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .help-icon::after {
    content: '?';
    margin-right: 4px;
    display: inline-block;
    background-color: #ddd;
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
    `,
    ),
  );

  refs.helpContent = [
    [
      "button",
      {
        class: "dlc-btn",
        $click: () => {
          Toast("老版独轮车扩展脚本已经迁移到MOD管理, 并且会在未来版本中删除");
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
}
