import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox={'-4 -4 24 24'} fill="none" {...props}>
    <Path
      fill="#000"
      d="M1.4 14 0 12.6 5.6 7 0 1.4 1.4 0 7 5.6 12.6 0 14 1.4 8.4 7l5.6 5.6-1.4 1.4L7 8.4 1.4 14Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
