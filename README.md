## 한 달 인턴 온보딩 과제

이름: 김민지
트랙 & 기수: 웹 React 5기

## 구현 기능

- 회원가입
- 로그인 / 로그아웃
- 내 프로필 정보 조회
- 내 프로필 수정
- 외부 API 통신 (todos)

## 폴더 구조

```bash
├──📁public
│  └── 📁images
├──📁src
│   ├── 📁api
│   │   ├── auth.ts
│   │   ├── axiosInstance.ts
│   │   └── todo.ts
│   ├── 📁components
│   │   └── 📁common
│   │   │   ├── Header.tsx
│   │   │   └── Loading.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoList.tsx
│   ├── 📁pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Profile.tsx
│   │   └── Register.tsx
│   ├── 📁router
│   │   ├── PrivateRouter.tsx
│   │   └── Router.tsx
│   ├── 📁store
│   │   └── authStore.tsx
│   ├── 📁types
│   │   ├── auth.types.ts
│   │   └── todo.types.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── QueryClientSetup.tsx
├── index.html
├──
```

## 사용 기술

- React, TypeScript
- react-router-dom : 라우팅 관리
- Tailwind CSS : 스타일링
- tanstack query : auth, todos API 통신
- zustand : accessToken 전역 상태 관리

  **사용 이유**

  저장은 스토리지에 하지만, 컴포넌트 간 상태 공유의 편의를 위해 zustand도 같이 사용했습니다.

- local storage : accessToken 저장, 만료 기간 저장

  **사용 이유**

  쿠키가 보안성이 높지만, 쿠키는 서버에서 설정해줘야 사용할 수 있어서 보류했습니다.

  또한 메모리 단에서 관리하면 새로고침 시 초기화 되기 때문에 스토리지가 적합하다고 판단했습니다.

  **세션 스토리지 VS 로컬 스토리지** : 세션 스토리지는 브라우저 창을 닫으면 데이터가 삭제됩니다. 로그인 상태는 창을 닫았다가 다시 열어도 유지되어야 한다고 판단하여 로컬 스토리지에 저장하는 것으로 결정했습니다.

## 트러블 슈팅

### 회원가입 오류

**문제** : 제공된 서버 API에 따르면, 회원가입 시 아이디가 중복되면 가입되지 않는 것으로 확인되었습니다.

**해결** : 중복 여부를 확인해주는 API가 따로 제공되지는 않아서 근본적인 문제 해결은 아니지만, 다음과 같은 방법을 사용했습니다. 오류 발생 시 유저에게 `"회원가입 중 오류가 발생했습니다. 이미 존재하는 아이디일 수 있으니 다른 아이디로 다시 시도해보세요."`라는 alert을 발생시켰습니다.

## 배포

### vercel 배포 주소

https://om-assignment.vercel.app/

![image](https://github.com/user-attachments/assets/9fca0855-f95e-42a2-9895-4a58827eed29)
![image](https://github.com/user-attachments/assets/878ef653-ec0b-418c-8ca2-3a25b9e55340)
![image](https://github.com/user-attachments/assets/56ea5780-d4f9-4fe8-a6f8-7e182fd36dec)
