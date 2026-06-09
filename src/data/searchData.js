export const searchMenuOptions = [
  { id: 'trending', icon: 'local_fire_department', label: 'Trending' },
  { id: 'category', icon: 'category', label: 'By Category' },
  { id: 'collections', icon: 'auto_awesome_mosaic', label: 'Collections' },
  { id: 'journal', icon: 'menu_book', label: 'The Journal' }
];

export const searchResultsMock = {
  trending: [
    { title: 'Mid-Century Furniture', subtitle: '12,403 listings', count: '12,403', path: '/physical-goods/home' },
    { title: 'Abstract Oil Paintings', subtitle: '8,921 listings', count: '8,921', path: '/art-craft/fine-art' },
    { title: 'Vintage Thrift & Clothing', subtitle: '5,104 listings', count: '5,104', path: '/physical-goods/fashion' },
    { title: 'Bespoke Tailoring Services', subtitle: '4,890 listings', count: '4,890', path: '/services/creatives' },
    { title: 'Rare Game Accounts', subtitle: '3,210 listings', count: '3,210', path: '/digital-assets/gaming' },
    { title: 'Contemporary Digital Art', subtitle: '9,450 listings', count: '9,450', path: '/art-craft/commissions' },
    { title: 'Estate Jewelry & Watches', subtitle: '6,720 listings', count: '6,720', path: '/physical-goods/fashion' },
    { title: 'Software Development', subtitle: '2,150 listings', count: '2,150', path: '/services/technical' },
  ],
  category: [
    { title: 'Physical Goods', subtitle: '45,210 listings across Electronics, Fashion & more', count: '45,210', path: '/physical-goods' },
    { title: 'Digital Assets', subtitle: '32,105 listings across Gaming, Gift Cards & more', count: '32,105', path: '/digital-assets' },
    { title: 'Services', subtitle: '18,450 listings across Legal, Technical & more', count: '18,450', path: '/services' },
    { title: 'Art & Craft', subtitle: '24,600 listings across Fine Art, Handmade & more', count: '24,600', path: '/art-craft' },
    { title: 'Events & Tasks', subtitle: '9,840 listings across Events, Sports & more', count: '9,840', path: '/events-tasks' },
  ]
};
