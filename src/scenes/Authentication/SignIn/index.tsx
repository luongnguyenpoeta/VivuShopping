import { injectValue } from 'common/func'
import regex from 'common/regex'
import { ButtonText } from 'components/ButtonText'
import { Image } from 'components/image'
import { Text } from 'components/text'
import { TextInput } from 'components/TextInput'
import { Formik } from 'formik'
import { useLocalizationContext } from 'localization'
import { RootStackParamList } from 'navigator/Navigator'
import { navigate } from 'navigator/RootNavigation'
import { registerScreen } from 'navigator/RouteGeneric'
import { NAV_SCREENS } from 'navigator/RouteNames'
import React from 'react'
import {
  Dimensions,
  Keyboard,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { ScaledSheet } from 'rn-scaled-sheet'
import { ISignIn } from 'services'
import { textToSpeech } from 'services/SpeechService'
import { authAsyncActions } from 'stores/authReducer'
import { useAppDispatch } from 'stores/hook'
import { Theme, useTheme } from 'theme'
import * as yup from 'yup'

export type SignInParams = undefined

const FieldNames = {
  email: 'email',
  password: 'password',
}

function _SignIn() {
  const dispatch = useAppDispatch()
  const languages = useLocalizationContext()

  const theme = useTheme()
  const styles = makeStyles(theme)

  const initialValues: ISignIn = {
    email: '',
    password: '',
  }

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email(languages.ErrorInvalidEmail)
      .required(languages.ErrorRequiredEmail),
    password: yup
      .string()
      .required(languages.ErrorRequiredPassword)
      .matches(
        regex.passwordPattern,
        injectValue(languages.ErrorInvalidPassword, 8)
      )
      .min(8, injectValue(languages.ErrorInvalidPassword, 8)),
  })

  const onSignIn = (values: ISignIn) => {
    console.tron.log('Sign in')
    Keyboard.dismiss()
    dispatch(authAsyncActions.signIn(values))
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}>
      <Image
        url='https://image.freepik.com/free-vector/abstract-colorful-floral-shape-with-logo_1035-8982.jpg'
        style={styles.logo}
        containerStyle={styles.logoView}
      />
      <Text text={languages.SignIn} preset='bold' />
      <Text text={languages.SignInSubTitle} preset='header' />
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={onSignIn}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.form}>
            <TextInput
              label={languages.Email}
              keyboardType='default'
              autoCapitalize='words'
              onChangeText={handleChange(FieldNames.email)}
              onBlur={handleBlur(FieldNames.email)}
              value={values.email}
              error={errors.email}
              clearButtonMode='while-editing'
            />
            <TextInput
              secureTextEntry
              label={languages.Password}
              maxLength={100}
              onChangeText={handleChange(FieldNames.password)}
              onBlur={handleBlur(FieldNames.password)}
              value={values.password}
              error={errors.password}
            />
            <ButtonText
              preset='primary'
              textPresets='bold'
              text={languages.SignIn}
              onPress={handleSubmit}
              style={styles.buttonSignIn}
            />
          </View>
        )}
      </Formik>

      <View style={styles.spacingView}>
        <Text>{languages.DontHaveAccount}</Text>
        <TouchableOpacity
          onPress={() => {
            // navigate(NAV_SCREENS.SignUp)
            textToSpeech('M???i ????y, v??o chi???u ng??y, 28/4, S??? GD-??T TP.HCM ???? c?? v??n b???n g???i c??c c?? s??? gi??o d???c tr??n ?????a b??n v??? vi???c t??ng c?????ng c??ng t??c ph??ng ch???ng d???ch Covid-19. S??? y??u c???u c??c c?? s??? gi??o d???c ti???p t???c t??ng c?????ng c???nh gi??c v???i nguy c?? d???ch b???nh, ????? cao tr??ch nhi???m ng?????i ?????ng ?????u, th???c hi???n quy???t li???t, ?????ng b???, hi???u qu??? c??c bi???n ph??p ph??ng, ch???ng d???ch Covid-19 ???? ????? ra. C??c tr?????ng ti???p t???c th???c hi???n nghi??m theo c??ng v??n 536 ban h??nh ng??y 25 / 2 / 2021 c???a S??? GD - ??T v??? t??ng c?????ng c??c bi???n ph??p ph??ng d???ch khi h???c sinh, sinh vi??n ??i h???c tr??? l???i.T??? ch???c nghi??m y??u c???u 5K c???a B??? Y t??? t???i ????n v???.?????c bi???t, c??n b???, gi??o vi??n, nh??n vi??n v?? h???c sinh tu??n th??? ??eo kh???u trang ngo??i l???p h???c.')
          }}>
          <Text style={styles.textSignUp} text={languages.SignUp} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const SignIn = registerScreen<RootStackParamList, NAV_SCREENS.SignIn>(
  NAV_SCREENS.SignIn,
  _SignIn
)

export default SignIn

const makeStyles = (theme: Theme) =>
  ScaledSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing[5],
    },
    logoView: {
      paddingTop: theme.spacing[6],
    },
    logo: {
      alignSelf: 'center',
      aspectRatio: 1,
      height: Dimensions.get('window').height * 0.2,
    },
    form: {},
    spacingView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      bottom: theme.dimensions.paddingBottom,
      marginTop: 50, // I dont know why need add margin here to prevent spacing view does not overlap form view
    },
    buttonSignIn: {
      marginTop: theme.spacing[5],
    },
    textSignUp: {
      color: theme.colors.primaryButton,
    },
  })
