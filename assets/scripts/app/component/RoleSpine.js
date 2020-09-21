var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UrlLoad"),
    n = require("../utils/UIUtils"),
    l = require("../Initializer"),
    r = require("../Config"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.headDesBH = null;
            e.body = null;
            e.head = null;
            e.headDesF = null;
            e.headDesH = null;
            e.earH = null;
            e.earF = null;
            e.effF = null;
            e.effH = null;
            e.animalH = null;
            e.animalF = null;
            e.isLoadPlayer = !1;
            e.isStop = !1;
            e.isShowBody = !0;
            e.headBHSp = null;
            e.bodySp = null;
            e.headSp = null;
            e.headHSp = null;
            e.headFSp = null;
            e.earHSp = null;
            e.earFSp = null;
            e.aStr = "";
            e._headArray = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addSp(this.headDesBH, "headBHSp");
            this.addSp(this.body, "bodySp");
            this.addSp(this.head, "headSp", this.aStr);
            this.addSp(this.headDesH, "headHSp");
            this.addSp(this.headDesF, "headFSp");
            this.addSp(this.earF, "earFSp");
            this.addSp(this.earH, "earHSp");
            this.isLoadPlayer && this.updatePlayerShow();
        };
        e.prototype.addSp = function(t, e, o) {
            void 0 === o && (o = "zhengchang");
            var i = this;
            t &&
                (t.loadHandle = function() {
                    var n = t.getComponentInChildren(sp.Skeleton);
                    i[e] = n;
                    if (n) {
                        n.animation = i.isStop ? "" : o;
                        i.setDelayAction();
                    }
                });
        };
        e.prototype.setDelayAction = function() {
            this.unscheduleAllCallbacks();
            this.scheduleOnce(this.setAstrAction, 0.1);
        };
        e.prototype.setAstrAction = function() {
            this.actionString(this.aStr, !1);
        };
        e.prototype.updatePlayerShow = function() {
            var t = l.playerProxy ? l.playerProxy.userData : null;
            this.setClothes(t.sex, t.job, t.level, l.playerProxy.userClothe);
        };
        e.prototype.actionString = function(t, e) {
            void 0 === t && (t = "zhengchang");
            void 0 === e && (e = !0);
            if (!((this.aStr == t && e) || this.isStop)) {
                this.aStr = t;
                this.headBHSp && (this.headBHSp.animation = "zhengchang");
                this.bodySp && (this.bodySp.animation = "zhengchang");
                this.headFSp && (this.headFSp.animation = "zhengchang");
                this.headHSp && (this.headHSp.animation = "zhengchang");
                this.earFSp && (this.earFSp.animation = "zhengchang");
                this.earHSp && (this.earHSp.animation = "zhengchang");
                this.headSp && (this.headSp.animation = t);
            }
        };
        e.prototype.setRoleLevel = function(t) {
            var e = l.playerProxy ? l.playerProxy.userData : null,
                o = null;
            null != l.playerProxy.userClothe &&
                0 != l.playerProxy.userClothe.ear &&
                (o = {
                    body: 0,
                    head: 0,
                    ear: l.playerProxy.userClothe.ear
                });
            this.setClothes(e.sex, e.job, t, o);
        };
        e.prototype.setLevel = function(t, e, o) {
            this.setClothes(t, e, o, null);
        };
        e.prototype.setClothes = function(t, e, o, i) {
            var n = null == i ? 0 : i.body,
                r = null == i ? 0 : i.head;
            if (0 == r || 0 == n) {
                var a = localcache.getItem(localdb.table_officer, o);
                if (null == a) return;
                var s = localcache.getItem(localdb.table_roleSkin, a.shizhuang);
                0 == n && (n = l.playerProxy.getPartId(2, "body_0_" + s.body));
                0 == r &&
                    (r = l.playerProxy.getPartId(1, "headf_0_" + s.headf));
                0 == r &&
                    (r = l.playerProxy.getPartId(1, "headh_0_" + s.headh));
                0 == r &&
                    (r = l.playerProxy.getPartId(1, "headbh_0_" + s.headh));
            }
            var c = {};
            c.body = n;
            c.animal = i ? i.animal : 0;
            c.ear = i ? i.ear : 0;
            c.effect = i ? i.effect : 0;
            c.head = r;
            this.setClothePart(t, e, c);
        };
        e.prototype.getHeadArr = function() {
            if (null == this._headArray) {
                this._headArray = [];
                for (
                    var t = localcache.getList(localdb.table_userjob), e = 0;
                    e < t.length;
                    e++
                )
                    (null != t[e].display &&
                        0 != t[e].display.length &&
                        -1 == t[e].display.indexOf(r.Config.pf)) ||
                        this._headArray.push(t[e].id);
            }
            return this._headArray;
        };
        e.prototype.setClothePart = function(t, e, o) {
            0;
            e = parseInt(e);
            e = isNaN(e) ? 1 : e;
            var i = this.getHeadArr();
            r.Config.addShowCreateHeadId &&
                r.Config.addShowCreateHeadId.length > 0 &&
                (i = i.concat(r.Config.addShowCreateHeadId));
            e = -1 == i.indexOf(e) ? 3 : e;
            if (this.head) {
                this.head.url = "";
                this.head.url = n.uiHelps.getHead(0, e);
            }
            var l = localcache.getItem(localdb.table_userClothe, o.body);
            l &&
                this.isShowBody &&
                this.body &&
                (this.body.url = n.uiHelps.getRoleSpinePart(l.model));
            this.setPartUrl(
                o.head,
                this.headDesH,
                this.headDesF,
                "headh",
                "headf",
                this.headDesBH,
                "headbh"
            );
            this.setPartUrl(o.ear, this.earF, this.earH, "earf", "earh");
            this.setPartUrl(o.effect, this.effH, this.effF, "effh", "efff");
            this.setPartUrl(
                o.animal,
                this.animalH,
                this.animalF,
                "anih",
                "anif"
            );
            this.actionString();
        };
        e.prototype.setPartUrl = function(t, e, o, i, l,bhUrl,bh) {
            e && (e.url = "");
            o && (o.url = "");
            bhUrl && (bhUrl.url = "");
            var r = localcache.getItem(localdb.table_userClothe, t);
            if (r)
                for (var a = r.model.split("|"), s = 0; s < a.length; s++) {
                    e &&
                        -1 != a[s].indexOf(i) &&
                        e.node.active &&
                        (e.url = n.uiHelps.getRoleSpinePart(a[s]));
                    o &&
                        -1 != a[s].indexOf(l) &&
                        o.node.active &&
                        (o.url = n.uiHelps.getRoleSpinePart(a[s]));
                    bhUrl &&
                        -1 != a[s].indexOf(bh) &&
                        bhUrl.node.active &&
                        (bhUrl.url = n.uiHelps.getRoleSpinePart(a[s]));
                }
        };
        e.prototype.replayAll = function(){
            cc.log("----------------------换")
            if(this.headBHSp)
            {
                var ani = this.headBHSp.animation;
                this.headBHSp.clearTrack(0);
                this.headBHSp.setAnimation(0,ani,true);
            }
            if(this.bodySp)
            {
                var ani = this.bodySp.animation;
                this.bodySp.clearTrack(0);
                this.bodySp.setAnimation(0,ani,true);
            }
            if(this.headFSp)
            {
                var ani = this.headFSp.animation;
                this.headFSp.clearTrack(0);
                this.headFSp.setAnimation(0,ani,true);
            }
            if(this.headHSp)
            {
                var ani = this.headHSp.animation;
                this.headHSp.clearTrack(0);
                this.headHSp.setAnimation(0,ani,true);
            }
            if(this.earFSp)
            {
                var ani = this.earFSp.animation;
                this.earFSp.clearTrack(0);
                this.earFSp.setAnimation(0,ani,true);
            }
            if(this.earHSp)
            {
                var ani = this.earHSp.animation;
                this.earHSp.clearTrack(0);
                this.earHSp.setAnimation(0,ani,true);
            }
            if(this.headSp)
            {
                var ani = this.headSp.animation;
                this.headSp.clearTrack(0);
                this.headSp.setAnimation(0,ani,true);
            }
        };
        __decorate([c(i.default)], e.prototype, "headDesBH", void 0);
        __decorate([c(i.default)], e.prototype, "body", void 0);
        __decorate([c(i.default)], e.prototype, "head", void 0);
        __decorate([c(i.default)], e.prototype, "headDesF", void 0);
        __decorate([c(i.default)], e.prototype, "headDesH", void 0);
        __decorate([c(i.default)], e.prototype, "earH", void 0);
        __decorate([c(i.default)], e.prototype, "earF", void 0);
        __decorate([c(i.default)], e.prototype, "effF", void 0);
        __decorate([c(i.default)], e.prototype, "effH", void 0);
        __decorate([c(i.default)], e.prototype, "animalH", void 0);
        __decorate([c(i.default)], e.prototype, "animalF", void 0);
        __decorate(
            [
                c({
                    tooltip: "是否加载主角形象"
                })
            ],
            e.prototype,
            "isLoadPlayer",
            void 0
        );
        __decorate(
            [
                c({
                    tooltip: "是否停止 用于头像用"
                })
            ],
            e.prototype,
            "isStop",
            void 0
        );
        __decorate(
            [
                c({
                    tooltip: "是否不显示身体 用于头像用"
                })
            ],
            e.prototype,
            "isShowBody",
            void 0
        );
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
