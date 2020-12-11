import React, { Component } from "react";
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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


export default class EditorConvertToJSON extends Component {
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

  render() {
    const { contentState } = this.state;

    console.log(contentState);

    return (
      <div>
     
      <Editor
      
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
      <br></br>
      <textarea style={{ border: "1px solid" }}
      disabled
      value={JSON.stringify(contentState, null, 4)}
    /></div>
    );
  }
}
