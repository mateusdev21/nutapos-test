import { ref } from "vue";

export const snackbar = ref(false);

export const snackbarText = ref("");

export const snackbarColor = ref("");

export const showSuccessSnackbar = (
    text: string
) => {
    snackbarText.value = text;
    snackbarColor.value = "#046B5F";
    snackbar.value = true;
};

export const showErrorSnackbar = (
    text: string
) => {
    snackbarText.value = text;
    snackbarColor.value = "#DC2626";
    snackbar.value = true;
};