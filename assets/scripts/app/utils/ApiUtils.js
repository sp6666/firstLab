var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Config"),
    n = require("../Initializer"),
    l = require("./Utils"),
    r = (function() {
        function t() {}
        t.prototype.get = function(t, e, o) {
            void 0 === o && (o = null);
            t +=
                (-1 == t.indexOf("?") ? "?" : "&") +
                "_t=" +
                new Date().getTime();
            var i = cc.loader.getXMLHttpRequest();
            i.onreadystatechange = function() {
                if (4 == i.readyState)
                    if (i.status >= 200 && i.status < 400)
                        e.call(o, i.responseText);
                    else {
                        cc.log("HTTP-FAIL:" + t);
                        e.call(o, null);
                    }
            };
            i.onerror = function() {
                cc.log("HTTP-FAIL:" + t);
                e.call(o, null);
            };
            i.open("GET", t, !0);
            i.send();
        };
        t.prototype.doSubmitUserInfo = function(t) {
            i.Config.login_by_sdk &&
                cc.doSubmitUserInfo(
                    t,
                    i.Config.serId,
                    i.Config.servername,
                    n.playerProxy.userData.name,
                    n.playerProxy.userData.uid,
                    n.playerProxy.userData.cash,
                    n.playerProxy.userData.vip,
                    n.playerProxy.userData.level,
                    n.unionProxy.clubInfo ? n.unionProxy.clubInfo.name : null,
                    n.playerProxy.userData.regtime,
                    n.unionProxy.clubInfo ? n.unionProxy.clubInfo.id : null,
                    n.playerProxy.userData.sex,
                    n.playerProxy.getAllEp(),
                    n.playerProxy.userData.uid,
                    n.unionProxy.clubInfo ? n.unionProxy.clubInfo.level : null,
                    n.playerProxy.userData.job,
                    "",
                    null
                );
        };
        t.prototype.selectServer = function() {
            // return this.doSubmitUserInfo("selectServer");
            i.Config.login_by_sdk &&
            cc.doSubmitUserInfo(
                t,
                i.Config.serId,
                i.Config.servername,
                "",//n.playerProxy.userData.name,
                "",//n.playerProxy.userData.uid,
                "",//n.playerProxy.userData.cash,
                "",//n.playerProxy.userData.vip,
                "",//n.playerProxy.userData.level,
                "",//n.unionProxy.clubInfo ? n.unionProxy.clubInfo.name : null,
                "",//n.playerProxy.userData.regtime,
                "",//n.unionProxy.clubInfo ? n.unionProxy.clubInfo.id : null,
                "",//n.playerProxy.userData.sex,
                "",//n.playerProxy.getAllEp(),
                "",//n.playerProxy.userData.uid,
                "",//n.unionProxy.clubInfo ? n.unionProxy.clubInfo.level : null,
                "",//n.playerProxy.userData.job,
                "",
                null
            );
        };
        t.prototype.loginSuccess = function() {
            return this.doSubmitUserInfo("loginSuccess");
        };
        t.prototype.createSuccess = function() {
            return this.doSubmitUserInfo("createSuccess");
        };
        t.prototype.levelUp = function() {
            return this.doSubmitUserInfo("levelUp");
        };
        t.prototype.completeTutorial = function() {
            return this.doSubmitUserInfo("completeTutorial");
        };
        t.prototype.heartFlash = function() {
            return this.doSubmitUserInfo("heartFlash");
        };
        t.prototype.recharge = function(t, e, o, r, a, s) {
            if (i.Config.recharge_url && "" != i.Config.recharge_url) {
                if (!n.crossProxy.isDiamond) return;
                var c = null == i.Config.pfv ? [] : i.Config.pfv.split(".");
                if (
                    c.length > 1 &&
                    (parseInt(c[0]) > 1 ||
                        (1 == parseInt(c[0]) && parseInt(c[1]) > 5)) &&
                    cc.sys.os === cc.sys.OS_IOS
                ) {
                    return jsb.reflection.callStaticMethod(
                        "Ps_SDKProxy",
                        "PsRun_pay_h5:pay_serverid:pay_coin:pay_price:pay_text:pay_pf:",
                        t + "",
                        e + "",
                        o + "",
                        r + "",
                        a + "",
                        i.Config.pf + ""
                    );
                }
                var _ =
                    i.Config.recharge_url +
                    "?server_id=" +
                    e +
                    "&user_name=" +
                    t +
                    "&coin=" +
                    o +
                    "&money=" +
                    r +
                    "&text=" +
                    encodeURI(a) +
                    "&pf=" +
                    i.Config.pf;
                cc.loader.loadRes("prefab/ui/web", function(t, e) {
                    if (null != e) {
                        var o = cc.instantiate(e),
                            i = o.getComponent("WebUI");
                        cc.director
                            .getScene()
                            .getChildByName("Canvas")
                            .addChild(o);
                        i.show(_);
                    } else cc.log(t);
                });
            } else if (n.crossProxy.isDiamond) {
                this.doSubmitUserInfo("pay");
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    cc.log(
                        "current platform is: cc.sys.OS_ANDROID[track_recharge]"
                    );
                   
                    if(i.Config.pay_ext){
                        //String userid, int serverid, int coin, float money, String waresname, String pf, String servername, String username,String gameRoleLevel,String vipLevel
                        return jsb.reflection.callStaticMethod(
                            "org/cocos2dx/javascript/SDKHelper",
                            "pay",
                            "(Ljava/lang/String;IIFLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                            t + "",
                            e,
                            o,
                            r,
                            a,
                            i.Config.pf
                            , i.Config.servername
                            , n.playerProxy.userData.name
                            , n.playerProxy.userData.level +""
                            , n.playerProxy.userData.vip + ""
                        );
                    }
                    else{
                        return jsb.reflection.callStaticMethod(
                            "org/cocos2dx/javascript/SDKHelper",
                            "pay",
                            "(Ljava/lang/String;IIFLjava/lang/String;Ljava/lang/String;)V",
                            t + "",
                            e,
                            o,
                            r,
                            a,
                            i.Config.pf
                        );
                    }
                    
                }
                if (cc.sys.os === cc.sys.OS_IOS) {
                    cc.log(
                        "current platform is: cc.sys.OS_IOS[track_recharge]"
                    );
                    return jsb.reflection.callStaticMethod(
                        "Ps_SDKProxy",
                        "PsRun_pay:pay_serverid:pay_coin:pay_price:pay_text:pay_pf:",
                        t + "",
                        e + "",
                        o + "",
                        r + "",
                        a + "",
                        i.Config.pf + ""
                    );
                }
                l.alertUtil.alert18n("GONGNENG_NO_OPEN");
            }
        };
        t.prototype.share_game = function(t) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                cc.log("current platform is: cc.sys.OS_IOS:[share2sdk]");
                var e = jsb.reflection.callStaticMethod(
                    "Ps_SDKProxy",
                    "PsRun_share2sdk:",
                    t
                );
                cc.log("init Data:" + e);
                return e;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("current platform is: cc.sys.OS_ANDROID[share2sdk]");
                e = jsb.reflection.callStaticMethod(
                    "org/cocos2dx/javascript/SDKHelper",
                    "share2sdk",
                    "(Ljava/lang/String;)Ljava/lang/String;",
                    t
                );
                cc.log("init Data:" + e);
                return e;
            }
            return null;
        };
        t.prototype.share_game2 = function(t, e, o, i, n) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                cc.log("current platform is: cc.sys.OS_IOS:[share2sdk]");
                var l = jsb.reflection.callStaticMethod(
                    "Ps_SDKProxy",
                    "PsRun_share2sdkURL:share_ParamsByText:share_ShareTitle:share_ShareURL:share_ShareURLImage:",
                    t,
                    e,
                    o,
                    i,
                    n
                );
                cc.log("init Data:" + l);
                return l;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("current platform is: cc.sys.OS_ANDROID[share2sdk]");
                l = jsb.reflection.callStaticMethod(
                    "org/cocos2dx/javascript/SDKHelper",
                    "share2sdkURL",
                    "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
                    t,
                    e,
                    o,
                    i,
                    n
                );
                cc.log("init Data:" + l);
                return l;
            }
            return null;
        };
        t.prototype.init_context_sdk = function() {
            return this.callSMethod("getStartupData");
        };
        t.prototype.open_user_center = function() {
            return this.callSMethod("openUserCenter");
        };
        t.prototype.callSMethod = function(t) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                cc.log("current platform is: cc.sys.OS_IOS:[" + t + "]");
                var e = jsb.reflection.callStaticMethod(
                    "Ps_SDKProxy",
                    "PsRun_" + t
                );
                cc.log("return Data:" + JSON.stringify(e));
                return e;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("current platform is: cc.sys.OS_ANDROID[" + t + "]");
                e = jsb.reflection.callStaticMethod(
                    "org/cocos2dx/javascript/SDKHelper",
                    t,
                    "()Ljava/lang/String;"
                );
                cc.log("return Data:" + JSON.stringify(e));
                return e;
            }
            return null;
        };
        t.prototype.callSMethod1 = function(t) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                cc.log("current platform is: cc.sys.OS_IOS:[" + t + "]");
                var e = jsb.reflection.callStaticMethod(
                    "Ps_SDKProxy",
                    "PsRun_" + t + ":",
                    "1"
                );
                cc.log("return Data:" + JSON.stringify(e));
                return e;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("current platform is: cc.sys.OS_ANDROID[" + t + "]");
                e = jsb.reflection.callStaticMethod(
                    "org/cocos2dx/javascript/SDKHelper",
                    t,
                    "(I)Ljava/lang/String;"
                );
                cc.log("return Data:" + JSON.stringify(e));
                return e;
            }
            return null;
        };
        t.prototype.startLoginTo_sdk = function() {
            return this.callSMethod1("startLoginTo_sdk");
        };
        t.prototype.open_download_url = function() {
            l.stringUtil.isBlank(i.Config.download_url) ||
                (i.Config.enter_game
                    ? l.utils.showConfirm(
                          i18n.t("LOGIN_ENTER_FUNCTION_ERROR"),
                          function() {
                              cc.sys.openURL(i.Config.download_url);
                              cc.game.restart();
                          }
                      )
                    : l.utils.showSingeConfirm(
                          i18n.t("LOGIN_UPDATE_ENTER"),
                          function() {
                              cc.sys.openURL(i.Config.download_url);
                              cc.game.restart();
                          }
                      ));
        };
        t.prototype.loginOut_sdk = function() {
            i.Config.token = "";
            i.Config.uid = 0;
            i.Config.account = "";
            return this.callSMethod1("loginOut_sdk");
        };

        t.prototype.loadRewardedVideo = function(slotId)
        {
            if (cc.sys.os === cc.sys.OS_IOS) {
                cc.log("current platform is: cc.sys.OS_IOS:[loadRewardedVideo]");
                jsb.reflection.callStaticMethod(
                    "Ps_SDKProxy",
                    "PsRun_loadRewardedVideo:",
                    slotId
                );
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("current platform is: cc.sys.OS_ANDROID[loadRewardedVideo]");
                jsb.reflection.callStaticMethod(
                    "org/cocos2dx/javascript/SDKHelper",
                    "loadRewardedVideo",
                    "(Ljava/lang/String;)V",
                    slotId
                );
            }
            return null;
        };

        t.prototype.showRewardedVideo = function(t, e, o) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                cc.log("current platform is: cc.sys.OS_IOS:[showRewarededVideo]");
                var i = jsb.reflection.callStaticMethod(
                    "Ps_SDKProxy",
                    "PsRun_showRewardedVideo:uid:slotid:",
                    t + "",
                    e + "",
                    o + ""
                );
                cc.log("show rewarded video:" + i);
                return i;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("current platform is: cc.sys.OS_ANDROID[showRewarededVideo]");
                i = jsb.reflection.callStaticMethod(
                    "org/cocos2dx/javascript/SDKHelper",
                    "showRewarededVideo",
                    "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
                    t,
                    e,
                    o
                );
                cc.log("show rewarded video:" + i);
                return i;
            }
            return null;
        };

        t.prototype.getChannelLogoName = function(name) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("current platform is: cc.sys.OS_ANDROID[showRewarededVideo]");
                var i = jsb.reflection.callStaticMethod(
                    "org/cocos2dx/javascript/SDKHelper",
                    "getChannelLogoName",
                    "()Ljava/lang/String;"
                );
                cc.log(":" + i);
                return i;
            }
    
            return null;
        };

        //看广告sdk
        t.prototype.watchAdvertise = function () {
            if (cc.sys.os === cc.sys.OS_IOS) {
                cc.log("current platform is: cc.sys.OS_IOS:[watchAdvertise]");
                jsb.reflection.callStaticMethod(
                    "Ps_SDKProxy",
                    "PsRun_ShowVideoAd:",
                    "" + n.playerProxy.userData.uid
                );
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.log("current platform is: cc.sys.OS_ANDROID[watchAdvertise]");
                jsb.reflection.callStaticMethod(
                    "org/cocos2dx/javascript/SDKHelper",
                    "ShowVideoAd",
                    "(Ljava/lang/String;)V",
                    "" + n.playerProxy.userData.uid
                );
            }
        }
        return t;
    })();
