import React from 'react';
import { useEffect } from 'react';

const RClickMenu = (props) => {
    const handleClickOutside = (e) => {
        console.log("Clicked outside", e);
        props.setContextMenu(false);
    }
    useEffect(() => {
        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [])
    const items = React.Children.map(props.children, child => child.type.displayName === 'Item'?child: null);
    console.log(props.position);
    return (
        <div style={{
            position: 'absolute',
            top: `${props.position[1]}px`,
            left: `${props.position[0]}px`,
            backgroundColor: 'brown'
        }}>
            <p>select one</p>
            <div>
                {items}
            </div>
        </div>
    );
};

const Item = ({children}) => children;
Item.displayName = 'Item';
RClickMenu.Item = Item;

export default RClickMenu;