import * as React from "react";
import { render } from "react-dom";
import Form from "./Form";

const GetForm = (props) => {
    const [status, setStatus] = React.useState(true);
    const handler = props.handler;
    if (status) {
      return <Form setStatus={setStatus} handler={handler}/>;
    }
    return <></>;
  }

  export default GetForm  