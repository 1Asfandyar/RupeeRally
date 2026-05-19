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

import type { AddFriendModalProps } from '@/feature/transactions/types/addTransactionRecord.types';
import SharedExpenseAvatar from '@/feature/transactions/components/SharedExpenseAvatar';
import { getUserLabel } from '@/feature/groups/utils/groupMembers.utils';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const AddFriendModal = ({
  emailQuery,
  error,
  existingFriendIds,
  isAdding,
  isSearching,
  isVisible,
  onAddUser,
  onChangeEmail,
  onClose,
  onSearch,
  results,
}: AddFriendModalProps) => {
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
          accessibilityLabel="Close add friend"
          className="flex-1"
          onPress={onClose}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
        >
          <SafeAreaView edges={['bottom']} className="rounded-t-[28px] bg-white">
            <View className="px-5 pb-5 pt-5">
              <View className="mb-4 flex-row items-center justify-between">
                <View className="min-w-0 flex-1">
                  <ThemedText className="text-xl text-gray-900" weight="bold">
                    Add friend
                  </ThemedText>
                  <ThemedText className="mt-1 text-sm text-gray-500">
                    Search by email to add someone to your friends group.
                  </ThemedText>
                </View>

                <TouchableOpacity
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel="Close add friend"
                  onPress={onClose}
                  className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                >
                  <Ionicons name="close" size={22} color={themeColors.gray700} />
                </TouchableOpacity>
              </View>

              <ThemedInput
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                leftIcon="mail-outline"
                onChangeText={onChangeEmail}
                onSubmitEditing={onSearch}
                placeholder="friend@email.com"
                returnKeyType="search"
                textContentType="emailAddress"
                value={emailQuery}
                error={error}
              />

              <ThemedButton
                title="Search email"
                leftIcon="search"
                loading={isSearching}
                disabled={isAdding}
                onPress={onSearch}
                containerClassName="mt-2"
              />
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={results.length > 3}
              className="max-h-72"
              contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 20 }}
            >
              {results.map((user) => {
                const isAlreadyFriend = existingFriendIds.includes(user.id);

                return (
                  <View
                    key={user.id}
                    className="mb-3 flex-row items-center rounded-xl border border-gray-200 bg-white px-4 py-4"
                  >
                    <SharedExpenseAvatar user={user} size={40} />
                    <View className="ml-3 min-w-0 flex-1">
                      <ThemedText
                        className="text-sm text-gray-900"
                        weight="semiBold"
                        numberOfLines={1}
                      >
                        {getUserLabel(user)}
                      </ThemedText>
                      {user.email ? (
                        <ThemedText className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
                          {user.email}
                        </ThemedText>
                      ) : null}
                    </View>
                    <ThemedButton
                      title={isAlreadyFriend ? 'Added' : 'Add'}
                      leftIcon={
                        isAlreadyFriend ? 'checkmark-circle' : 'person-add-outline'
                      }
                      loading={isAdding && !isAlreadyFriend}
                      disabled={isAlreadyFriend || isAdding || isSearching}
                      onPress={() => onAddUser(user.id)}
                      containerClassName="ml-3 px-3 py-2"
                      textClassName="text-xs"
                      iconSize={14}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddFriendModal;
