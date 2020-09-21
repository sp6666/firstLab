var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./Utils"),
    n = require("../component/GetEffectItem"),
    l = require("../Config"),
    r = require("../Initializer"),
    a = (function () {
        function t() {
            this.shakeArr = [
                [1, 1],
                [-1, -1],
                [-1, 1],
                [1, -1]
            ];
        }
        //两个数之间取随机值（int）
        t.prototype.randomNum = function (minNum, maxNum) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                    break;
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                    break;
                default:
                    return 0;
                    break;
            }
        }
        t.prototype.countDown = function (t, e, o, n, l, r, a) {
            void 0 === n && (n = !0);
            if (null != e && 0 != t) {
                e.unscheduleAllCallbacks();
                e.schedule(s, 1);
                s();
            }

            function s() {
                var s = t - i.timeUtil.second;
                if (s > 0 && n)
                    if (r && "" != l) {
                        var c = {};
                        c[r] = i.timeUtil.second2hms(s, a);
                        e.string = i18n.t(l, c);
                    } else
                        e.string =
                        (l && "" != l ? i18n.t(l) : "") +
                        i.timeUtil.second2hms(s, a);
                else if (s <= 0) {
                    o && o();
                    e.unscheduleAllCallbacks();
                }
            }
        };
        t.prototype.scaleRepeat = function (t, e, o, i) {
            void 0 === e && (e = 0.8);
            void 0 === o && (o = 1.2);
            void 0 === i && (i = 1);
            if (null != t) {
                var n = t.scaleX,
                    l = t.scaleY;
                t.scaleX = n * e;
                t.scaleY = l * e;
                t.runAction(
                    cc.repeatForever(
                        cc.sequence(
                            cc.scaleTo(i, n * o, l * o),
                            cc.scaleTo(i, n * e, l * e)
                        )
                    )
                );
            }
        };

        //放大缩小单次
        t.prototype.scaleOnce = function (cNode, startScale, midScale, time) {
            void 0 === startScale && (startScale = 0.8);
            void 0 === midScale && (midScale = 1.2);
            void 0 === time && (time = 1);

            if (cNode == null)
                return;

            var orgx = cNode.scaleX;
            var orgy = cNode.scaleY;
            cNode.scaleX = orgx * startScale;
            cNode.scaleY = orgy * startScale;
            cNode.runAction(
                cc.sequence(
                    cc.scaleTo(time, orgx * midScale, orgy * midScale),
                    cc.scaleTo(time, orgx * startScale, orgy * startScale),
                    cc.scaleTo(0, orgx, orgy)
                )
            );
        }

        //按随机区域掉落
        t.prototype.getRandomPosInRect = function (point, width, height) {
            var minX = point.x - (width / 2);
            var maxX = point.x + (width / 2);
            var x = Math.random() * (maxX - minX + 1) + minX;

            var minY = point.y - (height / 2);
            var maxY = point.y + (height / 2);

            var y = Math.random() * (maxY - minY + 1) + minY;
            return new cc.Vec2(x, y);
        };

        t.prototype.fadeRepeat = function (t, e, o, i) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 255);
            void 0 === i && (i = 1);
            if (null != t) {
                t.opacity = e;
                t.runAction(
                    cc.repeatForever(
                        cc.sequence(cc.fadeTo(i, o), cc.fadeTo(i, e))
                    )
                );
            }
        };
        t.prototype.fadeOver = function (t, e, o) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 1);
            null != t && t.runAction(cc.fadeTo(o, e));
        };
        t.prototype.showText = function (t, e, o, i) {
            void 0 === o && (o = 0.1);
            if (null != t && "" != e && 0 != e.length)
                if (1 != e.length) {
                    t.string = "";
                    t.unscheduleAllCallbacks();
                    t.isRunShowText = !0;
                    t.context = e;
                    t.schedule(n, o);
                    n();
                } else {
                    t.unscheduleAllCallbacks();
                    t.isRunShowText = !1;
                    i && i();
                    t.string = e;
                }

            function n() {
                var o = t.string ? t.string.length : 0;
                if (o < e.length) t.string = e.substring(0, o + 1);
                else {
                    t.unscheduleAllCallbacks();
                    t.isRunShowText = !1;
                    i && i();
                }
            }
        };
        t.prototype.showNumChange = function (t, e, o, n, l, r, a, s) {
            void 0 === n && (n = 30);
            void 0 === s && (s = !0);
            if (null != t)
                if (e != o) {
                    t.numIndex = 1;
                    t.unscheduleAllCallbacks();
                    t.schedule(c, 0.04);
                    c();
                } else {
                    t.numIndex = n;
                    c();
                }

            function c() {
                var c = t.numIndex++,
                    _ = e + Math.floor(((o - e) / n) * c);
                _ = c >= n ? o : _;
                var d = s ? i.utils.formatMoney(_) : _ + "";
                if (l)
                    if (r) {
                        var u = {};
                        u[r] = d;
                        d = i18n.t(l, u);
                    } else d = i18n.t(l) + " " + d;
                t.string = d;
                if (c >= n) {
                    t.unscheduleAllCallbacks();
                    a && a();
                }
            }
        };
        t.prototype.showPrgChange = function (t, e, o, i, n, l) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 1);
            void 0 === i && (i = 1);
            void 0 === n && (n = 30);
            if (null != t) {
                n = n;
                i = i;
                e = e;
                o = null != o ? o : 1;
                t.progress = e;
                if (e != o) {
                    t.numIndex = 1;
                    t.unscheduleAllCallbacks();
                    t.schedule(r, 0.04);
                    r();
                }
            }

            function r() {
                var r = t.numIndex++,
                    a = e + ((o - e) / n) * ((r % n) + 1);
                a = (a = a < 0.05 ? 0 : a) > 1 ? 1 : a;
                t.progress = a;
                if (r + 1 >= n * i) {
                    t.unscheduleAllCallbacks();
                    l && l();
                }
            }
        };
        t.prototype.getRwd = function (t) {
            for (
                var e = new Array(), o = t.split(","), i = 0; i < o.length; i++
            ) {
                var n = o[i].split("|"),
                    l = new s();
                l.id = n.length > 0 ? parseInt(n[0]) : 0;
                l.count = n.length > 1 ? parseInt(n[1]) : 0;
                l.kind = n.length > 2 ? parseInt(n[2]) : 0;
                e.push(l);
            }
            return e;
        };
        t.prototype.getRwdItem = function (t) {
            for (var e = new Array(), o = {}, i = 0; t && i < t.length; i++) {
                var n = t[i].itemid;
                if (1 != o[n]) {
                    o[n] = 1;
                    e.push({
                        id: n
                    });
                }
            }
            return e;
        };
        t.prototype.getItemNameCount = function (t, e) {
            var o = localcache.getItem(localdb.table_item, t);
            return i18n.t("COMMON_ADD", {
                n: o ? o.name : "",
                c: e
            });
        };
        t.prototype.showShake = function (t, e, o, i) {
            void 0 === e && (e = 4);
            void 0 === o && (o = 12);
            if (null != t) {
                var n = this;
                if (t.orgx) {
                    t.node.x = t.orgx;
                    t.node.y = t.orgy;
                } else {
                    t.orgx = t.node.x;
                    t.orgy = t.node.y;
                }
                t.numIndex = 1;
                t.unscheduleAllCallbacks();
                t.schedule(l, 0.04);
                l();
            }

            function l() {
                var l = t.numIndex++,
                    r = (o - l) / o,
                    a = l % 4;
                t.node.x = n.shakeArr[a][0] * r * e + t.orgx;
                t.node.y = n.shakeArr[a][1] * r * e + t.orgy;
                if (l >= o) {
                    t.node.x = t.orgx;
                    t.node.y = t.orgy;
                    t.unscheduleAllCallbacks();
                    i && i();
                }
            }
        };
        t.prototype.showShakeNode = function (t, e, o, i) {
            void 0 === e && (e = 4);
            void 0 === o && (o = 12);
            if (null != t) {
                var n = t.getComponent(cc.Component);
                n && this.showShake(n, e, o, i);
            }
        };
        t.prototype.floatPos = function (t, e, o, i) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 0);
            void 0 === i && (i = 1);
            if (null != t) {
                if (t.orgx) {
                    t.x = t.orgx;
                    t.y = t.orgy;
                } else {
                    t.orgx = t.x;
                    t.orgy = t.y;
                }
                t.x = t.orgx + e;
                t.y = t.orgy + o;
                t.runAction(
                    cc.repeatForever(
                        cc.sequence(
                            cc.moveTo(i, t.orgx - e, t.orgy - o),
                            cc.moveTo(i, t.orgx + e, t.orgy + o)
                        )
                    )
                );
            }
        };
        //处理浮点数
        t.prototype.formatFloat = function (f) {
            let m = Math.pow(10, 3);
            let num = Math.round(f * m) / m;

            return num;
        };
        //往复运动
        t.prototype.reciprocating = function (node, toPointx, toPointy, speed) {
            void 0 === toPointx && (toPointx = 0);
            void 0 === toPointy && (toPointy = 0);
            void 0 === speed && (speed = 1);
            if (!i.stringUtil.isBlank(node)) {
                var start = node.getPosition();
                //var end = new Vec2(toPointx, toPointy);

                node.runAction(cc.repeatForever(cc.sequence(
                    cc.moveTo(speed, toPointx, toPointy),
                    cc.moveTo(speed, start.x, start.y)
                )));
            }
        }

        t.prototype.getShuXing = function (type, score) {
            var db = localcache.getList(localdb.table_clothequality);
            //构造
            for (var i = 0; i < db.length; i++) {
                var dbItem = db[i];
                if (dbItem.type == type && score >= dbItem.sorce_min && score <= dbItem.sorce_max) {
                    return dbItem;
                }
            }

            return null;
        };
        return t;
    })();
