var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Config"),
    n = require("../utils/Utils"),
    l = require("../Initializer"),
    r = require("../component/GetEffectItem"),
    a = require("../component/RedDot"),
    s = require("../component/RedDotShow"),
    c = require("../views/bag/BagServantSelect"),
    _ = require("../views/kitchen/KitFoodShow"),
    d = function() {};
o.Account = d;
var u = (function() {
    function t() {
        this.min = 99999;
        this.max = 0;
        this.name = "";
    }
    t.prototype.sort = function() {
        this.list.sort(function(t, e) {
            return e.id - t.id;
        });
    };
    return t;
})();
o.ServerQuList = u;
var p = (function() {
    function t() {
        this.LOGIN_SERVER_LIST = "LOGIN_SERVER_LIST";
        this.LOGIN_PICK_SERVER = "LOGIN_PICK_SERVER";
        this.LOGIN_CLOST_LOGIN = "LOGIN_CLOST_LOGIN";
        this.LOGIN_OPEN_NOTICE = "LOGIN_OPEN_NOTICE";
        this.LOGIN_ROLE_LIST = "LOGIN_ROLE_LIST";
        this.sList = null;
        this.isLoadPreload = !1;
        this.reloginarray = [1,1,2,1,2];
        this.reloginIndex = 0;
    }
    t.prototype.ctor = function() {
        JsonHttp.subscribe(
            proto_sc.system.server_list,
            this.onServerList,
            this
        );
        JsonHttp.subscribe(
            proto_sc.system.unopen_notice,
            this.onOpenNotice,
            this
        );
        JsonHttp.subscribe(
            proto_sc.loginMod.loginAccount,
            this.onAccountData,
            this
        );
        JsonHttp.subscribe(proto_sc.role.rolelist, this.onRoleList, this);
        JsonHttp.subscribe(
            proto_sc.system.unconn_notice,
            this.onUnconnNotice,
            this
        );
        this._pickId = 0;
    };
    t.prototype.clearData = function() {
        this.isLoadPreload = !1;
        this.openNotice = null;
        this.quList = null;
        this.roleList = null;
        this.reloginarray = [1,1,2,1,2];
        this.reloginIndex = 0;
    };
    t.prototype.getServer = function(t) {
        return this.listObj[t];
    };
    Object.defineProperty(t.prototype, "pickServer", {
        get: function() {
            return this.listObj[this._pickId];
        },
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "accountList", {
        get: function() {
            if (null == this._accountList) {
                this._accountList = new Array();
                var t = cc.sys.localStorage.getItem("AccountList");
                this._accountList =
                    null != t && "" != t ? JSON.parse(t) : new Array();
            }
            return this._accountList;
        },
        enumerable: !0,
        configurable: !0
    });
    t.prototype.onOpenNotice = function(t) {
        this.openNotice = t;
        if (!n.stringUtil.isBlank(this.openNotice[0].body)) {
            l.timeProxy.noticeMsg = this.openNotice;
            n.utils.openPrefabView("NoticeView");
        }
    };
    t.prototype.onServerList = function(t) {
        var e = this,
            o = 1;
        this.myList = [];
        this.lastList = [];
        this.quList = [];
        this.listObj = new Map();
        t.forEach(function(t) {
            var n = t.name.split("|"),
                l = null;
            if (n.length > 1) {
                t.name = n[1];
                l = i.Config.isNewServerList
                    ? e.getQuName(n[0], t.id)
                    : e.getQu(t.id);
            } else l = e.getQu(t.id);
            l.list.push(t);
            e.myList.push(t);
            e.listObj[t.id] = t;
            o = t.id > o ? t.id : o;
        });
        this.quList.sort(function(t, e) {
            return e.max - t.max;
        });
        this.myList.sort(function(t, e) {
            return e.id - t.id;
        });
        this.quList.forEach(function(t) {
            t.sort();
        });
        var n = cc.sys.localStorage.getItem("ServerList"),
            l = null != n && "" != n ? JSON.parse(n) : [];
        0 == l.length && l.push(o);
        o = this.listObj[l[0]] ? l[0] : o;
        this.pick(o);
        for (var r = 0; r < l.length; r++)
            this.listObj[l[r]] && this.lastList.push(this.listObj[l[r]]);
        facade.send(this.LOGIN_SERVER_LIST);
    };
    t.prototype.onAccountData = function(t) {
        i.Config.uid = t.uid;
        i.Config.token = t.token;
        i.Config.backurl = t.backurl;
        i.Config.gamename = t.gamename;
        i.Config.parm1 = t.num1;
        if (!this.isLoadPreload) {
            this.isLoadPreload = !0;
            cc.director.loadScene("PreloadScene");
        }
    };
    t.prototype.addAccountList = function(t, e) {
        var o = this.accountList,
            i = new d(),
            n = [];
        i.account = t;
        i.password = e;
        n.push(i);
        for (var l = 0; l < o.length; l++)
            ((i = o[l]).account == t && i.password == e) || n.push(i);
        this._accountList = n;
        cc.sys.localStorage.setItem(
            "AccountList",
            JSON.stringify(this._accountList)
        );
    };
    t.prototype.addServer = function(t) {
        var e = cc.sys.localStorage.getItem("ServerList"),
            o = null != e && "" != e ? JSON.parse(e) : [],
            i = [];
        i.push(t);
        for (var n = 0; n < o.length; n++) o[n] != t && i.push(o[n]);
        cc.sys.localStorage.setItem("ServerList", JSON.stringify(i));
    };
    t.prototype.getQuName = function(t, e) {
        var o = t.lastIndexOf(" ");
        "" != t && -1 != o && (t = t.substring(o, t.length));
        for (var i = 0; i < this.quList.length; i++)
            if (this.quList[i].name == t) return this.quList[i];
        var n = new u();
        n.min = e < n.min ? e : n.min;
        n.max = e > n.max ? e : n.max;
        n.name = t;
        n.list = new Array();
        this.quList.push(n);
        return n;
    };
    t.prototype.getQu = function(t) {
        for (var e = 0; e < this.quList.length; e++)
            if (this.quList[e].min <= t && this.quList[e].max >= t)
                return this.quList[e];
        var o = new u();
        o.min = 20 * Math.floor(t / 20) + 1;
        o.max = 20 * Math.ceil(t / 20);
        o.list = new Array();
        this.quList.push(o);
        return o;
    };
    t.prototype.onRoleList = function(t) {
        this.roleList = t;
        facade.send(this.LOGIN_ROLE_LIST);
    };
    t.prototype.onUnconnNotice = function(t) {
        null != t &&
            (t.length <= 0 ||
                (t[0].body &&
                    l.timeProxy.saveLocalAccount("UNCONN_NOTICE", t[0].body)));
    };
    t.prototype.pick = function(t) {
        if (null != this.listObj[t]) {
            this._pickId = t;
            i.Config.url = this.pickServer.url;
            i.Config.servername = this.pickServer.name;
            i.Config.serId = this.pickServer.id;
            facade.send(this.LOGIN_PICK_SERVER);
        }
    };
    t.prototype.sendServerList = function() {
        JsonHttp.getServerUrl(i.Config.serverList, i.Config.DEBUG);
        var t = l.timeProxy.getLocalAccount("CONFIG_ACCOUNT");
        if (!n.stringUtil.isBlank(t)) {
            var e =
                i.Config.pfApi +
                "existsRole.php?openid=" +
                i.Config.accountprefix +
                t +
                "&_pf=" +
                i.Config.pf;
            JsonHttp.httpRequest(e);
        }
    };
    t.prototype.sendRegister = function(t, e) {
        i.Config.account = t;
        i.Config.password = e;
        if (!i.Config.login_by_sdk) {
            var o =
                i.Config.USER_REGISTER_URL +
                "?appid=" +
                i.Config.youdong_appid +
                "&username=" +
                t +
                "&password=" +
                e +
                "&_lang=" +
                i.Config.lang;
            JsonHttp.httpRequest(
                o,
                null,
                function(t) {
                    i.Config.uid = t.data.uid;
                    i.Config.token = t.data.token;
                    n.alertUtil.alert(t.msg);
                },
                null,
                !1
            );
        }
    };
    t.prototype.login = function(t, e) {
        i.Config.account = t;
        i.Config.password = e;
        if (!i.Config.login_by_sdk) {
            var o =
                i.Config.USER_LOGIN_URL +
                "?appid=" +
                i.Config.youdong_appid +
                "&username=" +
                t +
                "&password=" +
                e +
                "&_lang=" +
                i.Config.lang;
            JsonHttp.httpRequest(
                o,
                null,
                function(t) {
                    if (t.data) {
                        i.Config.uid = t.data.uid;
                        i.Config.token = t.data.token;
                        var e =
                            i.Config.pfApi +
                            "existsRole.php?openid=" +
                            i.Config.account +
                            "&_pf=" +
                            i.Config.pf;
                        JsonHttp.httpRequest(e);
                    }
                    switch (t.status) {
                        case 0:
                            facade.send("LOGIN_CLOST_LOGIN");
                    }
                    n.alertUtil.alert(t.msg);
                },
                null,
                !1
            );
        }
    };
    t.prototype.sendInGame = function() {
        var t = new proto_cs.login.loginAccount();
        t.openid = i.Config.account;
        t.openkey = i.Config.token;
        t.platform = i.Config.pf;
        t.parm1 = i.Config.parm1;
        t.parm2 = i.Config.parm2;
        t.parm3 = i.Config.parm3;
        t.parm4 = i.Config.parm4;
        t.addicted = i.Config.addicted;
        JsonHttp.send(t, function(info) {
            // if(info.a.system.errror == "ADDICTED_PT_LIMIT" || info.a.system.errror == "ADDICTED_GAMETIME_OVER") {
            //     n.utils.showConfirm(i18n.t(info.a.system.errror), function () {
            //         l.loginProxy.loginOut();
            //     })
            // }
        }, null, !1, !1);
    };
    t.prototype.getPlayerInfo = function() {
        i.Config.login_by_sdk ||
            this.addAccountList(i.Config.account, i.Config.password);
        this.addServer(this._pickId);
        var t = new proto_cs.guide.login();
        t.platform = i.Config.pf;
        JsonHttp.send(t, function() {
            facade.send("USER_DATA_OVER");
        });
    };
    t.prototype.loginOut = function() {
        n.utils._isExit = !0;
        i.Config.token = "";
        i.Config.uid = 0;
        i.Config.account = "";
        n.utils.clearLayer();
        localcache.clearData();
        facade.eachBean("clearData");
        cc.director.loadScene("LoginScene");
        l.playerProxy.userData = null;
        return !0;
    };
    t.prototype.clearStaticData = function() {
        r.default.count = 0;
        a.default.clearData();
        s.default.clearData();
        c.default.curSelectItemId = 0;
        _.default.pers = {};
    };
    t.prototype.getKefuUrl = function() {
        if(i.Config.zone != "china" && !n.stringUtil.isBlank(i.Config.zone))
        {
            //港澳台全部显示
            return "https://www.facebook.com/zijinfanhua/?business_id=208162859877365";
        }
        
        if(cc.sys.os == cc.sys.OS_IOS)
        {
            //国内ios全部显示
            return "http://customer.zanbugames.com/website/games/gtmz/html/index.html";
        }

        if(i.Config.pf == "epandxianyu_qgym")
        {
            //安卓国内官服显示
            return "http://customer.zanbugames.com/website/games/gtmz/html/index.html";
        }

        if(cc.sys.isBrowser)
        {
            //浏览器显示
            return "http://customer.zanbugames.com/website/games/gtmz/html/index.html";
        }

        return "";
    };
    return t;
})();
o.LoginProxy = p;
