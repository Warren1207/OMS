/**
 * Created by Warren Lee on 2018/7/18.
 */
'use strict';

const Controller = require('egg').Controller;

class PurchaseController extends Controller {
    * query() {
        const { ctx, service } = this;
        const result = yield service.purchase.query();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * get() {
        const { ctx, service } = this;
        const result = yield service.purchase.get();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * getDetail() {
        const { ctx, service } = this;
        const result = yield service.purchase.getDetail();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * save() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        let result;
        if( id === "add" ){
            result= yield service.purchase.insert();
        }else{
            result = yield service.purchase.update();
        }
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }
}

module.exports = PurchaseController;