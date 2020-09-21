var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = cc._decorator,
    n = i.ccclass,
    l = i.property,
    r = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.slider = null;
            e.progress = null;
            e.left = null;
            e.right = null;
            e.btnMax = null;
            e.changeHandler = null;
            e._max = 100;
            e._curValue = 0;
            e._showMin = 0;
            return e;
        }
        Object.defineProperty(e.prototype, "showMmin", {
            set: function(t) {
                this._showMin = t;
                this.updateBtn();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "max", {
            get: function() {
                return this._max;
            },
            set: function(t) {
                this._max = t;
                this._max = this._max > 99 ? 99 : this._max;
                this.updateCurValue();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "curValue", {
            get: function() {
                return this._curValue + 1;
            },
            set: function(t) {
                this._curValue = t > this._max - 1 ? this._max - 1 : t;
                this.updateCurValue();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "curMax", {
            get: function() {
                return this._max - 1;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.updateCurValue = function() {
            this.slider.progress =
                this.max <= 1 ? 0 : this._curValue / this.curMax;
            this.progress.progress = this.slider.progress;
            this.updateBtn();
        };
        e.prototype.onLoad = function() {
            facade.send("CLOSE_SEND_MOVE", !1);
            if (0 == this._curValue) {
                this.slider.progress = 0;
                this.progress.progress = 0;
                this.onSildeEvent();
            }
            this.scheduleOnce(this.onSildeEvent, 0.1);
        };
        e.prototype.onClickAdd = function(t, e) {
            var o = parseInt(e);
            this._curValue += o;
            this._curValue = this._curValue < 0 ? 0 : this._curValue;
            this._curValue =
                this._curValue > this.curMax ? this.curMax : this._curValue;
            this.progress.progress = this.slider.progress =
                this.max <= 1 ? 0 : this._curValue / this.curMax;
            this.updateBtn();
            this.updateMaxBtn();
        };
        e.prototype.updateMaxBtn = function() {
            this.btnMax &&
                (this.btnMax.interactable = this.curValue < this.max);
        };
        e.prototype.onClickMax = function(t, e) {
            this._curValue = this.curMax;
            this.progress.progress = this.slider.progress =
                this.max <= 1 ? 0 : this._curValue / this.curMax;
            this.updateBtn();
            this.updateMaxBtn();
        };
        e.prototype.updateBtn = function() {
            this.lblCount &&
                (this.lblCount.string = i18n.t("COMMON_COUNT", {
                    c: i18n.t("COMMON_NUM", {
                        f: this._showMin + this.curValue,
                        s: this._showMin + parseInt(this.max + "")
                    })
                }));
            this.left && (this.left.interactable = this.curValue > 1);
            this.right && (this.right.interactable = this.curValue < this.max);
        };
        e.prototype.onSildeEvent = function() {
            this.slider.progress =
                this.slider.progress > 1 ? 1 : this.slider.progress;
            this.progress.progress = this.slider.progress;
            this._curValue = Math.floor(this.slider.progress * this.curMax);
            this.updateBtn();
            this.updateMaxBtn();
            this.changeHandler && this.changeHandler();
        };
        e.prototype.onDestroy = function() {
            facade.send("CLOSE_SEND_MOVE", !0);
            this.unscheduleAllCallbacks();
        };
        __decorate([l(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([l(cc.Slider)], e.prototype, "slider", void 0);
        __decorate([l(cc.ProgressBar)], e.prototype, "progress", void 0);
        __decorate([l(cc.Button)], e.prototype, "left", void 0);
        __decorate([l(cc.Button)], e.prototype, "right", void 0);
        __decorate([l(cc.Button)], e.prototype, "btnMax", void 0);
        return (e = __decorate([n], e));
    })(cc.Component);
o.default = r;
