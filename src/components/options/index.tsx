import { useState, useLayoutEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "motion/react";
import style from "./styles/Options.module.scss";
import { MoreHorizontal, X } from "lucide-react";
import Button from "./Button";

const MotionButton = motion.create(Button);
const MotionX = motion.create(X);
const MotionMore = motion.create(MoreHorizontal);

const seqTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 16,
};

const incomingButtons: Variants = {
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4 },
  },
  hide: {
    opacity: 0,
    filter: "blur(5px)",
    transition: { duration: 0.4 },
  },
};

const toggleIcon: Variants = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

function Options() {
  const [expanded, setExpanded] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const moreWrapper = useRef<HTMLDivElement>(null);
  const moreWrapperInitialX = useRef(0);

  /*
    this is a crazy hack to get the revealing buttons fixed in place while the others
    animate around them while the component is collapsing. i don't think there's a way to 
    do this with just motion or, i haven't figured it out yet.
  */
  useLayoutEffect(() => {
    if (!expanded && moreWrapper.current) {
      const cx = container.current!.offsetLeft;
      const newLeft = moreWrapperInitialX.current - cx;
      const style = moreWrapper.current.style;

      style.cssText = `
        left: ${newLeft}px !important;
        ${style.cssText}
      `;
    }

    if (expanded) {
      const mx = moreWrapper.current!.getBoundingClientRect().left;
      moreWrapperInitialX.current = mx;
    }
  }, [expanded]);

  return (
    <motion.div
      style={{
        borderRadius: 9999,
        position: "relative",
        overflow: "hidden",
      }}
      className={style.options}
      transition={seqTransition}
      layout
      ref={container}
    >
      <motion.div
        className={style.defaultWrapper}
        transition={seqTransition}
        layout
      >
        <MotionButton>Save</MotionButton>
        <MotionButton>Copy</MotionButton>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {expanded && (
          <motion.div
            className={style.moreWrapper}
            layout
            layoutAnchor={false}
            ref={moreWrapper}
          >
            <MotionButton
              key="share"
              variants={incomingButtons}
              initial="hide"
              animate="show"
              exit="hide"
            >
              Share
            </MotionButton>
            <MotionButton
              key="del"
              variants={incomingButtons}
              initial="hide"
              animate="show"
              exit="hide"
            >
              Delete
            </MotionButton>
          </motion.div>
        )}
      </AnimatePresence>

      <MotionButton
        bType="icon"
        style={{ zIndex: 2, position: "relative" }}
        layout
        transition={seqTransition}
        onClick={() => setExpanded(!expanded)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {expanded ? (
            <motion.div
              variants={toggleIcon}
              animate="show"
              exit="hide"
              initial="hide"
              key="x"
            >
              <MotionX className={style.toggleIcon} />
            </motion.div>
          ) : (
            <motion.div
              variants={toggleIcon}
              animate="show"
              exit="hide"
              initial="hide"
              key="..."
            >
              <MotionMore className={style.toggleIcon} />
            </motion.div>
          )}
        </AnimatePresence>
      </MotionButton>
    </motion.div>
  );
}

export default Options;
