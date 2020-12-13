import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import LinkIcon from '@material-ui/icons/Link';

import { convertFromRaw } from "draft-js";

import './toolbar.css';

import './draggable.css';

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
      <div className='flex-container' >
        <div id="item1" className='row'  style={ {Item,height: 50, width: 50}}  draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop}>
        <Icon  style={{ fontSize: 30 }} ><strong>H</strong></Icon>
        </div>

        <div id="item2" className='row' style={ {Item,height: 50, width: 50}} draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} >
          <TextFieldsOutlinedIcon style={{ fontSize: 30 }}  />
        </div>

        <div id="item3" className='row'  style={ {Item,height: 50, width: 50}} draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} >
        <LinkIcon style={{ fontSize: 30 }} />
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

