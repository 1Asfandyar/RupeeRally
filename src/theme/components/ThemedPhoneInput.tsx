import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { fontFamilies } from '../fonts';
import { ThemedTextInputProps } from '../types';
import { themeColors, typography } from '../utilities';
import ThemedText from './ThemedText';
import { COUNTRY_OPTIONS } from '@/config/constants';
import { CountryOption } from '@/types/types';


const ThemedPhoneInput = ({
  weight = 'regular',
  style,
  label,
  containerClassName = '',
  inputClassName = '',
  borderClassName = '',
  ...props
}: ThemedTextInputProps) => {
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
    COUNTRY_OPTIONS[0]
  );

  const countryLabel = useMemo(
    () => `${selectedCountry.flag} ${selectedCountry.dialCode}`,
    [selectedCountry]
  );

  return (
    <>
      <View className={`mb-2 ${containerClassName}`}>
        {label ? (
          <ThemedText className="mb-1 text-sm text-gray-600">{label}</ThemedText>
        ) : null}

        <View
          className={`flex-row items-center rounded-xl border border-gray-200 bg-white px-4 py-4 ${borderClassName}`}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            className="mr-3 flex-row items-center border-r border-gray-200 pr-3"
            onPress={() => setIsCountryModalVisible(true)}
          >
            <ThemedText className={`${typography.primaryControlSize} text-gray-800`}>
              {countryLabel}
            </ThemedText>
            <Ionicons
              name="chevron-down"
              size={18}
              color={themeColors.primary}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>

          <TextInput
            {...props}
            keyboardType="phone-pad"
            placeholder="Phone Number"
            placeholderTextColor={themeColors.gray400}
            className={`${typography.primaryControlSize} flex-1 min-w-0 text-gray-800 ${inputClassName}`}
            style={[
              {
                fontFamily: fontFamilies[weight],
                flexShrink: 1,
                minWidth: 0,
              },
              style,
            ]}
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={isCountryModalVisible}
        onRequestClose={() => setIsCountryModalVisible(false)}
      >
        <Pressable
          className="flex-1 justify-center bg-black/30 px-6"
          onPress={() => setIsCountryModalVisible(false)}
        >
          <Pressable
            className="max-h-96 rounded-2xl bg-white p-4"
            onPress={(event) => event.stopPropagation()}
          >
            <ThemedText className="mb-3 text-lg text-gray-900" weight="semiBold">
              Select Country Code
            </ThemedText>

            <ScrollView showsVerticalScrollIndicator={false}>
              {COUNTRY_OPTIONS.map((country) => {
                const isActive = country.code === selectedCountry.code;

                return (
                  <TouchableOpacity
                    key={country.code}
                    activeOpacity={0.8}
                    className={`mb-2 flex-row items-center justify-between rounded-xl px-4 py-3 ${
                      isActive ? 'bg-lightBlue' : 'bg-white'
                    }`}
                    onPress={() => {
                      setSelectedCountry(country);
                      setIsCountryModalVisible(false);
                    }}
                  >
                    <View>
                      <ThemedText className="text-gray-900" weight="medium">
                        {country.flag} {country.name}
                      </ThemedText>
                      <ThemedText className="text-sm text-gray-500">
                        {country.dialCode}
                      </ThemedText>
                    </View>

                    {isActive ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={themeColors.primary}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default ThemedPhoneInput;
