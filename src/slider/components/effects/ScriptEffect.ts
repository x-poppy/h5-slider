import { EventNames } from '../../hooks/useScriptContext';
import { SliderEffectProps } from '../../types/Component';

interface ScriptEffectProps extends SliderEffectProps {
  functionName: number;
  functionPrams?: string;
}

async function ScriptEffect(props: ScriptEffectProps) {
  const scriptContext =  props.context.scriptContext;
  if (!props.functionName) {
    throw new Error("Invalid functionName");
  }

  await new Promise((resolve, reject) => {
    const callbackHandler = (err: Error, data: any) => {
      if (err) {
        reject(err);
        return;
      }

      props.event.detail = {
        ...props.event.detail,
        response: data,
      }
      resolve(data);
    }

    const callFunctionEvent = new CustomEvent(EventNames.OnCallFunction, {
      detail: {
        functionName: props.functionName,
        functionPrams: props.functionPrams,
        callback: callbackHandler,
      }
    });
    scriptContext.emit(callFunctionEvent);
  })
}

export default ScriptEffect;
