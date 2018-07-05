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
}

module.exports = CustomerController;
