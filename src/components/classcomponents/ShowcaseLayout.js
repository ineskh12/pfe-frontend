import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import Droppable from "./Droppable";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
const ResponsiveReactGridLayout = WidthProvider(Responsive);




const droppableStyle1 = {

  fontsize: '24px',
  textAlign: 'left',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  margin: 'auto',
  height: '100%',


}

 class ShowcaseLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };

  constructor(props) {
    super();

    this.state = {
      items: [0, 1, 2, 3].map(function (i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1)
        };
      }),
      newCounter: 4,

      layouts: [],
    };

   
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }


  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const i = el.add ? "3" : el.i;


    return (
      <div key={i} data-grid={el}>

        <Droppable id={i} ref={i + 'item'} style={droppableStyle1} fluid>



        </Droppable>

        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onAddItem() {

  
    if (this.state.items.length < 12) {
      this.setState({
        // Add a new item. It must have a unique key!
        items: this.state.items.concat({
          i: "n" + this.state.newCounter,
          x: (this.state.items.length * 2) % (this.state.cols || 12),
          y: 0, 
          w: 2,
          h: 2
        }),
       
        newCounter: this.state.newCounter + 1
      });

      this.setState({ layouts: [this.state.layouts, Object.assign({}, { absolutePosition: { x: (this.state.items.length * 2) % (this.state.cols || 12), y: 0 } })] })

    }


  
  }

  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  
  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
   
    this.setState({ items: _.reject(this.state.items, { i: i }), newCounter: i });
  }


  render() {

    
    return (
      <div >
    
<Fab size="small" color="secondary" aria-label="add"  >
<AddIcon onClick={this.onAddItem}  />
</Fab>

        <div >

          <br></br>
          <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
           >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
        </div>


      </div>
    );

  }


}
export default ShowcaseLayout;