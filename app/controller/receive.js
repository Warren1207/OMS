/**
 * Created by Warren Lee on 2018/7/18.
 */
'use strict';

const Controller = require('egg').Controller;

class ReceiveController extends Controller {
    * query() {
        const { ctx, service } = this;
        const result = yield service.receive.query();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * get() {
        const { ctx, service } = this;
        const result = yield service.receive.get();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * getDetail() {
        const { ctx, service } = this;
        const result = yield service.receive.getDetail();
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }

    * save() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        let result;
        if( id === "add" ){
            result= yield service.receive.insert();
        }else{
            result = yield service.receive.update();
        }
        // 设置响应内容和响应状态码
        ctx.body = result;
        ctx.status = 200;
    }
}

module.exports = ReceiveController;