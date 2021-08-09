import styled from 'styled-components';
import CategoryList from './CategoryList';

console.log(CategoryList);

export const CategoryListStyle = styled(CategoryList)`
    padding-left: ${props => props.noOffset? '0px': '5px'};
    margin-left: ${props => props.noOffset? '0px': '5px'};
`;