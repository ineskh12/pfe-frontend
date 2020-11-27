import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import Typography from '@material-ui/core/Typography';
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
            < div style={{ flexDirection: 'column' }}>
                <div style={{ flexDirection: 'column' }}>
                    
                    <ListItemIcon   >  <TextFieldsOutlinedIcon />
                        <input style={Item} id="item1"  draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} type="text" name="name" />
                       
                    </ListItemIcon>
                    <ListItemIcon   >  <Typography variant="h6">h1</Typography>
                    
                   <input style={Item} id="item2" draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} type="text" name="h1" />
                    </ListItemIcon>

                    <ListItemIcon   >  <Typography variant="h6">P</Typography>
                    <input style={Item} id="item3" draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} type="text" name="p" />
         
                    </ListItemIcon>


                    <ListItemIcon   >  <Typography variant="h6">Nbre</Typography>  
                    
                   <input style={Item} id="item4" draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} type="number" name="nbre" />
                    </ListItemIcon>

                     <ListItemIcon >  <Typography variant="h6">?</Typography>  
                    
                    <input style={Item} id="item5" draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} type="text" name="link" defaultValue="?" />
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

