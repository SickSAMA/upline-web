import { CSSMotionProps, MotionEndEventHandler, MotionEventHandler } from 'rc-motion';

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionEventHandler = () => ({ height: 0, opacity: 0 });
const getRealHeight: MotionEventHandler = (node) => ({ height: node.scrollHeight, opacity: 1 });
const getCurrentHeight: MotionEventHandler = (node) => ({ height: node.offsetHeight });
const skipOpacityTransition: MotionEndEventHandler = (_, event) =>
  (event as TransitionEvent).propertyName === 'height';

const collapseMotion: CSSMotionProps = {
  motionAppear: false,
  onEnterStart: getCollapsedHeight,
  onEnterActive: getRealHeight,
  onEnterEnd: skipOpacityTransition,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
};

export default collapseMotion;
