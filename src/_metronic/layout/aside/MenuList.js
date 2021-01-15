import React from "react";
import MenuSection from "./MenuSection";
import MenuItemSeparator from "./MenuItemSeparator";
import MenuItem from "./MenuItem";

export default class MenuList extends React.Component {
  render() {
    const { currentUrl, menuConfig, layoutConfig, isAdmin, level3 } = this.props;

    return menuConfig.aside.items.map((child, index) => {
      if(child.hidden) {
        return <> </>
      }
      return (
        <React.Fragment key={`menuList${index}`}>
          {child.section && <MenuSection item={child} />}
          {child.separator && <MenuItemSeparator item={child} />}
          {child.title && (
            <MenuItem
              item={child}
              currentUrl={currentUrl}
              layoutConfig={layoutConfig}
              isAdmin={isAdmin}
              level3={level3}
            />
          )}
        </React.Fragment>
      );
    });
  }
}
