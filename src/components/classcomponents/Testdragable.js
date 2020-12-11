import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import Typography from '@material-ui/core/Typography';
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Item = {
    color: '#55',
    backgroundColor: 'white',
    borderRadius: '3px',
    margin: '8px',
   

    display: 'flex'
}
const content = {
    entityMap: {},
    blocks: [
      {
        key: "637gr",
        text: "Initialized from content state.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ]
  };

export default class Testdragable extends React.Component {

    constructor(props) {
        super(props);
        const contentState = convertFromRaw(content);
        this.state = {
          contentState
        };
      }
    
      onContentStateChange = (contentState) => {
        this.setState({
          contentState
        });
      };
    


    drag = (e) => {

        e.dataTransfer.setData('transfer', e.target.id);
        localStorage.setItem('myData', e.target.id);
        

    }
    noAllowDrop = (e) => {

        e.stopPropagation();
        e.dataTransfer.clearData();
    }

    render() {
        const { contentState } = this.state;

        console.log(contentState);
        return (
            < div style={{ flexDirection: 'column' }}>
                <div style={{ flexDirection: 'column' }}>
                    
                    <ListItemIcon   >  <TextFieldsOutlinedIcon />
                   
                       
                
                      <Editor  id="item1" draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop}
      
      editorStyle={{ border: "1px solid" }}
      placeholder="écrivez le texte ici ..."
      spellCheck
      toolbarOnFocus
  wrapperClassName="wrapper-class"
  editorClassName="editor-class"
  toolbarClassName="toolbar-class"
  toolbar={{
      options: ['blockType'],
      blockType: {
    inDropdown: false,
    options: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  }
    }}
        onContentStateChange={this.onContentStateChange}
      />
                

  
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

Testdragable.protoTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,

}

