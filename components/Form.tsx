import * as React from "react";
import { render } from "react-dom";

const Form = (props) => {
    const form = props;
    let onsbm = function(){
       form.setStatus(false)
       form.handler()
    }
    return <form onSubmit={onsbm}>
          <button>get</button>
        </form>
  }

  export default Form  