/**
 * Created by Warren Lee on 2018/7/16.
 */
'use strict';

const Controller = require('egg').Controller;

class DeliveryController extends Controller {
    * query() {
        const { ctx, service } = this;
        const result = yield service.delivery.query();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * get() {
        const { ctx, service } = this;
        const result = yield service.delivery.get();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * getDetail() {
        const { ctx, service } = this;
        const result = yield service.delivery.getDetail();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * save() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        let result;
        if( id === "add" ){
            result= yield service.delivery.insert();
        }else{
            result = yield service.delivery.update();
        }
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }
}

module.exports = DeliveryController;