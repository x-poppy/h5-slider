import React, { ReactNode } from 'react';

export interface GroupProps {
  children?: ReactNode;
}

function Group(props: GroupProps) {
  return props.children;
}

export default Group;
