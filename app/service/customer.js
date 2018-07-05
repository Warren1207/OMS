/**
 * Created by Warren Lee on 2018/7/5.
 */
'use strict'

const Service = require('egg').Service;

class CustomerService extends Service {
    /**查询清单 */
    * query() {
        const result = yield this.app.mysql.query('SELECT * FROM CUSTOMER',{});
        return result;
    }
}
module.exports = CustomerService;