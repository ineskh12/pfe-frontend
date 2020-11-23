import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';

const Item = {
    color: '#55',
    backgroundColor: 'white',
    borderRadius: '3px',
    margin: '8px',

    display: 'flex'
}

export default class Draggable extends React.Component {




    drag = (e) => {

        e.dataTransfer.setData('transfer', e.target.id);
        localStorage.setItem('myData', e.target.id);
        

    }
    noAllowDrop = (e) => {

        e.stopPropagation();
        e.dataTransfer.clearData();
    }

    render() {
        return (
            < div style={{ flexDirection: 'row' }}>
                <div style={{ flexDirection: 'column' }}>
                    <ListItemIcon   >  <TextFieldsOutlinedIcon />
                        <input style={Item} id="item3" draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} type="text" name="name" />
                    </ListItemIcon>
                </div>
               
            </div>
        );

    }
}

Draggable.protoTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,

}

