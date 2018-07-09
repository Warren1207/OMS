/**
 * Created by Warren Lee on 2018/7/5.
 */
'use strict'

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
        let row = ctx.request.body;
        row.NUMBER = uuidv1();
        row.REGISTER_DATE = app.mysql.literals.now;
        row.STATE = 0;
        const result = yield app.mysql.insert('CUSTOMER', row);
        return result;
    }
    /**供应商更新 */
    * update() {
        const { ctx,app } = this;
        const row = ctx.request.body;
        delete row.REGISTER_DATE;
        delete row.NUMBER;
        delete row.STATE;
        const options = {
            where: {
                id: ctx.params.id
            }
        };
        const result = yield app.mysql.update('CUSTOMER', row,options);
        return result;
    }
    /**供应商删除 */
    * delete() {
        const result = yield this.app.mysql.delete('CUSTOMER', { id: 1});
        return result;
    }
}
module.exports = CustomerService;