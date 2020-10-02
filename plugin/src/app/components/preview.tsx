import * as React from "react";

interface Props {
    data: Uint8Array
}

interface State {
    url: string
}

export class Preview extends React.Component<Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            url: null
        }
    }

    componentDidMount() {

    }

    get url(): string {
        var blob = new Blob([this.props.data], { 'type': 'image/png' });
        var url = URL.createObjectURL(blob);
        // console.log(this.props.data)
        // console.log(`image url created. url is.. ${url}`)
        return url;
        // this.setState({
        //     url: url
        // })
    }

    render() {
        return <div>
            <img src={this.url} width="100%" height="200px" style={{
                objectFit: "contain", background: "#D9D9D9", padding: "8px"
            }}></img>
        </div>
    }
}