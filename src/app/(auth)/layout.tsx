import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={"m-auto"}>{children}</div>;
};

export default layout