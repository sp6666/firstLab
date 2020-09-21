var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/ApiUtils"),
    a = require("../../Config"),
    s = require("../story/StoryView"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lbl = null;
            e.progress = null;
            e.dbList = [
                "clothequality",
                "chuidiao",
                "chenghao",
                "chengjiu",
                "club",
                "dailyrwd",
                "guan",
                "guidesay",
                "guide",
                "guozijian",
                "hanlin",
                "help",
                "hero",
                "hunt",
                "iconopen",
                "item",
                "boite",
                "pve",
                "qiandao",
                "school",
                "silkroad",
                "soncareer",
                "son",
                "taofa",
                "task",
                "xuanxiang",
                "user",
                "vip",
                "wife",
                "wordboss",
                "xunfang",
                "yamen",
                "zw",
                "param",
                "heropve",
                "email",
                "jyevent",
                "story2",
                "story3",
                "story4",
                "battledialo",
                "lunzhan",
                "jybase",
                "kitchen",
                "treasure",
                "zwevent",
                "prisoner",
                "qihuan",
                "practice",
                "tips",
                "yingyuan",
                "talk",
                "shengyin",
                "story5",
                "power",
                "lv",
                "story6",
                "clothepve",
                "monday",
                "flower",
                "flowerFriend",
                "exam",
                "worldtree",
                "treecoor",
                "dafuweng",
                "liondance",
                "chungeng",
                "activityduanwu",
                "reqiqiu",
                "haoyou",
                "zhongyuan",
                "bishu",
                "startingschool",
                "mingyue",
                "thanksGiving",
                "lover",
                "kite",
                "confidante",
                "xiuyun",
                "hongbaopos",
                "hongbaowords",
                "fund",
                "sevenday",
                "xixiang"
            ];
            e.loadList = [];
            e.loadCount = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            n.utils.setCanvas();
            this.loadList = [
                this.loadDb,
                this.loadRoleData,
                this.loadScene,
                this.loadCompleted
            ];
            this.newMethod();
            localcache.init({}, localdb.KEYS);
            facade.subscribe("USER_DATA_OVER", this.onRoleData, this);
            facade.subscribe("SHOW_RETRY_SEND", this.onRetrySend, this);
            n.utils.clearLayer();
            this.next();
            cc.sys.isMobile ?
                this.node.parent.on(
                    cc.Node.EventType.TOUCH_START,
                    this.onClick,
                    this,
                    !0
                ) :
                this.node.parent.on(
                    cc.Node.EventType.MOUSE_DOWN,
                    this.onClick,
                    this,
                    !0
                );
        };
        e.prototype.newMethod = function () {
            this.loadCount = this.loadList.length;
        };
        e.prototype.loadDb = function () {
            if (i.playerProxy.userData) this.next();
            else {
                var t = this;
                if (0 != this.dbList.length) {
                    var e = this.dbList.shift();
                    n.stringUtil.isBlank(e) ?
                        this.next() :
                        cc.loader.loadRes(l.uiHelps.getDataUrl(e), function (
                            o,
                            i
                        ) {
                            if (null != i && null == o) {
                                localcache.addData(i);
                                t.loadDb();
                            } else {
                                cc.log(o.toString());
                                t.loadDb();
                            }
                            n.utils.releaseAsset(l.uiHelps.getDataUrl(e));
                        });
                } else this.next();
            }
        };
        e.prototype.loadRoleData = function () {
            i.playerProxy.userData ? this.next() : i.loginProxy.getPlayerInfo();
        };
        e.prototype.onRoleData = function () {
            this.next();
        };
        e.prototype.loadScene = function () {
            var t = i.playerProxy.userData ? i.playerProxy.userData.name : "",
                e = this;
            n.stringUtil.isBlank(t) ?
                cc.director.preloadScene("CreateScene", function () {
                    e.next();
                }) :
                cc.director.preloadScene("MainScene", function () {
                    e.next();
                });
        };
        e.prototype.checkStory = function () {
            var t = i.timeProxy.getLoacalValue("StoryId"),
                e = i.playerProxy.getFirstStoryId();
            (n.stringUtil.isBlank(t) || t == e) &&
            i.playerProxy.guide.gnew < 1 &&
                i.playerProxy.addStoryId(e);
        };
        e.prototype.loadCompleted = function () {
            if (null != i.playerProxy.userData) {
                var t = i.playerProxy.userData ?
                    i.playerProxy.userData.name :
                    "";
                if (n.stringUtil.isBlank(t))
                    cc.director.loadScene("CreateScene");
                else {
                    this.checkStory();
                    var e = i.timeProxy.getLoacalValue("SYS_MUSIC"),
                        o = i.timeProxy.getLoacalValue("SYS_SOUND"),
                        l = i.timeProxy.getLoacalValue("SYS_ACTION"),
                        c = i.timeProxy.getLoacalValue("SYS_SOUND_BLANK"),
                        _ = i.timeProxy.getLoacalValue("SYS_SOUND_ROLE"),
                        d = i.timeProxy.getLoacalValue("SYS_SOUND_NPC"),
                        fe = i.timeProxy.getLoacalValue("SYS_FlowerEffect"),
                        ms = i.timeProxy.getLoacalValue("SYS_MainCity"),
                        u = i.timeProxy.getLoacalValue("STORY_AUTO_PLAYER");
                    n.audioManager.setSoundOff(null != e && 0 == parseInt(e));
                    n.audioManager._isSayOff = null != o && 0 == parseInt(o);
                    n.audioManager._isBlank = null != c && 0 == parseInt(c);
                    n.audioManager._isNpc = null != d && 0 == parseInt(d);
                    n.audioManager._isRole = null != _ && 0 == parseInt(_);
                    a.Config.main_tuoluo_action = null != l && 1 == parseInt(l);
                    s.default.isAutoPlay = null != u && 1 == parseInt(u);
                    i.flowerFriendProxy.isShowEffect = null == fe || 1 == parseInt(fe);
                    i.playerProxy.checkMainCityMode(ms);
                    cc.director.loadScene("MainScene");
                    r.apiUtils.loginSuccess();
                }
            } else n.alertUtil.alert18n("CLUB_NO_DATA");
        };
        e.prototype.next = function () {
            var t = this.loadCount - this.loadList.length,
                e = i18n.t("PRELOAD_" + t);
            this.lbl.string = e;
            this.progress.progress = (t + 1) / this.loadCount;
            this.loadList.shift().call(this);
        };
        e.prototype.onClick = function (t) {
            l.clickEffectUtils.showEffect(t);
            n.audioManager.playClickSound();
        };
        e.prototype.onRetrySend = function () {
            n.utils.showSingeConfirm(
                i18n.t("LOGIN_SERVER_DELAY"),
                function () {
                    JsonHttp.sendLast();
                },
                null,
                null,
                i18n.t("COMMON_RETRY")
            );
        };
        __decorate([d(cc.Label)], e.prototype, "lbl", void 0);
        __decorate([d(cc.ProgressBar)], e.prototype, "progress", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;