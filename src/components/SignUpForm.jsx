import Text from "./Text";
import { useFormik } from "formik";
import {
  TextInput,
  Pressable,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    marginTop: 50,
  },
  container: {
    backgroundColor: "white",
    gap: 20,
    padding: 20,
    minWidth: Dimensions.get("window").width < 500 ? "100%" : 500,
    maxWidth: 800,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    padding: 10,
    color: theme.colors.textSecondary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Maximum username length is 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Maximum password length is 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required("Please confirm password"),
});

const SignUpForm = () => {
    const [createUser] = useMutation(CREATE_USER);
    const navigate = useNavigate();
    const [signIn] = useSignIn();

  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { username, password } = values
    const user = { username, password }
    console.log(user);
    try {
        await createUser({ variables: { user }});
        await signIn(user)
        navigate('/')
        resetForm();
    } catch (e) {
        console.log(e)
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          style={
            formik.touched.username && formik.errors.username
              ? [styles.input, { borderColor: theme.colors.error }]
              : styles.input
          }
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          secureTextEntry
          onBlur={formik.handleBlur("password")}
          style={
            formik.touched.password && formik.errors.password
              ? [styles.input, { borderColor: theme.colors.error }]
              : styles.input
          }
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
        <TextInput
          placeholder="Confirm password"
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange("passwordConfirmation")}
          secureTextEntry
          onBlur={formik.handleBlur("passwordConfirmation")}
          style={
            formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
              ? [styles.input, { borderColor: theme.colors.error }]
              : styles.input
          }
        />
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <Text style={{ color: theme.colors.error }}>
              {formik.errors.passwordConfirmation}
            </Text>
          )}
        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text color="white" fontSize="subheading">
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpForm;
