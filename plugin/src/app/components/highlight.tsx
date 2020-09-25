import * as React from 'react';
import { default as PrismHighlight, defaultProps, Language } from "prism-react-renderer";


// region custom dart support
// https://github.com/FormidableLabs/prism-react-renderer/issues/22#issuecomment-553042928
import Prism from 'prism-react-renderer/prism';
import dartLang from 'refractor/lang/dart';
dartLang(Prism);
// endregion

type Props = {
    language: Language | any;
    code: string
};

export default class Highlight extends React.Component<Props> {
    render() {
        return <PrismHighlight {...defaultProps} Prism={Prism} code={this.props.code} language={this.props.language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </PrismHighlight>
    }
}
