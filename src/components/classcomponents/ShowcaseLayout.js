import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import Droppable from "./Droppable";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Showcase.css";
//import AutorenewIcon from '@material-ui/icons/Autorenew';
const ResponsiveReactGridLayout = WidthProvider(Responsive);




const droppableStyle1 = {

  isResizable: true,
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
    isResizable: true,
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    onLayoutChange: function () { },
    rowHeight: 30
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
      pdf: []



    };
    this.baseState = this.state.items;


    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  componentDidMount = () => {
    this.state.items.forEach(el => {
      this.state.pdf.push({ index: parseInt(el.i) });
    });
    this.props.onPDF(this.state.pdf);
  }


  onChangePDF = (item, i) => {
    this.state.pdf[i] = item;

  }

  onNewLayout = () => {
    this.setState(this.baseState)
  };


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

        <Droppable id={i} data={
          {
            PDF: this.state.pdf,
            onChangePDF: this.onChangePDF.bind(this)
          }
        } ref={i + 'item'} style={droppableStyle1} fluid>



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

      console.log(this.state.newCounter);
      this.state.pdf.push({ index: this.state.newCounter });
      this.props.onPDF(this.state.pdf);

      this.setState({
        // Add a new item. It must have a unique key!
        items: this.state.items.concat({
          i: this.state.newCounter.toString(),
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
    this.state.pdf[parseInt(i)] = { index: parseInt(i) }
    this.props.onPDF(this.state.pdf);
    this.setState({ items: _.reject(this.state.items, { i: i })/* , newCounter: i */ });
  }




  render() {



    return (
      <div >


        <div style={{ display: "flex" }}>
          <Fab size="small" color="primary" aria-label="add"  >
            <AddIcon onClick={this.onAddItem} />

          </Fab>


        </div>

        <div>

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