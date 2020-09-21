var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.tipNode = null;
            e.toggleStar = [];
            e.toggleSex = [];
            e.toggleMarry = [];
            e.selectStar = [0];
            e.selectSex = [0];
            e.selectMarry = [0];
            return e;
        }
        e.prototype.onLoad = function () {
            var array = [];
            this.selectStar = l.timeProxy.getLoacalValue("CHILD_LILIANSON_STAR");
            if (!this.selectStar) {
                this.selectStar = [0];
            } else {
                array = this.selectStar.split(",");
                this.selectStar = [];
                for (const iterator of array) {
                    this.selectStar.push(~~iterator);
                }
            }
            this.checkToggle(this.toggleStar, this.selectStar);

            this.selectSex = l.timeProxy.getLoacalValue("CHILD_LILIANSON_SEX");
            if (!this.selectSex) {
                this.selectSex = [0];
            } else {
                array = this.selectSex.split(",");
                this.selectSex = [];
                for (const iterator of array) {
                    this.selectSex.push(~~iterator);
                }
            }
            this.checkToggle(this.toggleSex, this.selectSex);

            this.selectMarry = l.timeProxy.getLoacalValue("CHILD_LILIANSON_MARRY");
            if (!this.selectMarry) {
                this.selectMarry = [0];
            } else {
                array = this.selectMarry.split(",");
                this.selectMarry = [];
                for (const iterator of array) {
                    this.selectMarry.push(~~iterator);
                }
            }
            this.checkToggle(this.toggleMarry, this.selectMarry);
            this.onListReset();
        };
        e.prototype.sortList = function (t, e) {
            return t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4 >
                e.ep.e1 + e.ep.e2 + e.ep.e3 + e.ep.e4
                ? -1
                : 1;
        };
        //add by cjf
        e.prototype.checkToggle = function (array, selectArray) {
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                if (selectArray.indexOf(index) > -1) {
                    element.isChecked = true;//check();
                } else {
                    element.isChecked = false;//uncheck();
                }
            }
        }
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };

        //星级筛选
        e.prototype.onClickStar = function (event, customEventData) {
            //全部和其他区分,其他可复选
            if (this.selectStar.indexOf(0) > -1 || ~~customEventData == 0) {
                this.selectStar = [];
                this.selectStar.push(~~customEventData);
            } else {
                this.selectStar.push(~~customEventData);
                var array = [];
                for (const iterator of this.selectStar) {
                    if (~~customEventData == ~~iterator) {
                        if (event.isChecked)
                            array.push(iterator);
                        continue;
                    }
                    array.push(iterator);
                }
                this.selectStar = array;
            }
            if (this.selectStar.length == this.toggleStar.length - 1 || this.selectStar.length == 0) {
                this.toggleStar[0].check();
                return;
            }
            l.timeProxy.saveLocalValue("CHILD_LILIANSON_STAR", this.selectStar);
            this.checkToggle(this.toggleStar, this.selectStar);
            this.onListReset();
        };

        //性别筛选
        e.prototype.onClickSex = function (event, customEventData) {
            //全部和其他区分,其他可复选
            if (this.selectSex.indexOf(0) > -1 || ~~customEventData == 0) {
                this.selectSex = [];
                this.selectSex.push(~~customEventData);
            } else {
                this.selectSex.push(~~customEventData);
                var array = [];
                for (const iterator of this.selectSex) {
                    if (~~customEventData == ~~iterator) {
                        if (event.isChecked)
                            array.push(iterator);
                        continue;
                    }
                    array.push(iterator);
                }
                this.selectSex = array;
            }
            if (this.selectSex.length == this.toggleSex.length - 1 || this.selectSex.length == 0) {
                this.toggleSex[0].check();
                return;
            }
            l.timeProxy.saveLocalValue("CHILD_LILIANSON_SEX", this.selectSex);
            this.checkToggle(this.toggleSex, this.selectSex);
            this.onListReset();
        };

        //婚姻筛选
        e.prototype.onClickMarriage = function (event, customEventData) {
            //全部和其他区分,其他可复选
            if (this.selectMarry.indexOf(0) > -1 || ~~customEventData == 0) {
                this.selectMarry = [];
                this.selectMarry.push(~~customEventData);
            } else {
                this.selectMarry.push(~~customEventData);
                var array = [];
                for (const iterator of this.selectMarry) {
                    if (~~customEventData == ~~iterator) {
                        if (event.isChecked)
                            array.push(iterator);
                        continue;
                    }
                    array.push(iterator);
                }
                this.selectMarry = array;
            }
            if (this.selectMarry.length == this.toggleMarry.length - 1 || this.selectMarry.length == 0) {
                this.toggleMarry[0].check();
                return;
            }
            l.timeProxy.saveLocalValue("CHILD_LILIANSON_MARRY", this.selectMarry);
            this.checkToggle(this.toggleMarry, this.selectMarry);
            this.onListReset();
        };

        //重置列表
        e.prototype.onListReset = function () {
            for (var t = [], e = 0; e < l.sonProxy.childList.length; e++) {
                var o = l.sonProxy.childList[e];
                o.state > 0 &&
                    !l.sonProxy.isTraveling(o.id) &&
                    5 != o.state &&
                    6 != o.state &&
                    7 != o.state &&
                    10 != o.state &&
                    //add by cjf
                    (this.selectStar.indexOf(o.talent) > -1 || this.selectStar.indexOf(0) > -1) &&
                    (this.selectSex.indexOf(o.sex) > -1 || this.selectSex.indexOf(0) > -1) &&
                    (this.selectMarry.indexOf(0) > -1 || (this.selectMarry.indexOf(1) > - 1 && o.state == proto_sc.SomState.huen) || (this.selectMarry.indexOf(2) > - 1 && o.state != proto_sc.SomState.huen)) &&
                    t.push(l.sonProxy.childList[e]);
            }
            t.sort(this.sortList);
            this.tipNode.active = 0 == t.length;
            this.list.data = t;
        }

        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "toggleStar", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "toggleSex", void 0);
        __decorate([s(cc.Toggle)], e.prototype, "toggleMarry", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
