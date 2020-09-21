var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../component/RedDot"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btns = [];
            e.subBtns = [];
            e.nodes = [];
            e.lists = [];
            e.nodeEmpty = null;
            e.lblItem = null;
            e.lblMix = null;
            e.seColor = null;
            e.norColor = null;
            e.norSubColor = null;
            e.selectImg = null;
            e.itemImg = null;
            e.mixImg = null;
            e.box1Widget = null;
            e.subBtnIndex = 0;  //
            e.showtype = 2; //显示类型
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_CHENGHAO,
                this.onUpdateChList,
                this
            );
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_HECHENG,
                this.onUpdateHeList,
                this
            );
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_ITEM,
                this.onUpdateItemList,
                this
            );
            this.initSubRedDot();
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.onClickTab(null, 1);
        };
        e.prototype.initSubRedDot = function() {
            for(var idx = 0; idx < l.bagProxy.listRedDot.length; idx++)
            {
                var it = localcache.getItem(localdb.table_item, l.bagProxy.listRedDot[idx].id);
                if(it)
                {
                    var type = it.showtype == undefined ? 0 : it.showtype;
                    r.default.change("bagsub" + type, true);
                }
            }
            l.bagProxy.listRedDot = [];
        };
        e.prototype.onClickItem = function(t, e) {
            var o = e.data;
            if (o) {
                o.isNew = !1;
                e.showData();
                var n = l.bagProxy.getHecheng(o.id);
                null != n
                    ? i.utils.openPrefabView("bag/BagHecheng", !1, n)
                    : i.utils.openPrefabView("bag/BagUse", !1, o);
            }
        };
        e.prototype.onClickTab = function(t, e) {
            for (var o = parseInt(e) - 1, i = 0; i < this.btns.length; i++) {
                this.btns[i].interactable = i != o;
                this.nodes[i].active = i == o;
            }
            this.lblItem.node.color = "1" == e ? this.seColor : this.norColor;
            this.lblMix.node.color = "2" == e ? this.seColor : this.norColor;
            this.itemImg.spriteFrame = "1" == e ? this.selectImg : null;
            this.mixImg.spriteFrame = "2" == e ? this.selectImg : null;
            switch (o) {
                case 0:
                    //this.onUpdateItemList();
                    this.onClickSubTab(null, this.subBtnIndex);
                    break;

                case 1:
                    this.onUpdateHeList();
                    break;

                case 2:
                    this.lists[2].data = l.bagProxy.chInfo.list;
            }
        };
        //背包分类
        e.prototype.onClickSubTab = function(t, e) {
            this.subBtnIndex = parseInt(e);
            for (var i = 0; i < this.subBtns.length; i++) {
                this.subBtns[i].interactable = i != this.subBtnIndex;

                var nodeNormal = this.subBtns[i].node.getChildByName("nodeNormal");
                if(nodeNormal)
                {
                    nodeNormal.active = i != this.subBtnIndex;
                }

                var nodePushed = this.subBtns[i].node.getChildByName("nodePushed");
                if(nodePushed)
                {
                    nodePushed.active = i == this.subBtnIndex;
                }

                if(this.subBtnIndex == i)
                {
                    this.showtype = this.changeIdxToShowType(this.subBtnIndex); //index转道具类型
                    r.default.change("bagsub" + this.showtype, false);
                }
            }

            this.onUpdateItemList();
        };
        //按钮index转类型
        e.prototype.changeIdxToShowType = function(idx) {
            switch(idx)
            {
                case 0:
                    {
                        //伙伴
                        return 2;
                    }
                case 1:
                    {
                        //知己
                        return 3;
                    }
                case 2:
                    {
                        //情愫
                        return 4;
                    }
                case 3:
                    {
                        //道具
                        return 0;
                    }
                case 4:
                    {
                        //活动
                        return 1;
                    }
                default:
                    {
                        //伙伴
                        return 2;
                    }
            }
        };
        e.prototype.onUpdateItemList = function() {
            var t = l.bagProxy.getItemList();
            var typelist = [];
            for(var idx = 0; idx < t.length; idx++)
            {
                if(t[idx].showtype == this.showtype)
                {
                    typelist.push(t[idx]);
                }
            }
            //this.lists[0].data = t;
            //this.nodeEmpty.active = 0 == l.bagProxy.itemList.length;
            this.lists[0].data = typelist;
            this.lists[0].resetScroll();
            this.nodeEmpty.active = 0 == typelist.length;
            this.onUpdateHeList();
        };
        e.prototype.onUpdateHeList = function() {
            null == l.bagProxy.heChengList && l.bagProxy.initHeChengList();
            this.lists[1].data = l.bagProxy.heChengList;
        };
        e.prototype.onUpdateChList = function() {};
        e.prototype.onClickBlack = function() {
            facade.send("BAG_CLICK_BLANK");
        };
        e.prototype.onClickClose = function() {
            r.default.change("bagview", !1);
            i.utils.closeView(this, !0);
        };
        __decorate([c([cc.Button])], e.prototype, "btns", void 0);
        __decorate([c([cc.Button])], e.prototype, "subBtns", void 0);   //分类按钮
        __decorate([c([cc.Node])], e.prototype, "nodes", void 0);
        __decorate([c([n.default])], e.prototype, "lists", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeEmpty", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblItem", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMix", void 0);
        __decorate([c(cc.Color)], e.prototype, "seColor", void 0);
        __decorate([c(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([c(cc.Color)], e.prototype, "norSubColor", void 0);  //分类按钮文字颜色
        __decorate([c(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "itemImg", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "mixImg", void 0);
        __decorate([c(cc.Widget)], e.prototype, "box1Widget", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
