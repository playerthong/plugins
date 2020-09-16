// src/ui.tsx

/** @jsx h */
import { render, Container, Text, VerticalSpace } from '@create-figma-plugin/ui'
import { h } from 'preact'

function Plugin (props: { greeting: string }) {
  return (
    <Container space='medium'>
      <VerticalSpace space='medium' />
      <Text>{props.greeting}</Text>
      <VerticalSpace space='medium' />
      <VerticalSpace space='medium' />
      {/* <Button></Button> */}
      <Text>{codeData}</Text>
    </Container>
  )
}

let codeData = "empty";
onmessage = event => {
  console.log("got this from the plugin code", event.data);
  if (!event.data.pluginMessage) {
    return;
  }

  if (event.data.pluginMessage.type === "result") {
    codeData = event.data.pluginMessage.data;
  }

  console.log(`code data: ${codeData}`);
};

export default render(Plugin)