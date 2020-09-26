import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Highlight from './app/components/highlight';
import './ui.css'
import { format } from './utils/dart-format';

declare function require(path: string): any

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { code: "" };
  }

  componentDidMount() {

    // subscribe code
    window.onmessage = (ev: MessageEvent) => {
      const msg = ev.data.pluginMessage;
      if (msg.type == "result") {
        const code = format(msg.data);
        this.setState((state, props) => {
          return { code: code };
        });
      }
    }
  }

  render() {
    return <div>
      <Highlight language="dart" code={(this.state as any).code}></Highlight>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))