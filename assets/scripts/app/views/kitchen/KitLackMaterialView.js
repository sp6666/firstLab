var n = require("../../component/List"),
    l = require("../../utils/Utils"),
    i = require("../../Initializer")
cc.Class({
    extends: cc.Component,

    properties: {
        list: {
            default: null,
            type: n.default
        },
        costCount: {
            default: null,
            type: cc.Label
        },
        //icon
        costIcon: {
            default: null,
            type: cc.Sprite
        },
        lblMycount:{
            default:null,
            type:cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        facade.subscribe(
            i.kitchenProxy.GET_LACK_MATERIAL,
            this.oncloseView,
            this
        );
        var params =this.node.openParam;
        this.materialitems =[];//材料
        var cost =0;
        for (const key in params) {
            var item={};
            if (params.hasOwnProperty(key)) {
                const element = params[key];
                item.id=element.id;
                item.count=element.needcount;
                console.log("缺少的食材 itemid"+element.id+"  数量"+element.needcount);
                item.cost =this.getcostByItemId(element.id);//单价
                cost +=this.getcostByItemId(element.id)*element.needcount;//总价累计
                this.materialitems.push(item);
            }
        }
        this.allcost =cost;
        this.lblMycount.string =i.playerProxy.userData.coin;
        this.costCount.string=String(cost);
        this.list.data =this.materialitems;

    },

    getcostByItemId(itemid){
        var items =localcache.getList(localdb.table_kitshop);
        var cost =0;
        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                const element = items[key];
                if(itemid ==element.itemid){
                    cost =element.cost;
                    break;
                }
            }
        }
        return cost;
    },

    start() {

    },

    // update (dt) {},

    //购买
    onBuy() {
        i.kitchenProxy.sendBuyLackMaterial(this.materialitems);
    },

    oncloseView() {
        l.utils.closeView(this);
    }
});
