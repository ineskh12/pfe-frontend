import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw } from "draft-js";
import  "./toolbar.css"

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

export default class Droppable extends React.Component {

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

    dragstart_handler(id, e) {
        
       e.dataTransfer.setData("transfer", e.target.id);
        
         e.dataTransfer.setData("gridId", id);
    }

    editor = (
      
        <Editor
      
           
            placeholder="écrivez le texte ici ..."
            spellCheck
            toolbarOnFocus
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class toolbar-position"
            toolbar={{
                options: ['blockType'],
                blockType: {
                    inDropdown: true,
                    options: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                }
            }}
            onContentStateChange={this.onContentStateChange}
        />
       
    )

    drop = (id, e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        
        if (e.dataTransfer.getData("gridId") === 'dr1') {
            ReactDOM.render(this.editor, document.getElementById(e.target.id));
            /* var nodeCopy = document.getElementById(data).cloneNode(true);
            var x = randHex(12);
            nodeCopy.id = x;
            e.target.appendChild(nodeCopy); */
            e.dataTransfer.clearData();
        } else if ( e.dataTransfer.getData("gridId") !== 'dr1' && e.dataTransfer.getData("gridId").trim() !== id.toString()) {
            var nodeMove = document.getElementById(data)
            var y = randHex(12);
            nodeMove.id = y;
            e.target.appendChild(nodeMove);
        }

           function randHex(len) {
            var maxlen = 8;
             var   min = Math.pow(16,Math.min(len,maxlen)-1) ;
              var  max = Math.pow(16,Math.min(len,maxlen)) - 1;
              var  n   = Math.floor( Math.random() * (max-min+1) ) + min;
              var  r   = n.toString(16);
            while ( r.length < len ) {
               r = r + randHex( len - maxlen );
            }
            return r;
          };





    }
    allowDrop = (e) => {
        e.preventDefault();
       

    }
    render() {
        

        return (
            <div id={this.props.id}  onDrop={(e) => this.drop(this.props.id, e)} onDragOver={this.allowDrop} onDragStart={(e) => this.dragstart_handler(this.props.id, e)} style={this.props.style}>

                {this.props.children}

            </div>

        );


    }
}
Droppable.protoTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,


}
