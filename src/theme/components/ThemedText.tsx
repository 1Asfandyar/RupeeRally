import { Text } from 'react-native';
import { ThemedTextProps } from '../types';
import { fontFamilies } from '../fonts';

const ThemedText = ({
  weight = 'regular',
  style,
  ...props
}: ThemedTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: fontFamilies[weight],
        },
        style,
      ]}
    />
  );
};

export default ThemedText;
