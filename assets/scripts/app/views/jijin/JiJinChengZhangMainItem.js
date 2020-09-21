
const i = require("../../component/RenderListItem");
const list =require("../../component/List");
const Initializer = require("../../Initializer");
cc.Class({
    extends: i.default,

    properties: {
        lblDesc:cc.Label,
        btnGet:cc.Button,
        items:list.default
    },


    onLoad () {
    },
    showData(){
        var data =this._data;
        var l = localcache.getItem(localdb.table_mainTask, data.cfg.task_id);
        this.lblDesc.string =i18n.t("JIJIN_MAINTASK",{n:l.msg});
        // l.msg;
        this.btnGet.node.active =!data.isGet;
        this.btnGet.interactable =data.statue;
        this.items.data =data.cfg.rwd;
    },
    btnGetRwd(){
        Initializer.jiJinChengZhangProxy.sendGetMainRwd();
    },
    start () {

    },

    // update (dt) {},
});
