import {createSelector} from 'reselect';

export const categoriesSelector = state => state.category.categories;
export const categoriesError = state => state.category.error;

export const isExpandedSelector = state => id => {
  return state.category.expanded.includes(id);
}

export const subcategoriesSelector = createSelector(
        categoriesSelector,
        (categories) => (parentId) => {
          return categories.filter(category => {
            return category.parentCategory === parentId;
          });
      }
    );

export const errorSelector = createSelector(
  categoriesSelector,
  categoriesError,
  (categories, error) => error
)