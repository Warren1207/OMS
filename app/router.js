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

  /** 供应商子表查询 **/
  router.get('/customer/getDetail/:number', controller.customer.getDetail);

  /** 订单主表查询 **/
  router.get('/order/query', controller.order.query);
  router.get('/order/get/:id', controller.order.get);
  router.get('/order/getDetail/:number', controller.order.getDetail);
  /** 订单保存 **/
  router.post('/order/save/:id', controller.order.save);

    /** 出货单查询 **/
    router.get('/delivery/query', controller.delivery.query);
    router.get('/delivery/get/:id', controller.delivery.get);
    router.get('/delivery/getDetail/:number', controller.delivery.getDetail);
    /** 出货单保存 **/
    router.post('/delivery/save/:id', controller.delivery.save);
};
