import React from "react";
import Styled, { useTheme } from "styled-components";
import { KeyProps, KslProps } from "@Renderer/types/keys";
import { EnterISO, BaseShape, GenericBlockDropdown, SpecialBlockDropdown } from "./Shapes";
import { Text } from "./Content";

const KeyWrapper = Styled.g`
.keycap {
  .baseKey {
    fill: ${({ theme }) => theme.styles.keyPicker.keyFill};
    // will-change: fill, fill-opacity;
    transition-property: fill, fill-opacity;
    transition: 100ms ease-in-out;
  }
  .shapeKey {
    stroke: ${({ theme }) => theme.styles.keyPicker.keyStrokeColor}
  }
  text {
    fill: ${({ theme }) => theme.styles.keyPicker.keyColor};
  }
  span {
    color: ${({ theme }) => theme.styles.keyPicker.keyColor};
  }
  .KeyPositionEnter {
    transform: translate(649px,73px);
  }
  .contentFirst {
    fill: ${({ theme }) => theme.styles.keyPicker.keyColor};
  }
  .contentSecondary {
    fill: ${({ theme }) => theme.styles.keyPicker.keyColorSecondary};
  }
  &:hover {
    cursor: pointer;
    .baseKey {
      fill: ${({ theme }) => theme.styles.keyPicker.keyFillHover};
    }
  }
  &.active {
    .baseKey {
      fill: ${({ theme }) => theme.styles.keyPicker.keyFillActive};
      fill-opacity: 1;
    }
    text,
    .contentFirst,
    .contentSecondary  {
      fill: ${({ theme }) => theme.styles.keyPicker.keyColorActive};
    }
    span {
      color: ${({ theme }) => theme.styles.keyPicker.keyColorActive};
    }
    .shapeKey {
      stroke: ${({ theme }) => theme.styles.keyPicker.keyStrokeColorActive}
    }
  }
  &.disabled {
    opacity: 0.2;
    .baseKey {
      fill: ${({ theme }) => theme.styles.keyPicker.keyFill};
    }
    &:hover {
      cursor: initial;
    }
  }
}
`;

