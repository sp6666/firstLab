var list= require("../../component/List");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,

    properties: {
        //列表
        list: {
            default: null,
            type: list.default
        }
    },
    onLoad () {
        facade.subscribe(init.guanxiProxy.ON_RELATION_FLOWER_SELECT, this.onClickClose, this); //点击鲜花以后关闭本窗口
        this.updateFlowers();
    },

    // start () {

    // },

    updateFlowers () {
        //刷新鲜花列表
        var flowerList = localcache.getList(localdb.table_friend_flowerCore);
        this.list.data = flowerList;
    },

    //点击
    onClickClose() {
        //点击关闭
        utils.utils.closeView(this, false);
    },
});

