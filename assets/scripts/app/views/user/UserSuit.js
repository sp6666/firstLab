var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/RoleSpine"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("./UserSuitPart"),
    s = require("../../utils/UIUtils"),
    c = require("../../models/BagProxy"),
    _ = require("../../component/UrlLoad"),
    d = require("../item/ItemSlotUI"),
    shader = require("../../utils/ShaderUtils"),
    u = cc._decorator,
    p = u.ccclass,
    h = u.property,
    y = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.listProp = null;
            e.role = null;
            e.lblName = null;
            e.parts = [];
            e.nodeBtn = null;
            e.nodeParts = null;
            e.bgurl = null;
            e.nodeMax = null;
            e.nodeUp = null;
            e.listNext = null;
            e.lblNext = null;
            e.cost = null;
            e.wearBtn = null;
            e.curcontext = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onClickRight, this);
            facade.subscribe(
                r.playerProxy.PLAYER_CLOTH_SUIT_LV,
                this.updateShow,
                this
            );
            var t = this;
            this.list.selectHandle = function () {
                t.updateShow();
            };
            for (
                var e = localcache.getList(localdb.table_usersuit),
                    o = [],
                    i = 0; i < e.length; i++
            ) {
                if (e[i].show_time && "0" != e[i].show_time) {
                    if (
                        l.timeUtil.str2Second(e[i].show_time) >
                        l.timeUtil.second &&
                        !r.limitActivityProxy.isHaveTypeActive(e[i].show_avid)
                    )
                        continue;
                } else if (
                    !r.limitActivityProxy.isHaveTypeActive(e[i].show_avid)
                )
                    continue;
                o.push(e[i]);
            }
            this.list.data = o;
            this.list.selectIndex = 0;
            this.nodeBtn.active = this.list.data && this.list.data.length > 1;
            for (i = 0; i < this.parts.length; i++)
                s.uiUtils.floatPos(
                    this.parts[i].node,
                    0,
                    10,
                    2 * Math.random() + 2
                );
            this.updateShow();

        };
        e.prototype.onClickLeft = function (t) {
            this.onClickAdd(null, -1);
        };
        e.prototype.onClickRight = function (t) {
            this.onClickAdd(null, 1);
        };
        e.prototype.onClickAdd = function (t, e) {
            if (this.nodeBtn.active) {
                var o = parseInt(e),
                    i = this.list.selectIndex,
                    n = this.list.data.length;
                i = (i = (i += o) < 0 ? n - 1 : i) >= n ? 0 : i;
                this.list.selectIndex = i;
            }
        };
        e.prototype.onClickBody = function () {
            this.nodeParts.active = !this.nodeParts.active;
        };
        e.prototype.updateShow = function () {
            var t = this.list.selectData;

            this.updateCurClothe(r.playerProxy.userClothe);
            this.clothData = [];

            var oneUnLock = false;
            if (t) {
                var e = r.playerProxy.userData,
                    o = {};
                this.lblName.string = t.name;
                this.nodeParts.active = !1;
                for (var i = 0; i < this.parts.length; i++)
                    this.parts[i].data = null;
                var n = !0;
                for (i = 0; i < t.clother.length; i++) {
                    var a = localcache.getItem(
                            localdb.table_userClothe,
                            t.clother[i]
                        ),
                        _ = new s.ItemSlotData();
                    _.kind = c.DataType.CLOTHE;
                    _.id = a.id;

                    if (r.playerProxy.isUnlockCloth(a.id)) {
                        oneUnLock = true;
                    }

                    n = n && r.playerProxy.isUnlockCloth(a.id);

                    this.clothData.push(a);


                    switch (a.part) {
                        case 1:
                            o.head = a.id;
                            this.parts[0].data = _;
                            break;

                        case 2:
                            o.body = a.id;
                            this.parts[1].data = _;
                            break;

                        case 3:
                            o.ear = a.id;
                            this.parts[2].data = _;
                            break;

                        case 4:
                            o.background = a.id;
                            this.parts[3].data = _;
                            break;

                        case 5:
                            o.effect = a.id;
                            this.parts[4].data = _;
                            break;

                        case 6:
                            o.animal = a.id;
                            this.parts[5].data = _;
                    }
                }
                this.bgurl.node.active = null != this.parts[3].data;
                if (this.bgurl.node.active) {
                    var d = localcache.getItem(
                        localdb.table_userClothe,
                        this.parts[3].data.id
                    );
                    d && (this.bgurl.url = s.uiHelps.getStoryBg(d.model));
                }
                this.role.setClothes(e.sex, e.job, e.level, o);
                var u = r.playerProxy.getSuitLv(t.id),
                    p = localcache.getItem(
                        localdb.table_userSuitLv,
                        1e3 * t.lvup + u
                    ),
                    h = localcache.getItem(
                        localdb.table_userSuitLv,
                        1e3 * t.lvup + u + 1
                    );

                this.wearBtn.interactable = oneUnLock;
                if (oneUnLock) {
                    this.wearBtn.node.zIndex = 10;
                } else {
                    this.wearBtn.node.zIndex = -100;
                }

                this.listProp.data = p ? p.ep : null;
                this.curcontext.active = p ? (p.ep.length == 0 ? false : true) : false;
                this.nodeMax.active = null == h;
                this.nodeUp.active = null != h && n;
                if (this.nodeUp.active && null != p) {
                    this.lblNext.string = i18n.t("USER_SUIT_UP_ADD", {
                        d: u
                    });
                    this.listNext.data = h ? h.ep : null;
                    this.cost.data = {
                        id: l.utils.getParamInt("clother_item"),
                        count: p.cost
                    };
                }
            }
        };

        e.prototype.updateCurClothe = function (t) {
            this._body = t ? t.body : 0;
            this._head = t ? t.head : 0;
            this._ear = t ? t.ear : 0;
            this._bg = t ? t.background : 0;
            this._eff = t ? t.effect : 0;
            this._animal = t ? t.animal : 0;
            if (0 == this._body || 0 == this._head) {
                var e = localcache.getItem(
                        localdb.table_officer,
                        r.playerProxy.userData.level
                    ),
                    o = localcache.getItem(localdb.table_roleSkin, e.shizhuang);
                0 == this._body &&
                    (this._body = r.playerProxy.getPartId(
                        2,
                        "body_0_" + o.body
                    ));
                0 == this._head &&
                    (this._head = r.playerProxy.getPartId(
                        1,
                        "headf_0_" + o.headf
                    ));
                0 == this._head &&
                    (this._head = r.playerProxy.getPartId(
                        1,
                        "headh_0_" + o.headh
                    ));
            }
        };

        e.prototype.onClickOneKeyWearErro = function () {
            l.alertUtil.alert(
                i18n.t("USER_SUIT_YI_JIAN_ERRO")
            );
        };

        e.prototype.onClickOneKeyWear = function () {


            for (var cloth of this.clothData) {


                var i = r.playerProxy.isUnlockCloth(cloth.id);
                if (i) {
                    this.onClickClothe(cloth);
                }

            }

            r.playerProxy.sendCloth(
                this._head,
                this._body,
                this._ear,
                this._bg,
                this._eff,
                this._animal
            );
        };

        e.prototype.onClickClothe = function (o) {
            if (o) {
                switch (o.part) {
                    case 1:
                        this._head = o.id;
                        break;

                    case 2:
                        this._body = o.id;
                        break;

                    case 3:
                        this._ear = o.id;
                        break;

                    case 4:
                        this._bg = o.id;
                        break;

                    case 5:
                        this._eff = o.id;
                        break;

                    case 6:
                        this._animal = o.id;
                }
            }
        };

        e.prototype.onClickUp = function () {
            var t = this.list.selectData;
            if (t) {
                var e = l.utils.getParamInt("clother_item"),
                    o = r.playerProxy.getSuitLv(t.id),
                    i = localcache.getItem(
                        localdb.table_userSuitLv,
                        1e3 * t.lvup + o
                    ),
                    n = r.bagProxy.getItemCount(e);
                l.utils.showConfirmItem(
                    i18n.t("USER_SUIT_LV_CONFIRM", {
                        n: r.playerProxy.getKindIdName(1, e),
                        d: i.cost
                    }),
                    e,
                    n,
                    function () {
                        n < i.cost ?
                            l.alertUtil.alertItemLimit(e) :
                            r.playerProxy.sendSuitLv(t.id);
                    },
                    "USER_SUIT_LV_CONFIRM"
                );
            }
        };
        e.prototype.onClickClost = function () {
            l.utils.closeView(this);
        };
        __decorate([h(i.default)], e.prototype, "list", void 0);
        __decorate([h(i.default)], e.prototype, "listProp", void 0);
        __decorate([h(n.default)], e.prototype, "role", void 0);
        __decorate([h(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([h([a.default])], e.prototype, "parts", void 0);
        __decorate([h(cc.Node)], e.prototype, "nodeBtn", void 0);
        __decorate([h(cc.Node)], e.prototype, "nodeParts", void 0);
        __decorate([h(_.default)], e.prototype, "bgurl", void 0);
        __decorate([h(cc.Node)], e.prototype, "nodeMax", void 0);
        __decorate([h(cc.Node)], e.prototype, "nodeUp", void 0);
        __decorate([h(i.default)], e.prototype, "listNext", void 0);
        __decorate([h(cc.Label)], e.prototype, "lblNext", void 0);
        __decorate([h(d.default)], e.prototype, "cost", void 0);
        __decorate([h(cc.Button)], e.prototype, "wearBtn", void 0);
        __decorate([h(cc.Node)], e.prototype, "curcontext", void 0);
        
        return (e = __decorate([p], e));
    })(cc.Component);
o.default = y;