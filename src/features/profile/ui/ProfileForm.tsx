import { FC, useEffect, useState } from "react";
import { Alert, Image, Keyboard, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { FileHelper } from "src/features/file";
import { AddGreenIcon, PhoneRoundedIcon, UnknownUser, UserIcon } from "src/shared/img";
import { Asset } from 'react-native-image-picker';
import { useEvent, useUnit } from "effector-react";
import { $auth, setLoggedState } from "src/features/auth/model/AuthStore";
import { Input } from "src/shared/components/Input";
import { Button } from "src/shared/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfirmDeleteAccount } from "./ConfirmDeleteAccount";
import { PrivacyPolicy } from "src/features/privacy-policy";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { colors } from "src/shared/style";
import { $profile, getProfile, updateProfile,setProfile } from "..";
import { useToast } from "react-native-toast-notifications";
import { fileService } from "src/features/file/model/file-service";
import { Profile } from "src/types/profile";

// import { PrivacyPolicy } from "src/features/privacy-policy";

interface IProfileFormProps {
    navigateToMain: () => void;
    navigateToAuth: () => void;
}
export const ProfileForm: FC<IProfileFormProps> = ({ navigateToAuth,navigateToMain }) => {
    const toast = useToast();
    const [, handleChangeLoggedState] = useUnit([$auth, setLoggedState]);
    const [{profile}] = useUnit([$profile]);

    console.log('profile', profile)
    const [newAvatar, setNewAvatar] = useState<any>(null);
    const handleSetProfile = useEvent(setProfile);
    const [firstName, setfirstName] = useState({firstName: profile?.firstName || ""})
    const [middleName, setMiddleName] = useState({middleName: profile?.middleName || ""})
    const [lastName, setLastName] = useState({lastName: profile?.lastName || ""})
    const [phone, setPhone] = useState({phone: profile?.phone_number || ""})
    const [changed, setChanged] = useState<boolean>(false);
    const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);
    const [openPrivacy, setOpenPrivacy] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    
    const handleSelectAvatar = async () => {
        try {
            const res: Asset[] | false = await FileHelper.pickFile({ limit: 1 });
            if (res && res.length > 0) {
                setNewAvatar({ uri: res[0].uri, name: res[0].fileName || 'avatar', type: res[0].type || 'image/jpg'});
                !changed && setChanged(true);
            }
        } catch (err) {
            console.error('Failed to select avatar', err);
        }
    }

    const handleChangeFirstName = (firstName: string) => {
        setfirstName(prev => ({...prev, firstName}));
        !changed && setChanged(true);
    }

    const handleChangeMiddleName = (middleName: string) => {
        setMiddleName(prev => ({...prev, middleName}));
        !changed && setChanged(true);
    }
    const handleChangeLastName = (lastName: string) => {
        setLastName(prev => ({...prev, lastName}));
        !changed && setChanged(true);
    }
    const handleChangePhone = (phone: string) => {
        setfirstName(prev => ({...prev, phone}));
        !changed && setChanged(true);
    }
    const handleSaveChanged = async () => {
        try {
            setLoading(true);
            const updateData = { firstName: firstName.firstName, middleName : middleName.middleName, lastName : lastName.lastName, phone : phone.phone  };
            if (newAvatar) {
                const formData: FormData = new FormData();
                formData.append('avatar_link', newAvatar);
                const uploadResponse: any = await fileService.uploadFiles(formData);
                updateData['img'] = uploadResponse.avatar_link;
            }
            const data: any = await updateProfile(updateData);
            const profile: Profile = await getProfile();
            handleSetProfile(profile);

            if(profile.firstName && profile.lastName && profile.img){
                navigateToMain();
            }


            if (data && data.message) {
                setChanged(false);
                toast.show('Сохранено', {
                    type: "success",
                    placement: "top"
                });
                Keyboard.dismiss();
            }
        } catch (err) {
            console.error('Failed to update profile', err);
        } finally {
            setLoading(false);
        }
    }
    
  

    const handleLogout = async () => {
          Alert.alert('', 'Вы действительно хотите выйти?', [
            {
              text: 'Отмена',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Да',
              onPress: async () => {
                await AsyncStorage.removeItem(AsyncStorageKeys.TOKEN);
                handleChangeLoggedState(false);
                navigateToAuth();
              },
            },
          ]);
          return true;
        
      };
      

    const handleDeleteAccount = async () => {
        Alert.alert('', 'Вы действительно хотите Удалить аккаунт?', [
            {
              text: 'Отмена',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Да',
              onPress: async () => {
                setOpenDeleteAccount(false);
                handleLogout();

              },
            },
          ]);
    }
    if (!profile) {
        handleLogout();
        return null;
    }
    return(
        <>
            <Modal visible={openDeleteAccount} children={<ConfirmDeleteAccount onClose={() => setOpenDeleteAccount(false)} onConfirm={handleDeleteAccount} />}/>
            <Modal visible={openPrivacy} children={<PrivacyPolicy type="read" onBack={() => setOpenPrivacy(false)}/>} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.form_holder}>
                    <View />
                    <View style={styles.body}>
                        <View style={styles.avatar_holder}>
                            {
                                newAvatar
                                ?
                                <Image source={newAvatar} style={styles.avatar}/>
                                : profile.img ? 

                                <Image 
                                    source={{ uri: profile.img }}
                                    style={styles.avatar}/>
                                    : 
                                    <Image source={UnknownUser} style={styles.avatar}/>

                            }
                            <TouchableOpacity 
                                style={styles.add_avatar}
                                onPress={handleSelectAvatar}>
                                <AddGreenIcon />
                            </TouchableOpacity>
                        </View>
                                     <Input 
                            leftIcon={<UserIcon />}
                            placeholder="Фамилия"
                            value={lastName.lastName} 
                            onChange={handleChangeLastName}/>
                                <Input 
                            leftIcon={<UserIcon />}
                            placeholder="Имя"
                            value={firstName.firstName} 
                            onChange={handleChangeFirstName}/>
                                <Input 
                            leftIcon={<UserIcon />}
                            placeholder="Отчество"
                            value={middleName.middleName} 
                            onChange={handleChangeMiddleName}/>
                       
                        <Input 
                            projectType="profile_phone"
                            leftIcon={<PhoneRoundedIcon />}
                            placeholder="Номер телефона"
                            keyboardType="phone-pad"
                            value={phone.phone}
                            onChange={handleChangePhone}
                            disabled={true}/>
                        <Button 
                            onPress={handleSaveChanged}
                            projectType="primary"
                            disabled={!changed}>
                                <Text style={styles.button_text}>Сохранить</Text>
                        </Button>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={handleLogout} style={styles.footer_button}>
                            <Text style={styles.footer_button_text}>Выйти</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenDeleteAccount(true)} style={styles.footer_button}>
                            <Text style={styles.footer_button_text}>Удалить аккаунт</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenPrivacy(true)} style={styles.footer_button}>
                            <Text style={styles.footer_button_text}>Политика конфиденциальности</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    form_holder: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    body: {
        paddingHorizontal: 20,
        rowGap: 10
    },
    avatar_holder: {
        width: 100,
        height: 100,
        position: 'relative',
        alignSelf: 'center'
    },
    avatar: {
        width: 95,
        height: 95,
        alignSelf: 'center',
        borderRadius: 100
    },
    add_avatar: {
        position: 'absolute',
        right: 15,
        bottom: 5
    },
    button_text: {
        fontSize: 16,
        color: colors.black,
        textAlign: 'center'
    },
    footer: {
        paddingVertical: 10
    },
    footer_button: {
        alignSelf: 'center'
    },
    footer_button_text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "300",
        marginVertical: 2
    }
});