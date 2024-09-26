import { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { useNavigation, type RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { InputField, ScreenLayout, TextButton } from '@/components';
import { GroupsScreens } from '@/config';
import {
  getUserGroups,
  onCreateGroup,
  onRequestNewGroupKey,
  randomKey,
  saveRoomsMessageToDatabase,
  useGlobalStore,
} from '@/services';
import type { GroupStackNavigationType, GroupStackParamList } from '@/types';

interface Props {
  route: RouteProp<GroupStackParamList, typeof GroupsScreens.AddGroupScreen>;
}

let admin: string = '';

export const AddGroupScreen: React.FC<Props> = ({ route }) => {
  const { t } = useTranslation();
  const { name: initialName, roomKey: initialKey } = route.params;
  const navigation = useNavigation<GroupStackNavigationType>();
  const [name, setName] = useState<string | null>(initialName ?? null);
  const [roomKey, setKey] = useState<string | null>(initialKey ?? null);
  const [isJoiningExisting, setIsJoiningExisting] = useState(false);
  const { name: userName, address } = useGlobalStore((state) => state.user);
  const continueText = isJoiningExisting ? t('joinGroup') : t('createGroup');

  async function onCreatePress() {
    //TODO Add Create / Join option
    if (roomKey && name) {
      const topic: string = await onCreateGroup(name, roomKey, admin);
      navigation.navigate(GroupsScreens.GroupChatScreen, { name, roomKey });
      getUserGroups();
      //Add this with local address and nickname
      saveRoomsMessageToDatabase(
        address,
        'Joined room',
        roomKey,
        '',
        Date.now(),
        userName,
        randomKey(),
        true,
      );
    }
  }

  async function onGeneratePress() {
    try {
      const keys = await onRequestNewGroupKey();
      const [invite, seed] = JSON.parse(keys);
      console.log('Invite key:', invite);
      console.log('Admin seed:', seed);
      if (invite) {
        setKey(invite);
        admin = seed;
      }
    } catch (e) {
      console.error('Error create random group key', e);
    }
  }

  useEffect(() => {
    console.log({ roomKey });
  }, [roomKey]);

  function onNameChange(value: string) {
    setName(value);
  }

  function onKeyChange(value: string) {
    setKey(value);
  }

  useEffect(() => {
    if (initialName && initialKey) {
      setIsJoiningExisting(true);
    }
  }, [initialName, initialKey]);

  useEffect(() => {
    if (name !== initialName || roomKey !== initialKey) {
      setIsJoiningExisting(false);
    }
  }, [name, roomKey]);

  return (
    <ScreenLayout>
      <View>
        <InputField label={t('name')} value={name} onChange={onNameChange} />
        <InputField
          label={t('messageKey')}
          value={roomKey}
          onChange={onKeyChange}
        />
        {!isJoiningExisting && (
          <TextButton
            small
            type="secondary"
            style={styles.generateButton}
            onPress={onGeneratePress}>
            {t('generate')}
          </TextButton>
        )}
        <TextButton disabled={!name && !roomKey} onPress={onCreatePress}>
          {continueText}
        </TextButton>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  generateButton: {
    alignSelf: 'flex-start',
  },
});
