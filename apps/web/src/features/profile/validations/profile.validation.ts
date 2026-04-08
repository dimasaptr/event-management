/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : profile.validation.ts
 * =========================================
 */

export const validateProfile = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name minimal 2 karakter",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: {
      value: 2,
      message: "Last name minimal 2 karakter",
    },
  },
  profilePicture: {
    validate: (value?: string) => {
      if (!value) return true;

      const isHttpUrl = /^https?:\/\/.+$/i.test(value);
      const isImageDataUrl = /^data:image\/[a-zA-Z0-9.+-]+;base64,.+$/i.test(
        value
      );

      return isHttpUrl || isImageDataUrl || "Harus berupa URL valid atau file gambar";
    },
  },
};
