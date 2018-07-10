/**
 * Created by Warren Lee on 2018/7/5.
 */
'use strict';

const Controller = require('egg').Controller;

class CustomerController extends Controller {
  * query() {
      const { ctx, service } = this;
      const result = yield service.customer.query();
      // 设置响应内容和响应状态码
      ctx.body = result;
      ctx.status = 200;
  }
  * get() {
      const { ctx, service } = this;
      const result = yield service.customer.get();
      // 设置响应内容和响应状态码
      ctx.body = result;
      ctx.status = 200;
  }

  * save() {
      const { ctx, service } = this;
      const id = ctx.params.id;
      let result;
      if( id === "add" ){
          result= yield service.customer.insert();
      }else{
          result = yield service.customer.update();
      }
      // 设置响应内容和响应状态码
      ctx.body = result;
      ctx.status = 200;
  }

  * delete() {
      const { ctx, service } = this;
      const result = yield service.customer.delete();
      // 设置响应内容和响应状态码
      ctx.body = result;
      ctx.status = 200;
  }

  * getDetail() {
    const { ctx, service } = this;
    const result = yield service.customer.getDetail();
    // 设置响应内容和响应状态码
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = CustomerController;
