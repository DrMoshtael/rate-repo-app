import { useFormik } from "formik";
import Text from "./Text";
import theme from "../theme";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
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
    minHeight: 50,
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
  ownerName: yup.string().required("Repo owner name is required"),
  repositoryName: yup.string().required("Repo name is required"),
  rating: yup.number("Rating must be a number between 0 and 100").required("Rating is required"),
  text: yup.string(),
});

const ReviewForm = () => {

    const [ createReview ] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();

  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const review = {
        ...values,
        rating: Number(values.rating)
    }
    try {
        const returnedReview = await createReview({ variables: { review } })
        navigate(`/${returnedReview.data.createReview.repositoryId}`)
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
          placeholder="Repository owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange("ownerName")}
          onBlur={formik.handleBlur("ownerName")}
          style={
            formik.touched.ownerName && formik.errors.ownerName
              ? [styles.input, { borderColor: theme.colors.error }]
              : styles.input
          }
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.ownerName}
          </Text>
        )}
        <TextInput
          placeholder="Repoistory name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange("repositoryName")}
          onBlur={formik.handleBlur("repositoryName")}
          style={
            formik.touched.repositoryName && formik.errors.repositoryName
              ? [styles.input, { borderColor: theme.colors.error }]
              : styles.input
          }
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.repositoryName}
          </Text>
        )}
        <TextInput
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
          onBlur={formik.handleBlur("rating")}
          style={
            formik.touched.rating && formik.errors.rating
              ? [styles.input, { borderColor: theme.colors.error }]
              : styles.input
          }
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.rating}
          </Text>
        )}
        <TextInput
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange("text")}
          onBlur={formik.handleBlur("text")}
          multiline
          style={
            formik.touched.text && formik.errors.text
              ? [styles.input, { borderColor: theme.colors.error }]
              : styles.input
          }
        />
        {formik.touched.text && formik.errors.text && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.repositoryName}
          </Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text color="white" fontSize="subheading">
            Create a review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewForm;
