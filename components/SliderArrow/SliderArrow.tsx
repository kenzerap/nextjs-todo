import React from 'react';
import classes from './SliderArrow.module.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const SliderArrow: React.FC<{
  isLeftArrow: boolean;
  className?: string;
  arrowStyle?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = (props) => {
  return props.isLeftArrow ? (
    <LeftOutlined className={classes.leftArrow} onClick={props.onClick} />
  ) : (
    <RightOutlined className={classes.rightArrow} onClick={props.onClick} />
  );
};

export default SliderArrow;