o.UIUtils = a;
o.uiUtils = new a();
var s = function () {
    this.count = 0;
    this.id = 0;
    this.kind = 0;
    this.itemid = 0;
};
o.ItemSlotData = s;
var c = (function () {
    function t() {}
    t.prototype.getItemSlot = function (t) {
        return l.Config.skin + "/res/ico/" + t;
    };
    t.prototype.getGalleryImg = function (t) {
        //取出蓝颜绘画img
        return l.Config.skin + "/res/confidante/gallery/" + t;
    };
    t.prototype.getGalleryIcon = function (t) {
        //取出蓝颜绘画icon
        return l.Config.skin + "/res/confidante/ico/" + t;
    };
    t.prototype.getConfidanteIcon = function (t) {
        //取出蓝颜换装icon
        return l.Config.skin + "/res/confidante_ico/" + t;
    };
    t.prototype.getItemColor = function (t) {
        return l.Config.skin + "/res/itemslot/simg_c" + t;
    };
    t.prototype.getStory = function (t) {
        return l.Config.skin + "/res/story/" + t;
    };
    t.prototype.getStoryBg = function (t) {
        return l.Config.skin + "/prefabs/story/" + t;
    };
    t.prototype.getServantHead = function (t) {
        return l.Config.skin + "/res/servanthead/" + t;
    };
    t.prototype.getServantSpine = function (t) {
        return 0 != r.servantProxy.getHeroUseSkin(t) ?
            this.getServantSkinSpine(t) :
            l.Config.skin + "/prefabs/servant/mk_" + t;
    };
    t.prototype.getServantSmallSpine = function (t) {
        return 0 != r.servantProxy.getHeroUseSkin(t) ?
            this.getServantSkinSmallSpine(t) :
            l.Config.skin + "/prefabs/servantsmall/mk_" + t;
    };
    t.prototype.getHead = function (t, e) {
        return (
            l.Config.skin + "/prefabs/role/head_" + (1 == t ? 1 : 0) + "_" + e
        );
    };
    t.prototype.getHeadH = function (t, e) {
        return (
            l.Config.skin + "/prefabs/role/headh_" + (1 == t ? 1 : 0) + "_" + e
        );
    };
    t.prototype.getHeadF = function (t, e) {
        return (
            l.Config.skin + "/prefabs/role/headf_" + (1 == t ? 1 : 0) + "_" + e
        );
    };
    t.prototype.getBody = function (t, e) {
        return (
            l.Config.skin + "/prefabs/role/body_" + (1 == t ? 1 : 0) + "_" + e
        );
    };
    t.prototype.getRoleSpinePart = function (t) {
        return l.Config.skin + "/prefabs/role/" + t;
    };
    t.prototype.getRolePart = function (t) {
        return l.Config.skin + "/res/clothe/" + t;
    };
    t.prototype.getEnemy = function (t) {
        return this.getServantSmallSpine(0 == t ? 1 : t);
    };
    t.prototype.getResIcon = function (t) {
        return l.Config.skin + "/res/resIcon/" + t;
    };
    t.prototype.getWifeHead = function (t) {
        return l.Config.skin + "/res/servanthead/" + t;
    };
    t.prototype.getWifeBody = function (t) {
        return l.Config.skin + "/prefabs/servant/mk_" + t;
    };
    t.prototype.getWifeSmallBody = function (t) {
        return l.Config.skin + "/prefabs/servantsmall/mk_" + t;
    };
    t.prototype.getSonHead = function (t, e) {
        return (
            l.Config.skin + "/res/childhead/" + (1 == e ? "boy" : "girl") + "_1"
        );
    };
    t.prototype.getSonBody = function (t, e) {
        return (
            l.Config.skin + "/prefabs/child/" + (1 == t ? "boy" : "girl") + "_1"
        );
    };
    t.prototype.getSonChengHead = function (t, e) {
        return (
            l.Config.skin +
            "/res/childhead/" +
            (1 == e ? "man" : "woman") +
            "_1"
        );
    };
    t.prototype.getSonChengBody = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/child/" +
            (1 == t ? "man" : "woman") +
            "_1"
        );
    };
    t.prototype.getStoryPrefab = function (t) {
        return l.Config.skin + "/prefabs/effect/story/" + t;
    };
    t.prototype.getBabyBody = function () {
        return l.Config.skin + "/prefabs/child/baby_0";
    };
    t.prototype.getKejuBody = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "man" : "woman") +
            "_1"
        );
    };
    t.prototype.getHonourIcon = function (t) {
        return l.Config.skin + "/res/honour/honour_" + t;
    };
    t.prototype.getSevenDay = function (t) {
        return l.Config.skin + "/res/active/seven/icon_day" + t;
    };
    t.prototype.getSevenDayLbl = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/active/seven/day" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/day" + t;
    };
    t.prototype.getSevenDayNum = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/active/seven/d" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/d" + t;
    };
    t.prototype.getCellBody = function (t) {
        return l.Config.skin + "/prefabs/pet/" + t;
    };
    t.prototype.getCellHeadIcon = function (t) {
        return l.Config.skin + "/res/pet/" + t;
    };
    t.prototype.getLookBuild = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/look/" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/" + t;
    };
    t.prototype.getDataUrl = function (t) {
        return (
            l.Config.skin +
            ("zh-ch" == l.Config.lang ? "" : "_" + l.Config.lang) +
            "/res/db/" +
            t
        );
    };
    t.prototype.getUIPrefab = function (t) {
        return l.Config.skin + "/prefabs/ui/" + t;
    };
    t.prototype.getJYPic = function (t) {
        return l.Config.skin + "/prefabs/jy/" + t;
    };
    t.prototype.getJYIcon = function (t) {
        return l.Config.skin + "/res/jingying/" + t;
    };
    t.prototype.getMatchFind = function (t) {
        return l.Config.skin + "/res/baowu/" + t;
    };
    t.prototype.getTreasureGroup = function (t) {
        return l.Config.skin + "/res/baowu/" + t;
    };
    t.prototype.getTreasure = function (t) {
        return l.Config.skin + "/res/baowu/" + t;
    };
    t.prototype.getAvatar = function (t) {
        return l.Config.skin + "/res/avatar/" + t;
    };
    t.prototype.getBlank = function (t) {
        return l.Config.skin + "/prefabs/avatar/blank" + t;
    };
    t.prototype.getChargeItem = function (t) {
        return l.Config.skin + "/res/charge/" + t;
    };
    t.prototype.getStoryRoleName = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/storyname/" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/storyname/s" + t;
    };
    t.prototype.getXunfangIcon = function (t) {
        return l.Config.skin + "/res/xufang/" + t;
    };
    t.prototype.getBishuCityName = function (t) {
        return l.Config.skin + ("zh-ch" == l.Config.lang ? "" : "_" + l.Config.lang) + "/res/bishu/" + t;
    };
    t.prototype.getLimitActivityBg = function (t) {
        return (
            l.Config.skin +
            ("zh-ch" == l.Config.lang ? "" : "_" + l.Config.lang) +
            "/res/limitactivity/" +
            t
        );
    };
    t.prototype.getTaskIcon = function (t) {
        return l.Config.skin + "/res/dailyrwd/" + t;
    };
    t.prototype.getAchieveIcon = function (t) {
        return l.Config.skin + "/res/chengjiu/" + t;
    };
    t.prototype.getServantSkillIcon = function (t) {
        return l.Config.skin + "/res/servantskill/" + t;
    };
    t.prototype.getKidSmallHead = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "boy" : "girl") +
            "_head_" +
            t
        );
    };
    t.prototype.getKidSmallBody = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "boy" : "girl") +
            "_body_" +
            t
        );
    };
    t.prototype.getKidChengHead = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "man" : "woman") +
            "_head_" +
            t
        );
    };
    t.prototype.getKidChengBody = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "man" : "woman") +
            "_body_" +
            t
        );
    };
    t.prototype.getKidMarryBody = function (t) {
        return (
            l.Config.skin +
            "/prefabs/child/" +
            (1 == t ? "man" : "woman") +
            "_body_0"
        );
    };
    t.prototype.getChuXingIcon = function (t) {
        return l.Config.skin + "/res/chuxing/" + t;
    };
    t.prototype.getXingLiIcon = function (t) {
        return l.Config.skin + "/res/xingli/" + t;
    };
    t.prototype.getKidSmallHead_2 = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/childsmall/" +
            (1 == e ? "boy" : "girl") +
            "_head_" +
            t
        );
    };
    t.prototype.getKidSmallBody_2 = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/childsmall/" +
            (1 == e ? "boy" : "girl") +
            "_body_" +
            t
        );
    };
    t.prototype.getKidChengHead_2 = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/childsmall/" +
            (1 == e ? "man" : "woman") +
            "_head_" +
            t
        );
    };
    t.prototype.getKidChengBody_2 = function (t, e) {
        return (
            l.Config.skin +
            "/prefabs/childsmall/" +
            (1 == e ? "man" : "woman") +
            "_body_" +
            t
        );
    };
    t.prototype.getVoiceName = function (t, e) {
        return (
            l.Config.skin +
            ("zh-ch" == l.Config.lang ? "" : "_" + l.Config.lang) +
            "/res/" +
            ("zh-ch" == l.Config.lang ? "voice/" : "ui/") +
            (1 == t ? "hero_" : "wife_") +
            e
        );
    };
    t.prototype.getLogo = function () {
        return l.Config.skin + "/res/logo/" + l.Config.logo;
    };
    t.prototype.getLogoWithName = function (name) {
        return l.Config.skin + "/res/logo/" + name;
    };
    t.prototype.getLangSprite = function (t) {
        return "zh-ch" == l.Config.lang ?
            "" :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/" + t;
    };
    t.prototype.getLangPrefab = function (t) {
        return "zh-ch" == l.Config.lang ?
            "" :
            l.Config.skin + "_" + l.Config.lang + "/prefabs/" + t;
    };
    t.prototype.getLangSp = function (t) {
        t = 4 == t ? 1 : 1 == t ? 4 : t;
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/servantsp/pinz0" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/pinz0" + t;
    };
    t.prototype.getActivityBtn = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/activity/" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/" + t;
    };
    t.prototype.getSnowmanIcon = function (t) {
        return l.Config.skin + "/res/snowman/snowman_" + t;
    };
    t.prototype.getGuWuIcon = function (t) {
        return l.Config.skin + "/res/ui/zhongyuan/guwu_" + t;
    };
    t.prototype.getHedengIcon = function (t) {
        return l.Config.skin + "/res/hedeng/hedeng_" + t;
    };
    t.prototype.getChatBlank = function (t) {
        return l.Config.skin + "/res/avatar/chat/" + t + "k";
    };
    t.prototype.getPurchaseIcon = function (t) {
        return l.Config.skin + "/res/ui/purchase/" + t;
    };

    t.prototype.getFlowerEffectPic = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/flower/" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/" + t;
    };

    t.prototype.getFlowerEffectSpine = function (t) {
        return l.Config.skin + "/prefabs/flower/" + t;
    };

    t.prototype.getActivityUrl = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/prefabs/activity/" + t :
            l.Config.skin + "_" + l.Config.lang + "/prefabs/" + t;
    };
    t.prototype.getChengHaoUrl = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/chenghao/" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/" + t;
    };
    t.prototype.getChengHaoIcon = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/chenghao/" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/" + t;
    };
    t.prototype.getRankIcon = function (t) {
        return l.Config.skin + "/res/ui/rank/" + t;
    };
    t.prototype.getFlowerPlant = function (t, e) {
        if (0 == t) return "";
        switch (e) {
            case 0:
                t = 1e4;
                break;

            case 1:
                t = 2e4;
        }
        return l.Config.skin + "/prefabs/plant/" + t;
    };
    t.prototype.getFlowerFriendPlant = function (t, e) {
        if (0 == t) return "";
        switch (e) {
            case 0:
                return l.Config.skin + "/prefabs/plant/fsmall" + t;

            case 1:
                return l.Config.skin + "/prefabs/plant/fsmall" + t;
        }
        return l.Config.skin + "/prefabs/plant/friend" + t;
    };

    t.prototype.getChatSpine = function (t) {
        return l.Config.skin + "/prefabs/avatar/chat" + t;
    };
    t.prototype.getGuoliIcon = function (t) {
        return l.Config.skin + "/res/ui/guoli/img_qd" + t;
    };
    t.prototype.getDeatilBg = function (t) {
        return l.Config.skin + "/res/ui/servant/pro_bg" + t;
    };
    t.prototype.getSpringBz = function (t) {
        return l.Config.skin + "/res/ui/spring/baozhu_" + t;
    };
    t.prototype.getJbTitleBg = function (t) {
        return l.Config.skin + "/res/jiban/title_bg_" + t;
    };
    t.prototype.getJbTitle = function (t) {
        return l.Config.skin + "/res/jiban/jb_title_" + t;
    };
    t.prototype.getJbTitleWord = function (t) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/jiban/jiban_word_" + t :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/jiban_word_" + t;
    };
    t.prototype.getWorldTree = function (t) {
        t = (t = Math.ceil(t / 5)) > 3 ? 3 : t;
        return l.Config.skin + "/prefabs/ui/flower/tree" + t;
    };
    t.prototype.getServantSkinIcon = function (t) {
        return l.Config.skin + "/res/servant_skin_icon/" + t;
    };
    t.prototype.getServantSkinSpine = function (t) {
        return l.Config.skin + "/prefabs/servant_skin/" + t;
    };
    t.prototype.getServantSkinSmallSpine = function (t) {
        return l.Config.skin + "/prefabs/servant_skin_small/" + t;
    };
    t.prototype.getClotheProImg = function (t, e) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/clothe/clothe_pro_" + t + "_" + e :
            l.Config.skin +
            "_" +
            l.Config.lang +
            "/res/ui/clothe_pro_" +
            t +
            "_" +
            e;
    };
    t.prototype.getChouQianImg = function (t, e, activity) {
        var imgUrl = l.Config.skin + "/res/ui/qixi/qian/" + t + "_" + e;
        if (activity) {
            imgUrl = l.Config.skin + "/res/ui/" + activity + "/qian/" + t + "_" + e;
        }

        return imgUrl;
    };
    t.prototype.getChouQianKuangImg = function (t) {
        return l.Config.skin + "/res/ui/qixi/qian/" + t;
    };
    t.prototype.getTag = function (index) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/tag/tag_" + index :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/tag/tag_" + index;
    };
    t.prototype.getTagShuXing = function (index) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/tagShuXing/tagShuXing_" + index :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/tagShuXing/tagShuXing_" + index;
    };
    t.prototype.getFeiUrl = function (name) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/liugong/" + name :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/" + name;
    };

    t.prototype.getShengDanLevelBg = function (index) {
        return l.Config.skin + "/res/ui/shengdan/img_gq" + index;
    };

    t.prototype.getShengDanLevel = function (index) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/shengdan/shengdanlevel_" + index :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/shengdanlevel_" + index;
    };
    t.prototype.getSakuraLevel = function (index) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/sakura/sakuralevel_" + index :
            l.Config.skin + "_" + l.Config.lang + "/res/ui/sakuralevel_" + index;
    };
    t.prototype.getCommonImg = function(url) {
        return l.Config.skin + "/res/ui/" + url;
    };
    t.prototype.getCommonLangImg = function(url, name) {
        return "zh-ch" == l.Config.lang ?
            l.Config.skin + "/res/ui/" + url + "/" + name:
            l.Config.skin + "_" + l.Config.lang + "/res/ui/" + name;
    };

    return t;
})();
o.UIHelp = c;
o.uiHelps = new c();
var _ = (function () {
    function t() {
        this.list = new Array();
        this.prefab = null;
    }
    t.prototype.showClick = function (t, e, o, i) {
        void 0 === i && (i = 5);
        this.show(e, t.getLocation(), o, i);
    };
    t.prototype.show = function (t, e, o, i) {
        void 0 === i && (i = 5);
        if (null == this.prefab) this.loadItem(t, e, o, i);
        else {
            t.x -= cc.winSize.width / 2;
            t.y -= cc.winSize.height / 2;
            e.x -= cc.winSize.width / 2;
            e.y -= cc.winSize.height / 2;
            for (var n = 0; n < i; n++) this.showItem(t, e, o);
        }
    };
    t.prototype.loadItem = function (t, e, o, i) {
        void 0 === i && (i = 5);
        var n = this;
        cc.loader.loadRes(l.Config.skin + "/prefabs/ui/GetEffectItem", function (
            l,
            r
        ) {
            if (null != r) {
                n.prefab = r;
                n.show(t, e, o, i);
            } else cc.warn(l + " name load error!!!");
        });
    };
    t.prototype.showItem = function (t, e, o) {
        var i = cc.instantiate(this.prefab),
            l = i.getComponent(n.default);
        cc.director
            .getScene()
            .getChildByName("Canvas")
            .addChild(i);
        this.list.push(l);
        l.node.x = e.x + 100 * Math.random() - 50;
        l.node.y = e.y;
        if (l) {
            l.url = o;
            l.des = t;
        }
    };
    return t;
})();
o.GetEffect = _;
o.getEffectUtils = new _();
var d = (function () {
    function t() {
        this.prefab = null;
        this.curItem = null;
    }
    t.prototype.showEffect = function (t) {
        this.show(t.getLocation());
    };
    t.prototype.show = function (t) {
        if (null == this.prefab) this.loadItem(t);
        else {
            t.x -= cc.winSize.width / 2;
            t.y -= cc.winSize.height / 2;
            this.showItem(t);
        }
    };
    t.prototype.loadItem = function (t) {
        var e = this;
        cc.loader.loadRes(l.Config.skin + "/prefabs/effect/point", function (
            o,
            i
        ) {
            if (null != i) {
                e.prefab = i;
                e.show(t);
            } else cc.warn(o + " name load error!!!");
        });
    };
    t.prototype.showItem = function (t) {
        if (null != this.curItem && null == this.curItem.parent) {
            this.curItem.removeFromParent();
            this.curItem.destroy();
            this.curItem = null;
        }
        null == this.curItem && (this.curItem = cc.instantiate(this.prefab));
        var e = this.curItem;
        if (e) {
            null == e.parent &&
                cc.director
                .getScene()
                .getChildByName("Canvas")
                .addChild(e);
            e.active = !0;
            e.x = t.x;
            e.y = t.y;
            var o = e.getComponent(cc.Component);
            o.unscheduleAllCallbacks();
            o &&
                o.scheduleOnce(function () {
                    e.active = !1;
                }, 0.8);
        }
    };
    return t;
})();
o.ClickEffect = d;
o.clickEffectUtils = new d();