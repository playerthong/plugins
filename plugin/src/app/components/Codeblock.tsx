// import { Component } from 'preact';

// export default class Codeblock extends Component {
//     codeData = "empty";

//     render(){
//         return (
//             <p></p>
//         )
//     }

//     componentDidMount(){
//         onmessage = event => {
//         console.log("got this from the plugin code", event.data);
//         if (!event.data.pluginMessage) {
//             return;
//         }

//         if (event.data.pluginMessage.type === "result") {
//             this.codeData = event.data.pluginMessage.data;
//         }

//         console.log(`code data: ${this.codeData}`);
//         };
//     }
// }
