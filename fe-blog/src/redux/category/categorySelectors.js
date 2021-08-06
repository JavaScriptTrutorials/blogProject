import {createSelector} from 'reselect';

export const categoriesSelector = state => state.category.categories;

export const subcategoriesSelector = createSelector(
        categoriesSelector,
        (categories) => (parentId) => {
          return categories.filter(category => {
            return category.parentCategory === parentId;
          });
      }
    );