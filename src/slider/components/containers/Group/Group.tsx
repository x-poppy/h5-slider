import React, { ReactNode, useMemo } from 'react';
import { shuffle } from '../../../utils/math';

export interface GroupProps {
  children?: ReactNode;
  random?: boolean;
}

function Group(props: GroupProps) {
  const randomChildren = useMemo(() => {
    return (props.random && Array.isArray(props.children)) ? shuffle(props.children) : props.children;
  }, [props.children, props.random]);
  
  return randomChildren;
}

export default Group;
