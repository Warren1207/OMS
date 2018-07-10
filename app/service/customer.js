/**
 * Created by Warren Lee on 2018/7/5.
 */
'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');

class CustomerService extends Service {
    /**供应商查询 */
    * query() {
        const { ctx,app } = this;
        const query = ctx.query;
        let sql_query = "SELECT * FROM CUSTOMER ";
        let sql_count = "SELECT COUNT(*) AS COUNT FROM CUSTOMER ";
        let count,results;
        if(query.NAME !== undefined){
            sql_query += " WHERE NAME like ? LIMIT "+(query.pi-1)+","+query.ps;
            sql_count += " WHERE NAME like ? ";
        }
        count = yield app.mysql.query(sql_count,["%"+query.NAME+"%"]);
        results = yield app.mysql.query(sql_query,["%"+query.NAME+"%"]);
        count = count[0].COUNT;
        const result = {
            total: count,
            list: results
        };
        return result;
    }
    /** 查询单条供应商数据 **/
    * get() {
        const id = this.ctx.params.id;
        const result = yield this.app.mysql.get('CUSTOMER', { id: id });
        return result;
    }
    /**供应商新增 */
    * insert() {
        const { ctx,app } = this;
        let base = ctx.request.body.base;
        let detail = ctx.request.body.detail;
        base.NUMBER = uuidv1();
        base.REGISTER_DATE = app.mysql.literals.now;
        base.STATE = 0;
        detail.NUMBER = base.NUMBER;
        const conn = yield app.mysql.beginTransaction();
        let result = {};
        try {
            const customerBase = yield conn.insert('CUSTOMER', base);
            const customerDetail = yield conn.insert('CUSTOMER_DETAIL', detail);
            yield conn.commit();
            result.success = true;
        } catch (err) {
            yield conn.rollback();
            result.success = false;
            throw err;
        }
        return result;
    }
    /**供应商更新 */
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
        delete base.REGISTER_DATE;
        delete base.NUMBER;
        delete base.STATE;

        const conn = yield app.mysql.beginTransaction();
        let result = {};
        try {
            const customerBase = yield conn.update('CUSTOMER', base,options_base);
            const customerDetail = yield conn.update('CUSTOMER_DETAIL', detail,options_detail);
            yield conn.commit();
            result.success = true;
        } catch (err) {
            yield conn.rollback();
            result.success = false;
            throw err;
        }
        return result;
    }
    /**供应商删除 */
    * delete() {
        const result = yield this.app.mysql.delete('CUSTOMER', { id: 1});
        return result;
    }
    /** 查询单条供应商子表数据 **/
    * getDetail() {
        const number = this.ctx.params.number;
        const result = yield this.app.mysql.get('CUSTOMER_DETAIL', { number: number });
        return result;
    }
}
module.exports = CustomerService;