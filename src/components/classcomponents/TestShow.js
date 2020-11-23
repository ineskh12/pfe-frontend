import React from 'react';
import axios from 'axios';
import ShowcaseLayout from "./ShowcaseLayout";
import SaveIcon from '@material-ui/icons/Save';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import CircularProgress from '@material-ui/core/CircularProgress';

import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Form from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
export default class TestShow extends React.Component {





  constructor(props) {

    super(props);

    this.state = { isToggleOn: true };
    this.state = { notify: { isOpen: false, message: '', type: '' } };
    this.state = { layout: [], savelist: [], savedata: [], nomtemplate: '', count: 0, age: '', open: false, redirect: null, loading: false };


    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.openPdfClick = this.openPdfClick.bind(this);
    this.exportPdfClick = this.exportPdfClick.bind(this);
    this.save = this.save.bind(this);
  }




  onLayoutChange(layout) {
    this.setState({ layout: layout });

  }



  openPdfClick = () => {
    let List = [];
    let Values = [];

    this.state.layout.forEach(element => {
      List.push(Object.assign({}, { absolutePosition: { x: (element.x * 50) + 50, y: (element.y * 50) + 50 } }))

    });

    for (var i = 0; i < this.state.layout.length; i++) {

      if (document.getElementById('' + this.state.layout[i].i)) {
        var searchEles = document.getElementById('' + this.state.layout[i].i).children;


        for (var j = 0; j < searchEles.length; j++) {

          List[i] = Object.assign({ text: searchEles[j].value }, List[i]);

          Values.push(Object.assign({}, { text: searchEles[j].value, index: i }))

        }
      }
    }
    this.setState({ savelist: [] });

    List.forEach(element => {
      this.state.savelist.push(element);
    });

    // export pdf
    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    const clone = (obj) => Object.assign({}, obj);
    const renameKey = (object, key, newKey) => {
      const clonedObj = clone(object);
      const targetKey = clonedObj[key];
      delete clonedObj[key];
      clonedObj[newKey] = targetKey;
      return clonedObj;
    };

    var myArray = [];
    for (var m in this.state.savelist) {
      myArray.push(renameKey(this.state.savelist[m], "text", 'text'));
    }
    console.log('myArray');
    console.log(myArray);
    const pageOrientation1 = 'landscape';
    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: pageOrientation1,
      content: myArray,

    }
    pdfMake.createPdf(documentDefinition).open();
  }


  exportPdfClick = () => {
    this.setState({
      count: this.state.count + 1
    });
    let List = [];
    let Values = [];

    this.state.layout.forEach(element => {
      List.push(Object.assign({}, { absolutePosition: { x: (element.x * 50) + 50, y: (element.y * 50) + 50 } }))

    });

    for (var i = 0; i < this.state.layout.length; i++) {

      if (document.getElementById('' + this.state.layout[i].i)) {
        var searchEles = document.getElementById('' + this.state.layout[i].i).children;


        for (var j = 0; j < searchEles.length; j++) {

          List[i] = Object.assign({ text: searchEles[j].value }, List[i]);

          Values.push(Object.assign({}, { text: searchEles[j].value, index: i }))

        }
      }
    }
    this.setState({ savelist: [] });

    List.forEach(element => {
      this.state.savelist.push(element);
    });

    // export pdf
    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    const clone = (obj) => Object.assign({}, obj);

    const renameKey = (object, key, newKey) => {

      const clonedObj = clone(object);
      const targetKey = clonedObj[key];
      delete clonedObj[key];
      clonedObj[newKey] = targetKey;
      return clonedObj;
    };
    var myArray = [];
    for (var m in this.state.savelist) {

      myArray.push(renameKey(this.state.savelist[m], "text", 'text'));
    }
    const pageOrientation1 = 'landscape';
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const fileName = this.state.nomtemplate + '-' + date + 'V' + this.state.count;
    //const filename =this.state.nomtemplate +"/"+this.state.currentDate;

    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: pageOrientation1,
      content: myArray
    };

    pdfMake.createPdf(documentDefinition).download(fileName);


  }



  save = () => {
    let List = [];


    this.state.layout.forEach(element => {


      if (document.getElementById('' + element.i).children.length !== 0) {

        var searchEles = document.getElementById('' + element.i).children;

        console.log(searchEles);

        for (var j = 0; j < searchEles.length; j++) {

          List.push(Object.assign({}, { x: (element.x), y: (element.y), h: (element.h), w: (element.w), value: searchEles[j].value, index: element.i, type: searchEles[j].type }))

        }


      } else {
        List.push(Object.assign({}, { x: (element.x), y: (element.y), h: (element.h), w: (element.w) }))
      }

    });

    this.setState({ savedata: [] });

    List.forEach(element => {
      this.state.savedata.push(element);
    });

    /* var data = new FormData();
    data.append('name', this.state.nomtemplate);
    data.append('items', List); */
    this.setState({ loading: true });

    axios.post('http://nestjs-backend-dnd.herokuapp.com/templates/add', {
      name: this.state.nomtemplate,
      items: List
    })
      .then(res => {
        this.setState({ loading: false });
        
        setTimeout(() => {
          this.setState({ redirect: "/list" });
        }, 1300);

      }).catch(error => {
        alert('erreur : ' + error)
      });

    console.log(List);

    //alert(JSON.stringify(this.state.savedata))



  }



  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }



    return (

      <div>
        <div style={{ marginLeft: '50%' }}>

          {this.state.loading ?
            <CircularProgress />
            :
            null
          }
        </div>

        <Form >
          <Grid container>
            <Grid item >
              <TextField
                name="Nom"
                label="Nom"
                onChange={(val) => this.setState({ nomtemplate: val.target.value })}
              /></Grid> </Grid></Form>
        <div style={{ display: "flex" }}>

          <Button color="primary"
            variant="contained"
            style={{ marginLeft: "auto" }}
            onClick={this.exportPdfClick}
          >
            <PictureAsPdfIcon />
          </Button>
          <Button style={{ marginLeft: "5px" }}
            variant="contained"
            color="primary"
            aria-label="edit"
            onClick={this.openPdfClick}
          >
            <OpenInBrowserIcon />
          </Button>
          <Button style={{ marginLeft: "5px" }}
            variant="contained"
            color="primary"
            aria-label="add"
            onClick={this.save}

          >
            <SaveIcon />
          </Button>

        </div>








        <ShowcaseLayout onLayoutChange={this.onLayoutChange} />

      </div>

    );

  }
}
