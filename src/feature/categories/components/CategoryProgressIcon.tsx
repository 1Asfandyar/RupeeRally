import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import {
  CATEGORY_PROGRESS_SEGMENTS,
  PROGRESS_DOT_SIZE,
  PROGRESS_SIZE,
} from '@/feature/categories/constants/categoryDashboard.constants';
import type { CategoryProgressIconProps } from '@/feature/categories/types/categoryDashboard.types';
import { themeColors } from '@/theme/utilities';

const CategoryProgressIcon = ({
  activeSegmentCount,
  color,
  iconName,
  softColor,
}: CategoryProgressIconProps) => (
  <View style={styles.progressCircle}>
    {CATEGORY_PROGRESS_SEGMENTS.map((segment) => (
      <View
        key={segment.id}
        style={[
          styles.progressDot,
          {
            backgroundColor:
              segment.id < activeSegmentCount ? color : themeColors.gray200,
            left: segment.left,
            top: segment.top,
          },
        ]}
      />
    ))}

    <View style={styles.progressIconWrapper}>
      <View style={[styles.progressIconCenter, { backgroundColor: softColor }]}>
        <Ionicons name={iconName} size={24} color={color} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  progressCircle: {
    height: PROGRESS_SIZE,
    width: PROGRESS_SIZE,
  },
  progressDot: {
    borderRadius: PROGRESS_DOT_SIZE / 2,
    height: PROGRESS_DOT_SIZE,
    position: 'absolute',
    width: PROGRESS_DOT_SIZE,
  },
  progressIconCenter: {
    alignItems: 'center',
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  progressIconWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryProgressIcon;
