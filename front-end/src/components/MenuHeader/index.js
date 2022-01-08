import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
* @author
* @function MenuHeader
**/

const MenuHeader = (props) => {

  const dispatch = useDispatch();
  const category = useSelector(state => state.category);


  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li>
          {category.name}
          {category.children.length > 0 ? (
            <ul>
              {renderCategories(category.children)}
            </ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  }

  return (

    <div>MenuHeader</div>

  )

}

export default MenuHeader;