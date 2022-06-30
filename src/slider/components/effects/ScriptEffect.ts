import { EventNames } from '../../hooks/useScriptContext';
import { SliderEffectProps } from '../../types/Component';
import { isPlainObject } from '../../utils/typeDetect';

interface ScriptEffectProps extends SliderEffectProps {
  functionName: number;
  functionPrams?: any;
}

async function ScriptEffect(props: ScriptEffectProps) {
  const scriptContext =  props.context.scriptContext;
  if (!props.functionName) {
    throw new Error("Invalid functionName");
  }

  const variableScopes = props.context.variableScopes;

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

    let functionPrams = props.functionPrams;
    if (isPlainObject(props.functionPrams)) {
      functionPrams = variableScopes.getExpressValues(Object.keys(props.functionPrams), props.functionPrams, props)
    }

    scriptContext.emit(EventNames.OnCallFunction, {
      functionName: props.functionName,
      functionPrams: functionPrams,
      callback: callbackHandler,
    });
  })
}

export default ScriptEffect;
