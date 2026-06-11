import { StyleSheet, Text, TextStyle } from 'react-native';

type LabelProps = {
  text: string;
  bold?: boolean;
  semiBold?: boolean;
  style?: TextStyle;
};

export const Label = ({ text, bold, semiBold, style }: LabelProps) => {
  return (
    <Text
      style={[
        styles.text,
        semiBold && styles.semiBold, bold && styles.bold,
        style,
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
  bold: {
    fontWeight: '700',
  },
  semiBold: {
    fontWeight: '600',
  },
});
