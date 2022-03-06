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
import { ContentState, EditorState, convertToRaw, convertFromHTML } from 'draft-js';
//import {convertFromHTML} from 'draft-convert'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";




export default class TestShow extends React.Component {





  constructor(props) {

    super(props);

    this.state = { isToggleOn: true };
    this.state = { notify: { isOpen: false, message: '', type: '' } };
    this.state = { layout: [], pdf: [], savelist: [], savedata: [], nomtemplate: '', count: 0, age: '', open: false, redirect: null, loading: false, iduser: localStorage.getItem('iduser') };


    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.openPdfClick = this.openPdfClick.bind(this);
    this.exportPdfClick = this.exportPdfClick.bind(this);
    this.save = this.save.bind(this);
  }




  onLayoutChange(layout) {
    this.setState({ layout: layout });
  }

  onPDF(pdf) {
    this.setState({ pdf: pdf });
  }

  openPdfClick = () => {

    console.log('this.state.pdf : ');
    console.log(this.state.pdf);


    let List = [];

    this.state.layout.forEach(element => {
      List.push(Object.assign({}, { absolutePosition: { x: (element.x )*50, y: (element.y)*20} ,}))

    });

    for (var i = 0; i < this.state.layout.length; i++) {

      //for (let j = 0; j < this.state.pdf.length; j++) {
      const j = parseInt(this.state.layout[i].i);
      const element = this.state.pdf[j];
      if (element.blocks) {
        for (let p = 0; p < element.blocks.length; p++) {
          const block = element.blocks[p];

          let text = block.text.split("");

          if (block.type === 'unstyled') {

            //thats for bold , italic and fontsize
            for (let k = 0; k < block.inlineStyleRanges.length; k++) {
              const inlineStyleRanges = block.inlineStyleRanges[k];

              if (inlineStyleRanges.style === "BOLD") {

                for (let pos = inlineStyleRanges.offset; pos < inlineStyleRanges.offset + inlineStyleRanges.length; pos++) {
                  if (text[pos].text) {
                    text[pos] = Object.assign({ bold: true }, text[pos])
                  } else {
                    text[pos] = { text: text[pos], bold: true }
                  }

                }

              } else if (inlineStyleRanges.style === "ITALIC") {

                for (let pos = inlineStyleRanges.offset; pos < inlineStyleRanges.offset + inlineStyleRanges.length; pos++) {
                  if (text[pos].text) {
                    text[pos] = Object.assign({ italics: true }, text[pos])
                  } else {
                    text[pos] = { text: text[pos], italics: true }
                  }

                }

              } else if (inlineStyleRanges.style.search("fontsize") !== -1) {

                for (let pos = inlineStyleRanges.offset; pos < inlineStyleRanges.offset + inlineStyleRanges.length; pos++) {
                  if (text[pos].text) {
                    text[pos] = Object.assign({ fontSize: parseInt(inlineStyleRanges.style.slice(9, inlineStyleRanges.style.length)) }, text[pos])
                  } else {
                    text[pos] = { text: text[pos], fontSize: parseInt(inlineStyleRanges.style.slice(9, inlineStyleRanges.style.length)) }
                  }

                }

              }
            }

            //Thats for link editor draft
            for (let t = 0; t < block.entityRanges.length; t++) {
              const entityRanges = block.entityRanges[t];

              for (let pos = entityRanges.offset; pos < entityRanges.offset + entityRanges.length; pos++) {
                if (text[pos].text) {
                  text[pos] = Object.assign({ link: element.entityMap[entityRanges.key].data.url }, text[pos])
                } else {
                  text[pos] = { text: text[pos], link: element.entityMap[entityRanges.key].data.url }
                }

              }
            }

            //thats for a Normal font in header , link and "bold , italic and fontsize" editors draft
            if (p === 0) {
              text.push("\n");
              List[i] = Object.assign({ text: text }, List[i]);
              console.log(List[i]);
            } else if (p > 0) {
              if (element.blocks[p - 1].type.slice(0, 6) === "header") {

                List[i].text.push({ text: block.text + "\n" });

              } else {

                text.push("\n");
                List[i].text.push({ text: text });
              }
              console.log(List[i]);
              console.log("here");
              console.log(element.blocks.length);
            }

          } else {

            //thats for header editor
            if (block.type.slice(0, 6) === "header") {
              if (block.type === "header-one") {
                if (List[i].text) {
                  List[i].text.push({ text: block.text + "\n", fontSize: 24, bold: true, marginBottom: 5 })
                } else {
                  List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 24, bold: true, marginBottom: 5 }] }, List[i]);
                }
              } else
                if (block.type === "header-two") {
                  if (List[i].text) {
                    List[i].text.push({ text: block.text + "\n", fontSize: 22, bold: true, marginBottom: 5 })
                  } else {
                    List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 22, bold: true, marginBottom: 5 }] }, List[i]);
                  }
                } else
                  if (block.type === "header-three") {
                    if (List[i].text) {
                      List[i].text.push({ text: block.text + "\n", fontSize: 20, bold: true, marginBottom: 5 })
                    } else {
                      List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 20, bold: true, marginBottom: 5 }] }, List[i]);
                    }
                  } else
                    if (block.type === "header-four") {
                      if (List[i].text) {
                        List[i].text.push({ text: block.text + "\n", fontSize: 18, bold: true, marginBottom: 5 })
                      } else {
                        List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 18, bold: true, marginBottom: 5 }] }, List[i]);
                      }
                    } else
                      if (block.type === "header-five") {
                        if (List[i].text) {
                          List[i].text.push({ text: block.text + "\n", fontSize: 16, bold: true, marginBottom: 5 })
                        } else {
                          List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 16, bold: true, marginBottom: 5 }] }, List[i]);
                        }
                      } else
                        if (block.type === "header-six") {
                          if (List[i].text) {
                            List[i].text.push({ text: block.text + "\n", fontSize: 14, bold: true, marginBottom: 5 })
                          } else {
                            List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 14, bold: true, marginBottom: 5 }] }, List[i]);
                          }
                        }

            }

          }

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
    //console.log('myArray');
    //console.log(myArray);
    const pageOrientation1 = 'portrait';

    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: pageOrientation1,
      alignment: 'center',
      content: myArray,

    }
    pdfMake.createPdf(documentDefinition).open();
  }

  exportPdfClick = () => {
    this.setState({
      count: this.state.count + 1
    });
    console.log('this.state.pdf : ');
    console.log(this.state.pdf);


    let List = [];

    this.state.layout.forEach(element => {
      List.push(Object.assign({}, { absolutePosition: { x: (element.x )*50, y: (element.y)*20} ,}))

    });

    for (var i = 0; i < this.state.layout.length; i++) {

      //for (let j = 0; j < this.state.pdf.length; j++) {
      const j = parseInt(this.state.layout[i].i);
      const element = this.state.pdf[j];
      if (element.blocks) {
        for (let p = 0; p < element.blocks.length; p++) {
          const block = element.blocks[p];

          let text = block.text.split("");

          if (block.type === 'unstyled') {

            //thats for bold , italic and fontsize
            for (let k = 0; k < block.inlineStyleRanges.length; k++) {
              const inlineStyleRanges = block.inlineStyleRanges[k];

              if (inlineStyleRanges.style === "BOLD") {

                for (let pos = inlineStyleRanges.offset; pos < inlineStyleRanges.offset + inlineStyleRanges.length; pos++) {
                  if (text[pos].text) {
                    text[pos] = Object.assign({ bold: true }, text[pos])
                  } else {
                    text[pos] = { text: text[pos], bold: true }
                  }

                }

              } else if (inlineStyleRanges.style === "ITALIC") {

                for (let pos = inlineStyleRanges.offset; pos < inlineStyleRanges.offset + inlineStyleRanges.length; pos++) {
                  if (text[pos].text) {
                    text[pos] = Object.assign({ italics: true }, text[pos])
                  } else {
                    text[pos] = { text: text[pos], italics: true }
                  }

                }

              } else if (inlineStyleRanges.style.search("fontsize") !== -1) {

                for (let pos = inlineStyleRanges.offset; pos < inlineStyleRanges.offset + inlineStyleRanges.length; pos++) {
                  if (text[pos].text) {
                    text[pos] = Object.assign({ fontSize: parseInt(inlineStyleRanges.style.slice(9, inlineStyleRanges.style.length)) }, text[pos])
                  } else {
                    text[pos] = { text: text[pos], fontSize: parseInt(inlineStyleRanges.style.slice(9, inlineStyleRanges.style.length)) }
                  }

                }

              }
            }

            //Thats for link editor draft
            for (let t = 0; t < block.entityRanges.length; t++) {
              const entityRanges = block.entityRanges[t];

              for (let pos = entityRanges.offset; pos < entityRanges.offset + entityRanges.length; pos++) {
                if (text[pos].text) {
                  text[pos] = Object.assign({ link: element.entityMap[entityRanges.key].data.url }, text[pos])
                } else {
                  text[pos] = { text: text[pos], link: element.entityMap[entityRanges.key].data.url }
                }

              }
            }

            //thats for a Normal font in header , link and "bold , italic and fontsize" editors draft
            if (p === 0) {
              text.push("\n");
              List[i] = Object.assign({ text: text }, List[i]);
              console.log(List[i]);
            } else if (p > 0) {
              if (element.blocks[p - 1].type.slice(0, 6) === "header") {

                List[i].text.push({ text: block.text + "\n" });

              } else {

                text.push("\n");
                List[i].text.push({ text: text });
              }
              console.log(List[i]);
              console.log("here");
              console.log(element.blocks.length);
            }

          } else {

            //thats for header editor
            if (block.type.slice(0, 6) === "header") {
              if (block.type === "header-one") {
                if (List[i].text) {
                  List[i].text.push({ text: block.text + "\n", fontSize: 24, bold: true, marginBottom: 5 })
                } else {
                  List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 24, bold: true, marginBottom: 5 }] }, List[i]);
                }
              } else
                if (block.type === "header-two") {
                  if (List[i].text) {
                    List[i].text.push({ text: block.text + "\n", fontSize: 22, bold: true, marginBottom: 5 })
                  } else {
                    List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 22, bold: true, marginBottom: 5 }] }, List[i]);
                  }
                } else
                  if (block.type === "header-three") {
                    if (List[i].text) {
                      List[i].text.push({ text: block.text + "\n", fontSize: 20, bold: true, marginBottom: 5 })
                    } else {
                      List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 20, bold: true, marginBottom: 5 }] }, List[i]);
                    }
                  } else
                    if (block.type === "header-four") {
                      if (List[i].text) {
                        List[i].text.push({ text: block.text + "\n", fontSize: 18, bold: true, marginBottom: 5 })
                      } else {
                        List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 18, bold: true, marginBottom: 5 }] }, List[i]);
                      }
                    } else
                      if (block.type === "header-five") {
                        if (List[i].text) {
                          List[i].text.push({ text: block.text + "\n", fontSize: 16, bold: true, marginBottom: 5 })
                        } else {
                          List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 16, bold: true, marginBottom: 5 }] }, List[i]);
                        }
                      } else
                        if (block.type === "header-six") {
                          if (List[i].text) {
                            List[i].text.push({ text: block.text + "\n", fontSize: 14, bold: true, marginBottom: 5 })
                          } else {
                            List[i] = Object.assign({ text: [{ text: block.text + "\n", fontSize: 14, bold: true, marginBottom: 5 }] }, List[i]);
                          }
                        }

            }

          }

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
    //console.log('myArray');
    //console.log(myArray);
    const pageOrientation1 = 'portrait';
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const fileName = this.state.nomtemplate + '-' + date + 'V' + this.state.count;
    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: pageOrientation1,
      alignment: 'center',
      content: myArray,

    }
   
    pdfMake.createPdf(documentDefinition).download(fileName);
  }



  save = () => {
    //let List = [];


    /* this.state.layout.forEach(element => {


      if (document.getElementById('' + element.i).children.length !== 0) {

        var searchEles = document.getElementById('' + element.i).children;

        console.log(searchEles);

        for (var j = 0; j < searchEles.length; j++) {

          List.push(Object.assign({}, { x: (element.x), y: (element.y), h: (element.h), w: (element.w), value: searchEles[j].value, index: element.i, type: searchEles[j].type }))

        }


      } else {
        List.push(Object.assign({}, { x: (element.x), y: (element.y), h: (element.h), w: (element.w) }))
      }

    }); */

    /* this.setState({ savedata: [] });

    List.forEach(element => {
      this.state.savedata.push(element);
    }); */

    /* var data = new FormData();
    data.append('name', this.state.nomtemplate);
    data.append('items', List); */
    
    this.setState({ loading: true });

    axios.post('http://localhost:3002/templates/ajouter', {
      name: this.state.nomtemplate,
      editor: this.state.pdf,
      layout: this.state.layout,
      userId: this.state.iduser
    })
      .then(res => {
        this.setState({ loading: false });

        setTimeout(() => {
          this.setState({ redirect: "/DnDWeviooReact/list" });
        }, 1300);

      }).catch(error => {
        alert('erreur : ' + error)
      });

    //console.log('list', List);

    //alert(JSON.stringify(this.state.savedata))



  }
  annuler = () => {

    this.setState({ redirect: "/DnDWeviooReact/list" });

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


          <Button style={{ marginLeft: "auto" }}
            variant="contained"
            color="primary"
            aria-label="add"
            onClick={this.annuler}

          >
            Annuler
          </Button>
          <Button color="primary"
            variant="contained"
            style={{ marginLeft: " 5px " }}
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








        <ShowcaseLayout onLayoutChange={this.onLayoutChange} onPDF={this.onPDF.bind(this)} />

      </div>

    );

  }
}
