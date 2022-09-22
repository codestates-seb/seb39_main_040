import styled from "styled-components";
import { useForm } from "react-hook-form";

const SignUpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: none;
  input {
    display: flex;
    flex-wrap: wrap;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid #ae9e8f;
    font-size: 15px;
    height: 30px;
    background-color: #f0ece3;
    width: 300px;
    margin-bottom: 18px;
  }

  input::placeholder {
    color: #ae9e8f;
  }
`;

const NameArea = styled.div`
  margin-top: 40px;
  background-color: #f0ece3; //height: 50px;
  display: flex;
  flex-direction: column;
  color: #ae9e8f;
  font-size: 15px;
  padding: 5px;
`;

const EmailArea = styled.div`
  margin-top: 10px;
  background-color: #f0ece3; //height: 50px;
  display: flex;
  flex-direction: column;
  color: #ae9e8f;
  font-size: 15px;
  padding: 5px;
`;

const PasswordArea = styled.div`
  margin-top: 10px;
  background-color: #f0ece3; //height: 50px;
  display: flex;
  flex-direction: column;
  color: #ae9e8f;
  font-size: 15px;
  padding: 5px;
`;

const PhoneNumberArea = styled.div`
  margin-top: 10px;
  background-color: #f0ece3; //height: 50px;
  display: flex;
  flex-direction: column;
  color: #ae9e8f;
  font-size: 15px;
  padding: 5px;
`;

const SignUpButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  background-color: #ae9e8f;
  font-size: 17px;
  margin-top: 25px;
  width: 100px;
  text-align: center;
  height: 35px;
  border-radius: 5px;
  color: #f0ece3;

  &:hover {
    //color: #ae9e8f;
    opacity: 0.8;
  }
`;

function SignUpForm({
  onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    //alert(JSON.stringify(data));
    // 로그인시 작성되는 이메일, 비밀번호값이 data로 입력되어 나타난다.
    console.log(data);
  },
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  return (
    <SignUpFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          <NameArea>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              aria-invalid={
                !isDirty ? undefined : errors.name ? "true" : "false"
              }
              {...register("name", {
                required: "이름이 입력되지 않았습니다.",
                pattern: {
                  value: /[ㄱ-힣]/,
                  message: "올바른 이름의 형태가 아닙니다.",
                },
              })}
            />
            {errors.name && <small role="alert">{errors.name.message}</small>}
          </NameArea>
        </label>
        <label htmlFor="email">
          <EmailArea>
            <input
              id="email"
              type="text"
              placeholder="이메일을 입력하세요"
              aria-invalid={
                !isDirty ? undefined : errors.email ? "true" : "false"
              }
              {...register("email", {
                required: "이메일이 입력되지 않았습니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "올바른 이메일의 형태가 아닙니다.",
                },
              })}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </EmailArea>
        </label>
        <label htmlFor="password">
          <PasswordArea>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              aria-invalid={
                !isDirty ? undefined : errors.password ? "true" : "false"
              }
              {...register("password", {
                required: "비밀번호를 입력하지 않았습니다.",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                  message: "8~16자리이고 영문, 숫자가 포함되게 입력하세요",
                },
              })}
            />
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
          </PasswordArea>
        </label>
        <label htmlFor="phonenumber">
          <PhoneNumberArea>
            <input
              id="phonenumber"
              type="tel"
              placeholder="-를 제외하고, 전화번호를 입력하세요"
              aria-invalid={
                !isDirty ? undefined : errors.tel ? "true" : "false"
              }
              {...register("tel", {
                required: "전화번호를 입력하지 않았습니다.",
                pattern: {
                  value: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
                  message: "올바른 전화번호를 입력해주세요.",
                },
              })}
            />
            {errors.tel && <small role="alert">{errors.tel.message}</small>}
          </PhoneNumberArea>
        </label>
        <SignUpButton type="submit" disabled={isSubmitting}>
          Sign Up
        </SignUpButton>
      </form>
    </SignUpFormWrapper>
  );
}

export default SignUpForm;
