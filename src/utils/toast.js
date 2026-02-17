import { toast } from "vue3-toastify";
import router from "@/router";

export const notify = {
  success(message, redirectTo = null) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      onClose: () => {
        if (redirectTo) {
          router.push(redirectTo);
        }
      },
    });
  },

  error(message) {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  },
};
