import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Editor } from "react-draft-wysiwyg";
import {  convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./toolbar.css"

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import LinkIcon from '@material-ui/icons/Link';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';


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
            contentState,

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

    editor_H = (

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
                    dropdownClassName: 'demo-dropdown-custom',


                }
            }}
            onContentStateChange={this.onContentStateChange}
        />

    )

    editor_T = (

        <Editor


            placeholder="écrivez le texte ici ..."
            spellCheck
            toolbarOnFocus

            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor-custom"
            toolbarClassName=" toolbar-position"
            toolbar={{
                options: ['inline', 'fontSize', 'history'],
                dropdownClassName: 'demo-dropdown-custom',
                inline: {
                    inDropdown: true,
                    dropdownClassName: 'demo-dropdown-custom',
                    options: ['bold', 'italic', 'underline'],
                    bold: { FormatBoldIcon, className: 'demo-option-custom' },
                    italic: { FormatItalicIcon, className: 'demo-option-custom' },
                    underline: { FormatUnderlinedIcon, className: 'demo-option-custom' },


                },
                fontSize: {
                    dropdownClassName: 'demo-dropdown-custom',
                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                    className: 'demo-option-custom-medium'
                },
                history: {
                    undo: { UndoIcon },
                    redo: { RedoIcon },
                }

            }}
            onContentStateChange={this.onContentStateChange}
        />

    )

    editor_L = (

        <Editor


            placeholder="écrivez le texte ici ..."
            spellCheck
            toolbarOnFocus
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class toolbar-position"
            toolbar={{
                options: ['link'],
                link: {
                    inDropdown: false,

                    showOpenOptionOnHover: true,
                    defaultTargetOption: '_self',
                    options: ['link'],
                    link: { LinkIcon },


                }
            }}
            onContentStateChange={this.onContentStateChange}
        />

    )



    drop = (id, e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        console.log(id);
        if (e.dataTransfer.getData("transfer") === 'item1') {
            ReactDOM.render(this.editor_H, document.getElementById(e.target.id));
            
            /* var nodeCopy = document.getElementById(data).cloneNode(true);
            var x = randHex(12);
            nodeCopy.id = x;
            e.target.appendChild(nodeCopy); */
            e.dataTransfer.clearData();
        } else if (e.dataTransfer.getData("transfer") === 'item2') {
            ReactDOM.render(this.editor_T, document.getElementById(e.target.id));
            
            /* var nodeCopy = document.getElementById(data).cloneNode(true);
            var x = randHex(12);
            nodeCopy.id = x;
            e.target.appendChild(nodeCopy); */
            e.dataTransfer.clearData();
        } else if (e.dataTransfer.getData("transfer") === 'item3') {
            ReactDOM.render(this.editor_L, document.getElementById(e.target.id));
            /* var list = JSON.parse(localStorage.getItem('ListContent'));
            list[id] = this.state.contentState;
            localStorage.setItem('ListContent', JSON.stringify(list)); */
            /* var nodeCopy = document.getElementById(data).cloneNode(true);
            var x = randHex(12);
            nodeCopy.id = x;
            e.target.appendChild(nodeCopy); */
            e.dataTransfer.clearData();
        } else if (e.dataTransfer.getData("gridId") !== 'dr1' && e.dataTransfer.getData("gridId").trim() !== id.toString()) {
            var nodeMove = document.getElementById(data)
            var y = randHex(12);
            nodeMove.id = y;
            e.target.appendChild(nodeMove);
        }

        function randHex(len) {
            var maxlen = 8;
            var min = Math.pow(16, Math.min(len, maxlen) - 1);
            var max = Math.pow(16, Math.min(len, maxlen)) - 1;
            var n = Math.floor(Math.random() * (max - min + 1)) + min;
            var r = n.toString(16);
            while (r.length < len) {
                r = r + randHex(len - maxlen);
            }
            return r;
        };





    }
    allowDrop = (e) => {
        e.preventDefault();


    }
    render() {
        /* var cat = JSON.stringify(localStorage.getItem('ListContent'));
        console.log(cat); */
        return (
            <div id={this.props.id} onDrop={(e) => this.drop(this.props.id, e)} onDragOver={this.allowDrop} onDragStart={(e) => this.dragstart_handler(this.props.id, e)} style={this.props.style}>

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
