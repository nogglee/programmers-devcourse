# 학습 내용

### 01. 로컬 소스코드를 원격 저장소에 업로드

1. github에 저장소 단위인 ‘repository’를 생성한다.
2. 원격 repository와 로컬 소스 코드의 폴더를 연결한다.
`git remote add origin https://github.com/{githubUserName}/{repositoryName}.git`
3. 작업하는 로컬 환경이 원격 환경에 처음 접근하는 것이라면, accessToken을 생성하여 입력해준다.

---

### 02. 원격 저장소의 소스코드를 로컬에 다운로드

1. repository를 저장할 상위 폴더에서 clone을 실행한다.
2. 원격 repository를 통째로 내려받는다.
`git pull origin main`

---

### 03. 브랜치

브랜치 생성 시 하나의 repository를 생성하는 것과 같이 프로젝트 단위로 버저닝이 가능하다.  
원활한 협업을 위해 팀원별로 맡은 기능에 따라 브랜치를 나누어 관리할 수 있다.  

1. 현재 위치한 branch 확인
`git status`
2. 현재 repository에 생성된 branch 목록 확인
`git branch`
3. 현재 repository에 새로운 branch 만들기
`git branch {newBranchName}`
4. 다른 branch로 옮기기
`git checkout {branchName}`

---

# 실습 결과