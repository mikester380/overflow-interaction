import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import style from "./styles/Options.module.scss";
import { MoreHorizontal, X } from "lucide-react";
import Button from "./Button";

const MotionButton = motion.create(Button);

const btnTransition = {
  // duration: 1,
};

const moreBtnIn = {};

const moreBtnOut = {
  opacity: 0,
};

function Options() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      style={{
        borderRadius: 9999,
        overflow: "hidden",
        position: "relative",
      }}
      className={style.options}
      transition={btnTransition}
      layout
    >
      <MotionButton transition={btnTransition} layout>
        Save
      </MotionButton>
      <MotionButton style={{ zIndex: 1 }} transition={btnTransition} layout>
        Copy
      </MotionButton>

      <AnimatePresence mode="popLayout">
        {expanded && (
          <MotionButton
            layout
            layoutAnchor={false}
            key="share"
            exit={{ opacity: 0 }}
            transition={btnTransition}
          >
            Share
          </MotionButton>
        )}
        {expanded && (
          <MotionButton
            layout
            layoutAnchor={false}
            key="del"
            exit={{ opacity: 0 }}
            transition={btnTransition}
          >
            Delete
          </MotionButton>
        )}
      </AnimatePresence>

      <MotionButton
        bType="icon"
        layout
        transition={btnTransition}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <X className={style.toggleIcon} />
        ) : (
          <MoreHorizontal className={style.toggleIcon} />
        )}
      </MotionButton>
    </motion.div>
  );
}

export default Options;
