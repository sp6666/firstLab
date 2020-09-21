var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Config"),
    a = require("../../utils/ApiUtils"),
    s = require("../../utils/ShaderUtils"),
    c = require("../../component/UrlLoad"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.pickServerLable = null;
            e.stateImg = null;
            e.sImgs = [];
            e.nodeEnter = null;
            e.lblVersion = null;
            e.nodeAccount = null;
            e.nodeRepair = null;
            e.nodeKefu = null;
            e.banhao = null;

            e.d4 = null;
            e.logo3 = null;
            e.logoGongtingmizhuan = null;
            e.logoZijinfanhua = null;

            e.gtmzUrl = null;
            return e;
        }
        e.prototype.onLoad = function () {

            if (r.Config.zone != "china") {
                this.node.active = false;
                return;
            }

            n.utils._isExit = !1;
            n.utils.setCanvas();
            var t = cc.sys.localStorage.getItem("SYS_LANGUAGE");
            t && "zh-ch" != t && (r.Config.lang = t);
            i18n.init(r.Config.lang);
            cc.sys.localStorage.setItem("SYS_LANGUAGE", r.Config.lang);
            new i.Initializer().init();
            n.utils.setWaitUI();
            i.loginProxy.sendServerList();
            l.uiUtils.scaleRepeat(this.nodeEnter, 0.95, 1.05);
            facade.subscribe(
                i.loginProxy.LOGIN_PICK_SERVER,
                this.update_PickUp,
                this
            );
            this.lblVersion.string = "v" + r.Config.version;
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
            this.defaultLoginAccount();
            this.nodeAccount.active = !r.Config.isHideChangeAccount();
            this.nodeRepair.active = cc.sys.isMobile;
            this.nodeAccount.active &&
                !this.nodeRepair.active &&
                (this.nodeAccount.y = this.nodeRepair.y);
            this.nodeKefu.active = !n.stringUtil.isBlank(r.Config.freebackUrl);
            if (n.stringUtil.isBlank(r.Config.logo))
                this.scheduleOnce(this.showLogo, 2.5);
            else {

            }
            this.banhao.active = r.Config.isShowBanhao;

            this.showUIByLang();
            //this.showUIByPf();
            this.checkNotice();
        };
        e.prototype.showUIByLang = function () {

            var self = this;
            n.utils.showSpine(this.d4, "ruchang", false, function () {
                n.utils.showSpine(self.d4, "idle", true);
            });
            n.utils.showSpine(this.logo3, "ruchang", false, function () {
                n.utils.showSpine(self.logo3, "idle", true);
            });

            this.gtmzUrl.node.active = false;
            //按平台显示文字
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                this.logoZijinfanhua.node.active = false;
                //宫廷秘传
                this.logoGongtingmizhuan.node.active = true;
                n.utils.showSpine(this.logoGongtingmizhuan, "ruchang", false, function () {
                    n.utils.showSpine(self.logoGongtingmizhuan, "idle", true);
                });

                if (!n.stringUtil.isBlank(r.Config.logo)) {
                    this.logoGongtingmizhuan.node.active = false;
                    this.gtmzUrl.node.active = true;
                    this.gtmzUrl.url = l.uiHelps.getLogo();
                }
            } else {
                this.logoGongtingmizhuan.node.active = false;
                //紫禁繁花
                this.logoZijinfanhua.node.active = true;
                s.shaderUtils.setBright(this.logoZijinfanhua, 0.01, 0.005, 0.1);
            }
        };

        e.prototype.showUIByPf = function () {

        };

        e.prototype.showLogo = function () {
            //s.shaderUtils.setBright(this.logo, 0.01, 0.005, 0.1);
        };
        e.prototype.defaultLoginAccount = function () {
            if (!r.Config.login_by_sdk) {
                var t =
                    i.loginProxy.accountList.length > 0 ?
                    i.loginProxy.accountList[0] :
                    null;
                t
                    ?
                    i.loginProxy.login(t.account, t.password) :
                    i.loginProxy.login(
                        "test" + Math.ceil(1e6 * Math.random()),
                        "123456"
                    );
            }
        };
        e.prototype.inGameBtn = function () {
            if (
                null != i.loginProxy.quList &&
                0 != i.loginProxy.quList.length &&
                null != i.loginProxy.pickServer
            ) {
                if (!this.isEnterGame) {
                    this.scheduleOnce(this.cancelEnterGame, 3);
                    this.isEnterGame = !0;
                    r.Config.login_by_sdk &&
                        n.stringUtil.isBlank(r.Config.token) ?
                        a.apiUtils.startLoginTo_sdk() :
                        i.loginProxy.sendInGame();
                }
            } else n.alertUtil.alert(i18n.t("LOGIN_SERVER_DELAY"));
        };
        e.prototype.cancelEnterGame = function () {
            this.isEnterGame = !1;
        };
        e.prototype.changeAccountBtn = function () {
            r.Config.login_by_sdk ?
                a.apiUtils.loginOut_sdk() :
                n.utils.openPrefabView("login/loginview");
        };
        e.prototype.customerBtn = function () {
            n.utils.openPrefabView("");
        };
        e.prototype.serverListBtn = function () {
            n.utils.openPrefabView("login/serverListView");
        };
        e.prototype.update_PickUp = function () {
            var t = i.loginProxy.pickServer;
            this.pickServerLable.string = t.name;
            this.stateImg.spriteFrame = this.sImgs[t.state - 1];
            r.Config.isAutoLogin && this.inGameBtn();
        };
        e.prototype.onClick = function (t) {
            l.clickEffectUtils.showEffect(t);
            n.audioManager.playClickSound();
        };
        e.prototype.onClickRepair = function () {
            var t =
                (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") +
                "update-assets",
                e = r.Config.lang;
            "zh-ch" != e
                ?
                n.langManager.loadMainifest(e, function (e) {
                    n.utils.showConfirm(
                        i18n.t("LOGIN_REPAIR_TIP"),
                        function () {
                            if (jsb.fileUtils.isDirectoryExist(t)) {
                                jsb.fileUtils.removeDirectory(t);
                                n.langManager.clearLang(e);
                            }
                            cc.game.restart();
                        },
                        null,
                        null,
                        i18n.t("LOGIN_CLIENT_REPAIR")
                    );
                }) :
                n.utils.showConfirm(
                    i18n.t("LOGIN_REPAIR_TIP"),
                    function () {
                        jsb.fileUtils.isDirectoryExist(t) &&
                            jsb.fileUtils.removeDirectory(t);
                        cc.game.restart();
                    },
                    null,
                    null,
                    i18n.t("LOGIN_CLIENT_REPAIR")
                );
        };
        e.prototype.onClickKefu = function () {
            n.utils.openPrefabView("Web", !1, {
                url: r.Config.freebackUrl
            });
        };
        e.prototype.onClickShowRelogin = function(e, t) {
            if(i.loginProxy.reloginIndex < i.loginProxy.reloginarray.length)
            {
                if(i.loginProxy.reloginarray[i.loginProxy.reloginIndex] == t)
                {
                    i.loginProxy.reloginIndex++;
                }
            }
            if(i.loginProxy.reloginIndex == i.loginProxy.reloginarray.length)
            {
                i.loginProxy.reloginIndex = 0;
                n.utils.openPrefabView("login/reloginView");
            }
            
        };

        e.prototype.checkNotice = function() {
            if(r.Config.welcome_message != null && r.Config.welcome_message != "") {
                n.utils.openPrefabView("NoticeViewInLoading");
            }
        }
        __decorate([u(cc.Label)], e.prototype, "pickServerLable", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "stateImg", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "sImgs", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeEnter", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblVersion", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeAccount", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeRepair", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeKefu", void 0);
        __decorate([u(cc.Node)], e.prototype, "banhao", void 0);

        __decorate([u(sp.Skeleton)], e.prototype, "d4", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "logo3", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "logoGongtingmizhuan", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "logoZijinfanhua", void 0);

        __decorate([u(c.default)], e.prototype, "gtmzUrl", void 0);


        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;