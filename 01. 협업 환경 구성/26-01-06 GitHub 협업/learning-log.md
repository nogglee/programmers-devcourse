# 학습 내용

### 01. Branch 규칙

기능 개발, 출시 준비, 긴급 수정 등의 목적에 따라 branch 명을 작명 할 수 있다.  
새로운 branch 생성 후 수정한 사항은 commit 하는 시점에 반영된다.  

---

### 02. Branch 전략

**fast-forward**  
기준이 되는 branch는 유지한 상태에서 새로운 branch를 생성하여 업데이트 후,  
새로운 branch의 기능이 완성되면 기준이되는 main과 같은 branch에 합치는 방법  

**3-way**  
새로운 branch에서 변경사항을 merge할 때, 다른 협업자가 기준이 되는 branch에 먼저 merge한 경우  
변경된 부분이 겹친다면 변경사항을 서로 비교하여 최종 merge commit을 발생 시키는 방법  

**경우의 수**
1. 하나의 commit만 base 소스 코드와 다를 때 → base에서 업데이트된 사항을 merge에 반영
2. 두 개의 commit 모두 base 소스 코드와 같을 때 → 그대로 유지
3. 두 개의 commit 모두 base 소스 코드와 다를 때 → conflict 발생

---

### 03. Merge & Conflict

> **Merge:**    
> 추가 생성한 branch의 작업이 끝난 후, base branch에 병합하는 것을 의미  


**Merge 프로세스**
1. main branch에 무분별한 병합을 막기 위해 branch 보호 설정
2. 추가한 branch에서 main branch로 병합 요청 (=Pull Request)
3. github가 자동으로 conflict 검토
4. conflict 없을 시 merge 실행
5. merge 성공 시
    1. merge commit 발생
    2. branch 삭제 필요

---

# 실습 결과