// variable with the Key Size Library
const keyCapRegularSize = { width: 44, height: 30 };
const ksl: KslProps = {
  "1UT": {
    outb: { x: keyCapRegularSize.width, y: 26, dx: 0, dy: 0 },
    out: { x: 42, y: 18, dx: 1, dy: 1 },
    icon: { x: 14, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 18, dy: 16, ddx: 22, ddy: 16, fs: 13, fss: 13 },
    },
  },
  "2UT": {
    outb: { x: 94, y: 22, dx: 0, dy: 0 },
    out: { x: 92, y: 20, dx: 1, dy: 1 },
    icon: { x: 20, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 16, fs: 16 },
      b: { dx: 60, dy: 16, fs: 16 },
      c: { dx: 28, dy: 16, fs: 14 },
      d: { dx: 38, dy: 16, fs: 14 },
      letter: { dx: 47, dy: 16, ddx: 47, ddy: 16, fs: 13, fss: 13 },
    },
  },
  "1US": {
    outb: { x: keyCapRegularSize.width, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    icon: { x: 12, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 8, dy: 26, fs: 12 },
      b: { dx: 8, dy: 13, fs: 12 },
      c: { dx: 24, dy: 26, fs: 12 },
      d: { dx: 24, dy: 13, fs: 12 },
      letter: { dx: 22, dy: 19, ddx: 34, ddy: 7, fs: 13, fss: 13 },
    },
  },
  specialBlockDropdown: {
    outb: { x: 65, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 42, y: 20, dx: 1, dy: 1 },
    icon: { x: 12, y: -3, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 18, dy: 16, ddx: 22, ddy: 16, fs: 13, fss: 13 },
    },
  },
  genericBlockDropdown: {
    outb: { x: 200, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 42, y: 20, dx: 1, dy: 1 },
    icon: { x: 12, y: -3, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 18, dy: 15, fs: 14 },
      c: { dx: 28, dy: 15, fs: 14 },
      d: { dx: 38, dy: 15, fs: 14 },
      letter: { dx: 18, dy: 16, ddx: 22, ddy: 16, fs: 13, fss: 13 },
    },
  },
  specialBlockT: {
    outb: { x: keyCapRegularSize.width, y: 22, dx: 0, dy: 0 },
    out: { x: 42, y: 20, dx: 1, dy: 1 },
    icon: { x: 12, y: -3, w: 30, h: 26 },
    text: {
      a: { dx: 11, dy: 20, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 17, ddx: 22, ddy: 17, fs: 13, fss: 13 },
    },
  },
  specialBlockT2: {
    outb: { x: keyCapRegularSize.width, y: 22, dx: 0, dy: 0 },
    out: { x: 42, y: 20, dx: 1, dy: 1 },
    icon: { x: 3, y: -3, w: 42, h: 26 },
    text: {
      a: { dx: 11, dy: 20, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 17, ddx: 22, ddy: 17, fs: 13, fss: 13 },
    },
  },
  "1U": {
    outb: { x: keyCapRegularSize.width, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    icon: { x: 12, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 8, dy: 16, fs: 13 },
      b: { dx: 18, dy: 22, fs: 13 },
      c: { dx: 29, dy: 14, fs: 13 },
      d: { dx: 38, dy: 15, fs: 13 },
      letter: { dx: 22, dy: 19, ddx: 34, ddy: 7, fs: 13, fss: 13 },
    },
  },
  "1U2": {
    outb: { x: 57, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 52, y: 24, dx: 1, dy: 1 },
    icon: { x: 16, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 27, dy: 19, ddx: 27, ddy: 19, fs: 16, fss: 14 },
    },
  },
  "1U5": {
    outb: { x: 64, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 62, y: 24, dx: 1, dy: 1 },
    icon: { x: 22, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 32, dy: 19, ddx: 32, ddy: 19, fs: 16, fss: 14 },
    },
  },
  "1U6": {
    outb: { x: 82, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 82, y: 24, dx: 1, dy: 1 },
    icon: { x: 29, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 42, dy: 19, ddx: 42, ddy: 19, fs: 16, fss: 14 },
    },
  },
  "1U8": {
    outb: { x: 98, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 92, y: 24, dx: 1, dy: 1 },
    icon: { x: 32, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 47, dy: 19, ddx: 47, ddy: 19, fs: 16, fss: 14 },
    },
  },
  "2U": {
    outb: { x: 101, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 102, y: 24, dx: 1, dy: 1 },
    icon: { x: 40, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 60, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 52, dy: 19, ddx: 52, ddy: 19, fs: 14, fss: 14 },
    },
  },
  "2U2": {
    outb: { x: 54, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 54, y: 24, dx: 1, dy: 1 },
    icon: { x: 6, y: 2, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 60, dy: 19, fs: 13 },
      c: { dx: 28, dy: 19, fs: 13 },
      d: { dx: 38, dy: 19, fs: 13 },
      letter: { dx: 22, dy: 19, ddx: 52, ddy: 19, fs: 13, fss: 13 },
    },
  },
  "3U": {
    outb: { x: 168, y: 26, dx: 0, dy: 0 },
    out: { x: 166, y: 24, dx: 1, dy: 1 },
    icon: { x: 58, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 84, dy: 19, ddx: 84, ddy: 19, fs: 20, fss: 14 },
    },
  },
  "6U2": {
    outb: { x: 281, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 282, y: 24, dx: 1, dy: 1 },
    icon: { x: 130, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 142, dy: 19, ddx: 142, ddy: 19, fs: 20, fss: 14 },
    },
  },
  block: {
    outb: { x: keyCapRegularSize.width, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 34, y: 30, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 5, dy: 24, fs: 16 },
      b: { dx: 10, dy: 28, fs: 14 },
      c: { dx: 128, dy: 19, fs: 14 },
      d: { dx: 138, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 14, ddx: 22, ddy: 17, fs: 11, fss: 11 },
    },
  },
  specialBlock: {
    outb: { x: keyCapRegularSize.width, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 42, y: 30, dx: 1, dy: 1 },
    icon: { x: 14, y: 2, w: 30, h: 26 },
    text: {
      a: { dx: 11, dy: 20, fs: 13 },
      b: { dx: 10, dy: 28, fs: 13 },
      c: { dx: 128, dy: 19, fs: 13 },
      d: { dx: 138, dy: 19, fs: 13 },
      letter: { dx: 22, dy: 14, ddx: 22, ddy: 17, fs: 11, fss: 11 },
    },
  },
  longBlock: {
    outb: { x: keyCapRegularSize.width, y: keyCapRegularSize.height * 2 + 5, dx: 0, dy: 0 },
    out: { x: 34, y: 68, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 2, dy: 15, fs: 16 },
      b: { dx: 2, dy: 28, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 38, ddx: 18, ddy: 38, fs: 11, fss: 11 },
    },
  },
  wideBlock: {
    outb: { x: 93, y: keyCapRegularSize.height, dx: 0, dy: 0 },
    out: { x: 76, y: 30, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 2, dy: 15, fs: 14 },
      b: { dx: 2, dy: 28, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 45, dy: 17, ddx: 45, ddy: 17, fs: 11, fss: 11 },
    },
  },
  enter: {
    outb: { x: keyCapRegularSize.width, y: 26, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 22, dy: 16, ddx: 22, ddy: 16, fs: 18, fss: 14 },
    },
  },
  title: {
    outb: { x: keyCapRegularSize.width, y: 26, dx: 0, dy: 0 },
    out: { x: 42, y: 24, dx: 1, dy: 1 },
    icon: { x: 15, y: -1, w: 30, h: 26 },
    text: {
      a: { dx: 6, dy: 19, fs: 20 },
      b: { dx: 16, dy: 19, fs: 14 },
      c: { dx: 28, dy: 19, fs: 14 },
      d: { dx: 38, dy: 19, fs: 14 },
      letter: { dx: 0, dy: 16, ddx: 0, ddy: 16, fs: 16, fss: 16 },
    },
  },
};

