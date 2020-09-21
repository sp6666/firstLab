var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../Config"),
    r = require("../../utils/ApiUtils"),
    a = require("../user/UserHeadItem"),
    s = require("../../component/List"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblId = null;
            e.lblSer = null;
            e.music = null;
            e.flowerEffect = null;
            e.sound = null;
            e.action = null;
            e.actionNode = null;
            e.nodeLang = null;
            e.nodeAct = null;
            e.nodeUserCenter = null;
            e.nodeServer = null;
            e.nodeSet = null;
            e.nodeCdk = null;
            e.nodeMainCity = null;
            e.btns = [];
            e.editBox = null;
            e.nodeGG = null;
            e.nodeSound = null;
            e.blank = null;
            e.role = null;
            e.npc = null;
            e.userHead = null;
            e.lblLang = null;
            e.list = null;
            e.nodeChange = null;
            e.nodeCom = null;
            e.nodeSS = null;
            e.langData = null;
            e.mainCityToggles = [];
            e.ndMainCityOnUse = [];
            e.nodeKeFu = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.editBox.placeholder = i18n.t("COMMON_INPUT_TXT");
            this.lblName.string = i.playerProxy.userData.name;
            this.lblId.string = i.playerProxy.userData.uid + "";
            this.lblSer.string = i.loginProxy.pickServer.name;



            var t = i.timeProxy.getLoacalValue("SYS_MUSIC"),
                e = i.timeProxy.getLoacalValue("SYS_SOUND"),
                o = i.timeProxy.getLoacalValue("SYS_ACTION"),
                n = i.timeProxy.getLoacalValue("SYS_SOUND_BLANK"),
                r = i.timeProxy.getLoacalValue("SYS_SOUND_ROLE"),
                fe = i.timeProxy.getLoacalValue("SYS_FlowerEffect"),
                a = i.timeProxy.getLoacalValue("SYS_SOUND_NPC");

            this.music.isChecked = null == t || 1 == parseInt(t);
            this.sound.isChecked = null == e || 1 == parseInt(e);
            this.action.isChecked = null == o || 1 == parseInt(o);

            this.flowerEffect.isChecked = null == fe || 1 == parseInt(fe);

            this.blank.isChecked =
                (null == n || 1 == parseInt(n)) && this.sound.isChecked;
            this.role.isChecked =
                (null == r || 1 == parseInt(r)) && this.sound.isChecked;
            this.npc.isChecked =
                (null == a || 1 == parseInt(a)) && this.sound.isChecked;
            this.nodeAct.active = !l.Config.isHideChangeAccount();
            this.nodeUserCenter.active = l.Config.isOpenUserCenter;
            this.nodeServer.active = !this.nodeAct.active;
            this.onSoundOver();
            this.onClickTab(null, 1);
            this.nodeLang.active = l.Config.showLang || l.Config.DEBUG;
            this.nodeGG.active =
                i.timeProxy.noticeMsg && i.timeProxy.noticeMsg.length > 0;
            this.lblLang.string = i18n.t("COMMON_" + l.Config.lang);
            this.list.node.active = !1;
            this.nodeChange.scaleX = 1;
            facade.subscribe(
                i.playerProxy.PLAYER_UPDATE_HEAD,
                this.updateHead,
                this
            );
            facade.subscribe("SOUND_DOWN_LOAD_OVER", this.onSoundOver, this);
            facade.subscribe(
                i.playerProxy.PLAYER_USER_UPDATE,
                this.updateName,
                this
            );

            this.updateMainCityNode();

            this.nodeKeFu.active = i.loginProxy.getKefuUrl() != "";
        };
        e.prototype.updateMainCityNode = function () {

            this._mainCityMode = i.playerProxy._mainCityMode;

            if (this._mainCityMode === 'default') {
                this.mainCityToggles[0].isChecked = true;
                this.mainCityToggles[1].isChecked = false;

                this.ndMainCityOnUse[0].active = true;
                this.ndMainCityOnUse[1].active = false;
            } else {
                this.mainCityToggles[0].isChecked = false;
                this.mainCityToggles[1].isChecked = true;

                this.ndMainCityOnUse[1].active = true;
                this.ndMainCityOnUse[0].active = false;
            }
        };
        e.prototype.updateName = function () {
            this.lblName.string = i.playerProxy.userData.name;
        };
        e.prototype.onSoundOver = function () {
            this.nodeSound.active =
                n.audioManager.isNeedDown() && l.Config.isShowMonthCard;
            this.nodeGG.x = this.nodeSound.active ? this.nodeGG.x : 0;
            this.nodeSound.x = this.nodeGG.active ? this.nodeSound.x : 0;
        };
        e.prototype.updateHead = function () {
            this.userHead.updateUserHead();
        };
        e.prototype.onClickTab = function (t, e) {
            for (var o = parseInt(e) - 1, i = 0; i < this.btns.length; i++) {
                this.btns[i].interactable = i != o;
                2 == i && (this.btns[2].node.active = l.Config.isShowMonthCard);
            }
            this.nodeSet.active = 0 == o;
            this.nodeSS.active = 1 == o;
            this.nodeCom.active = 0 == o || 1 == o;
            this.nodeCdk.active = 2 == o;
            this.nodeMainCity.active = 3 == o;
        };
        e.prototype.onClickDui = function () {
            var t = this.editBox.string;
            n.stringUtil.isBlank(t.trim()) ?
                n.alertUtil.alert18n("SYS_CDK_NULL") :
                i.timeProxy.sendCDK(t);
        };
        e.prototype.onClickChange = function (t, e) {
            var o = this;
            n.utils.showConfirm(
                i18n.t(
                    2 == parseInt(e) ?
                    "SYS_CHANGE_SERVER_CONFIRM" :
                    "SYS_CHANGE_CONFIRM"
                ),
                function () {
                    n.utils.closeView(o);
                    i.loginProxy.loginOut();
                }
            );
        };
        e.prototype.onClickUserCenter = function () {
            r.apiUtils.open_user_center();
        };
        e.prototype.onClickMusic = function () {
            n.audioManager.setSoundOff(!this.music.isChecked);
            i.timeProxy.saveLocalValue(
                "SYS_MUSIC",
                this.music.isChecked ? "1" : "0"
            );
        };
        e.prototype.onClickFlowerEffect = function () {
            i.flowerFriendProxy.isShowEffect = this.flowerEffect.isChecked;
            i.timeProxy.saveLocalValue(
                "SYS_FlowerEffect",
                this.flowerEffect.isChecked ? "1" : "0"
            );
        };
        e.prototype.onClickSound = function (t) {
            void 0 === t && (t = !0);
            n.audioManager._isSayOff = !this.sound.isChecked;
            i.timeProxy.saveLocalValue(
                "SYS_SOUND",
                this.sound.isChecked ? "1" : "0"
            );
            if (n.audioManager._isSayOff && t) {
                this.blank.isChecked = this.npc.isChecked = this.role.isChecked = !1;
                n.audioManager._isBlank = n.audioManager._isNpc = n.audioManager._isRole = !0;
            } else if (t) {
                var e = i.timeProxy.getLoacalValue("SYS_SOUND_BLANK"),
                    o = i.timeProxy.getLoacalValue("SYS_SOUND_ROLE"),
                    l = i.timeProxy.getLoacalValue("SYS_SOUND_NPC");
                this.blank.isChecked = null == e || 1 == parseInt(e);
                this.role.isChecked = null == o || 1 == parseInt(o);
                this.npc.isChecked = null == l || 1 == parseInt(l);
                n.audioManager._isNpc = !this.npc.isChecked;
                n.audioManager._isBlank = !this.blank.isChecked;
                n.audioManager._isRole = !this.role.isChecked;
            }
        };
        e.prototype.onClickAction = function () {
            l.Config.main_tuoluo_action = this.action.isChecked;
            i.timeProxy.saveLocalValue(
                "SYS_ACTION",
                this.action.isChecked ? "1" : "0"
            );
            facade.send("MAIN_SET_ACTION_CHANGE");
        };
        e.prototype.onClickOpen = function (t, e) {
            n.utils.openPrefabView(e);
        };
        e.prototype.onClickBlack = function (t) {
            void 0 === t && (t = !0);
            n.audioManager._isBlank = !this.blank.isChecked;
            i.timeProxy.saveLocalValue(
                "SYS_SOUND_BLANK",
                this.blank.isChecked ? "1" : "0"
            );
            t && this.updateSound();
        };
        e.prototype.onClickNpc = function (t) {
            void 0 === t && (t = !0);
            n.audioManager._isNpc = !this.npc.isChecked;
            i.timeProxy.saveLocalValue(
                "SYS_SOUND_NPC",
                this.npc.isChecked ? "1" : "0"
            );
            t && this.updateSound();
        };
        e.prototype.onClickRole = function (t) {
            void 0 === t && (t = !0);
            n.audioManager._isRole = !this.role.isChecked;
            i.timeProxy.saveLocalValue(
                "SYS_SOUND_ROLE",
                this.role.isChecked ? "1" : "0"
            );
            t && this.updateSound();
        };
        e.prototype.updateSound = function () {
            if (
                !n.audioManager._isBlank ||
                !n.audioManager._isNpc ||
                !n.audioManager._isRole
            ) {
                var t = this.sound.isChecked;
                this.sound.isChecked = !0;
                this.onClickSound(!t);
            }
        };
        e.prototype.onClickRename = function () {
            var t = i.bagProxy.getItemCount(1);
            n.utils.showConfirmInput(
                i18n.t("USER_RENAME_CONFIRM", {
                    v: 100
                }),
                function (e) {
                    t < 100 ?
                        n.alertUtil.alertItemLimit(1) :
                        n.stringUtil.isBlank(e) ?
                        n.alertUtil.alert18n("CREATE_IS_LIMIT") :
                        e != i.playerProxy.userData.name ?
                        i.playerProxy.sendResetName(e) :
                        n.alertUtil.alert18n("CLUB_NAME_USERED");
                }
            );
        };
        e.prototype.onClickClost = function () {
            n.utils.closeView(this);
        };
        e.prototype.onClickDown = function () {
            facade.send("DOWNLOAD_SOUND");
        };
        e.prototype.onClickKeFu = function() {
            //客服链接
            var url = i.loginProxy.getKefuUrl();
            if(!n.stringUtil.isBlank(url))
            {
                cc.sys.openURL(url);
            }
            //cc.sys.openURL("http://platform.cdn.xianyugame.com/website/games/gtmz/html/index.html");
        };
        e.prototype.onToggleMainCity = function (t, e) {
            this._mainCityMode = e;
        };
        e.prototype.onClickMainCitySet = function () {

            if (i.playerProxy._mainCityMode != this._mainCityMode) {


                var o = this;
                n.utils.showConfirm(
                    i18n.t(
                        "SYS_CHANGE_CITY_MODE_CONFIRM"
                    ),
                    function () {

                        i.playerProxy._mainCityMode = o._mainCityMode;
                        //facade.send('changeCityMode');
                        i.timeProxy.saveLocalValue(
                            "SYS_MainCity",
                            i.playerProxy._mainCityMode
                        );

                        n.utils.closeView(o);
                        i.loginProxy.loginOut();
                    }
                );
            } else {
                n.alertUtil.alert18n("MAIN_CITY_UESD_TIP");
            }
        };

        e.prototype.onClickLang = function () {
            this.nodeChange.scaleY *= -1;
            if (null == this.langData) {
                this.langData = [];
                this.langData.push({
                    account: i18n.t("COMMON_zh-ch"),
                    lang: "zh-ch"
                });
                this.langData.push({
                    account: i18n.t("COMMON_tw"),
                    lang: "tw"
                });
                if (l.Config.changeLang && l.Config.changeLang.length > 0)
                    for (var t = 0; t < l.Config.changeLang.length; t++) {
                        var e = l.Config.changeLang[t];
                        this.langData.push({
                            account: i18n.t("COMMON_" + e),
                            lang: e
                        });
                    }
                this.list.data = this.langData;
            }
            this.list.node.active = -1 == this.nodeChange.scaleY;
        };
        e.prototype.onClickSelectLang = function (t, e) {
            var o = e.data;
            l.Config.DEBUG ?
                n.utils.showConfirm(
                    i18n.t("SYS_CHANGE_LANG_CONFIRM"),
                    function () {
                        l.Config.lang = o.lang;
                        cc.sys.localStorage.setItem("SYS_LANGUAGE", o.lang);
                        i.loginProxy.loginOut();
                    }
                ) :
                o &&
                o.lang != l.Config.lang &&
                facade.send("DOWNLOAD_LANG", o.lang);
        };
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblId", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblSer", void 0);
        __decorate([d(cc.Toggle)], e.prototype, "music", void 0);
        __decorate([d(cc.Toggle)], e.prototype, "sound", void 0);
        __decorate([d(cc.Toggle)], e.prototype, "action", void 0);
        __decorate([d(cc.Toggle)], e.prototype, "flowerEffect", void 0);
        __decorate([d(cc.Node)], e.prototype, "actionNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeLang", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeAct", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeUserCenter", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeServer", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeSet", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeCdk", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeMainCity", void 0);
        __decorate([d([cc.Button])], e.prototype, "btns", void 0);
        __decorate([d(cc.EditBox)], e.prototype, "editBox", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeGG", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeSound", void 0);
        __decorate([d(cc.Toggle)], e.prototype, "blank", void 0);
        __decorate([d(cc.Toggle)], e.prototype, "role", void 0);
        __decorate([d(cc.Toggle)], e.prototype, "npc", void 0);
        __decorate([d(a.default)], e.prototype, "userHead", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblLang", void 0);
        __decorate([d(s.default)], e.prototype, "list", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeChange", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeCom", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeSS", void 0);
        __decorate([d([cc.Toggle])], e.prototype, "mainCityToggles", void 0);
        __decorate([d([cc.Node])], e.prototype, "ndMainCityOnUse", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeKeFu", void 0);  //客服按钮
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;