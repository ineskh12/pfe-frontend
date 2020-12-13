import React from 'react';
import PropTypes from 'prop-types';

import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';

import { convertFromRaw } from "draft-js";


const Item = {
  position: "absolute",
 
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
      <div style={{ flexDirection: 'column' }}>
        <div id="item1"  style={Item} draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop}>
          <TextFieldsOutlinedIcon  />
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

