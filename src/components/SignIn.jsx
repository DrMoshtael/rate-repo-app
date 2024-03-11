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
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm }) => {
    const { username, password} = values;

    try {
      const { data } = await signIn({ username, password });
      console.log('dta',data);
      navigate('/')
      resetForm();
    } catch (e) {
      console.log('sign in error: ',e);
    }
  };

  const initialValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          style={formik.errors.username ? [styles.input, {borderColor: theme.colors.error}] : styles.input}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
        )}
        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          secureTextEntry
          style={formik.errors.password ? [styles.input, {borderColor: theme.colors.error}] : styles.input}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>{formik.errors.password}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text color="white" fontSize="subheading">
            Sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
