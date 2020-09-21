var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
/*
var itemState = {
    itemState: normal = 0,       //��ͨ״̬
    itemState: select = 1,       //ѡ��
    itemState: disable = 2,      //����ȡ
};
*/

var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../utils/UIUtils"),
    utils = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            //
            e.normalBg = null;
            e.selectBg = null;
            e.disableBg = null;
            e.itemSlot = null;
            e.lblCount = null;
            e.countNode = null;
            e.curState = 0;
            e.linQu = false;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.kaixueProxy.KAIXUE_ITEM_LINQU,
                this.onItemLinQu,
                this
            );
        };
        Object.defineProperty(e.prototype, "select", {
            set: function (t) {
                //״̬
                if (t == true) {
                    this.setState(1);
                }
                else {
                    if(this.linQu)
                    {
                        this.setState(2);
                    }
                    else
                    {
                        this.setState(0);
                    }
                }

                //����
                if (this.eff) {
                    this.eff.node.active = t;
                    t && (this.eff.animation = "animation");
                }
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = new l.ItemSlotData();
                e.itemid = t.itemid;
                e.count = t.count;
                
                this.linQu = false;
                var acqList = r.kaixueProxy.data.acquired_rewards;
                for(var index = 0; index < acqList.length; index++)
                {
                    if(acqList[index] == t.id || r.kaixueProxy.lastRwd == t.id)
                    {
                        this.linQu = true;
                        break;
                    }
                }

                if (this.linQu) {
                    this.setState(2);
                }
                else {
                    this.setState(0);
                };

                this.itemSlot.data = e;
                this.lblCount &&
                    (this.lblCount.string = t.count > 1 ? t.count + "" : "");
                this.countNode.active = t.count > 1;
            }
        };

        //
        e.prototype.onItemLinQu = function() {
            this.linQu = true;
            this.setState(2);
        };

        e.prototype.getState = function(){
            return this.curState;
        };
        //
        e.prototype.setState = function (state) {
            cc.log("=====id:" + this.data.id)
            cc.log("-----setState:" + state);
            this.curState = state;
            switch (state) {
                case 2:
                    {
                        this.selectBg.active = false;
                        this.disableBg.active = true;
                        this.normalBg.active = false;

                        if (!utils.stringUtil.isBlank(this.itemSlot)) {
                            this.itemSlot.setGray(true);
                        };
                        break;
                    }
                case 1:
                    {
                        this.selectBg.active = true;
                        this.disableBg.active = false;
                        this.normalBg.active = false;
                        break;
                    }
                case 0:
                default:
                    {
                        this.selectBg.active = false;
                        this.disableBg.active = false;
                        this.normalBg.active = true;

                        if (!utils.stringUtil.isBlank(this.itemSlot)) {
                            this.itemSlot.setGray(false);
                        };
                        break;
                    }
            };
        };

        //
        __decorate([c(cc.Node)], e.prototype, "normalBg", void 0);  //��ͨ���
        __decorate([c(cc.Node)], e.prototype, "selectBg", void 0);  //ѡ�����
        __decorate([c(cc.Node)], e.prototype, "disableBg", void 0); //����ȡ

        __decorate([c(n.default)], e.prototype, "itemSlot", void 0);    //��Ʒicon
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);     //����
        __decorate([c(cc.Node)], e.prototype, "countNode", void 0);     //�������
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