o.ApiUtils = r;
cc.login_fromSDK = function(t, e, o, l, r, a, addicted) {
    if (null != t && "" != t) {
        i.Config.uid = t;
        i.Config.token = i.Config.password = e;
        i.Config.parm1 = o;
        i.Config.parm2 = l;
        i.Config.parm3 = r;
        i.Config.parm4 = a;
        i.Config.addicted = addicted;
        var s = i.Config.name_prefix ? i.Config.name_prefix : "";
        i.Config.account = s + t;
        n.timeProxy.saveLocalAccount("CONFIG_ACCOUNT", i.Config.account);
        "LoginScene" == cc.director.getScene().name &&
            n.loginProxy.sendInGame();
    } else
        facade.send("LOGIN_RESULT", {
            result: 1
        });
};
cc.logout_fromSDK = function(t) {
    n.loginProxy.loginOut();
};
cc.setConfig = function(t, e) {
    i.Config[t] = e;
};
cc.doSubmitUserInfo = function(
    t,
    e,
    o,
    l,
    r,
    a,
    s,
    c,
    _,
    d,
    u,
    p,
    h,
    y,
    f,
    I,
    m,
    b
) {
    if (cc.sys.os == cc.sys.OS_ANDROID) {
        cc.log("current platform is: cc.sys.OS_ANDROID[doSubmitUserInfo]");
        jsb.reflection.callStaticMethod(
            "org/cocos2dx/javascript/SDKHelper",
            "doSubmitUserInfo",
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
            t,
            e,
            o,
            l,
            r,
            a,
            s,
            c,
            _,
            d,
            u,
            p,
            h,
            y,
            f,
            I,
            m,
            b
        );
    } else if (cc.sys.os === cc.sys.OS_IOS) {
        cc.log("current platform is: cc.sys.OS_IOS[doSubmitUserInfo]");
        jsb.reflection.callStaticMethod(
            "Ps_SDKProxy",
            "PsRun_doSubmitUserInfo:userinfo_serverID:userinfo_serverName:userinfo_gameRoleName:userinfo_gameRoleID:userinfo_gameRoleBalance:userinfo_vipLevel:userinfo_gameRoleLevel:userinfo_partyName:userinfo_roleCreateTime:userinfo_partyId:userinfo_gameRoleGender:userinfo_gameRolePower:userinfo_partyRoleId:userinfo_partyRoleName:userinfo_professionId:userinfo_profession:userinfo_friendlist:",
            t + "",
            e + "",
            o + "",
            l + "",
            r + "",
            a + "",
            s + "",
            c + "",
            _ + "",
            d + "",
            u + "",
            p + "",
            h + "",
            y + "",
            f + "",
            I + "",
            m + "",
            b
        );
    }   
};

cc.shareSuccess = function(t) {
    facade.send("SHARE_SUCCESS");
};
cc.rechargeSuccess = function(t) {
    n.welfareProxy.sendOrderBack();
    facade.send("MOON_CARD_BUY_UPDATE");
};
cc.rechargeFail = function(t) {
    facade.send("RECHARGE_FAIL");
};
cc.getConfig = function(t) {
    return i.Config[t] ? i.Config[t] : null;
};
cc.rewardedVideoSuccess = function (t) {
    cc.log("on rewarded video succsss");
    n.advertProxy.advertSuccess();
};
cc.rewardedVideoFail = function (t) {
    cc.log("on rewarded video fail");
    n.advertProxy.advertSuccess();
};
cc.rewardedVideoClosed = function (t) {
    cc.log("on rewarded video closed");
};
o.apiUtils = new r();
