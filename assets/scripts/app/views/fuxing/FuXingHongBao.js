/**
 * 该节点的最上面会出现新春红包
 */
const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
const TimeProxy = require("../../models/TimeProxy");
//const FuXingHongBaoItem = require("./FuXingHongBaoItem");

cc.Class({
    extends: cc.Component,

    properties: {
        fuXingHongBaoItem : cc.Prefab,
        nodeName : "",
    },


    onLoad() {
        cc.log("FuXingBongBao === start " + this.node.name);


        this.clearHongBao();
        if(!this.checkActive()) return;
        facade.subscribe(Initializer.fuXingProxy.FUXING_HONGBAO_UPDATE, this.onDataUpdate, this); //获得数据
        if(Initializer.fuXingProxy.hongbaoData == null) {
            Initializer.fuXingProxy.sendOpenActivity(()=> {
                //this.loadHongBao();
            })
        }else {
            this.loadHongBao();
        }
    },

    start () {
        
    },


    checkActive : function() {
        var list = Initializer.limitActivityProxy.huodongList;
        if(list == null) return false;
        for (var idx = 0; idx < list.length; idx++) {
            if (list[idx].id == Initializer.limitActivityProxy.FUXING_ID) {
                var funitem = {
                    id: 137,
                }
                return TimeProxy.funUtils.isOpenFun(funitem);
            }
        }

        return false;
    },
    
    clearHongBao : function() {
        this.node.removeAllChildren();
    },

    loadHongBao : function() {
        //创建红包
        var list = Initializer.fuXingProxy.getHongBaoList(this.nodeName);
        for(var i = 0; i < list.length; i++) {
            var o = cc.instantiate(this.fuXingHongBaoItem);
            this.node.addChild(o);
            var ctr = o.getComponent(o.name);
            ctr.init(list[i]);
        }
        
    },

    onDataUpdate : function() {
        this.clearHongBao();
        this.loadHongBao();
    },

    onDestroy() {
        cc.log("FuXingBongBao === destory " + this.node.name);
    }
    
});
