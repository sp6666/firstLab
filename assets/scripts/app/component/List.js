var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.content = null;
            e.item = null;
            e.itemPrefab = null;
            e.scrollView = null;
            e.bufferZone = 0;
            e.repeatX = 1;
            e.spaceX = 0;
            e.spaceY = 0;
            e.paddingTop = 0;
            e.paddingBottom = 0;
            e.isDelayCreate = !1;
            e.isReverY = !1;
            e.isHorizonList = !1;
            e.isShowEffect = !0;
            e._data = null;
            e._renders = null;
            e.lastIndex = 0;
            e._itemHeight = 0;
            e._itemWidth = 0;
            e._selectHandle = null;
            e._selectIndex = -1;
            return e;
        }
        Object.defineProperty(e.prototype, "data", {
            get: function() {
                return this._data;
            },
            set: function(t) {
                this._data = t;
                if (null != this._data)
                    for (var e = 0; e < this._data.length; e++)
                        this._data[e] && (this._data[e].__index = e);
                this.renderNext();
                if (
                    this._renders &&
                    this._renders.length > 0 &&
                    this.isShowEffect
                )
                    for (e = 0; e < this._renders.length; e++)
                        this._renders[e].showNodeAnimation();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "selectHandle", {
            set: function(t) {
                this._selectHandle = t;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "selectIndex", {
            get: function() {
                return this._selectIndex;
            },
            set: function(t) {
                this._selectIndex = t;
                if (null != this._renders) {
                    for (var e = 0; e < this._renders.length; e++)
                        this._renders[e].select =
                            this._renders[e].data == this.selectData;
                    null != this._selectHandle &&
                        this._selectHandle(this.selectData);
                }
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "selectData", {
            get: function() {
                return null == this._data ||
                    this._selectIndex >= this._data.length ||
                    this._selectIndex < 0
                    ? null
                    : this._data[this._selectIndex];
            },
            set: function(t) {
                null != this._data &&
                    (this.selectIndex = this._data.indexOf(t));
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onLoad = function() {
            if (null != this.item || null != this.itemPrefab) {
                this.item && (this.item.node.active = !1);
                this.schedule(this.onTimer, 0.05);
            } else cc.error("List not set item!!!!!!!!!!!!!!!!!!!!!!");
        };
        e.prototype.onDestroy = function() {
            this.unscheduleAllCallbacks();
            this.selectHandle = null;
            this._data = null;
            this._renders = null;
        };
        e.prototype.onTimer = function() {
            null != this._data &&
                null != this._renders &&
                (null != this.scrollView || this.isDelayCreate
                    ? this.isDelayCreate &&
                      this._renders.length < this.data.length
                        ? this.createBuffer()
                        : this.isDelayCreate &&
                          this._renders.length >= this.data.length &&
                          0 == this.bufferZone
                        ? this.unscheduleAllCallbacks()
                        : this.updateShow()
                    : this.unscheduleAllCallbacks());
        };
        e.prototype.updateShow = function() {
            var t = 0,
                e = 0;
            if (this.isHorizonList) {
                t = this.scrollView ? -this.scrollView.getScrollOffset().x : 0;
                e = Math.floor(
                    (t - this.paddingTop) / (this._itemWidth + this.spaceX)
                );
            } else {
                t = this.scrollView ? this.scrollView.getScrollOffset().y : 0;
                e = Math.floor(
                    (t - this.paddingTop) / (this._itemHeight + this.spaceY)
                );
            }
            e = Math.min(
                e,
                (this._data.length - this.bufferZone) / this.repeatX
            );
            if ((e = Math.max(e, 0)) != this.lastIndex) {
                var o = this._renders.length;
                this.lastIndex = e;
                e *= this.repeatX;
                for (var i = this.getLastIndexs(e), n = 0; n < o; n++) {
                    var l =
                        this._data.length > n + e ? this._data[n + e] : null;
                    if (null != l) {
                        var r =
                            null != i[l.__index]
                                ? i[l.__index]
                                : this.getNullIndex();
                        if (-1 != r) {
                            var a = this._renders[r];
                            if (null != a) {
                                this._itemHeight != a.node.height &&
                                    0 != this._itemHeight &&
                                    a.setWidthHeigth(
                                        this._itemWidth,
                                        this._itemHeight
                                    );
                                if (this.isHorizonList) {
                                    a.node.x =
                                        (this._itemWidth + this.spaceX) *
                                        (n + e);
                                    a.node.y = 0;
                                } else {
                                    a.node.x =
                                        (this._itemWidth + this.spaceX) *
                                        ((n + e) % this.repeatX);
                                    a.node.y =
                                        -(this._itemHeight + this.spaceY) *
                                            Math.floor((n + e) / this.repeatX) -
                                        this.paddingTop;
                                    this.isReverY && (a.node.y = -a.node.y);
                                }
                                a.node.active = this._data.length > n + e;
                                a.node.data = a.data = l;
                                a.select = n + e == this._selectIndex;
                            }
                        }
                    }
                }
            }
        };
        e.prototype.getLastIndexs = function(t) {
            for (var e = {}, o = this._renders.length, i = 0; i < o; i++) {
                var n = this._renders[i].data;
                null != n && (n.__index < t || n.__index >= t + o)
                    ? (this._renders[i].data = null)
                    : null != n && (e[n.__index] = i);
            }
            return e;
        };
        e.prototype.getNullIndex = function() {
            for (var t = 0; t < this._renders.length; t++)
                if (null == this._renders[t].data) return t;
            return -1;
        };
        e.prototype.renderNext = function() {
            null == this._renders && (this._renders = new Array());
            this.lastIndex = -1;
            if (null != this._data && 0 != this._data.length) {
                this.createBuffer();
                for (o = 0; o < this._renders.length; o++) {
                    this._renders[o].data = null;
                    this._renders[o].node.active = !1;
                }
                e = Math.ceil(this._data.length / this.repeatX);
                var t = Math.min(this._data.length, this.repeatX);
                if (this.isHorizonList) {
                    this.node.height = this._itemHeight + this.spaceY;
                    this.node.width =
                        e * (this._itemWidth + this.spaceX) +
                        this.paddingTop +
                        this.paddingBottom;
                    null != this.content &&
                        this.content != this.node &&
                        (this.content.width = this.node.width - this.node.x);
                } else {
                    this.node.height =
                        e * (this._itemHeight + this.spaceY) +
                        this.paddingTop +
                        this.paddingBottom;
                    this.node.width = t * (this._itemWidth + this.spaceX);
                    null != this.content &&
                        this.content != this.node &&
                        (this.content.height = this.node.height - this.node.y);
                }
                this.updateShow();
            } else
                for (var e = this._renders.length, o = 0; o < e; o++) {
                    var i = this._renders[o];
                    i.node.data = i.data = null;
                }
        };
        e.prototype.createBuffer = function() {
            var t =
                0 != this.bufferZone
                    ? this.bufferZone
                    : this._data && this._data.length > 0
                    ? this._data.length
                    : 0;
            if (this._renders.length >= t) this.isDelayCreate = !1;
            else {
                this.repeatX = 0 == this.repeatX ? 1 : this.repeatX;
                for (var e = this._renders.length; e < t; e++) {
                    var o = this.item
                        ? cc.instantiate(this.item.node)
                        : cc.instantiate(this.itemPrefab);
                    o.active = !0;
                    var n = o.getComponent(i.default);
                    if (n) {
                        this._itemHeight =
                            0 == this._itemHeight || null == this._itemHeight
                                ? n.node.height
                                : this._itemHeight;
                        this._itemWidth =
                            0 == this._itemWidth || null == this._itemWidth
                                ? n.node.width
                                : this._itemWidth;
                        this._renders.push(n);
                        this.node.addChild(o);
                        if (this.isHorizonList) {
                            n.node.x = (this._itemWidth + this.spaceX) * e;
                            n.node.y = 0;
                        } else {
                            n.node.x =
                                (this._itemWidth + this.spaceX) *
                                (e % this.repeatX);
                            n.node.y =
                                -(this._itemHeight + this.spaceY) *
                                    Math.floor(e / this.repeatX) -
                                this.paddingTop;
                            this.isReverY && (n.node.y = -n.node.y);
                        }
                    } else cc.error("List UI class is base ListItem find");
                    var l = o.getComponent(cc.Button);
                    l &&
                        l.clickEvents &&
                        l.clickEvents.length > 0 &&
                        (l.clickEvents[0].customEventData = n);
                    if (l && l.clickEvents) {
                        var r = new cc.Component.EventHandler();
                        r.component = "List";
                        r.target = this.node;
                        r.handler = "selectItem";
                        r.customEventData = n;
                        l.clickEvents.push(r);
                    }
                    if (this.isDelayCreate) {
                        n.node.data = n.data =
                            this._data.length > e ? this._data[e] : null;
                        return;
                    }
                    if (this._renders.length >= t) return;
                }
            }
        };
        e.prototype.updateItemShow = function() {
            if (null != this._renders)
                for (var t = 0; t < this._renders.length; t++)
                    this._renders[t].data = this._renders[t].data;
        };
        e.prototype.selectItem = function(t, e) {
            var o = e;
            o && o.data && (this.selectData = o.data);
        };
        e.prototype.setWidthHeight = function(t, e) {
            this._itemHeight = e;
            this._itemWidth = t;
            if (null != this._renders)
                for (var o = 0; o < this._renders.length; o++)
                    this._renders[o].setWidthHeigth(t, e);
        };
        e.prototype.resetScroll = function() {
            if (null != this.scrollView) {
                this.scrollView.stopAutoScroll();
                this.scrollView.scrollToTopLeft();
            }
        };
        __decorate([r(cc.Node)], e.prototype, "content", void 0);
        __decorate([r(i.default)], e.prototype, "item", void 0);
        __decorate([r(cc.Prefab)], e.prototype, "itemPrefab", void 0);
        __decorate([r(cc.ScrollView)], e.prototype, "scrollView", void 0);
        __decorate([r], e.prototype, "bufferZone", void 0);
        __decorate([r], e.prototype, "repeatX", void 0);
        __decorate([r], e.prototype, "spaceX", void 0);
        __decorate([r], e.prototype, "spaceY", void 0);
        __decorate([r], e.prototype, "paddingTop", void 0);
        __decorate([r], e.prototype, "paddingBottom", void 0);
        __decorate(
            [
                r({
                    tooltip: "是否延迟创建"
                })
            ],
            e.prototype,
            "isDelayCreate",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "是否从下到上反转Y"
                })
            ],
            e.prototype,
            "isReverY",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "是否只是横向列表"
                })
            ],
            e.prototype,
            "isHorizonList",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "设置新数据是否显示子对象动画"
                })
            ],
            e.prototype,
            "isShowEffect",
            void 0
        );
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
