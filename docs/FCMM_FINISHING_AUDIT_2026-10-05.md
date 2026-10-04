# FCMM 포트폴리오 마무리 점검과 인계

인계일 2026년 10월 5일 · 관찰 기준 2026년 10월 4일 UTC  
대상 [FCMM 라이브 사이트](https://fcmm-app.web.app/) · [jwpgdx fcmm 저장소](https://github.com/jwpgdx/fcmm)

## 1 검토 결론과 변경 범위

현재 디자인을 유지하면서 상품 연결과 안내 문구의 정확도를 먼저 정리한다. 라이브에서 확인된 우선 항목은 색상 선택 후 상품을 찾지 못하는 경로, 티셔츠에 표시되는 신발 사이즈표, 다른 서비스와 실제 상거래를 전제로 한 개인정보·약관 문구다. 새로운 화면 구조나 쇼핑 기능을 추가할 필요는 없다.

이 문서는 다음 작업자가 기존 작업을 이어받을 수 있도록 재현 경로, 완료 기준, 작업 묶음과 배포 주의사항을 정리한다. 제품 코드 변경, PR 생성, merge, 배포는 이 점검에서 실행하지 않았다. 이 공개본은 docs/fcmm-finishing-audit-2026-10-05 브랜치에 문서 한 파일만 추가하는 전달본이다.

### 판단 수준

| 표시 | 뜻 | 적용 |
| --- | --- | --- |
| 라이브 확인 | 브라우저에서 해당 현상을 직접 관찰 | 색상 경로 1건, 사이즈표, 개인정보·약관, 일부 상품 문구 |
| 코드 확인 | 현재 커밋에서 구현 또는 데이터 불일치 확인 | 추가 색상 경로 2건, 미디어 경로, 로그인, 지도, README |
| 재현 필요 | 단일 시도 또는 코드만으로 실제 영향 확정 불가 | 배송 안내, 푸터 이동, 지도 요청, 모바일·키보드 |

### 고정할 디자인과 제품 경계

- 현재 레이아웃, 타이포그래피, 이미지 구성, 색상, 화면 이동 구조를 기준선으로 유지한다.
- 비상업용 개인 포트폴리오라는 프로젝트 성격과 기존 자산 소유권 고지를 보존한다.
- 인증, 실제 주문, 결제, 재고·배송 운영은 새로 구현하지 않는다. 데모임을 더 명확하게 설명하는 수준에서 마무리한다.
- 의류의 소재·세탁법·실측·핏·재고·배송 정보와 개인정보 담당자·수집 목적·보유 기간을 임의로 만들지 않는다.
- 새 카피나 누락 정보의 대체 표시는 기존 컴포넌트 안에서 해결한다. UI 확대가 필요하면 별도 결정으로 남긴다.

### 현재 작업 기준

원격 main은 a65743fc347b736650bdab3a1e2d0b720d0589a7이며 구현 기준점은 66b088a06088c5fa8b816feb586e5eb8d7a24d8b다. 조회 시 열린 PR은 없었다. 기존 scope·CURRENT·HANDOFF 문서를 먼저 따른다. 별도의 시작 문서나 새로운 작업 권한 체계를 만들지 않는다.

현재 담당자와 작업 상태는 구현 재개 전에 다시 확인한다. CURRENT에는 로컬 작업 폴더를 다시 읽지 않았고 의도적인 폰트 수정·자산이 남아 있을 수 있다는 경고가 있다.

출처: [CURRENT](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/workspace/CURRENT.md#L69-L81)

## 2 먼저 고칠 라이브 확인 항목

### P1 상품 색상 이동 실패

재현: [회색 V Neck Sweatshirt](https://fcmm-app.web.app/shop/ready-to-wear/sweatshirts-hoodies/v-neck-sweatshirt-grey)에서 Blue를 선택한다. 이동 대상은 [v-neck-sweatchirt-blue](https://fcmm-app.web.app/shop/ready-to-wear/sweatshirts-hoodies/v-neck-sweatchirt-blue)이며 PRODUCT NOT FOUND가 표시된다. 상품명에 나타나는 Sweatchirt 오타와 이름 기반 경로 생성이 연결되어 있다.

수정 범위: 표시용 이름과 실제 상품 식별자를 분리하고 기존 상품 ID에 맞춰 색상 대상을 연결한다. 단순히 회색 상품의 오타 한 곳만 수정한 뒤 완료 처리하지 않는다.

완료 기준: 회색→파랑, 파랑→회색이 모두 기존 상품을 열고, 표시명·선택 색상·이미지·URL이 일치한다. 전체 카탈로그의 색상 대상도 존재 여부를 검사한다. 실패 경로의 복구 화면은 보존한다.

근거: 라이브 회색→파랑 이동 확인. 반대 방향과 셔츠의 추가 경로는 4장의 코드 확인 항목에 구분했다. [ProductInfo.vue](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Shop/components/ProductInfo.vue#L273-L282)

### P1 티셔츠에 신발 사이즈표 표시

재현: [Tatom Logo T Shirt](https://fcmm-app.web.app/shop/ready-to-wear/t-shirts/tatom-logo-t-shirt)에서 SIZE GUIDE를 연다. US, EU, Foot Length (cm) 등 신발 치수 항목이 표시된다. 가이드의 범위는 S–XL인데 상품 선택에는 XXL도 있다.

수정 범위: 확인된 의류 사이즈 자료가 있을 때만 해당 상품군에 연결한다. 자료가 없으면 포트폴리오 데모임과 실측 정보 미제공을 정확히 알리는 문구로 대체하는 방안을 검토한다. 실측 수치를 추정해 채우지 않는다.

완료 기준: 티셔츠에 신발 치수가 나오지 않는다. 실제 제공 가능한 사이즈 정보와 선택 옵션의 범위가 일치한다. 값이 없을 때도 비어 있거나 잘못된 표 대신 상황을 설명한다. 모달 열기·닫기와 기존 배치는 유지한다.

코드 근거: [ProductGuideSize.vue](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Shop/components/ProductGuideSize.vue#L12-L54), [상품 정보를 전달하지 않는 호출부](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Shop/components/ProductInfo.vue#L149-L155)

### P1 개인정보와 약관 문구 불일치

재현: [개인정보 안내](https://fcmm-app.web.app/legal/privacy)는 mobile wedding invitation creation service, DPO Jane Kim과 +82-2-1234-5678 등의 담당자·연락처, 결제·마케팅·정보 공유 관련 서술을 담고 있다. [약관](https://fcmm-app.web.app/legal/terms)에는 계정·결제 등 실제 상거래 의무와 [Effective Date: e.g., May 21, 2024]라는 자리표시자가 남아 있다.

수정 범위: 실제 프로젝트의 데이터 처리와 데모 경계에 맞춰 내용을 정리한다. 관련 없는 웨딩 서비스 설명과 근거가 없는 인물·연락처를 제거하거나 검증된 정보로 교체한다. 현재 브라우저 저장 및 외부 콘텐츠 요청 동작을 확인한 다음 그 사실만 설명한다.

완료 기준: 서비스 정체성이 푸터·상품 Notice와 일치하고 미치환 자리표시자가 없다. 확인하지 않은 법적 의무·개인정보 운영 사실을 추가하지 않는다. 이 항목은 문구 정확성 점검이며 법률 적합성 판단이 아니다.

출처: [privacy.md](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/public/legal/privacy.md), [terms.md](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/public/legal/terms.md)

## 3 현재 화면에서 보존할 것과 문구 정리

### 이미 동작한 화면과 상태

- 홈에서 SHOP을 통해 [전체 상품](https://fcmm-app.web.app/shop/all)으로 이동했고 상품 링크와 상세 이미지를 확인했다.
- 헤더 장바구니 패널과 WISHES 탭의 빈 상태가 표시됐으며 탭 전환과 바깥 영역 클릭으로 닫기가 동작했다.
- 상품 Notice는 비상업용 데모, 추적하지 않는 재고, 예시 옵션·가격, 주문 미생성을 설명했다. 정리할 문구의 기준으로 삼는다.
- 푸터의 개인 포트폴리오·비상업용·자산 소유권 고지는 유지한다.
- 없는 상품 화면은 안내와 BROWSE SHOP 복구 동선을 제공했다.
- [FW23 Launch](https://fcmm-app.web.app/feature/campaign/fw23-launch)는 이미지, 설명, SHOP NOW, 상품 선택을 렌더링한다. 비어 있는 페이지로 분류하지 않는다.

위 항목은 관찰한 화면·빈 상태의 통과 기록이다. 상품 추가 후 상태, 저장 유지, 전체 상품 링크까지 통과했다는 뜻은 아니다.

### P2 상품 설명과 이름 정리

Tatom과 V Neck 상세 설명에는 FCMM edit의 일부이며 이미지와 옵션을 참고하라는 일반 문장이 보인다. Details는 카테고리·색상·사이즈와 원시 slug를 반복한다. 실제 상품 정보가 확보되면 검증된 내용으로 교체하고, 없으면 중복 문구를 줄이는 수준에서 정리한다.

상품 목록의 V-Neck Sweatchirt와 V Neck SHort Sleeve Knit Top 표기를 확인했다. 표시명 대소문자·철자와 URL 식별자를 함께 검토하되, 기존 링크를 의도 없이 바꾸지 않는다. 복사 문구, 접근 가능한 이름, 색상 선택 라벨에도 같은 명칭이 쓰이는지 확인한다.

완료 기준: 확인된 오타가 없고 원시 식별자가 상품 설명을 대신하지 않는다. 실제 소재·핏 등 미확인 정보를 추가하지 않는다. 문장 길이를 바꾼 뒤 기존 상세 컬럼의 줄바꿈과 간격을 확인한다.

### P2 캠페인 날짜 의미 정리

[Feature 목록](https://fcmm-app.web.app/feature)의 FW23 Launch와 SS23 Sale에는 2025 날짜가 표시된다. 홈의 FW23 및 10월 표기와 함께 볼 때 캠페인 시점인지 아카이브 게시 시점인지 구분이 필요하다. 지금 자료만으로 어느 연도가 정답인지 확정하지 않는다.

완료 기준: 원본 자료나 프로젝트 의도에 따라 날짜의 의미를 정하고 홈·목록·상세에서 일관되게 표시한다. 실제 기간을 확인할 수 없으면 날짜를 임의로 정정하지 않는다.

### 재현이 더 필요한 클릭

Tatom 상세에서 SIZE GUIDE와 Notice는 열리고 닫혔다. 그 뒤 SHIPPING & RETURNS 클릭, 장바구니→WISHES→바깥 영역으로 닫기 이후 푸터 PRIVACY POLICY·PROJECT INFO 클릭은 해당 시도에서 눈에 띄는 변화를 보이지 않았다. 소스에는 관련 경로·핸들러가 있으므로 확정 결함으로 등록하지 않는다.

다시 확인할 때는 새로고침 직후와 같은 순서를 거친 상태를 각각 시험한다. 스크롤 위치, 덮개 요소, 포커스와 실제 URL 변화를 기록한다. 직접 개인정보 URL이 열리는 것과 푸터 클릭이 동작하는 것은 별도로 판정한다.

## 4 코드에서 확인한 추가 점검 항목

### P1 색상 대상 세 건을 함께 검증

현재 75개 상품 데이터와 이름 기반 ID 생성 로직을 비교하면 아래 대상 세 건이 존재하지 않는다. 첫 번째만 라이브 클릭으로도 확인했다. 표시명 수정에 의존하지 않는 명시적 상품 ID 연결을 검토한다.

| 시작 상품 ID | 생성되는 잘못된 대상 | 실제 대상 |
| --- | --- | --- |
| v-neck-sweatshirt-grey | v-neck-sweatchirt-blue | v-neck-sweatshirt-blue |
| v-neck-sweatshirt-blue | v-neck-sweatchirt-grey | v-neck-sweatshirt-grey |
| half-sleeve-shirt-light-blue | half-sleeve-shirt-noir | half-sleeve-shirt-light-noir |

검증: [Light Blue 셔츠](https://fcmm-app.web.app/shop/ready-to-wear/tops-shirts/half-sleeve-shirt-light-blue)를 포함해 각 시작 상품을 열고 대응 색상을 선택한다. 이어서 모든 상품의 variant 대상이 데이터에 존재하는지 검사한다. 정상 ID를 새로 만들거나 카탈로그를 복제해 오류 경로를 살리는 방식은 먼저 선택하지 않는다. [ProductInfo.vue](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Shop/components/ProductInfo.vue#L273-L282)

카탈로그 근거: [V Neck 두 상품](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/public/items.json#L349-L393), [Half Sleeve 두 상품](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/public/items.json#L1029-L1070)

### P2 IVE REI 이미지 경로

[IVE REI section 3](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Feature/Special/components/ive-rei/ive-rei-section-3.vue#L21-L106)는 wide-slim-fit-pants.webp를 요청하지만 현재 트리에 해당 파일이 없다. 대응 영상은 존재한다. 라이브에서 해당 섹션의 이미지 실패나 영상 대체 동작은 확인하지 않았다.

완료 기준: 실제 섹션을 열어 네트워크와 표시 상태를 재현한 후 소스에 존재하는 적절한 자산으로 연결한다. 새 이미지를 임의로 만들거나 원본 자산을 지우지 않는다. 자동 재생·모바일 상태도 해당 수정 범위에서 재확인한다.

### P2 로그인 데모 설명과 바인딩

[LoginPage.vue](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/LoginPage.vue#L15-L82)는 데모 비활성 안내와 함께 로그인·빠른 결제·개인정보 관리 유도를 남겨 두고 있다. 템플릿의 email·password 바인딩은 선언되지 않았고 버튼은 데모 toast만 표시한다.

완료 기준: 인증을 새로 연결하지 않고 데모 제한 설명을 통일한다. 런타임 경고 여부를 재현하고 불필요한 바인딩을 정리한다. 개인 이메일·비밀번호를 입력해서 테스트하지 않는다.

### P2 지도 생성 시점과 README

[StorePage.vue](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Brand/components/StorePage.vue#L54-L65)의 v-show는 숨긴 iframe을 DOM에 남기며 loading=lazy도 지정되어 있다. 이것만으로 모든 브라우저가 실제 요청했다고 단정할 수 없다. 네트워크에서 확인한 뒤 필요하면 사용자가 지도를 여는 시점에 생성하도록 바꾼다.

README의 Git remote 없음·미푸시 자산·로컬 Firebase 계정 없음은 과거 작업 환경에 관한 서술이다. 현재 로컬 상태와 원격 상태를 대조한 뒤 재현 가능한 설치·실행 방법과 기존 기준 문서 링크로 정리한다. 원격 CI 성공을 로컬 환경 검증으로 대체하지 않는다.

## 5 수정 후 재현과 완료 기준

현재 라이브 관찰은 클라우드 Chrome의 약 1180×757 화면에서 이루어졌다. 아래 390px·1440px와 키보드 테스트는 다음 작업의 완료 기준이며 아직 통과한 결과가 아니다.

| 시나리오 | 재현 방법 | 통과 기준 |
| --- | --- | --- |
| 상품 색상 | 회색 V Neck에서 Blue, 파랑에서 Grey, Light Blue 셔츠에서 Noir 선택 | 존재하는 상품으로 이동하고 선택·이미지·명칭 일치 |
| 사이즈 안내 | Tatom 상세에서 SIZE GUIDE 열기 | 신발 표 제거, 검증된 의류 정보 또는 명확한 미제공 안내 |
| 프로젝트 고지 | privacy·terms 직접 열기와 푸터로 이동 | 다른 서비스·근거 없는 담당자·자리표시자 없음 |
| 정보 패널 | Tatom에서 각 패널을 새로 연 상태와 연속 사용 상태로 시험 | Notice·Size Guide·Shipping 의도된 동작과 닫기 |
| 없는 상품 | 관찰된 잘못된 blue 경로를 직접 열기 | 복구 안내와 BROWSE SHOP 유지 |
| Feature | 목록에서 FW23 Launch 열기 | 이미지·SHOP NOW·상품 선택 유지, 날짜 의미 일치 |
| 빈 저장 상태 | 장바구니와 WISHES를 각각 열기 | 빈 상태·탭 전환·닫기 정상 |
| 재진입 상태 | 승인된 데모 상품 추가 뒤 새로고침·재진입 | 장바구니·위시 저장 동작이 안내와 일치 |

### 화면별 확인 절차

1. 수정 전후 같은 페이지·같은 너비·같은 스크롤 위치에서 비교한다. 390px와 1440px를 기본으로 하되 필요한 경우 기존 관찰 너비도 재현한다.
2. 홈, 상품 목록, Tatom, V Neck, Feature, 고지 화면을 확인한다. 이미지 비율, 그리드, 타이포 크기, 여백을 의도 없이 바꾸지 않았는지 비교한다.
3. Tab과 Shift+Tab으로 헤더·상품 옵션·패널 동선에 접근한다. 열린 패널의 포커스 이동, 닫기 버튼, Escape 동작과 닫은 뒤 포커스 복귀를 확인한다. 이 동작의 현재 합격 여부는 미확인이다.
4. 검색 결과가 있는 경우와 없는 경우를 각각 시험한다. 장바구니·WISHES의 빈 상태뿐 아니라 담긴 상태, 수량·삭제·저장을 데모 범위 안에서 확인한다.
5. 변경한 경로의 콘솔 오류와 네트워크 실패를 확인한다. IVE REI 자산과 지도는 실제 요청 시점까지 기록한다.
6. 빌드 결과와 브라우저 결과를 따로 기록한다. 한 환경의 성공을 다른 환경이나 모든 상품의 성공으로 확대하지 않는다.

### 통과 기록 형식

각 검사에 커밋, 브라우저, 화면 크기, URL 또는 클릭 순서, 기대 결과, 실제 결과와 판정을 남긴다. 결함은 변경 전 재현과 변경 후 통과를 모두 기록한다. 재현되지 않으면 재현 조건과 시도 횟수를 적고 미확인으로 남긴다. 자료 부족으로 정확한 상품 정보를 채우지 못한 경우에는 합의된 대체 안내의 적용 여부를 검증한다.

## 6 작게 나눠 진행할 작업

### A 상품 연결과 안내의 정확성

우선순위 P1. 색상 대상 세 건, Tatom 사이즈표, privacy·terms를 하나의 검토 묶음으로 삼되 커밋이나 변경 파일은 문제별로 구분한다. 디자인 변경 없이 교정 가능한 범위를 먼저 처리한다.

선행 조건은 기존 담당자와 로컬 변경 상태 확인이다. 상품·개인정보 사실이 필요한 부분은 확인 자료나 승인된 대체 문구가 있어야 한다. 완료는 세 항목의 재현·수정·재검증 및 전체 variant 존재 검사로 판단한다. 새로운 인증·결제·상품 운영은 범위에 포함하지 않는다.

### B 기존 콘텐츠와 자산 정리

우선순위 P2. 카탈로그 오타, 반복 설명·원시 slug, 캠페인 날짜 의미, IVE REI 이미지 경로, 로그인 데모 안내를 다룬다. 각 항목은 기존 디자인 안에서 수정한다.

일정·상품 정보는 원본 확인 전까지 값을 임의로 채우지 않는다. 이미지 경로 변경은 실제 라이브 실패를 확인하고 사용 가능한 자산을 식별한 뒤 진행한다. 완료 시 원문과 수정문, 자산 경로와 출처, 변경한 화면의 비교 결과를 남긴다.

### C 상호작용과 최종 회귀 확인

우선순위 P2. 배송 안내·푸터 클릭은 먼저 재현하고, 지도는 네트워크 증거를 확보한다. 문제가 확인된 경우에만 최소 범위로 고친다. 정상 핸들러를 단일 실패 시도만으로 재작성하지 않는다.

완료 기준은 5장의 두 너비, 키보드, 검색, 패널, 장바구니·위시 상태 점검이다. 발견된 접근성 문제는 재현과 최소 변경안을 함께 남긴다. 화면 구조 전체를 바꾸는 작업은 이 묶음에서 제외한다.

### D 문서와 인계 정리

우선순위 P2. 기존 scope·CURRENT·HANDOFF를 유지하면서 실제 결과를 추가한다. README의 과거 작업 환경 설명과 문서 변경의 배포 부작용을 정정할 필요가 있다.

이 감사 문서는 docs/fcmm-finishing-audit-2026-10-05 브랜치의 docs/FCMM_FINISHING_AUDIT_2026-10-05.md로 전달한다. main과 기존 기준 문서는 변경하지 않으며 PR을 생성하지 않는다. 후속 구현·merge·배포는 별도 범위 확인 후 진행한다.

### 완료 보고에 포함할 항목

- 변경한 파일과 커밋, 시작 기준점과 최종 기준점
- 문제별 변경 내용, 재현 순서, 통과한 환경과 남은 미확인 항목
- 디자인 보존 비교 결과와 자료 부족으로 남긴 문구
- 원격 push·PR·배포 실행 여부 및 실행했다면 해당 결과 링크
- 이어받을 담당자, 남은 파일, 다음에 할 한 가지 작업

담당자와 마감은 이 문서가 새로 배정하지 않는다. 실제 소유권을 확인한 뒤 각 작업 묶음에 기록한다.

## 7 배포와 소유권을 확인한 뒤 재개

### 문서만 올려도 라이브 배포가 실행된다

현재 워크플로에서 main 또는 master push는 Firebase 라이브 fcmm-app 배포를 실행한다. 같은 저장소의 PR은 Firebase preview를 실행한다. 별도 브랜치 push만 하고 PR을 만들지 않는 경우에는 조회한 두 워크플로의 해당 트리거가 없다. 다른 자동화가 추가되었는지는 작업 직전 다시 확인한다.

근거: [라이브 배포 트리거](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/.github/workflows/firebase-hosting-merge.yml#L5-L21), [PR preview 트리거](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/.github/workflows/firebase-hosting-pull-request.yml#L5-L21)

최근 문서 커밋도 실제 라이브 배포를 발생시켰다. [a65743f의 Actions run 37229410068](https://github.com/jwpgdx/fcmm/actions/runs/37229410068)은 빌드와 Firebase 배포가 모두 성공했다. 따라서 기존 초기 정리 문서의 배포하지 않았다는 서술을 현재 배포 이력의 근거로 삼으면 안 된다.

이 점검에서는 main push, PR, workflow 실행을 하지 않았다. 라이브 변경을 원하지 않는 단계에서 문서를 올리기 위해 main을 push하거나 PR을 먼저 만드는 절차를 선택하지 않는다.

### 작업을 재개하는 순서

1. 기존 프로젝트 조정 채널에서 현재 담당자와 가장 최근 인계 기록을 확인한다.
2. [CURRENT](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/workspace/CURRENT.md#L69-L81)와 기존 scope·HANDOFF를 읽고 작업 환경을 대조한다. 원격 main과 로컬 HEAD가 같은지, 변경 파일과 실행 중 작업이 있는지 확인한다.
3. 의도적인 폰트 수정·미추적 자산이 있으면 담당자와 목적을 확인한다. clean 상태를 만들기 위한 삭제, reset, stash 또는 덮어쓰기를 먼저 하지 않는다.
4. 본 문서의 P1 세 항목부터 재현한다. 원격 조사 이후 변경되었으면 최신 상태를 기준으로 항목과 증거를 갱신한다.
5. 한 사람이 담당할 변경 파일과 작업 묶음을 확정한다. 같은 컴포넌트의 동시 편집을 피하고 변경 범위 밖 파일은 보존한다.
6. 로컬 검증과 승인된 문서 전달을 마친 뒤 push·PR·배포의 목적과 부작용을 확인한다. 배포를 실행했다면 성공 여부와 실제 라이브를 다시 확인한다.

### 인계자가 채울 최소 기록

현재 담당자와 확인 시각, 로컬·원격 커밋, 남아 있는 변경 파일과 의도, 진행할 묶음, 이미 통과한 테스트, 남은 재현 조건, 배포 허용 범위를 기록한다. 완료되지 않은 검사에는 통과 표시를 하지 않는다.

초기 인계 기록이 오래되었거나 담당자 답변을 받지 못한 상황에서도 자료 조사와 재현 기록 정리는 계속할 수 있다. 같은 파일을 수정하거나 외부 상태를 바꾸는 단계는 소유권과 허용 범위를 확인한 뒤 진행한다.

## 8 근거와 점검 한계

### 이번 판단의 기준 자료

- [라이브 사이트](https://fcmm-app.web.app/)와 본문에 연결한 상품·Feature·고지 경로
- [원격 main a65743f](https://github.com/jwpgdx/fcmm/commit/a65743fc347b736650bdab3a1e2d0b720d0589a7), [구현 기준점 66b088a](https://github.com/jwpgdx/fcmm/commit/66b088a06088c5fa8b816feb586e5eb8d7a24d8b)
- [기존 CURRENT](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/workspace/CURRENT.md#L69-L81), [포트폴리오 범위](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/docs/FCMM_PORTFOLIO_SCOPE.md#L7-L60), [HANDOFF](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/workspace/HANDOFF.md#L20-L55)
- [ProductInfo.vue](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Shop/components/ProductInfo.vue#L273-L282), [LoginPage.vue](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/LoginPage.vue#L15-L82), [StorePage.vue](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Brand/components/StorePage.vue#L54-L65), [IVE REI section 3](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/src/pages/Feature/Special/components/ive-rei/ive-rei-section-3.vue#L21-L106)
- [privacy.md](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/public/legal/privacy.md), [terms.md](https://github.com/jwpgdx/fcmm/blob/a65743fc347b736650bdab3a1e2d0b720d0589a7/public/legal/terms.md)
- [최신 확인 배포 실행](https://github.com/jwpgdx/fcmm/actions/runs/37229410068)

저장소 파일은 a65743f에 고정한 링크다. 라이브 URL은 이후 배포에 따라 달라질 수 있으므로 다시 검사할 때 관찰 시각과 커밋을 함께 기록한다.

### 확인한 기술 경계

프로젝트는 Vue 3, Vite 6, Router, Pinia, Tailwind 3 기반이며 정적 상품 데이터와 브라우저 로컬 장바구니·위시를 사용한다. 빌드 명령은 npm run build다. package scripts에서 별도의 lint·typecheck·test 명령은 확인되지 않았다. Firebase는 dist와 SPA fallback을 사용하며 검색 노출 방지를 위한 noindex 헤더가 의도적으로 설정되어 있다.

GitHub Actions의 빌드·배포 성공을 확인했으나 이번 조사에서 별도 로컬 빌드를 실행하지 않았다. 검증 체계가 없는 항목을 단순 빌드 성공만으로 통과 처리하지 않는다.

### 아직 점검하지 않은 범위

- 모바일 390px, 데스크톱 1440px의 실제 비교와 키보드·포커스 접근성
- 로그인 화면의 라이브 런타임, 인증 흐름, 데모 checkout 상태
- 상품 추가 후 장바구니·위시 동작과 저장 유지
- 75개 모든 상품의 라이브 페이지, 검색 결과·빈 결과
- IVE REI 영상·대체 이미지의 실제 표시와 지도 네트워크 요청
- 로컬 작업 폴더, 로컬 폰트 변경, 실행 중인 다른 작업
- 법률 적합성, 실제 상품 사양, 라이선스 범위 전체의 독립 검증

개인정보 입력, 로그인, 구매·주문 제출, 장바구니·위시 상품 추가는 이번 라이브 점검에서 수행하지 않았다. 화면 캡처는 관찰 기록으로만 남아 있으며 이 전달본에 별도 스크린샷 파일을 포함하지 않는다.

### 다음 작업의 시작점

기존 담당자와 로컬 상태를 확인한 다음 회색 V Neck의 Blue 이동, Tatom의 SIZE GUIDE, privacy·terms를 다시 연다. 세 문제의 최신 재현 결과를 기록하고 A 묶음부터 진행한다. 완료 후에는 실제 통과한 검사와 남은 항목을 기존 인계 문서에 이어 적는다.