const Key = ({
  id,
  keyCode,
  x,
  y,
  selected,
  clicked,
  onKeyPress,
  centered,
  iconpresent,
  icon,
  iconx,
  icony,
  iconsize,
  content,
  idArray,
  disabled = false,
}: KeyProps) => {
  const { keyTextColor } = useTheme().keyboardPicker;
  const { keyTextDisabledColor } = useTheme().keyboardPicker;
  const { keySubTextColor } = useTheme().keyboardPicker;
  const { keyActiveSubTextColor } = useTheme().keyboardPicker;
  return (
    <KeyWrapper>
      <g className={`keycap ${selected ? "active" : ""} ${disabled ? "disabled" : ""} ${content.type} id-${id}`}>
        {content.type === "enter" ? <EnterISO onClick={clicked} /> : null}
        {content.type !== "enter" &&
        content.type !== "title" &&
        content.type !== "specialBlockDropdown" &&
        content.type !== "genericBlockDropdown" ? (
          <BaseShape x={x} y={y} onClick={clicked} content={content} ksl={ksl} />
        ) : null}
        {content.type === "specialBlockDropdown" ? (
          <SpecialBlockDropdown
            x={x}
            y={y}
            ksl={ksl}
            content={content}
            onKeyPress={onKeyPress}
            selected={selected}
            id={id}
            idArray={idArray}
            keyCode={keyCode}
          />
        ) : null}
        {content.type === "genericBlockDropdown" ? (
          <GenericBlockDropdown
            x={x}
            y={y}
            ksl={ksl}
            content={content}
            onKeyPress={onKeyPress}
            id={id}
            idArray={idArray}
            keyCode={keyCode}
          />
        ) : null}
        <Text
          x={x}
          y={y}
          icon={icon}
          iconpresent={iconpresent}
          iconx={iconx}
          icony={icony}
          iconsize={iconsize}
          centered={centered}
          content={content}
          ksl={ksl}
          onClick={clicked}
          selected={selected}
          disabled={disabled}
          keyActiveSubTextColor={keyActiveSubTextColor}
          keyTextColor={keyTextColor}
          keyTextDisabledColor={keyTextDisabledColor}
          keySubTextColor={keySubTextColor}
        />
      </g>
    </KeyWrapper>
  );
};

export default Key;
