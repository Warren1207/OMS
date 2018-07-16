/**
 * Created by Warren Lee on 2018/7/16.
 */
'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');

class DeliveryService extends Service {
    /**订单查询 */
    * query() {
        const { ctx,app } = this;
        const query = ctx.query;
        let sql_query = "SELECT * FROM BBOB ";
        let sql_count = "SELECT COUNT(*) AS COUNT FROM BBOB ";
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

    /** 查询单条订单数据 **/
    * get() {
        const id = this.ctx.params.id;
        const result = yield this.app.mysql.get('BBOB', { id: id });
        return result;
    }

    /** 查询单条订单子表数据 **/
    * getDetail() {
        const number = this.ctx.params.number;
        const result = yield this.app.mysql.get('BBOBA', { number: number });
        return result;
    }

    /**订单新增 */
    * insert() {
        const { ctx,app } = this;
        let base = ctx.request.body.base;
        let detail = ctx.request.body.detail;
        base.OB01 = uuidv1();
        /** 日期格式字段处理 **/
        if(base.OB03){
            base.OB03= new Date(base.OB03);
        }
        detail.OBA01 = base.OB01;
        const conn = yield app.mysql.beginTransaction();
        let result = {};
        try {
            debugger;
            yield conn.insert('BBOB', base);
            yield conn.insert('BBOBA', detail);
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
        /** 日期格式字段处理 **/
        if(base.OB03){
            base.OB03= new Date(base.OB03);
        }
        const options_base = {
            where: {
                id: ctx.params.id
            }
        };
        const options_detail = {
            where: {
                OBA01: base.OB01
            }
        };
        const conn = yield app.mysql.beginTransaction();
        let result = {};
        try {
            yield conn.update('BBOB', base,options_base);
            yield conn.update('BBOBA', detail,options_detail);
            yield conn.commit();
            result.success = true;
        } catch (err) {
            yield conn.rollback();
            result.success = false;
            throw err;
        }
        return result;
    }
}
module.exports = DeliveryService;