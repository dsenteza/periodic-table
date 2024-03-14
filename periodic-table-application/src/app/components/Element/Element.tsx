import React from "react";

type ElementProps = {
  name: string;
  image: string;
  onClick: () => void;
};

const Element: React.FC<ElementProps> = ({ name, image, onClick }) => {
  return (
   <div></div>
  );
};

export default Element;
