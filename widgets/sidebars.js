// sidebars-a.js
module.exports = {
 productASidebar: [
  {
     type: 'category',
     label: 'Configuring',
     link: {
      type: 'doc',
      id: 'configuring/index'
     },
     items: ['configuring/about-images', 'configuring/configuring-widgets', 'configuring/configuring-machines'],
   }, 
  {
     type: 'category',
     label: 'Getting Started',
     items: ['getting-started', 'product-overview', 'user-guide'],
   },
   {
     type: 'category',
     label: 'Admin',
     items: ['installation', 'administration'],
   },
   {
     type: 'category',
     label: 'Troubleshooting',
     items: ['Stand-alone-restore', 'troubleshooting'],
   },
 ],
};