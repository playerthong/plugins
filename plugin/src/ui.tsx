import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './ui.css'

declare function require(path: string): any

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { code: "" };
  }

  code: string

  componentDidMount() {
    console.log("created")

    window.onmessage = (ev: MessageEvent) => {
      console.log();
      const msg = ev.data.pluginMessage;
      if (msg.type == "result") {
        console.log(msg.data)
        this.code = msg.data;

        this.setState((state, props) => {
          return { code: this.code };
        });

      }


    }
  }


  render() {
    return <div>
      <SyntaxHighlighter language="dart" style={docco}>
        {(this.state as any).code}
      </SyntaxHighlighter>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))