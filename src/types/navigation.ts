import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthScreens, MainScreens, Stacks } from '@/config';

export type MainNavigationParamList = {
  [MainScreens.SettingsScreen]: undefined;
  [MainScreens.SettingsScreen]: undefined;
  [MainScreens.FaqScreen]: undefined;
  [MainScreens.ChangeLanguageScreen]: undefined;
  [MainScreens.UpdateProfileScreen]: undefined;
  [MainScreens.ChangeThemeScreen]: undefined;
  [MainScreens.MessagesScreen]: undefined;
  [MainScreens.MessageScreen]: { name: string; roomKey: string };
  [MainScreens.GroupsScreen]: undefined;
  [MainScreens.GroupChatScreen]: {
    roomKey: string;
    name: string;
  };
  [MainScreens.ModifyGroupScreen]: { roomKey: string; name: string };
  [MainScreens.AddGroupScreen]:
    | {
        roomKey?: string;
        name?: string;
      }
    | undefined;
  [MainScreens.PickNodeScreen]: undefined;
  [MainScreens.DashboardScreen]: undefined;
  [MainScreens.SendTransactionScreen]: undefined;
  [MainScreens.WalletStatusScreen]: undefined;
  [MainScreens.ModifyContactScreen]: { name: string; roomKey: string };
};

export type MainStackNavigationType =
  NativeStackNavigationProp<MainNavigationParamList>;

export interface RootStackParamList {
  [Stacks.AuthStack]: NavigatorScreenParams<AuthStackParamList>;
  [Stacks.MainStack]: NavigatorScreenParams<MainNavigationParamList>;
}

export type AuthStackParamList = {
  // [AuthScreens.ChooseAuthMethodScreen]: undefined;
  [AuthScreens.ForgotPinScreen]: undefined;
  [AuthScreens.RequestFingerPrintScreen]:
    | { finishFunction?: (nav?: MainStackNavigationType) => void }
    | undefined;
  [AuthScreens.RequestPinScreen]:
    | { finishFunction?: (nav?: MainStackNavigationType) => void }
    | undefined;
  [AuthScreens.SplashScreen]: undefined;
  [AuthScreens.CreateAccountScreen]: undefined;
  [AuthScreens.WelcomeScreen]: undefined;
  [AuthScreens.RestoreAccountScreen]: undefined;
};

export type AuthStackNavigationType =
  NativeStackNavigationProp<AuthStackParamList>;
