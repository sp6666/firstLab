var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.rwdList = null;
            e.taskList = null;
            e.lblTime = null;
            e.lblChange = null;
            e.lblNum = null;
            e.welcome = null;
            e.oldNum = -1;

            e.isChangeTask = false;
            return e;
        }
        e.prototype.onLoad = function() {
            //去掉旧的代码响应
            /*
            facade.subscribe(
                l.lionProxy.LION_DATA_UPDATE,
                this.onLionData,
                this
            );
            facade.subscribe(l.lionProxy.LION_GOLD_LOCK, this.onLionData, this);
            facade.subscribe(l.lionProxy.LION_VIEW_CLOSE, this.onClickClose, this);

            //购买解锁回调
            l.lionProxy.isUnlocking = false; 
            facade.subscribe("MOON_CARD_BUY_UPDATE",this.onUnlockSuccess,this);
            facade.subscribe("RECHARGE_FAIL",this.onUnlockFail,this);

            this.welcome.active = l.lionProxy.isFirst;
            l.lionProxy.isFirst && (l.lionProxy.isFirst = !1);
            l.purchaseProxy.sendOpenPrince();
            l.lionProxy.sendOpenActivity();
            */
        };
        e.prototype.onLionData = function() {
            if (null != l.lionProxy.cfg) {
                1 == l.lionProxy.cfg.isGold && (l.lionProxy.isLockGold = !0);
                var t = this;
                r.uiUtils.countDown(
                    l.lionProxy.cfg.info.eTime,
                    this.lblTime,
                    function() {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );

                var allsGet = 1;
                l.lionProxy.cfg.rwd.sort(function(t, e) {
                    if(!t.sGet || !e.sGet) allsGet = 0;

                    if (l.lionProxy.isLockGold) {
                        var o = 1 == t.sGet && 1 == t.gGet ? 1 : 0,
                            i = 1 == e.sGet && 1 == e.gGet ? 1 : 0;
                        if (o != i) return o - i;
                    } else {
                        var n = 1 == t.sGet ? 1 : 0,
                            r = 2 == e.sGet ? 1 : 0;
                        if (n != r) return n - r;
                    }
                    
                    return t.id - e.id;
                });
            
                 //如果全部领取完
                 if(allsGet){
                    var btnChange = this.lblChange.node.parent.getComponent(cc.Button);
                    btnChange.enableAutoGrayEffect = true;
                    btnChange.interactable = false;
                    this.lblChange.string =  i18n.t("LION_ALL_FINISHED");

                    for(var i = 0;i< l.lionProxy.cfg.task.length;++i){
                        l.lionProxy.cfg.task[i].get = 1;
                    }
                }

                this.rwdList.data = l.lionProxy.cfg.rwd;
                l.lionProxy.cfg.task.sort(function(t, e) {
                    var o = localcache.getItem(localdb.table_lion_task, t.id),
                        i = localcache.getItem(localdb.table_lion_task, e.id),
                        n = t.num >= o.num ? 0 : 1,
                        l = e.num >= i.num ? 0 : 1;
                    return t.get != e.get ? t.get - e.get : n - l;
                });
                this.taskList.data = l.lionProxy.cfg.task;
                this.lblNum.string = l.lionProxy.cfg.cons + "";
                //非第一次执行
                if ( -1 != this.oldNum) {
                    var e = l.lionProxy.cfg.cons - this.oldNum;
                    if(e > 0){
                        var itemCfg = {id:51705,count:e,kind:1};

                        // n.alertUtil.alert(
                        //     i18n.t("DRAGON_BOAT_XIU_QIU_ADD", {
                        //         num: e
                        //     })
                        // );
                        n.utils.popView("AlertItemShow", itemCfg);
                        n.utils.popNext(1);
                    }
                }
                this.oldNum = l.lionProxy.cfg.cons;

                //提示刷新成功
                if(this.isChangeTask){
                    this.isChangeTask = !1;

                    n.alertUtil.alert18n("RANK_REFRESH_SUCCESS");
                }
            }
        };
        e.prototype.onClickChange = function() {
            var self = this;

            var checkResult = this.checkTaskList();
            var isClaimExist = checkResult[0],isProcessExist = checkResult[1];
            function showConfirmChange (){
                //防止点击太快
                var openTime = cc.sys.now();

                n.utils.showConfirmItem(
                    i18n.t("LION_GENG_HUAN_TASK"),
                    1,
                    l.playerProxy.userData.cash,
                    function(t) {
                        if(cc.sys.now() - openTime > 500 && l.playerProxy.userData.cash >= 50){
                            l.lionProxy.sendChangeTask();
                            self.isChangeTask = true;
                        }                        
                    }
                );
            }

            if(isClaimExist){
                //提示有未领取
                n.utils.showConfirm(i18n.t("LION_CLAIM_TASK_TIP"), showConfirmChange);
            }
            else if(isProcessExist){
                n.utils.showConfirm(i18n.t("LION_PROCESS_TASK_TIP"),showConfirmChange);
            }
            else{
                showConfirmChange();
            }
          
        };
        e.prototype.onClickClose = function() {
            l.lionProxy.cfg && 1 != l.lionProxy.cfg.isGold && (l.lionProxy.isLockGold = !1);
            n.utils.closeView(this);
        };
        e.prototype.onClickStart = function() {
            this.welcome.active = !1;
        };

        e.prototype.onUnlockSuccess = function(){
            if(l.lionProxy.isUnlocking){
                l.lionProxy.isUnlocking = 0;
                l.lionProxy.cfg.isGold = 1;

                n.alertUtil.alert18n("LION_UNLOCK_SUCCESS");
                //解锁成功,刷新
                this.onLionData();
            }
        };

        e.prototype.onUnlockFail = function(){
            if(l.lionProxy.isUnlocking){
                l.lionProxy.isUnlocking = 0;
                //提示解锁失败
                n.alertUtil.alert18n("LION_UNLOCK_FAIL");
            }
        };

        e.prototype.checkTaskList = function(){
             //判断是否有未领取完成的任务
             var isClaimExist = false;
             var isProcessExist = false;
             for(var i = 0;i< this.taskList.data.length;++i){
                 var taskItem = this.taskList.data[i];
                 var taskItemCfg = localcache.getItem(localdb.table_lion_task, taskItem.id);
                 if(taskItem.get != null && taskItem.get == 0){
                     //是否有未完成
                     if(taskItem.num >0) isProcessExist = true;
                     
                     //是否有未领取
                     if(taskItem.num >= taskItemCfg.num){
                         isClaimExist = true;
                         break;
                     }
                 }
             }

             return [isClaimExist,isProcessExist];
        };

        __decorate([c(i.default)], e.prototype, "rwdList", void 0);
        __decorate([c(i.default)], e.prototype, "taskList", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblChange", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([c(cc.Node)], e.prototype, "welcome", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
