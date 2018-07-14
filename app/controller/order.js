/**
 * Created by Warren Lee on 2018/7/10.
 */
'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
    * query() {
        const { ctx, service } = this;
        const result = yield service.order.query();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * get() {
        const { ctx, service } = this;
        const result = yield service.order.get();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * getDetail() {
        const { ctx, service } = this;
        const result = yield service.order.getDetail();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * save() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        let result;
        if( id === "add" ){
            result= yield service.order.insert();
        }else{
            result = yield service.order.update();
        }
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }
}
module.exports = OrderController;