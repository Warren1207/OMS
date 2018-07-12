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

    /**订单新增 */
    * insert() {
        const { ctx,app } = this;
        let base = ctx.request.body.base;
        let detail = ctx.request.body.detail;
        base.NUMBER = uuidv1();
        base.OADATE = app.mysql.literals.now;
        base.STATE = 0;
         /** 日期格式字段处理 **/
        if(base.ORDER_DATE){
            base.ORDER_DATE= new Date(base.ORDER_DATE);
        }
        if(detail.DELIVERY_DATE){
            detail.DELIVERY_DATE= new Date(detail.DELIVERY_DATE);
        }
        if(detail.EXPECT_DELIVERY_DATE){
            detail.EXPECT_DELIVERY_DATE= new Date(detail.EXPECT_DELIVERY_DATE);
        }
        detail.NUMBER = base.NUMBER;
        const conn = yield app.mysql.beginTransaction();
        let result = {};
        try {
            const orderBase = yield conn.insert('ORDERS', base);
            const orderDetail = yield conn.insert('ORDERS_DETAIL', detail);
            yield conn.commit();
            result.success = true;
        } catch (err) {
            yield conn.rollback();
            result.success = false;
            throw err;
        }
        return result;
    }
    /**订单更新 */
    * update() {
        const { ctx,app } = this;
        const base = ctx.request.body.base;
        const detail = ctx.request.body.detail;
        const options_base = {
            where: {
                id: ctx.params.id
            }
        };
        const options_detail = {
            where: {
                number: base.NUMBER
            }
        };
        const conn = yield app.mysql.beginTransaction();
        let result = {};
        try {
            const customerBase = yield conn.update('ORDERS', base,options_base);
            const customerDetail = yield conn.update('ORDERS_DETAIL', detail,options_detail);
            yield conn.commit();
            result.success = true;
        } catch (err) {
            yield conn.rollback();
            result.success = false;
            throw err;
        }
        return result;
    }
};
module.exports = OrderService;