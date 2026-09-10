// sidebars-a.js
module.exports = {
 productASidebar: [
   'intro',
   {
  type: 'category',
  label: 'Getting Started',
  link: {
    type: 'doc',
    id: 'getting-started/index',
  },
  items: [
    'getting-started/overview',
    'getting-started/prereqs',
  ],
},

   {
     type: 'category',
     label: 'Using',
     items: [
      'using/configuring-widgets', 
      'using/using-widgets', 
      'using/closing-widgets'
    ],
   },
 ],
};