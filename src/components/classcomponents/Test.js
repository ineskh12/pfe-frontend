import React, { Component } from "react";


import EditorJs from "@natterstefan/react-editor-js";

import { EDITOR_JS_TOOLS } from "./Constants";

class Test extends Component {

  constructor() {
    super();
    this.state = {
      data: {
        "blocks": [
          {
            "type": "embded",
            "data": {
              "service": "youtube",
              "source": "https://www.youtube.com/watch?v=JbqGYgI3XY0",
              "embed": "https://www.youtube.com/embed/JbqGYgI3XY0",
              "width": 580,
              "height": 320,
              "caption": ""
            }
          },
          {
            "type": "image",
            "data": {
              "file": {
                "url": "http://localhost/uploads/images/1.jpg"
              },
              "caption": "",
              "withBorder": false,
              "stretched": false,
              "withBackground": false
            }
          },
          {
            "type": "header",
            "data": {
              "text": "test",
              "level": 1
            }
          }
        ],
        "version": "2.17.0"
      }

    }
  }

  async onSave() {
    const outputData = await this.editorInstance.save();



    var text = outputData.blocks[0].data['text'].replace('<b>', '').replace('</b>', '');
    console.log(text)
    var type = outputData.blocks[0].type
    console.log("json string", type);


  }

 
  removeCharRecursive(str) {
   // console.log('length',str)
    // Base Case 
    if (str.length === 0) {
      return -1;
    }
    //console.log('ici : '+ str.slice(0, 3) );
    // Check the first character 
    // of the given string 
    if (str[0].search("<b>") !== -1) {
        
        //console.log('ici : '+ str );
        //var firstPos = str.search("b>") + 2;
        //var lastPos = str.search("</b>");

        //console.log(str.slice(firstPos, lastPos));


      // Pass the rest of the string 
      // to recursion Function call 
      return this.removeCharRecursive(str[0].substring(3));
    }

    if(str[0].search("</b>") !== -1 ){

      var pos = str[0].search("</b>");

      return this.removeCharRecursive(str[0].substring(pos, 3) );
    }

    // Add the first character of str 
    // and string from recursion 
    return str[0] + this.removeCharRecursive(str[0].substring(3) );
  }

  decouper (str){
    let List = "";
    if(str.length === 0) return -1 ;

    if(str.search("<b>") !== -1 ){

      var firstPos = str.search("<b>") + 3;
      var lastPos = str.search("</b>");

      var v = str.substring(firstPos,lastPos);

      //console.log(v);
       var res = this.decouper(str.replace("<b>","{text:'").replace("</b>","', bold: true}"))
     
   
      return res

    }else{
      var res2 =str.split("\\s+");
     
    var length = res2.length;  // find an array length
    
    for(var i=0; i< length; i++){
      List += res2[i];  // concat Array value to a string variable
      if(i < (length-1) ){
       List += ' ';  // add separator
     }
     }
      //List = res2.toString().replace('/,', " "); 
    
      console.log('list2',res2)
      return str.split(" ");
    }

  }

  async onSave2() {
    const outputData2 = await this.editorInstance2.save();
    //console.log(outputData2);
    outputData2.blocks.forEach(element => {
      console.log (element.data.text)
      var content =element.data.text.replace('&nbsp;', ' ');
     /*  var array = content.split(' ');
      console.log('ines',array)
      var str = []; 
      str.push(this.removeCharRecursive(array));

      console.log('array');
      console.log(str); */

      
      console.log(this.decouper(content));
      if (element.data.text.search("<b>") !== -1) {
        /* var firstPos = element.data.text.search("<b>") + 3;
        var lastPos = element.data.text.search("</b>");

        console.log(element.data.text.slice(firstPos, lastPos)); */
        //this.removeCharRecursive(element.data.text,"<b>");
      }
    });


    //var text = outputData2.blocks[0].data['text'].replace('<b>', '').replace('</b>', '');
    //console.log(text)
    //var type = outputData2.blocks[0].type
    // console.log("json string2",type);


  }


  render() {

    return (

      <>
        <button onClick={this.onSave.bind(this)} type="button">
          Save Content (check console output)
        </button>
        {/* <EditorJs data={this.state.data} /> */}

        <EditorJs holder="custom" editorInstance={instance => (this.editorInstance = instance)}
          tools={EDITOR_JS_TOOLS} >
          <div style={
            {
              border: '2px solid red'
            }
          } id="custom" >


          </div>

        </EditorJs>

        <button onClick={this.onSave2.bind(this)} type="button">
          Save 2
        </button>

        <EditorJs holder="custom2" editorInstance={instance => (this.editorInstance2 = instance)}
          tools={EDITOR_JS_TOOLS} >
          <div style={
            {
              border: '2px solid red'
            }
          } id="custom2" >


          </div>

        </EditorJs>

      </>
    );
  }
}
export default Test;