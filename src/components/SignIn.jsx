import Text from "./Text";
import { useFormik } from "formik";
import { TextInput, Pressable, View, StyleSheet, Dimensions } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    marginTop: 50
  },
  container: {
    backgroundColor: "white",
    gap: 20,
    padding: 20,
    minWidth: Dimensions.get('window').width < 500 ? '100%' : 500,
    maxWidth: 800,
  },
  input: {
    borderColor: theme.colors.greyBorder,
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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({ initialValues, onSubmit });

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          secureTextEntry
          style={styles.input}
        />
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
