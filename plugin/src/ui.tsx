import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Highlight from './app/components/highlight';
import { Preview } from './app/components/preview';
import './ui.css'
import { format } from './utils/dart-format';

declare function require(path: string): any

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { code: "", previewImage: null };
  }

  componentDidMount() {

    // subscribe code
    window.onmessage = (ev: MessageEvent) => {


      const msg = ev.data.pluginMessage;

      switch (msg.type) {
        case "result":
          const code = format(msg.data);
          this.setState((state, props) => {
            return { code: code };
          });
          break;
        case "preview":
          this.setState((state, props) => {
            return { previewImage: msg.data };
          });
          break;
      }
    }
  }

  onClickRandomize(e) {
    parent.postMessage({ pluginMessage: { type: 'randomize-selection' } }, '*')
  }


  onClickOpenConsole(e) {
    open("https://bridged.xyz/");
  }

  render() {
    return <div>
      <Preview data={(this.state as any).previewImage}></Preview>
      <Highlight language="dart" code={(this.state as any).code}></Highlight>
      <button onClick={this.onClickRandomize}>
        randomize
      </button>
      <button onClick={this.onClickOpenConsole}>
        open in console
      </button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))