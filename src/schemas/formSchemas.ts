import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .max(5, "이름은 최대 5자까지만 허용됩니다.")
    .nonempty("이름을 입력해주세요"),

  user_id: z
    .string()
    .min(6, "아이디는 최소 6자 이상이어야 합니다.")
    .max(20, "아이디는 최대 20자까지만 허용됩니다.")
    .nonempty("아이디를 입력해주세요."),

  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(20, "비밀번호는 최대 20자까지만 허용됩니다.")
    .nonempty("비밀번호를 입력해주세요."),

  password_confirm: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(20, "비밀번호는 최대 20자까지만 허용됩니다.")
    .nonempty("비밀번호를 다시 입력해주세요."),

  phone_number: z
    .string()
    .regex(/^\d{10,11}$/, "휴대폰 번호는 10~11자리 숫자로 입력해주세요.")
    .nonempty("전화번호를 입력해주세요."),

  email: z
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .nonempty("이메일을 입력해주세요."),

  email_verificationCode: z
    .string()
    .length(6, "인증번호를 정확히 입력해주세요.")
    .nonempty("인증을 완료해주세요."),
});

export type SignupFormData = z.infer<typeof signupSchema>;
