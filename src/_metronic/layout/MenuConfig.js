export default {
  header: {
    self: {},
    items: [],
  },
  aside: {
    self: {},
    items: [
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        permission: "get-dashboard",
        bullet: "dot",
      },
      {
        title: "User Management",
        root: true,
        icon: "flaticon-avatar",
        bullet: "dot",
        submenu: [
          {
            title: "User List",
            page: "User/List",
          },
          {
            title: "Add New User",
            page: "User/AddNew",
          },
        ]
      }, 
      {
        title: "Category management",
        root: true,
        icon: "flaticon2-layers-1",
        bullet: "dot",
        submenu: [
          {
            title: "Topics",
            page: "Category/Topic",
          },
          {
            title: "Papers",
            page: "Category/Paper",
          },
          {
            title: "Difficulty level",
            page: "Category/DifficultLevel",
          },
        ]
      }, 
     
      {
        title: "Role",
        root: true, 
        icon: "flaticon-cogwheel-2", 
        bullet: "dot", 
        submenu: [
          {
            title: "Role list",
            page: "Role/List",
          }
        ]
      },
      
    ],
  },
};
