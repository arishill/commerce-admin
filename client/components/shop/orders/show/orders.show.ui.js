'use strict';

/* .........................................
  Products Show Container
......................................... */
Admin.components.shop.orders.show.ui.container = {
  controller: function() {
    return new Admin.components.shop.orders.show.controller({
      init: true
    });
  },
  view: function() {
    if (Admin.models.orders.data.single()) {
      return m('section#shop-orders-show', [
        m.component(Admin.components.shop.orders.show.ui.header),
        m('form.form.padding-large.contain', [
          m.component(Admin.components.shop.orders.show.ui.form[Admin.components.shop.orders.show.state.page()])
        ]),
        m.component(Admin.components.shop.orders.show.ui.actions),
      ]);
    }
    else {
      return m('div.contain--absolute.fill-width.fill-height', [
        m('.loader.loader--medium')
      ]);
    }

  }
};

/* .........................................
  Products Show Header
......................................... */
Admin.components.shop.orders.show.ui.header = {
  controller: function() {
    return new Admin.components.shop.orders.show.controller();
  },
  view: function(ctrl) {
    return m('header.absolute.fill-width.bg-white.z-high.border-gray-light.border--bottom', [
      m('div.row.padding-medium', [
        m('.col.small-2-3.text-left.text-middle', [
          m('h1.is-inline.margin-left-small.text-middle', [
            m('strong.is-inline.head-black.text--large',  m.route().match(/create/) ? 'Create Order' : 'Order #' + Admin.models.orders.data.single().id.split('-')[0]),
          ])
        ]),
        m('.col.small-1-3.text-right.text-middle', [
          m.component(Admin.components.shared.dropdown.ui.container, {
            label: 'Go to',
            color: 'white',
            input: true,
            selectedVal: m.prop({
              name: 'receipt',
              label: 'Receipt'
            }),
            name: 'order_show_location',
            items: [
              {
                name: 'receipt',
                label: 'Receipt'
              },
              {
                name: 'customer',
                label: 'Customer'
              },
              {
                name: 'payment',
                label: 'Payment'
              },
              {
                name: 'fulfillment',
                label: 'Fulfillment'
              }
            ],
            onselect: function(selected) {
              Admin.components.shop.orders.show.state.page(selected.name);
            }
          })
        ])
      ])
    ]);
  }
};


/* .........................................
  Orders Show Actions
......................................... */
Admin.components.shop.orders.show.ui.actions = {
  controller: function() {
    return new Admin.components.shop.orders.show.controller();
  },
  view: function(ctrl) {
    return m('footer.fill-width.bottom.absolute.bg-white.z-high.border-gray-light.border--top', [
      m('div.row.text-right.padding-medium', [
        m('a.btn-white.margin-right-small', {
          href: '/' + Admin.route.section + '/' + Admin.route.subsection,
          config: m.route
        }, 'Cancel'),
        m('button.btn-green.btn--wide', 'Save')
      ])
    ]);
  }
};