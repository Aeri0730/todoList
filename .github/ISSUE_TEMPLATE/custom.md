---
name: Custom issue template
about: 'It will be used to all of issue '
title: ''
labels: ''
assignees: ''

---

name: '이슈 생성'
description: 'Repo에 이슈를 생성하며, 생성된 이슈는 Jira와 연동됩니다.'
labels: [feat]
title: '이슈 이름을 작성해주세요'
body:
  - type: input
    id: parentKey
    attributes:
      label: '🎟️ 상위 작업 (Ticket Number)'
      description: '상위 작업의 Ticket Number를 기입해주세요 (예: CHAEUM-00)'
      placeholder: 'CHAEUM-00'
    validations:
      required: true

  - type: input
    id: summary
    attributes:
      label: '📝 이슈 요약 (Summary)'
      description: '이슈에 대한 간략한 설명을 입력해주세요'
      placeholder: '예: 사용자 로그인 기능 구현'
    validations:
      required: true

  - type: textarea
    id: tasks
    attributes:
      label: '✅ 체크리스트(Tasks)'
      description: '이슈를 완료하기 위해 필요한 작업 목록을 작성해주세요'
      value: |
        - [ ] Task1
        - [ ] Task2
    validations:
      required: true
