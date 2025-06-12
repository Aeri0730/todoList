# 📝 Next.js & TanStack Query 기반 투두 리스트 애플리케이션
이 프로젝트는 Next.js(App Router), TypeScript, TanStack Query(react-query)를 활용하여 구현된 투두 리스트 애플리케이션입니다. 기본적인 CRUD(생성, 읽기, 수정, 삭제) 기능과 완료 상태 필터링, 그리고 서버 사이드 렌더링(SSR) 및 클라이언트 하이드레이션을 포함합니다. UI는 Tailwind CSS와 Shadcn UI 컴포넌트를 사용하여 구현되었습니다.

# ✨ 주요 기능
투두 CRUD: 새로운 투두 생성, 기존 투두 조회, 완료 상태 수정, 투두 삭제 기능

상태 필터링: '모두', '진행 중', '완료됨' 탭을 통해 투두 목록을 필터링하여 확인

서버 상태 관리: TanStack Query를 사용하여 서버 상태(데이터)를 체계적으로 관리 (캐싱, 로딩/에러 처리, 쿼리 무효화 등)

타입 안전성: TypeScript 인터페이스 및 타입을 활용하여 코드의 타입 안전성 확보

SSR & Hydration: Next.js App Router의 prefetchQuery와 HydrationBoundary를 통해 초기 페이지 로딩 최적화

반응형 UI: Tailwind CSS를 기반으로 모바일 및 데스크톱 환경에 대응하는 반응형 웹 디자인

컴포넌트 재사용: Shadcn UI의 Input 및 Button 컴포넌트를 활용하여 일관된 UI 구현

# 🚀 기술 스택
- Next.js 15 (App Router)

- React 19

- TypeScript

- TanStack Query (v5)

- Tailwind CSS

- Shadcn UI

- json-server 

# 📦 설치 및 실행 방법
## 1. 프로젝트 클론 및 의존성 설치
###  의존성 설치 (pnpm 포함)
`npm install`
 또는 `yarn install`
 또는 `pnpm install`

## 2. json-server 설정 (로컬 개발용)
json-server는 로컬 개발 환경에서 백엔드 API를 시뮬레이션하는 데 사용됩니다.

프로젝트 루트 디렉토리에 db.json 파일을 생성하고, 초기 투두 데이터를 추가합니다.

 db.json
`{
  "todos": [
    {
      "id": "1",
      "title": "첫 번째 할 일",
      "completed": false,
      "createdAt": 1700000000000
    }
  ]
}`



## 3. Shadcn UI 컴포넌트 추가


###  Shadcn UI 초기화 
`npx shadcn@latest init`

- 필요한 컴포넌트 추가 (예: input, button)
`npx shadcn@latest add input`
`npx shadcn@latest add button`
- 프로젝트에서 사용된 다른 Shadcn UI 컴포넌트가 있다면 해당 명령어로 추가

## 4. 프로젝트 실행
두 개의 터미널을 열고 각각 다음 명령어를 실행합니다.

터미널 1 (json-server 실행):

`npx json-server db.json`

터미널 2 (Next.js 개발 서버 실행):

npm run dev
# 또는 pnpm dev (pnpm을 사용한다면)

이제 브라우저에서 http://localhost:3000으로 접속하여 투두 앱을 확인하고 기능을 테스트할 수 있습니다.

⚙️ 빌드 및 프로덕션 서버 확인
배포 전에 프로덕션 빌드가 올바르게 작동하는지 확인하는 단계입니다.

애플리케이션 빌드:

`npm run build`
 또는 `pnpm build`

이 명령어를 실행하면 json-server가 없어도 오류 없이 빌드가 완료됩니다. 

로컬 실행:

`npm run dev`
또는` pnpm dev`



💡 구현 시 고려 사항
`SSR & Hydration`: app/page.tsx는 서버 컴포넌트로, prefetchQuery를 통해 초기 투두 데이터를 서버에서 미리 가져옵니다. 이 데이터는 HydrationBoundary를 통해 클라이언트 컴포넌트의 TanStack Query 캐시로 전달되어, 매끄러운 초기 로딩 경험을 제공합니다.

`서버 액션 ("use server")`: 현재 API 파일(lib/api.ts)에 "use server" 지시어를 추가하여 해당 파일의 모든 함수를 서버 액션으로 동작하도록 구현했습니다. 이는 클라이언트 번들 크기를 줄이고, 민감한 로직(예: 실제 API 키)을 서버에만 보관하는 데 유리합니다.

`TanStack Query 활용`:

- useQuery를 통해 데이터 조회 및 캐싱, 로딩/에러 상태를 관리합니다.

- useMutation을 통해 데이터 생성/수정/삭제를 처리하고, 성공 시 queryClient.invalidateQueries를 사용하여 관련 쿼리 데이터를 자동으로 최신 상태로 갱신합니다.

`반응형 디자인`: Tailwind CSS의 유틸리티 클래스를 사용하여 모바일 및 데스크톱 환경에서 레이아웃이 적절히 보이도록 구성했습니다.
