import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    subItems: [

      {
        id: 4,
        label: 'MENUITEMS.DASHBOARD.LIST.PERSEDIAAN',
        link: '/products/persediaan',
        parentId: 2,
      },
      {
        id: 5,
        label: 'MENUITEMS.DASHBOARD.LIST.PEMESANAN',
        link: '/products/pemesanan',
        parentId: 2,
      },
      {
        id: 6,
        label: 'MENUITEMS.DASHBOARD.LIST.TRANSAKSI',
        link: '/products/transaksi',
        parentId: 2,
      },
      {
        id: 7,
        label: 'MENUITEMS.DASHBOARD.LIST.PENCATATAN',
        link: '/products/pencatatan',
        parentId: 2,
      },
    ],
  },
];
