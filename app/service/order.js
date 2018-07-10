/**
 * Created by Warren Lee on 2018/7/10.
 */
'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');

class OrderService extends Service {
    /**订单查询 */
    * query() {
        const { ctx,app } = this;
        const query = ctx.query;
        let sql_query = "SELECT * FROM ORDERS ";
        let sql_count = "SELECT COUNT(*) AS COUNT FROM ORDERS ";
        let count,results;
        if(query.NUMBER !== undefined){
            sql_query += " WHERE NUMBER like ? LIMIT "+(query.pi-1)+","+query.ps;
            sql_count += " WHERE NUMBER like ? ";
        }
        count = yield app.mysql.query(sql_count,["%"+query.NUMBER+"%"]);
        results = yield app.mysql.query(sql_query,["%"+query.NUMBER+"%"]);
        count = count[0].COUNT;
        const result = {
            total: count,
            list: results
        };
        return result;
    }
};
module.exports = OrderService;