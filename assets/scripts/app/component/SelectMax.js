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
            e.left = null;
            e.right = null;
            e.btnMax = null;
            e.changeHandler = null;
            e.editBox = null;
            e.buyOnce = 99;
            e._max = 99;
            e._curValue = 1;
            e._showMin = 0;
            e._baseCount = 1;
            return e;
        }
        Object.defineProperty(e.prototype, "baseCount", {
            set: function(t) {
                t <= 0 || (this._baseCount = t);
            },
            enumerable: !0,
            configurable: !0
        });
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
                this._max = this._max > this.buyOnce ? this.buyOnce : this._max;
                this.updateBtn();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "curValue", {
            get: function() {
                return this._curValue;
            },
            set: function(t) {
                this._curValue = t > this._max ? this._max : t;
                this._curValue = this._curValue < 1 ? 1 : this._curValue;
                this.updateBtn();
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onClickAdd = function(t, e) {
            var o = parseInt(e);
            var cur = parseInt(this._curValue);
            this._curValue = cur + o;
            this._curValue = this._curValue < 1 ? 1 : this._curValue;
            // this._curValue =
            //     this._curValue > this.max ? this.max : this._curValue;
            this.updateBtn();
        };
        e.prototype.onClickMax = function(t, e) {
            this._curValue = this.max;
            this.updateBtn();
        };
        e.prototype.updateBtn = function() {
            this.lblCount &&
                (this.lblCount.string =
                    this._showMin + this.curValue * this._baseCount + "");
            this.left && (this.left.interactable = this.curValue > 1);
            //this.right && (this.right.interactable = this.curValue < this.max);
            this.btnMax &&
                (this.btnMax.interactable = this.curValue < this.max);
            this.changeHandler && this.changeHandler();
        };
        e.prototype.onLoad = function() {
            // if(this.editBox._sgNode != null) {
            //     var children = this.editBox._sgNode._children;
            //     for(var index = 0; index < children.length; index ++) {
            //         children[index]._visible = false;
            //     }
            // }
            // this.editBox.textLabel.node.active = false;
            // this.editBox.placeholderLabel.node.active = false;
            //this.hideEditContent();
            if(this.editBox != null && this.editBox._sgNode != null) {
                //this.editBox._sgNode._renderCmd._edTxt.style["text-align"] = "center";
                //this.editBox._sgNode._renderCmd._edTxt.style["text-align"] = "center"; 
            }
        };
        e.prototype.onTextChange = function() {
            this.lblCount.string = this.editBox.string;
        };
        e.prototype.onTextDidEnd = function() {
            this.endEditing();
        };
        e.prototype.editingDidBegan = function() {
            this.lblCount.node.active = false;
        };

        e.prototype.editingReturn = function() {
            this.endEditing();
        };
        e.prototype.endEditing = function() {
            if(this.editBox.string == "" || this.editBox.string == null) {
                this.lblCount.string = this._curValue;
            }else {
                this._curValue = parseInt(this.editBox.string);
            }
            this.updateBtn();
            this.hideEditContent();
        };
        e.prototype.hideEditContent = function() {
            this.lblCount.node.active = true;
            this.editBox.string = "";
        };
        __decorate([l(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([l(cc.Button)], e.prototype, "left", void 0);
        __decorate([l(cc.Button)], e.prototype, "right", void 0);
        __decorate([l(cc.Button)], e.prototype, "btnMax", void 0);
        __decorate([l(cc.EditBox)], e.prototype, "editBox", void 0);
        return (e = __decorate([n], e));
    })(cc.Component);
o.default = r;
