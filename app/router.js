'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  /** 供应商主表查询 **/
  router.get('/customer/query', controller.customer.query);
  router.get('/customer/get/:id', controller.customer.get);
  /** 供应商主表保存 **/
  router.post('/customer/save/:id', controller.customer.save);

};
