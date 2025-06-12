export interface Todo {
  id: string;        // 투두의 고유 ID
  title: string;     // 투두 내용
  completed: boolean; // 완료 상태 (true: 완료, false: 미완료)
  createdAt: number; // 생성 시간 (타임스탬프)
}


export enum TodoFilter {
  ALL = 'all',         // 모든 투두 보기
  ACTIVE = 'active',   // 미완료 투두 보기
  COMPLETED = 'completed' // 완료 투두 보기
}