import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { CreateGroupModalProps } from '@/feature/groups/types/groupsScreen.types';
import {
  getUserInitial,
  getUserLabel,
} from '@/feature/groups/utils/groupMembers.utils';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const CreateGroupModal = ({
  error,
  friends,
  groupName,
  isCreating,
  isDisabled,
  isVisible,
  onChangeGroupName,
  onClose,
  onCreate,
  onToggleFriend,
  selectedFriendIds,
}: CreateGroupModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <TouchableOpacity
          activeOpacity={1}
          accessibilityRole="button"
          accessibilityLabel="Close create group"
          className="flex-1"
          onPress={onClose}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
        >
          <SafeAreaView
            edges={['bottom']}
            className="rounded-t-[28px] bg-white"
            style={{ maxHeight: '86%' }}
          >
            <View className="px-5 pb-4 pt-5">
              <View className="mb-4 flex-row items-center justify-between">
                <View className="min-w-0 flex-1">
                  <ThemedText className="text-xl text-gray-900" weight="bold">
                    Create group
                  </ThemedText>
                  <ThemedText className="mt-1 text-sm text-gray-500">
                    Choose friends for a custom shared group.
                  </ThemedText>
                </View>

                <TouchableOpacity
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel="Close create group"
                  onPress={onClose}
                  className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                >
                  <Ionicons name="close" size={22} color={themeColors.gray700} />
                </TouchableOpacity>
              </View>

              <ThemedInput
                leftIcon="people-outline"
                onChangeText={onChangeGroupName}
                placeholder="Group name"
                value={groupName}
                error={error}
              />
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={friends.length > 5}
              contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 20 }}
            >
              {friends.map((friend) => {
                const isSelected = selectedFriendIds.includes(friend.id);

                return (
                  <TouchableOpacity
                    key={friend.id}
                    activeOpacity={0.78}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isSelected }}
                    onPress={() => onToggleFriend(friend.id)}
                    className={`mb-2 flex-row items-center rounded-xl border px-4 py-4 ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <View
                      className={`h-10 w-10 items-center justify-center rounded-full ${
                        isSelected ? 'bg-primary' : 'bg-gray-100'
                      }`}
                    >
                      <ThemedText
                        className={`text-sm ${
                          isSelected ? 'text-white' : 'text-gray-700'
                        }`}
                        weight="semiBold"
                      >
                        {getUserInitial(friend)}
                      </ThemedText>
                    </View>
                    <View className="ml-3 min-w-0 flex-1">
                      <ThemedText
                        className="text-sm text-gray-900"
                        weight="semiBold"
                        numberOfLines={1}
                      >
                        {getUserLabel(friend)}
                      </ThemedText>
                      {friend.email ? (
                        <ThemedText className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
                          {friend.email}
                        </ThemedText>
                      ) : null}
                    </View>
                    <Ionicons
                      name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                      size={22}
                      color={isSelected ? themeColors.primary : themeColors.gray400}
                    />
                  </TouchableOpacity>
                );
              })}

              {friends.length === 0 ? (
                <View className="items-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8">
                  <Ionicons
                    name="person-add-outline"
                    size={24}
                    color={themeColors.primary}
                  />
                  <ThemedText className="mt-3 text-center text-sm text-gray-500">
                    Add friends first, then create a custom group with them.
                  </ThemedText>
                </View>
              ) : null}
            </ScrollView>

            <View className="border-t border-gray-100 px-5 pb-3 pt-4">
              <ThemedButton
                title="Create group"
                leftIcon="checkmark-circle-outline"
                loading={isCreating}
                disabled={isDisabled}
                onPress={onCreate}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CreateGroupModal;
